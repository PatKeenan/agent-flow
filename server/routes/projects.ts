import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { projectsService } from "../services/projects";

const ProjectSchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  clientId: z.string().uuid().optional(),
});

const router = new Hono()
  .get("/", async (c) => {
    const projects = await projectsService.getAll();
    return c.json(projects);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const project = await projectsService.getById(id);
    if (!project) return c.json({ error: "Project not found" }, 404);
    return c.json(project);
  })
  .post("/", validateRequest(ProjectSchema), async (c) => {
    const data = await c.req.json();
    const project = await projectsService.create(data);
    return c.json(project, 201);
  })
  .patch("/:id", validateRequest(ProjectSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const project = await projectsService.update(id, data);
    if (!project) return c.json({ error: "Project not found" }, 404);
    return c.json(project);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await projectsService.delete(id);
    return c.json({ success: true });
  });

export { router as projectsRouter };
