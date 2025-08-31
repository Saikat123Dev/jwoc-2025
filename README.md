# 🚀 Social Backend - Production-Grade Facebook-Style API

A scalable, production-ready social media backend built with Express.js, TypeScript, PostgreSQL, Redis, and Kafka. Features comprehensive observability, security, and developer experience.

## ✨ Features

- 🔐 **JWT Authentication** with access/refresh tokens
- 👥 **User Management** with profiles and search
- 📝 **Posts & Comments** with media support
- ❤️ **Reactions System** (like, love, laugh, angry, sad)
- 👯 **Follow/Unfollow** functionality
- 📰 **News Feed** with hybrid generation strategy
- 🔔 **Notifications** system
- ⚡ **Redis Caching** for performance
- 📊 **Event Streaming** with Kafka
- 🛡️ **Security Hardening** (rate limiting, validation, CORS)
- 📈 **Observability** (logs, metrics, tracing)
- 🧪 **Testing** (unit, integration, e2e)
- 🐳 **Docker Compose** for local development
- 📚 **OpenAPI Documentation**

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │     API Gateway │    │     CDN/S3      │
│     (Nginx)     │────│    (Express)    │────│   (MinIO)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │   Services   │ │  Middleware │ │ Controllers│
        │   (Business  │ │  (Auth,     │ │ (HTTP      │
        │    Logic)    │ │   Rate      │ │  Handlers) │
        └───────┬──────┘ │   Limiting) │ └─────┬─────┘
                │        └─────────────┘       │
        ┌───────▼──────┐                ┌─────▼─────┐
        │ Repositories │                │  Routes   │
        │ (Data Access)│                │ (Routing) │
        └───────┬──────┘                └───────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼────┐ ┌───▼────┐ ┌────▼────┐
│PostgreSQL│ │ Redis  │ │  Kafka  │
│ (Primary │ │(Cache) │ │(Events) │
│   Data)  │ └────────┘ └─────────┘
└──────────┘
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ LTS
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis 7
- **Message Queue**: Apache Kafka
- **Storage**: S3-compatible (MinIO for local dev)
- **Logging**: Pino (structured JSON)
- **Monitoring**: Prometheus + Grafana
- **Documentation**: OpenAPI 3.0 + Swagger UI
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Containerization**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### 1. Clone and Setup

```bash
git clone <repository-url>
cd jwoc-2025/server
cp .env.example .env
npm install
```

### 2. Start Infrastructure

```bash
# Start PostgreSQL, Redis, Kafka, and monitoring stack
docker-compose up -d postgres redis kafka prometheus grafana loki

# Wait for services to be healthy
docker-compose ps
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run migrate:dev

# Seed database (optional)
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at:
- **API**: http://localhost:3000
- **Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health
- **Metrics**: http://localhost:3000/metrics

### 5. Monitoring Dashboards

- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin)

## 📊 API Documentation

The API follows RESTful conventions with OpenAPI 3.0 specification.

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
All authenticated endpoints require a Bearer token:
```http
Authorization: Bearer <access_token>
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/me` | Get current user |
| GET | `/users/{id}` | Get user profile |
| GET | `/users/search` | Search users |
| POST | `/posts` | Create post |
| GET | `/posts/public` | Get public posts |
| GET | `/posts/{id}` | Get specific post |
| POST | `/users/{id}/follow` | Follow user |
| DELETE | `/users/{id}/follow` | Unfollow user |

For complete API documentation, visit: http://localhost:3000/api/docs

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/          # Configuration (DB, env, logger)
│   ├── controllers/     # HTTP request handlers
│   ├── middleware/      # Express middleware
│   ├── repositories/    # Data access layer
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── tests/           # Test files
│   ├── app.ts           # Express app setup
│   └── index.ts         # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── docker/              # Docker configuration
├── package.json
├── tsconfig.json
├── jest.config.js
└── Dockerfile
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck
```

## 🔧 Development

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/social_dev?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-jwt-key-change-in-production"

# Redis
REDIS_URL="redis://localhost:6379"

# Kafka
KAFKA_BROKERS="localhost:9092"
```

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run migrate:dev  # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database
```

### Code Quality

The project enforces code quality through:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript strict mode** for type safety
- **Husky** for git hooks (when configured)
- **Jest** for testing

## 📈 Monitoring & Observability

### Structured Logging

All logs are structured JSON with correlation IDs:

```json
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "requestId": "req_123",
  "userId": "user_456",
  "method": "POST",
  "url": "/api/v1/posts",
  "statusCode": 201,
  "duration": 145,
  "msg": "Request completed"
}
```

### Metrics

Prometheus metrics are exposed at `/metrics`:
- HTTP request duration and count
- Database connection pool stats
- Cache hit/miss rates
- Queue consumer lag

### Health Checks

Health endpoint at `/health` returns:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0.0",
    "environment": "development"
  }
}
```

## 🔒 Security

### Implemented Security Measures

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** (global and endpoint-specific)
- **Input validation** with Zod
- **JWT authentication** with secure cookies
- **Password hashing** with bcrypt
- **SQL injection protection** via Prisma
- **Request size limits**

### Security Headers

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 🚀 Deployment

### Docker Production Build

```bash
# Build production image
docker build -t social-backend .

# Run container
docker run -p 3000:3000 --env-file .env social-backend
```

### Environment-Specific Configs

- **Development**: Hot reload, verbose logging, debug mode
- **Production**: Optimized builds, minimal logging, security hardening
- **Testing**: In-memory database, mocked external services

## 📚 API Examples

### Register User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "handle": "johndoe",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "bio": "Software developer and coffee enthusiast"
  }'
```

### Create Post

```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "body": "Hello, world! This is my first post.",
    "visibility": "PUBLIC"
  }'
```

### Follow User

```bash
curl -X POST http://localhost:3000/api/v1/users/{user_id}/follow \
  -H "Authorization: Bearer <access_token>"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Update documentation
- Follow conventional commit messages
- Ensure all checks pass

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- 📚 **Documentation**: [API Docs](http://localhost:3000/api/docs)
- 🐛 **Issues**: [GitHub Issues](https://github.com/example/social-backend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/example/social-backend/discussions)

## 🗺️ Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] Advanced feed ranking algorithms
- [ ] Media processing pipeline
- [ ] GraphQL API option
- [ ] Multi-tenancy support
- [ ] Advanced analytics
- [ ] Mobile push notifications
- [ ] Content moderation tools

---

Built with ❤️ using modern technologies and best practices.