import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { usersRouter } from "./routes/users";
import { organizationsRouter } from "./routes/organizations";
import { teamMembersRouter } from "./routes/team-members";
import { clientsRouter } from "./routes/clients";
import { projectsRouter } from "./routes/projects";
import { tasksRouter } from "./routes/tasks";
import { calendarEventsRouter } from "./routes/calendar-events";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors());

// Routes
const api = new Hono()
  .route("/users", usersRouter)
  .route("/organizations", organizationsRouter)
  .route("/team-members", teamMembersRouter)
  .route("/clients", clientsRouter)
  .route("/projects", projectsRouter)
  .route("/tasks", tasksRouter)
  .route("/calendar-events", calendarEventsRouter);

app.route("/api", api);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

export type AppType = typeof api;
export { app };

serve({
  fetch: app.fetch,
  port,
});
