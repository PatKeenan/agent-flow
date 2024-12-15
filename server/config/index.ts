import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

// Load environment variables
loadEnv();

// Schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
});

// Validate environment variables
const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
});

export const config = {
  env: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  database: {
    url: env.DATABASE_URL,
  },
} as const;