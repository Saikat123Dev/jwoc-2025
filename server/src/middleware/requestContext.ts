import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import logger from '@/config/logger';
import { RequestContext } from '@/types/api';

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}

export const requestContext = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = randomUUID();
  const startTime = Date.now();
  
  req.context = {
    requestId,
    startTime,
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.get('User-Agent'),
  };

  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);

  // Log incoming request
  logger.info({
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.context.userAgent,
    ip: req.context.ip,
  }, 'Incoming request');

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info({
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      contentLength: res.get('Content-Length'),
    }, 'Request completed');
  });

  next();
};