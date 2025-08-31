import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import config from '@/config/env';

// Global rate limiter
export const globalRateLimit = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    error: {
      type: 'about:blank',
      title: 'Too Many Requests',
      status: 429,
      detail: 'Too many requests from this IP, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth endpoints rate limiter (stricter)
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: {
    success: false,
    error: {
      type: 'about:blank',
      title: 'Too Many Authentication Attempts',
      status: 429,
      detail: 'Too many authentication attempts, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Create post rate limiter
export const createPostRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 posts per minute
  message: {
    success: false,
    error: {
      type: 'about:blank',
      title: 'Too Many Posts',
      status: 429,
      detail: 'You are posting too frequently. Please wait before posting again.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Follow/unfollow rate limiter
export const followRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 follow/unfollow actions per minute
  message: {
    success: false,
    error: {
      type: 'about:blank',
      title: 'Too Many Follow Actions',
      status: 429,
      detail: 'You are following/unfollowing too frequently. Please wait.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});