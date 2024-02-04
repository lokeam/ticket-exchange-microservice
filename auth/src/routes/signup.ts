import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup',
[
  body('email').isEmail().withMessage('You must enter a valid Email'),
  body('password')
    .trim()
    .isLength({ min: 10, max: 30 })
    .withMessage('Your Password must be between 10 and 30 chars')
],
async (request: Request, response: Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = request.body;
  const existingUser = await User.findOne({ email });

  // check if user exists in db
  if (existingUser) {
    throw new BadRequestError('Sorry, that email address is already in use');
  }

  const user = User.build({ email, password });
  await user.save();

  // send off cookie/jwt here
  const userJwt = Jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!);

  // redefine entire object for TS
  request.session = {
    jtw: userJwt
  };

  response.status(201).send(user);

});

export { router as signupRouter };
