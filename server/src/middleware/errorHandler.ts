import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '@/config/logger';
import { ApiError, ApiResponse } from '@/types/api';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: string;
  public readonly title: string;
  public readonly detail: string;
  public readonly instance?: string;
  public readonly errors?: any[];

  constructor(
    statusCode: number,
    type: string,
    title: string,
    detail: string,
    instance?: string,
    errors?: any[]
  ) {
    super(detail);
    this.statusCode = statusCode;
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(detail: string, errors?: any[]): AppError {
    return new AppError(
      StatusCodes.BAD_REQUEST,
      'about:blank',
      'Bad Request',
      detail,
      undefined,
      errors
    );
  }

  static unauthorized(detail: string = 'Authentication required'): AppError {
    return new AppError(
      StatusCodes.UNAUTHORIZED,
      'about:blank',
      'Unauthorized',
      detail
    );
  }

  static forbidden(detail: string = 'Access denied'): AppError {
    return new AppError(
      StatusCodes.FORBIDDEN,
      'about:blank',
      'Forbidden',
      detail
    );
  }

  static notFound(detail: string = 'Resource not found'): AppError {
    return new AppError(
      StatusCodes.NOT_FOUND,
      'about:blank',
      'Not Found',
      detail
    );
  }

  static conflict(detail: string): AppError {
    return new AppError(
      StatusCodes.CONFLICT,
      'about:blank',
      'Conflict',
      detail
    );
  }

  static unprocessableEntity(detail: string, errors?: any[]): AppError {
    return new AppError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'about:blank',
      'Unprocessable Entity',
      detail,
      undefined,
      errors
    );
  }

  static internalServerError(detail: string = 'Internal server error'): AppError {
    return new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'about:blank',
      'Internal Server Error',
      detail
    );
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { requestId } = req.context;

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let apiError: ApiError;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    apiError = {
      type: error.type,
      title: error.title,
      status: error.statusCode,
      detail: error.detail,
      instance: error.instance,
      errors: error.errors,
    };
  } else {
    // Log unexpected errors
    logger.error({
      requestId,
      error: error.message,
      stack: error.stack,
    }, 'Unexpected error occurred');

    apiError = {
      type: 'about:blank',
      title: 'Internal Server Error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      detail: 'An unexpected error occurred',
    };
  }

  const response: ApiResponse = {
    success: false,
    error: apiError,
    meta: {
      timestamp: new Date().toISOString(),
      requestId,
    },
  };

  res.status(statusCode).json(response);
};