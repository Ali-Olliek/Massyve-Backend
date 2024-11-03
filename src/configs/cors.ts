import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Parse origins from environment variables
const allowedOriginsDev = process.env.CORS_DEV?.split(',') || [];
const allowedOriginsProd = process.env.CORS_PROD?.split(',') || [];

if (!allowedOriginsDev.length && !allowedOriginsProd.length) {
  throw new Error('CORS origins not specified in environment variables');
}

const origins =
  process.env.NODE_ENV === 'production'
    ? allowedOriginsProd
    : allowedOriginsDev;

const corsConfig: CorsOptions = {
  origin: origins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
};

export default corsConfig;
