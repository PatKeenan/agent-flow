import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import type { NewUser } from "../types";

export const usersService = {
  async getAll() {
    return db.select().from(users);
  },

  async getById(id: string) {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  },

  async create(data: NewUser) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewUser>) {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(users).where(eq(users.id, id));
  },
};
