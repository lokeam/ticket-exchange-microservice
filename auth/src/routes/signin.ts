import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { PasswordManager } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Please include a password')
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Sorry, credentials invalid');
    }

    const isMatchingPassword = await PasswordManager.compare(existingUser.password, password);

    if (!isMatchingPassword) {
      throw new BadRequestError('Sorry, credentials invalid');
    }

    // send off cookie/jwt here
    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_KEY!);

    // redefine entire object for TS
    request.session = {
      jtw: userJwt
    };

  response.status(200).send(existingUser);
});

export { router as signinRouter };
