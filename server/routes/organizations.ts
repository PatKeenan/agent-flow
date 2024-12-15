import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { organizationsService } from "../services/organizations";

const OrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().url().optional(),
  plan: z.string().default("free"),
});

const router = new Hono()
  .get("/", async (c) => {
    const organizations = await organizationsService.getAll();
    return c.json(organizations);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const organization = await organizationsService.getById(id);
    if (!organization) return c.json({ error: "Organization not found" }, 404);
    return c.json(organization);
  })
  .post("/", validateRequest(OrganizationSchema), async (c) => {
    const data = await c.req.json();
    const organization = await organizationsService.create(data);
    return c.json(organization, 201);
  })
  .patch("/:id", validateRequest(OrganizationSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const organization = await organizationsService.update(id, data);
    if (!organization) return c.json({ error: "Organization not found" }, 404);
    return c.json(organization);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await organizationsService.delete(id);
    return c.json({ success: true });
  });

export { router as organizationsRouter };
