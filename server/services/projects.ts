import { eq } from "drizzle-orm";
import { db } from "../db";
import { projects } from "../db/schema";
import type { NewProject } from "../types";

export const projectsService = {
  async getAll() {
    return db.select().from(projects);
  },

  async getById(id: string) {
    const results = await db.select().from(projects).where(eq(projects.id, id));
    return results[0];
  },

  async create(data: NewProject) {
    const result = await db.insert(projects).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewProject>) {
    const result = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(projects).where(eq(projects.id, id));
  },
};
