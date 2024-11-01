import { SignUpDTO } from '../dtos/SignUp.dto';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

const validateSignIn: RequestHandler[] = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  async (
    req: Request<{}, any, SignUpDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
        return;
      }

      next();
    } catch (error) {
      next(error)
    }
  },
];

export default validateSignIn;
