import { createRouter } from "@tanstack/react-router";

import { calendarRoute } from "@/routes/caledar-route";
import { indexRoute } from "@/routes/index-route";
import { tasksRoute } from "@/routes/tasks-route";
import { clientsRoute } from "@/routes/clients-route";
import { rootRoute } from "@/routes/_root-route";
import { showingsRoute } from "@/routes/showings-route";
import { salesRoute } from "./routes/sales-route";

// Create and export the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  calendarRoute,
  tasksRoute,
  clientsRoute,
  showingsRoute,
  salesRoute,
]);

export const router = createRouter({ routeTree });

// Register router types
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
