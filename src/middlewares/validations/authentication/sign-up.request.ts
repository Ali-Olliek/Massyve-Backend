import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { SignInDTO } from '../dtos/SignIn.dto';

const validateSignIn = [
  body('name').isString(),
  body('email').isEmail().withMessage('Please enter a valid email address'),
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
