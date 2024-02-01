import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //console.log('I am error: ', error);
  if (error instanceof RequestValidationError) {
    console.log('error handler middleware: RequestValidationError');
  }

  if (error instanceof DatabaseConnectionError) {
    console.log('error handler middleware: DatabaseConnectionError');
  }

  response.status(400).send({
    message: error.message
  });
};
