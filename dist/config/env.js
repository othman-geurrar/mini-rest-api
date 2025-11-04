import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
const getEnvVar = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};
export const PORT = process.env.PORT || '3000';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URI = getEnvVar('DB_URI');
export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const JWT_EXPIRES_IN = getEnvVar('JWT_EXPIRES_IN');
//# sourceMappingURL=env.js.map