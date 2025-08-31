import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config/env';
import { AppError } from './errorHandler';
import { JwtPayload, AuthUser } from '@/types/api';
import { UserService } from '@/services/UserService';

const userService = new UserService();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw AppError.unauthorized('Access token required');
    }

    const token = authHeader.substring(7);
    
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw AppError.unauthorized('Access token expired');
      }
      throw AppError.unauthorized('Invalid access token');
    }

    if (decoded.type !== 'access') {
      throw AppError.unauthorized('Invalid token type');
    }

    // Get user from database
    const user = await userService.findById(decoded.userId);
    if (!user) {
      throw AppError.unauthorized('User not found');
    }

    // Add user to request context
    req.context.user = {
      id: user.id,
      handle: user.handle,
      name: user.name,
      email: user.email,
      bio: user.bio || undefined,
      avatarUrl: user.avatarUrl || undefined,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
      
      if (decoded.type === 'access') {
        const user = await userService.findById(decoded.userId);
        if (user) {
          req.context.user = {
            id: user.id,
            handle: user.handle,
            name: user.name,
            email: user.email,
            bio: user.bio || undefined,
            avatarUrl: user.avatarUrl || undefined,
          };
        }
      }
    } catch (error) {
      // Ignore token errors for optional authentication
    }

    next();
  } catch (error) {
    next(error);
  }
};