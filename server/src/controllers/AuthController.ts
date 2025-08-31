import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '@/services/UserService';
import { AppError } from '@/middleware/errorHandler';
import { ApiResponse } from '@/types/api';

const registerSchema = z.object({
  handle: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Handle can only contain letters, numbers, and underscores'),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  bio: z.string().max(500).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      const result = await this.userService.register(validatedData);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: ApiResponse = {
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.context.requestId,
        },
      };

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(AppError.badRequest('Validation failed', error.errors));
      } else {
        next(error);
      }
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const result = await this.userService.login(validatedData);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: ApiResponse = {
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.context.requestId,
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(AppError.badRequest('Validation failed', error.errors));
      } else {
        next(error);
      }
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get refresh token from cookie or body
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      
      if (!refreshToken) {
        throw AppError.unauthorized('Refresh token required');
      }

      const result = await this.userService.refreshToken(refreshToken);

      const response: ApiResponse = {
        success: true,
        data: {
          accessToken: result.accessToken,
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.context.requestId,
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      const response: ApiResponse = {
        success: true,
        data: { message: 'Logged out successfully' },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.context.requestId,
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.context.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const user = await this.userService.getProfile(req.context.user.id);

      const response: ApiResponse = {
        success: true,
        data: { user },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.context.requestId,
        },
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}