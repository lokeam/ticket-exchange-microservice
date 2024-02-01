import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup',
[
  body('email')
    .isEmail()
    .withMessage('You must enter a valid Email'),
  body('password')
    .trim()
    .withMessage('Your Password must be between 10 and 30 chars')
],
(request: Request, response: Response) => {
  const { email, password } = request.body;


});

export { router as signupRouter };
