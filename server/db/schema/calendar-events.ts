import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { teamMembers } from "./team-members";
import { projects } from "./projects";

export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  location: text("location"),
  isAllDay: boolean("is_all_day").default(false),
  clientId: uuid("client_id").references(() => clients.id),
  projectId: uuid("project_id").references(() => projects.id),
  createdById: uuid("created_by_id")
    .references(() => teamMembers.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calendarEventAttendees = pgTable("calendar_event_attendees", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .references(() => calendarEvents.id)
    .notNull(),
  teamMemberId: uuid("team_member_id")
    .references(() => teamMembers.id)
    .notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calendarEventsRelations = relations(
  calendarEvents,
  ({ one, many }) => ({
    client: one(clients, {
      fields: [calendarEvents.clientId],
      references: [clients.id],
    }),
    project: one(projects, {
      fields: [calendarEvents.projectId],
      references: [projects.id],
    }),
    createdBy: one(teamMembers, {
      fields: [calendarEvents.createdById],
      references: [teamMembers.id],
    }),
    attendees: many(calendarEventAttendees),
  })
);

export const calendarEventAttendeesRelations = relations(
  calendarEventAttendees,
  ({ one }) => ({
    event: one(calendarEvents, {
      fields: [calendarEventAttendees.eventId],
      references: [calendarEvents.id],
    }),
    teamMember: one(teamMembers, {
      fields: [calendarEventAttendees.teamMemberId],
      references: [teamMembers.id],
    }),
  })
);
