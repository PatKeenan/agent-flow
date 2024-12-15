import { relations } from "drizzle-orm/relations";
import { users, teamMembers, organizations, clients, calendarEvents, projects, calendarEventAttendees, taskStatuses, tasks } from "./schema";

export const teamMembersRelations = relations(teamMembers, ({one, many}) => ({
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id]
	}),
	organization: one(organizations, {
		fields: [teamMembers.organizationId],
		references: [organizations.id]
	}),
	calendarEvents: many(calendarEvents),
	calendarEventAttendees: many(calendarEventAttendees),
	tasks: many(tasks),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	teamMembers: many(teamMembers),
	organization: one(organizations, {
		fields: [users.organizationId],
		references: [organizations.id]
	}),
}));

export const organizationsRelations = relations(organizations, ({many}) => ({
	teamMembers: many(teamMembers),
	clients: many(clients),
	users: many(users),
	projects: many(projects),
}));

export const clientsRelations = relations(clients, ({one, many}) => ({
	organization: one(organizations, {
		fields: [clients.organizationId],
		references: [organizations.id]
	}),
	calendarEvents: many(calendarEvents),
	projects: many(projects),
}));

export const calendarEventsRelations = relations(calendarEvents, ({one, many}) => ({
	client: one(clients, {
		fields: [calendarEvents.clientId],
		references: [clients.id]
	}),
	project: one(projects, {
		fields: [calendarEvents.projectId],
		references: [projects.id]
	}),
	teamMember: one(teamMembers, {
		fields: [calendarEvents.createdById],
		references: [teamMembers.id]
	}),
	calendarEventAttendees: many(calendarEventAttendees),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	calendarEvents: many(calendarEvents),
	organization: one(organizations, {
		fields: [projects.organizationId],
		references: [organizations.id]
	}),
	client: one(clients, {
		fields: [projects.clientId],
		references: [clients.id]
	}),
	tasks: many(tasks),
}));

export const calendarEventAttendeesRelations = relations(calendarEventAttendees, ({one}) => ({
	calendarEvent: one(calendarEvents, {
		fields: [calendarEventAttendees.eventId],
		references: [calendarEvents.id]
	}),
	teamMember: one(teamMembers, {
		fields: [calendarEventAttendees.teamMemberId],
		references: [teamMembers.id]
	}),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
	taskStatus: one(taskStatuses, {
		fields: [tasks.statusId],
		references: [taskStatuses.id]
	}),
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	teamMember: one(teamMembers, {
		fields: [tasks.assigneeId],
		references: [teamMembers.id]
	}),
}));

export const taskStatusesRelations = relations(taskStatuses, ({many}) => ({
	tasks: many(tasks),
}));