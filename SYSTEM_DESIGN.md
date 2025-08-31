# 🎯 System Design Document

## Executive Summary

This document outlines the system design for a production-grade, scalable Facebook-style social media backend. The system is built using modern technologies and follows industry best practices for performance, security, and maintainability.

## 🏗️ High-Level Architecture

```
                                   ┌─────────────────┐
                                   │   Load Balancer │
                                   │     (Nginx)     │
                                   └─────────┬───────┘
                                            │
                            ┌───────────────┼───────────────┐
                            │               │               │
                    ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
                    │   API Server  │ │   API Server │ │API Server │
                    │   Instance 1  │ │   Instance 2 │ │Instance 3 │
                    └───────┬──────┘ └──────┬──────┘ └─────┬─────┘
                            │               │              │
                            └───────────────┼──────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
            ┌───────▼──────┐      ┌────────▼────────┐    ┌─────▼─────┐
            │  PostgreSQL  │      │      Redis      │    │   Kafka   │
            │  (Primary)   │      │    (Cache)      │    │ (Events)  │
            └──────────────┘      └─────────────────┘    └───────────┘
                    │
            ┌───────▼──────┐
            │  PostgreSQL  │
            │ (Read Replica)│
            └──────────────┘
```

## 📊 Non-Functional Requirements (NFRs)

### Performance Targets
- **Availability**: 99.9% uptime (8.77 hours downtime/year)
- **Response Time**: 
  - P95 < 150ms for read operations
  - P95 < 300ms for write operations
- **Throughput**: 
  - Baseline: 1,000 RPS
  - Peak: 5,000 RPS (burst capacity)

### Scalability Assumptions
- **Users**: 1M registered users, 100K DAU
- **Posts**: 10K posts/day, 1M total posts
- **Storage**: 100GB data, 50GB media files
- **Infrastructure**: 
  - 3 API servers (2 vCPU, 4GB RAM each)
  - PostgreSQL (4 vCPU, 8GB RAM)
  - Redis (2 vCPU, 4GB RAM)

### Data Consistency
- **Strong Consistency**: User authentication, financial transactions
- **Eventual Consistency**: News feeds, notifications, analytics
- **Cache Invalidation**: Write-through for critical data, TTL-based for feeds

## 🎯 Capacity Planning

### Database Sizing
```
Users: 1M × 1KB = 1GB
Posts: 1M × 2KB = 2GB
Comments: 5M × 0.5KB = 2.5GB
Reactions: 10M × 0.2KB = 2GB
Follows: 5M × 0.1KB = 0.5GB
Feed Items: 50M × 0.3KB = 15GB
Total: ~25GB (with 4x growth buffer = 100GB)
```

### Cache Sizing (Redis)
```
Hot Users: 10K × 1KB = 10MB
Hot Posts: 50K × 2KB = 100MB
Feed Slices: 100K × 10KB = 1GB
Session Data: 100K × 0.5KB = 50MB
Total: ~1.2GB (with buffer = 4GB)
```

### Queue Throughput (Kafka)
```
Post Events: 200/min = 3.3/sec
Reaction Events: 1K/min = 16.7/sec
Follow Events: 100/min = 1.7/sec
Comment Events: 500/min = 8.3/sec
Total: ~30 events/sec peak
```

## 🔄 Feed Generation Strategy

### Hybrid Approach (Recommended)

**Fan-out on Write** (for users with < 1K followers):
```typescript
async function onPostCreated(post: Post) {
  const followers = await getFollowers(post.authorId);
  
  if (followers.length < 1000) {
    // Fan-out on write
    const feedItems = followers.map(follower => ({
      userId: follower.id,
      postId: post.id,
      rank: calculateRank(post, follower),
    }));
    
    await createFeedItems(feedItems);
    await invalidateCache(followers.map(f => `feed:${f.id}`));
  } else {
    // Handle via pull-based approach
    await addToInfluencerPosts(post.authorId, post.id);
  }
}
```

**Fan-in on Read** (for users with > 1K followers):
```typescript
async function generateFeed(userId: string, limit: number) {
  const cachedFeed = await getFromCache(`feed:${userId}`);
  if (cachedFeed) return cachedFeed;
  
  const [materializedFeed, influencerPosts] = await Promise.all([
    getMaterializedFeed(userId, limit),
    getInfluencerPosts(userId, limit),
  ]);
  
  const mergedFeed = mergeFeedsWithRanking(materializedFeed, influencerPosts);
  await cacheWithTTL(`feed:${userId}`, mergedFeed, 300); // 5min TTL
  
  return mergedFeed;
}
```

