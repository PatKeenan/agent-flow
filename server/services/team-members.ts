import { eq } from "drizzle-orm";
import { db } from "../db";
import { teamMembers } from "../db/schema";
import type { NewTeamMember } from "../types";

export const teamMembersService = {
  async getAll() {
    return db.select().from(teamMembers);
  },

  async getById(id: string) {
    const results = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, id));
    return results[0];
  },

  async create(data: NewTeamMember) {
    const result = await db.insert(teamMembers).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewTeamMember>) {
    const result = await db
      .update(teamMembers)
      .set(data)
      .where(eq(teamMembers.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(teamMembers).where(eq(teamMembers.id, id));
  },
};
