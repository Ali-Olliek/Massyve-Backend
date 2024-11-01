import { Request, Response } from 'express';
import {
  failed as FailedResponse,
  success as SuccessResponse,
} from '../../utils/responses';
import authService from '../../services/authentication.service';
import { AuthenticatedRequest } from '../../utils/classes/Request';

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    return SuccessResponse({
      res: res,
      data: { accessToken: accessToken, refreshToken: refreshToken },
      code: 201,
    });
  } catch (error) {
    return FailedResponse({
      res: res,
      code: 401,
      exception: error,
      message: 'Failed to sign in',
    });
  }
};

const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, username } = req.body;

    const newUser = await authService.signup(email, password, username);

    return SuccessResponse({ res: res, data: { user: newUser }, code: 201 });
  } catch (error) {
    return FailedResponse({
      res: res,
      code: 401,
      exception: error,
      message: 'Failed to register',
    });
  }
};

const refreshToken = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { token } = req;

    // By here the token should be provided
    if (!token) throw new Error('Access Denied');

    const refreshedToken = authService.refreshToken(token);

    return SuccessResponse({ res: res, data: { accessToken: refreshedToken } });
  } catch (error) {
    return FailedResponse({
      res: res,
      code: 401,
      exception: error,
      message: 'Failed to refresh token',
    });
  }
};

export { login, signup, refreshToken };
