import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import TaskBoard from "./components/tasks/TaskBoard";
import { apiClient } from "./lib/api";

// Root route
const rootRoute = createRootRoute({
  component: App,
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: Calendar,
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tasks",
  component: TaskBoard,
  loader: async () => {
    // Example of data loading
    // const tasks = await apiClient.tasks.getAll();
    return { tasks: [] };
  },
});

const clientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clients",
  loader: async () => {
    const clients = await apiClient.clients.$get();
    return { clients };
  },
});

// Create and export the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  calendarRoute,
  tasksRoute,
  clientsRoute,
]);

export const router = createRouter({ routeTree });

// Register router types
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
