import { eq } from "drizzle-orm";
import { db } from "../db";
import { clients } from "../db/schema";
import type { NewClient } from "../types";

export const clientsService = {
  async getAll() {
    return db.select().from(clients);
  },

  async getById(id: string) {
    const results = await db.select().from(clients).where(eq(clients.id, id));
    return results[0];
  },

  async create(data: NewClient) {
    const result = await db.insert(clients).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewClient>) {
    const result = await db
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(clients).where(eq(clients.id, id));
  },
};
