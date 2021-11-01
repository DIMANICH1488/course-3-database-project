import { env, } from 'process';

export { env, };
export const mode = env.NODE_ENV ?? 'development';
export const isDevelopment = mode === 'development';
export const isProduction = mode === 'production';