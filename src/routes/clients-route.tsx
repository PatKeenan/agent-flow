import { createRoute } from "@tanstack/react-router";

import { apiClient } from "@/lib/api";
import { rootRoute } from "./_root-route";
import { Clients } from "@/components/Clients";

export const clientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clients",
  loader: async () => {
    const clients = await apiClient.clients.$get();
    return { clients };
  },
  component: Clients,
});
