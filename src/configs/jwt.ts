import dotenv from 'dotenv';

dotenv.config();

const jwtRefreshExpiry = process.env.JWT_REFRESH_EXPIRTY ?? '1d';
const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY ?? '6h';

const jwtKey =
  process.env.JWT_KEY ??
  (() => {
    throw new Error('JWT Key not defined');
  })();

const JWTConfig = {
  expiry: {
    access: accessTokenExpiry,
    refresh: jwtRefreshExpiry,
  },
  key: jwtKey,
};

export default JWTConfig;
