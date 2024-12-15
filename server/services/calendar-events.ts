import { eq } from "drizzle-orm";
import { db } from "../db";
import { calendarEvents, calendarEventAttendees } from "../db/schema";
import type { NewCalendarEvent, NewCalendarEventAttendee } from "../types";

export const calendarEventsService = {
  async getAll() {
    return db.select().from(calendarEvents);
  },

  async getById(id: string) {
    const results = await db
      .select()
      .from(calendarEvents)
      .where(eq(calendarEvents.id, id));
    return results[0];
  },

  async create(data: NewCalendarEvent) {
    const result = await db.insert(calendarEvents).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewCalendarEvent>) {
    const result = await db
      .update(calendarEvents)
      .set(data)
      .where(eq(calendarEvents.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(calendarEvents).where(eq(calendarEvents.id, id));
  },

  async addAttendee(data: NewCalendarEventAttendee) {
    const result = await db
      .insert(calendarEventAttendees)
      .values(data)
      .returning();
    return result[0];
  },

  async removeAttendee(eventId: string, teamMemberId: string) {
    return db
      .delete(calendarEventAttendees)
      .where(
        eq(calendarEventAttendees.eventId, eventId) &&
          eq(calendarEventAttendees.teamMemberId, teamMemberId)
      );
  },
};
