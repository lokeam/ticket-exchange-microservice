import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof RequestValidationError) {
    const formattedErrors = error.errors.map(err => {
      return {
        message: err.msg,
        field: err.type === 'field' ? err.path: '',
      };
    });

    return response.status(400).send({ errors: formattedErrors });
  }

  if (error instanceof DatabaseConnectionError) {
    return response.status(500).send({ errors: [
      { message: error.reason }
    ]});
  }

  response.status(400).send({
    errors: [{ message: 'Oops! Something went wrong' }]
  });
};
