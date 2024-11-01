import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import JWTConfig from '../configs/jwt';

interface IPayload extends JwtPayload {}

export interface IPayloadRes extends IPayload {
  userId: string;
}

export interface IPayloadReq extends IPayload {
  userId: string;
  token: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const login = async (email: string, password: string): Promise<TokenResponse> => {
  // Find User
  const user = await User.findOne({ email: email });

  if (!user) throw new Error("User doesn't exist");

  // Verify Passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new Error('Incorrect Password');

  // Create JWT Tokens
  const accessToken = await _createToken(
    { userId: user._id.toString() },
    JWTConfig.expiry.access
  );
  const refreshToken = await _createToken(
    { userId: user._id.toString() },
    JWTConfig.expiry.refresh
  );

  user.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
};

const signup = async (email: string, password: string, username: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  await user.save();
};

const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWTConfig.key);

    if (typeof decoded !== 'object' || !('userId' in decoded)) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = await _createToken(
      { userId: user._id.toString() },
      JWTConfig.expiry.access
    );

    return { accessToken: newAccessToken };
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
