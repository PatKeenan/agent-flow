import { eq } from "drizzle-orm";
import { db } from "../db";
import { organizations } from "../db/schema";
import type { NewOrganization } from "../types";

export const organizationsService = {
  async getAll() {
    return db.select().from(organizations);
  },

  async getById(id: string) {
    const results = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id));
    return results[0];
  },

  async create(data: NewOrganization) {
    const result = await db.insert(organizations).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewOrganization>) {
    const result = await db
      .update(organizations)
      .set(data)
      .where(eq(organizations.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(organizations).where(eq(organizations.id, id));
  },
};
