import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { teamMembers } from "./team-members";

export const taskStatuses = pgTable("task_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  statusId: uuid("status_id")
    .references(() => taskStatuses.id)
    .notNull(),
  projectId: uuid("project_id").references(() => projects.id),
  assigneeId: uuid("assignee_id").references(() => teamMembers.id),
  dueDate: timestamp("due_date"),
  priority: text("priority").notNull().default("medium"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskStatusesRelations = relations(taskStatuses, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  status: one(taskStatuses, {
    fields: [tasks.statusId],
    references: [taskStatuses.id],
  }),
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignee: one(teamMembers, {
    fields: [tasks.assigneeId],
    references: [teamMembers.id],
  }),
}));
