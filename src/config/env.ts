import 'dotenv/config';

export const env = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  PRODUCT_URL: process.env.PRODUCT_URL ?? '',
};

if (!env.DATABASE_URL || !env.JWT_SECRET || !env.PRODUCT_URL) {
  throw new Error('Missing environment variables');
}
