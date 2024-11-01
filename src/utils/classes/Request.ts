import { Request } from 'express';
import { ObjectId } from 'mongoose';

// Extend the Base `Request` Class
// I want to pass the userId and token (or any claims necessary) after passing the Authmiddleware to not to re-verify the token
export interface AuthenticatedRequest extends Request {
  userId?: string | ObjectId;
  token?: string;
};

