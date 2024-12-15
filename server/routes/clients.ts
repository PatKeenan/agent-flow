import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { clientsService } from "../services/clients";

const ClientSchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().url().optional(),
  notes: z.string().optional(),
});

const router = new Hono()
  .get("/", async (c) => {
    const clients = await clientsService.getAll();
    return c.json(clients);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const client = await clientsService.getById(id);
    if (!client) return c.json({ error: "Client not found" }, 404);
    return c.json(client);
  })
  .post("/", validateRequest(ClientSchema), async (c) => {
    const data = await c.req.json();
    const client = await clientsService.create(data);
    return c.json(client, 201);
  })
  .patch("/:id", validateRequest(ClientSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const client = await clientsService.update(id, data);
    if (!client) return c.json({ error: "Client not found" }, 404);
    return c.json(client);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await clientsService.delete(id);
    return c.json({ success: true });
  });

export { router as clientsRouter };
