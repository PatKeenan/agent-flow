import { eq } from "drizzle-orm";
import { db } from "../db";
import { tasks, taskStatuses } from "../db/schema";
import type { NewTask, NewTaskStatus } from "../types";

export const tasksService = {
  async getAll() {
    //return db.select().from(tasks);
    return [
      {
        title: "Property viewing at 123 Oak Street",
        time: "2:00 PM",
        completed: false,
      },
      {
        title: "Client meeting with John Smith",
        time: "3:30 PM",
        completed: false,
      },
      {
        title: "Update listing photos for 456 Pine Ave",
        time: "4:00 PM",
        completed: true,
      },
      {
        title: "Follow up with potential buyers",
        time: "5:00 PM",
        completed: false,
      },
    ];
  },

  async getById(id: string) {
    const results = await db.select().from(tasks).where(eq(tasks.id, id));
    return results[0];
  },

  async create(data: NewTask) {
    const result = await db.insert(tasks).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewTask>) {
    const result = await db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string) {
    return db.delete(tasks).where(eq(tasks.id, id));
  },
};

export const taskStatusesService = {
  async getAll() {
    return db.select().from(taskStatuses);
  },

  async create(data: NewTaskStatus) {
    const result = await db.insert(taskStatuses).values(data).returning();
    return result[0];
  },
};
