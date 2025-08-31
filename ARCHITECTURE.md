# 🏗️ Architecture Overview

## ASCII Architecture Diagram

```
                           ┌─── USERS ───┐
                           │  Web/Mobile  │
                           │   Clients    │
                           └──────┬───────┘
                                  │ HTTPS
                                  │
                         ┌────────▼────────┐
                         │  Load Balancer  │
                         │     (Nginx)     │
                         │   SSL Term.     │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
           ┌────────▼──────┐ ┌────▼────┐ ┌─────▼─────┐
           │  API Server   │ │API Srv  │ │ API Srv   │
           │  Express.js   │ │Instance │ │ Instance  │
           │  TypeScript   │ │    2    │ │     3     │
           └────────┬──────┘ └────┬────┘ └─────┬─────┘
                    │             │            │
                    └─────────────┼────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
   ┌────▼────┐              ┌─────▼──────┐          ┌──────▼──────┐
   │  Redis  │              │PostgreSQL  │          │   Kafka     │
   │ Cache   │              │  Primary   │          │  Message    │
   │ Session │              │  Database  │          │   Queue     │
   │ Store   │              └─────┬──────┘          └──────┬──────┘
   └─────────┘                    │                        │
                            ┌─────▼──────┐                 │
                            │PostgreSQL  │                 │
                            │Read Replica│                 │
                            └────────────┘                 │
                                                          │
        ┌─────────────────────────────────────────────────┘
        │
   ┌────▼─────┐     ┌─────────────┐     ┌──────────────┐
   │Background│     │ Monitoring  │     │   Storage    │
   │ Workers  │     │   Stack     │     │              │
   │  Feed    │     │             │     │              │
   │Generator │     │ Prometheus  │     │   MinIO/S3   │
   │Notifica- │     │  Grafana    │     │ (Media Files)│
   │  tions   │     │   Loki      │     │              │
   └──────────┘     └─────────────┘     └──────────────┘
```

## Component Architecture

### 1. **API Gateway Layer**
```
┌─────────────────────────────────────────┐
│             API GATEWAY                 │
├─────────────────────────────────────────┤
│ • Rate Limiting (Redis-backed)          │
│ • Authentication Middleware (JWT)       │
│ • Request/Response Logging              │
│ • CORS & Security Headers               │
│ • API Versioning (/api/v1)              │
│ • Request Validation (Zod)              │
└─────────────────────────────────────────┘
```

### 2. **Application Layer (Hexagonal Architecture)**
```
┌─────────────────────────────────────────┐
│              CONTROLLERS                │ ← HTTP Layer
├─────────────────────────────────────────┤
│ • AuthController    • PostController    │
│ • UserController    • FollowController  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│               SERVICES                  │ ← Business Logic
├─────────────────────────────────────────┤
│ • UserService      • PostService        │
│ • AuthService      • FollowService      │
│ • FeedService      • NotificationServ.  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│             REPOSITORIES                │ ← Data Access
├─────────────────────────────────────────┤
│ • UserRepository   • PostRepository     │
│ • FollowRepository • FeedRepository     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│             DATA LAYER                  │ ← Persistence
├─────────────────────────────────────────┤
│ • PostgreSQL (Primary + Read Replicas)  │
│ • Redis (Cache + Sessions)              │
│ • Kafka (Event Streaming)               │
└─────────────────────────────────────────┘
```

### 3. **Data Flow Architecture**

#### User Registration Flow
```
Client Request
      │
      ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Auth         │───▶│User         │───▶│User         │
│Controller   │    │Service      │    │Repository   │
└─────────────┘    └─────────────┘    └─────────────┘
      │                    │                   │
      │                    ▼                   ▼
      │            ┌─────────────┐    ┌─────────────┐
      │            │JWT Token    │    │PostgreSQL  │
      │            │Generation   │    │Database     │
      │            └─────────────┘    └─────────────┘
      │                    │
      ▼                    ▼
┌─────────────┐    ┌─────────────┐
│HTTP Response│    │Cache        │
│with Token   │    │User Profile │
└─────────────┘    └─────────────┘
```

