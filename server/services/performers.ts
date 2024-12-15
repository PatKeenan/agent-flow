import { eq } from 'drizzle-orm';
import { db } from '../db';
import { performers } from '../db/schema';
import type { NewPerformer } from '../types';

export const performersService = {
  async getAll() {
    return db.select().from(performers);
  },

  async getById(id: string) {
    const results = await db
      .select()
      .from(performers)
      .where(eq(performers.id, id));
    return results[0];
  },

  async create(data: NewPerformer) {
    const result = await db.insert(performers).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewPerformer>) {
    const result = await db
      .update(performers)
      .set(data)
      .where(eq(performers.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(performers).where(eq(performers.id, id));
  },
};