import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { PostService } from '@/services/PostService';
import { AppError } from '@/middleware/errorHandler';
import { ApiResponse } from '@/types/api';

const createPostSchema = z.object({
  body: z.string().min(1).max(2000),
  mediaUrls: z.array(z.string().url()).optional(),
  visibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
});

const updatePostSchema = z.object({
  body: z.string().min(1).max(2000).optional(),
  visibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
});

const paginationSchema = z.object({
  limit: z.string().transform(Number).optional(),
  offset: z.string().transform(Number).optional(),
});

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currentUserId = req.context.user?.id;
      if (!currentUserId) {
        throw AppError.unauthorized('Authentication required');
      }

      const validatedData = createPostSchema.parse(req.body);
      
      const post = await this.postService.createPost(currentUserId, validatedData);

      const response: ApiResponse = {
        success: true,
        data: { post },
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

  getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;

      const post = await this.postService.getPost(id, currentUserId);

      const response: ApiResponse = {
        success: true,
        data: { post },
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

  updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;

      if (!currentUserId) {
        throw AppError.unauthorized('Authentication required');
      }

      const validatedData = updatePostSchema.parse(req.body);
      
      const post = await this.postService.updatePost(id, currentUserId, validatedData);

      const response: ApiResponse = {
        success: true,
        data: { post },
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

  deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;

      if (!currentUserId) {
        throw AppError.unauthorized('Authentication required');
      }

      await this.postService.deletePost(id, currentUserId);

      const response: ApiResponse = {
        success: true,
        data: { message: 'Post deleted successfully' },
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

  getUserPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = req.context.user?.id;
      const validatedQuery = paginationSchema.parse(req.query);

      const posts = await this.postService.getUserPosts(
        id,
        validatedQuery.limit || 20,
        validatedQuery.offset || 0,
        currentUserId
      );

      const response: ApiResponse = {
        success: true,
        data: { posts },
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

  getPublicPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currentUserId = req.context.user?.id;
      const validatedQuery = paginationSchema.parse(req.query);

      const posts = await this.postService.getPublicPosts(
        validatedQuery.limit || 20,
        validatedQuery.offset || 0,
        currentUserId
      );

      const response: ApiResponse = {
        success: true,
        data: { posts },
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