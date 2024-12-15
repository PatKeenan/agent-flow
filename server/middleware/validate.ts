import { Context, Next } from 'hono';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodType) => {
  return async (c: Context, next: Next) => {
    try {
      const data = await c.req.json();
      schema.parse(data);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: error.errors }, 400);
      }
      throw error;
    }
  };
};