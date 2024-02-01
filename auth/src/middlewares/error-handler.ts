import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('I am error: ', error);

  response.status(400).send({
    message: 'I am error. Something went wrong.'
  });
};
