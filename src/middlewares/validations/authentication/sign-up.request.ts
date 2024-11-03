import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { SignInDTO } from '../dtos/SignIn.dto';
import { UserModel } from '../../../models/User';

const validateSignIn = [
  // Username
  body('username').isString(),
  // Email
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .custom(async (email: string) => {
      const exists = await UserModel.exists({ email: email });

      if (exists) {
        throw new Error('User already exists');
      }

      return true;
    }),
  // Password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  async (
    req: Request<{}, any, SignInDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateSignIn;
