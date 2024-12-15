import { pgTable, foreignKey, uuid, text, timestamp, unique, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const teamMembers = pgTable("team_members", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	role: text().notNull(),
	avatar: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	userId: uuid("user_id").notNull(),
	organizationId: uuid("organization_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "team_members_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "team_members_organization_id_organizations_id_fk"
		}),
]);

export const clients = pgTable("clients", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	organizationId: uuid("organization_id").notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	company: text(),
	avatar: text(),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "clients_organization_id_organizations_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	avatar: text(),
	organizationId: uuid("organization_id"),
	isAdmin: boolean("is_admin").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "users_organization_id_organizations_id_fk"
		}),
	unique("users_email_unique").on(table.email),
]);

export const calendarEvents = pgTable("calendar_events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }).notNull(),
	location: text(),
	isAllDay: boolean("is_all_day").default(false),
	clientId: uuid("client_id"),
	projectId: uuid("project_id"),
	createdById: uuid("created_by_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: "calendar_events_client_id_clients_id_fk"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "calendar_events_project_id_projects_id_fk"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [teamMembers.id],
			name: "calendar_events_created_by_id_team_members_id_fk"
		}),
]);

export const organizations = pgTable("organizations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	slug: text().notNull(),
	logo: text(),
	plan: text().default('free').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("organizations_slug_unique").on(table.slug),
]);

export const calendarEventAttendees = pgTable("calendar_event_attendees", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	eventId: uuid("event_id").notNull(),
	teamMemberId: uuid("team_member_id").notNull(),
	status: text().default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [calendarEvents.id],
			name: "calendar_event_attendees_event_id_calendar_events_id_fk"
		}),
	foreignKey({
			columns: [table.teamMemberId],
			foreignColumns: [teamMembers.id],
			name: "calendar_event_attendees_team_member_id_team_members_id_fk"
		}),
]);

export const projects = pgTable("projects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	organizationId: uuid("organization_id").notNull(),
	name: text().notNull(),
	description: text(),
	clientId: uuid("client_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "projects_organization_id_organizations_id_fk"
		}),
	foreignKey({
			columns: [table.clientId],
			foreignColumns: [clients.id],
			name: "projects_client_id_clients_id_fk"
		}),
]);

export const taskStatuses = pgTable("task_statuses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	order: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	statusId: uuid("status_id").notNull(),
	projectId: uuid("project_id"),
	assigneeId: uuid("assignee_id"),
	dueDate: timestamp("due_date", { mode: 'string' }),
	priority: text().default('medium').notNull(),
	order: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.statusId],
			foreignColumns: [taskStatuses.id],
			name: "tasks_status_id_task_statuses_id_fk"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "tasks_project_id_projects_id_fk"
		}),
	foreignKey({
			columns: [table.assigneeId],
			foreignColumns: [teamMembers.id],
			name: "tasks_assignee_id_team_members_id_fk"
		}),
]);
