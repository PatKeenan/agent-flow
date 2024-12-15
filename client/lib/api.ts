import { hc } from "hono/client";
import type { AppType } from "../../server/routes";

// Create the client with the base URL
const api = hc<AppType>("http://localhost:3000/api");

// Export typed API client
export const apiClient = {
  users: {
    getAll: () => api.users.$get(),
    getById: (id: string) => api.users[":id"].$get({ param: { id } }),
    create: (data: any) => api.users.$post({ json: data }),
    update: (id: string, data: any) =>
      api.users[":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) => api.users[":id"].$delete({ param: { id } }),
  },
  organizations: {
    getAll: () => api.organizations.$get(),
    getById: (id: string) => api.organizations[":id"].$get({ param: { id } }),
    create: (data: any) => api.organizations.$post({ json: data }),
    update: (id: string, data: any) =>
      api.organizations[":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) => api.organizations[":id"].$delete({ param: { id } }),
  },
  clients: {
    getAll: () => api.clients.$get(),
    getById: (id: string) => api.clients[":id"].$get({ param: { id } }),
    create: (data: any) => api.clients.$post({ json: data }),
    update: (id: string, data: any) =>
      api.clients[":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) => api.clients[":id"].$delete({ param: { id } }),
  },
  projects: {
    getAll: () => api.projects.$get(),
    getById: (id: string) => api.projects[":id"].$get({ param: { id } }),
    create: (data: any) => api.projects.$post({ json: data }),
    update: (id: string, data: any) =>
      api.projects[":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) => api.projects[":id"].$delete({ param: { id } }),
  },
  tasks: {
    getAll: () => api.tasks.$get(),
    getById: (id: string) => api.tasks[":id"].$get({ param: { id } }),
    create: (data: any) => api.tasks.$post({ json: data }),
    update: (id: string, data: any) =>
      api.tasks[":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) => api.tasks[":id"].$delete({ param: { id } }),
    statuses: {
      getAll: () => api.tasks.statuses.$get(),
      create: (data: any) => api.tasks.statuses.$post({ json: data }),
    },
  },
  calendarEvents: {
    getAll: () => api["calendar-events"].$get(),
    getById: (id: string) =>
      api["calendar-events"][":id"].$get({ param: { id } }),
    create: (data: any) => api["calendar-events"].$post({ json: data }),
    update: (id: string, data: any) =>
      api["calendar-events"][":id"].$patch({ param: { id }, json: data }),
    delete: (id: string) =>
      api["calendar-events"][":id"].$delete({ param: { id } }),
    attendees: {
      add: (eventId: string, data: any) =>
        api["calendar-events"][":id"].attendees.$post({
          param: { id: eventId },
          json: data,
        }),
      remove: (eventId: string, teamMemberId: string) =>
        api["calendar-events"][":eventId"].attendees[":teamMemberId"].$delete({
          param: { eventId, teamMemberId },
        }),
    },
  },
};

export type ApiClient = typeof apiClient;
