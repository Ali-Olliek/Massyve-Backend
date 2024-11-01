import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, IUser } from '../models/User';
import JWTConfig from '../configs/jwt';
import { AuthenticatedRequest } from '../utils/classes/Request';
import { ObjectId, Document, HydratedDocument } from 'mongoose';

interface IPayload extends JwtPayload {}

export interface IPayloadRes extends IPayload {
  userId: string | ObjectId;
}

export interface IPayloadReq extends IPayload {
  userId: string;
  token: string;
}

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: Partial<IUser>;
}

const login = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  // Find User
  const user = await UserModel.findOne({ email: email });

  if (!user) throw new Error("User doesn't exist");

  // Verify Passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new Error('Incorrect Password');

  // Create JWT Tokens
  const accessToken = await _createToken(
    { userId: user.id },
    JWTConfig.expiry.access
  );
  const refreshToken = await _createToken(
    { userId: user.id },
    JWTConfig.expiry.refresh
  );

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, username: user.username, email: user.email },
  };
};

const signup = async (email: string, password: string, username: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username: username,
    email: email,
    password: hashedPassword,
  });

  await user.save();
};

const refreshToken = async ({ token, userId }: AuthenticatedRequest) => {
  try {
    const actualUserId =
      typeof userId === 'object' && 'userId' in userId ? userId.userId : userId;

    const user = await UserModel.findById(actualUserId);

    if (!user || user.refreshToken !== token) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = await _createToken(
      { userId: user.id },
      JWTConfig.expiry.access
    );

    return newAccessToken;
  } catch (error) {
    console.error(error);
    throw new Error('Could not refresh token');
  }
};

// Add Claims to JWT here
const _createToken = async (
  { userId }: IPayloadRes,
  expiry: string
): Promise<string> => {
  return jwt.sign(
    {
      userId: userId,
    },
    JWTConfig.key,
    { expiresIn: expiry }
  );
};

export default { signup, login, refreshToken };