### Ranking Algorithm
```typescript
function calculateRank(post: Post, user: User): number {
  const timeDecay = Math.exp(-0.1 * (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60));
  const authorScore = getAuthorScore(post.authorId, user.id);
  const engagementScore = (post.reactionCount * 2 + post.commentCount * 3) / 10;
  
  return timeDecay * 0.4 + authorScore * 0.3 + engagementScore * 0.3;
}
```

## 🗄️ Data Storage Strategy

### Database Schema Design

**Partitioning Strategy**:
- Posts: Partition by `created_at` (monthly partitions)
- Feed Items: Partition by `user_id` (hash partitioning)
- Notifications: Partition by `created_at` (weekly partitions)

**Indexing Strategy**:
```sql
-- Posts
CREATE INDEX CONCURRENTLY idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_posts_visibility_created ON posts(visibility, created_at DESC);

-- Feed Items
CREATE INDEX CONCURRENTLY idx_feed_user_rank ON feed_items(user_id, rank DESC);

-- Follows
CREATE INDEX CONCURRENTLY idx_follows_follower ON follows(follower_id);
CREATE INDEX CONCURRENTLY idx_follows_followee ON follows(followee_id);
```

## ⚡ Caching Strategy

### Cache Hierarchy
```
L1: Application Cache (in-memory, 100ms TTL)
 └─ L2: Redis Cache (network, 5-30min TTL)
     └─ L3: Database (persistent storage)
```

### Cache Patterns

**User Profile Cache**:
```typescript
async function getUserProfile(userId: string): Promise<UserProfile> {
  const cacheKey = `user:${userId}`;
  
  let profile = await redis.get(cacheKey);
  if (!profile) {
    profile = await db.user.findById(userId);
    await redis.setex(cacheKey, 600, JSON.stringify(profile)); // 10min TTL
  }
  
  return JSON.parse(profile);
}
```

**Feed Cache with Write-Through**:
```typescript
async function updateUserFeed(userId: string, newItems: FeedItem[]): Promise<void> {
  await db.feedItem.createMany(newItems);
  
  // Update cache
  const cacheKey = `feed:${userId}`;
  const existingFeed = await redis.get(cacheKey);
  
  if (existingFeed) {
    const mergedFeed = mergeAndSortFeed(JSON.parse(existingFeed), newItems);
    await redis.setex(cacheKey, 300, JSON.stringify(mergedFeed));
  }
}
```

### Cache Invalidation
```typescript
// Pub/Sub for cache invalidation
class CacheInvalidator {
  async invalidateUser(userId: string): Promise<void> {
    await redis.del(`user:${userId}`);
    await redis.publish('cache:invalidate', JSON.stringify({
      type: 'user',
      id: userId,
    }));
  }
  
  async invalidateUserFeeds(userIds: string[]): Promise<void> {
    const keys = userIds.map(id => `feed:${id}`);
    await redis.del(...keys);
  }
}
```

## 📤 Event Streaming Architecture

### Kafka Topic Design
```
Topics:
├── user.events (3 partitions, key: userId)
├── post.events (6 partitions, key: postId)
├── social.events (3 partitions, key: userId)
└── analytics.events (12 partitions, key: eventType)
```

### Event Schemas
```typescript
interface PostCreatedEvent {
  eventId: string;
  eventType: 'post.created';
  timestamp: string;
  version: '1.0';
  data: {
    postId: string;
    authorId: string;
    visibility: PostVisibility;
    contentType: string;
  };
  metadata: {
    source: 'api-server';
    correlationId: string;
  };
}
```

### Consumer Groups
```typescript
// Feed Generation Consumer
const feedConsumer = kafka.consumer({ groupId: 'feed-generator' });
await feedConsumer.subscribe({ topics: ['post.events', 'social.events'] });

await feedConsumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString());
    
    switch (event.eventType) {
      case 'post.created':
        await handlePostCreated(event.data);
        break;
      case 'follow.created':
        await handleFollowCreated(event.data);
        break;
    }
  },
});
```

## 🔐 Security Architecture

### Authentication Flow
```
1. User Login → JWT Access Token (15min) + Refresh Token (7d)
2. API Request → Validate Access Token
3. Token Expired → Use Refresh Token → New Access Token
4. Refresh Expired → Re-authenticate
```

