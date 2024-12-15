import {
  users,
  organizations,
  teamMembers,
  clients,
  projects,
  tasks,
  taskStatuses,
  calendarEvents,
  calendarEventAttendees,
} from "../db/schema";
import type { InferInsertModel } from "drizzle-orm";

// Users
export type NewUser = InferInsertModel<typeof users>;
export type User = InferInsertModel<typeof users> & { id: string };

// Organizations
export type NewOrganization = InferInsertModel<typeof organizations>;
export type Organization = InferInsertModel<typeof organizations> & {
  id: string;
};

// Team Members
export type NewTeamMember = InferInsertModel<typeof teamMembers>;
export type TeamMember = InferInsertModel<typeof teamMembers> & { id: string };

// Clients
export type NewClient = InferInsertModel<typeof clients>;
export type Client = InferInsertModel<typeof clients> & { id: string };

// Projects
export type NewProject = InferInsertModel<typeof projects>;
export type Project = InferInsertModel<typeof projects> & { id: string };

// Tasks
export type NewTask = InferInsertModel<typeof tasks>;
export type Task = InferInsertModel<typeof tasks> & { id: string };

export type NewTaskStatus = InferInsertModel<typeof taskStatuses>;
export type TaskStatus = InferInsertModel<typeof taskStatuses> & { id: string };

// Calendar Events
export type NewCalendarEvent = InferInsertModel<typeof calendarEvents>;
export type CalendarEvent = InferInsertModel<typeof calendarEvents> & {
  id: string;
};

export type NewCalendarEventAttendee = InferInsertModel<
  typeof calendarEventAttendees
>;
export type CalendarEventAttendee = InferInsertModel<
  typeof calendarEventAttendees
> & { id: string };
