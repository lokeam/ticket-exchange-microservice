import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorsized-error';

export const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!request.currentUser) {
    throw new UnauthorizedError();
  }

  next();
};