### Rate Limiting Strategy
```typescript
const rateLimiters = {
  global: { windowMs: 15 * 60 * 1000, max: 1000 }, // 1000 req/15min
  auth: { windowMs: 15 * 60 * 1000, max: 10 },     // 10 req/15min
  posts: { windowMs: 60 * 1000, max: 5 },          // 5 posts/min
  follows: { windowMs: 60 * 1000, max: 20 },       // 20 follows/min
};
```

### Authorization Matrix
```
Resource    | Owner | Follower | Public | Private
------------|-------|----------|--------|--------
Read Post   |  ✓    |    ✓     |   ✓    |   ✗
Edit Post   |  ✓    |    ✗     |   ✗    |   ✗
Delete Post |  ✓    |    ✗     |   ✗    |   ✗
View Profile|  ✓    |    ✓     |   ✓    |   ✓
Edit Profile|  ✓    |    ✗     |   ✗    |   ✗
```

## 📈 Scaling Strategies

### Horizontal Scaling
1. **API Servers**: Load balance across multiple instances
2. **Database**: Read replicas for read-heavy operations
3. **Cache**: Redis Cluster with consistent hashing
4. **Message Queue**: Kafka partitioning by user/post ID

### Vertical Scaling Limits
```
API Server: 8 vCPU, 16GB RAM (handles ~2K RPS)
Database: 16 vCPU, 64GB RAM (handles ~10K TPS)
Cache: 8 vCPU, 32GB RAM (handles ~100K ops/sec)
```

### Auto-scaling Rules
```yaml
api_servers:
  min_instances: 2
  max_instances: 10
  scale_up: cpu > 70% OR memory > 80%
  scale_down: cpu < 30% AND memory < 50%

database:
  read_replicas:
    min: 1
    max: 3
    scale_up: read_lag > 1s OR cpu > 80%
```

## 🔧 Deployment Strategy

### Blue-Green Deployment
```
1. Deploy to Green environment
2. Run health checks and smoke tests
3. Switch load balancer to Green
4. Monitor for 15 minutes
5. If issues: Switch back to Blue
6. If stable: Terminate Blue environment
```

### Database Migration Strategy
```sql
-- Online schema changes
-- Step 1: Add new column (nullable)
ALTER TABLE posts ADD COLUMN new_field TEXT;

-- Step 2: Backfill data (background job)
UPDATE posts SET new_field = calculate_value(old_field) WHERE new_field IS NULL;

-- Step 3: Make column non-nullable
ALTER TABLE posts ALTER COLUMN new_field SET NOT NULL;

-- Step 4: Drop old column (next deployment)
ALTER TABLE posts DROP COLUMN old_field;
```

## 📊 Monitoring & Alerting

### Key Metrics
```
Application:
- Request rate (RPS)
- Response time (P50, P95, P99)
- Error rate (%)
- Active users

Infrastructure:
- CPU utilization (%)
- Memory usage (%)
- Disk I/O (IOPS)
- Network throughput (Mbps)

Business:
- User registrations/day
- Posts created/day
- User engagement rate
- Feature adoption
```

### Alert Thresholds
```yaml
critical:
  error_rate: > 5%
  response_time_p95: > 1000ms
  database_connections: > 80%
  
warning:
  error_rate: > 1%
  response_time_p95: > 500ms
  memory_usage: > 80%
```

## 🚀 Performance Optimizations

### Database Optimizations
1. **Connection Pooling**: PgBouncer with max 25 connections per server
2. **Query Optimization**: Use EXPLAIN ANALYZE for slow queries
3. **Materialized Views**: For complex analytics queries
4. **Proper Indexing**: Cover all frequent query patterns

### Application Optimizations
1. **DataLoader Pattern**: Batch database queries to avoid N+1
2. **Response Compression**: gzip compression for API responses
3. **CDN**: Static assets served from CloudFront/CloudFlare
4. **Database Replication**: Read replicas for read-heavy workloads

### Caching Optimizations
1. **Cache Warming**: Pre-populate frequently accessed data
2. **Intelligent TTLs**: Longer TTLs for stable data
3. **Cache Stampede Prevention**: Lock-based cache updates
4. **Multi-layer Caching**: In-memory + Redis + CDN

---

**Document Version**: 1.0  
**Last Updated**: January 2024  
**Next Review**: July 2024