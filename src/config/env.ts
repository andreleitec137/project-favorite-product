import 'dotenv/config';

export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
};

if (!env.DATABASE_URL || !env.JWT_SECRET) {
  throw new Error('Missing environment variables');
}