#### Post Creation & Feed Generation Flow
```
Create Post Request
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│Post Controller  │───▶│Post Service     │
└─────────────────┘    └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │Post Repository  │
         │              └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │PostgreSQL       │
         │              │Save Post        │
         │              └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│HTTP Response    │    │Kafka Producer   │
│Post Created     │    │post.created     │
└─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │Background       │
                       │Feed Worker      │
                       └─────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │Generate     │ │Update       │ │Send         │
            │Feed Items   │ │Redis Cache  │ │Notifications│
            └─────────────┘ └─────────────┘ └─────────────┘
```

## Design Patterns Used

### 1. **Repository Pattern**
```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(user: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  // ... other methods
}

class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  // ... implementation
}
```

### 2. **Dependency Injection**
```typescript
class UserService {
  constructor(
    private userRepository: UserRepository,
    private cacheService: CacheService
  ) {}
  
  async getUser(id: string): Promise<User> {
    // Business logic using injected dependencies
  }
}
```

### 3. **Factory Pattern (for Responses)**
```typescript
class ResponseFactory {
  static success<T>(data: T, requestId: string): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    };
  }
  
  static error(error: AppError, requestId: string): ApiResponse {
    return {
      success: false,
      error: {
        type: error.type,
        title: error.title,
        status: error.statusCode,
        detail: error.detail,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    };
  }
}
```

### 4. **Observer Pattern (Event System)**
```typescript
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }
  
  emit(event: string, data: any): void {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach(listener => listener(data));
  }
}

// Usage
eventEmitter.on('post.created', handlePostCreatedForFeed);
eventEmitter.on('post.created', handlePostCreatedForNotifications);
```

## Security Architecture

### Authentication Flow
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Client     │    │ API Gateway  │    │Auth Service  │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       │ POST /auth/login  │                   │
       ├──────────────────▶│                   │
       │                   │ Validate Credentials │
       │                   ├──────────────────▶│
       │                   │                   │
       │                   │ JWT Tokens        │
       │                   │◄──────────────────┤
       │ Access + Refresh  │                   │
       │◄──────────────────┤                   │
       │                   │                   │
       │ API Request       │                   │
       │ + Bearer Token    │                   │
       ├──────────────────▶│                   │
       │                   │ Verify JWT        │
       │                   ├──────────────────▶│
       │                   │ User Context      │
       │                   │◄──────────────────┤
       │ API Response      │                   │
       │◄──────────────────┤                   │
```

### Rate Limiting Strategy
```
Global Limits:
├── IP-based: 1000 req/15min
├── User-based: 500 req/15min
└── Endpoint-specific:
    ├── Auth: 10 req/15min
    ├── Posts: 5 posts/min
    ├── Follows: 20 actions/min
    └── Search: 100 req/min
```

## Caching Strategy

### Cache Layers
```
┌─────────────────────────────────────────┐
│          APPLICATION CACHE              │ ← In-Memory (100ms TTL)
├─────────────────────────────────────────┤
│ • Frequently accessed configurations    │
│ • User session data (temporary)         │
│ • API response caching (short-lived)    │
└─────────────────┬───────────────────────┘
                  │ Cache Miss
                  ▼
┌─────────────────────────────────────────┐
│            REDIS CACHE                  │ ← Network Cache
├─────────────────────────────────────────┤
│ • User profiles (10min TTL)             │
│ • Post data (5min TTL)                  │
│ • Feed slices (30sec TTL)               │
│ • Session storage (persistent)          │
└─────────────────┬───────────────────────┘
                  │ Cache Miss
                  ▼
