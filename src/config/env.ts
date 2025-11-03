import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const PORT: string = process.env.PORT || '3000';
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const DB_URI: string = getEnvVar('DB_URI');
export const JWT_SECRET: string = getEnvVar('JWT_SECRET');
export const JWT_EXPIRES_IN: string = getEnvVar('JWT_EXPIRES_IN');
