import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "./organizations";
import { users } from "./users";
import { tasks } from "./tasks";
import { calendarEventAttendees } from "./calendar-events";

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),
  role: text("role").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembersRelations = relations(teamMembers, ({ one, many }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [teamMembers.organizationId],
    references: [organizations.id],
  }),
  assignedTasks: many(tasks, { relationName: "assignedTasks" }),
  eventAttendees: many(calendarEventAttendees),
}));