┌─────────────────────────────────────────┐
│           DATABASE                      │ ← Source of Truth
├─────────────────────────────────────────┤
│ • PostgreSQL (Primary + Read Replicas)  │
│ • Persistent storage                     │
│ • ACID transactions                      │
└─────────────────────────────────────────┘
```

### Cache Invalidation Patterns
```typescript
// Write-Through Pattern
async function updateUserProfile(userId: string, data: UpdateUserData): Promise<User> {
  // 1. Update database
  const user = await userRepository.update(userId, data);
  
  // 2. Update cache
  await cache.set(`user:${userId}`, user, { ttl: 600 });
  
  // 3. Invalidate related caches
  await cache.delete(`feed:${userId}`);
  
  return user;
}

// Cache-Aside Pattern
async function getUserProfile(userId: string): Promise<User> {
  // 1. Try cache first
  let user = await cache.get(`user:${userId}`);
  
  if (!user) {
    // 2. Cache miss - get from database
    user = await userRepository.findById(userId);
    
    // 3. Update cache
    if (user) {
      await cache.set(`user:${userId}`, user, { ttl: 600 });
    }
  }
  
  return user;
}
```

## Event-Driven Architecture

### Event Flow
```
Domain Event
     │
     ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Service   │───▶│   Kafka     │───▶│ Background  │
│  (Producer) │    │  Message    │    │  Workers    │
│             │    │   Queue     │    │(Consumers)  │
└─────────────┘    └─────────────┘    └─────────────┘
     │                                       │
     │ Immediate Response                    │ Async Processing
     ▼                                       ▼
┌─────────────┐                    ┌─────────────┐
│   Client    │                    │Side Effects │
│  Response   │                    │• Feed Gen   │
│             │                    │• Notifications│
└─────────────┘                    │• Analytics  │
                                   └─────────────┘
```

### Message Schemas
```typescript
interface BaseEvent {
  eventId: string;
  eventType: string;
  timestamp: string;
  version: string;
  source: string;
  correlationId?: string;
}

interface PostCreatedEvent extends BaseEvent {
  eventType: 'post.created';
  data: {
    postId: string;
    authorId: string;
    visibility: PostVisibility;
    createdAt: string;
  };
}

interface FollowCreatedEvent extends BaseEvent {
  eventType: 'follow.created';
  data: {
    followId: string;
    followerId: string;
    followeeId: string;
    createdAt: string;
  };
}
```

## Database Design

### Entity Relationships
```
    Users (1) ←→ (M) Posts
      │               │
      │               │
      │ (M)     (M)   │ (1)
      ↓               ↓
   Follows      Comments
      │               │
   (M)│               │(M)
      ↓               ↓
  FeedItems     Reactions
      │               │
   (1)│               │(1)
      ↓               ↓
    Posts ←──────────→ Posts
```

### Data Modeling Decisions

1. **User Handle Uniqueness**: Global unique constraint for clean URLs
2. **Soft Deletes**: `deleted_at` field for user accounts (GDPR compliance)
3. **JSON Fields**: `media_urls` and `metadata` for flexible schema
4. **Composite Indexes**: Optimized for common query patterns
5. **Foreign Key Cascades**: ON DELETE CASCADE for data consistency

## Observability Architecture

### Metrics Collection
```
Application Metrics (Custom)
├── HTTP request metrics (count, duration, errors)
├── Database query metrics (count, duration)
├── Cache hit/miss ratios
├── Queue processing metrics
└── Business metrics (users, posts, engagement)
                    │
                    ▼
              Prometheus
                    │
                    ▼
               Grafana
            (Dashboards)
```

### Logging Pipeline
```
Application Logs (Pino)
├── Structured JSON format
├── Correlation IDs
├── Request/Response context
└── Error stack traces
         │
         ▼
     Log Aggregation
      (Loki/ELK)
         │
         ▼
    Search & Analysis
   (Grafana/Kibana)
```

### Distributed Tracing
```
HTTP Request → Service A → Service B → Database
     │             │          │           │
     └─────────────┼──────────┼───────────┘
                   │          │
                   ▼          ▼
              OpenTelemetry Spans
                       │
                       ▼
                Jaeger/Zipkin
               (Trace Visualization)
```

---

This architecture provides a solid foundation for a scalable, maintainable social media backend that can handle growth while maintaining performance and reliability.