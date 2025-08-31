import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import config from '@/config/env';
import logger from '@/config/logger';
import { requestContext } from '@/middleware/requestContext';
import { errorHandler } from '@/middleware/errorHandler';
import { globalRateLimit } from '@/middleware/rateLimiter';
import routes from '@/routes';
import { ApiResponse } from '@/types/api';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Backend API',
      version: '1.0.0',
      description: 'Production-grade Facebook-style social backend with Express, TypeScript, PostgreSQL',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

export function createApp(): Application {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for Swagger UI
  }));

  // Compression
  app.use(compression());

  // CORS
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }));

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Request context
  app.use(requestContext);

  // Rate limiting
  app.use(globalRateLimit);

  // API Documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'Social Backend API Documentation',
  }));

  // Health check
  app.get('/health', (req: Request, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: config.NODE_ENV,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.context?.requestId || 'unknown',
      },
    };
    res.json(response);
  });

  // Metrics endpoint (basic implementation)
  app.get('/metrics', (req: Request, res: Response) => {
    // In production, this would return Prometheus metrics
    res.set('Content-Type', 'text/plain');
    res.send(`
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 100
http_requests_total{method="POST",status="201"} 50

# HELP http_request_duration_seconds HTTP request duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 80
http_request_duration_seconds_bucket{le="0.5"} 95
http_request_duration_seconds_bucket{le="1.0"} 98
http_request_duration_seconds_bucket{le="+Inf"} 100
http_request_duration_seconds_sum 45.67
http_request_duration_seconds_count 100
    `.trim());
  });

  // API routes
  app.use('/api', routes);

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: {
        message: 'Social Backend API',
        version: '1.0.0',
        documentation: '/api/docs',
        health: '/health',
        metrics: '/metrics',
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.context?.requestId || 'unknown',
      },
    };
    res.json(response);
  });

  // 404 handler
  app.use('*', (req: Request, res: Response) => {
    const response: ApiResponse = {
      success: false,
      error: {
        type: 'about:blank',
        title: 'Not Found',
        status: 404,
        detail: `The requested resource ${req.originalUrl} was not found`,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.context?.requestId || 'unknown',
      },
    };
    res.status(404).json(response);
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}