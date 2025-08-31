import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '@/services/UserService';
import { AppError } from '@/middleware/errorHandler';
import { ApiResponse } from '@/types/api';

const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

const searchUsersSchema = z.object({
  q: z.string().min(1),
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;

      const user = await this.userService.getProfile(id, currentUserId);

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

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;

      if (!currentUserId) {
        throw AppError.unauthorized('Authentication required');
      }

      if (id !== currentUserId) {
        throw AppError.forbidden('Cannot update another user\'s profile');
      }

      const validatedData = updateUserSchema.parse(req.body);
      
      const user = await this.userService.updateProfile(id, validatedData);

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
      if (error instanceof z.ZodError) {
        next(AppError.badRequest('Validation failed', error.errors));
      } else {
        next(error);
      }
    }
  };

  searchUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedQuery = searchUsersSchema.parse(req.query);
      
      const users = await this.userService.searchUsers(
        validatedQuery.q,
        validatedQuery.limit || 20,
        validatedQuery.offset || 0
      );

      const response: ApiResponse = {
        success: true,
        data: { users },
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
}