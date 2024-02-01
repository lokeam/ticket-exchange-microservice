import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',
[
  body('email').isEmail().withMessage('You must enter a valid Email'),
  body('password')
    .trim()
    .isLength({ min: 10, max: 30 })
    .withMessage('Your Password must be between 10 and 30 chars')
],
(request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new Error('Invalid email or password');
  }

  console.log('Creating a user...');
  throw new Error('Error connecting to database');

  response.send({});
});

export { router as signupRouter };
