import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { tasksService, taskStatusesService } from "../services/tasks";

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  statusId: z.string().uuid(),
  projectId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  order: z.number().int(),
});
const TaskStatusSchema = z.object({
  name: z.string().min(1),
  order: z.number().int(),
});

const router = new Hono()
  .get("/", async (c) => {
    const tasks = await tasksService.getAll();
    return c.json(tasks);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const task = await tasksService.getById(id);
    if (!task) return c.json({ error: "Task not found" }, 404);
    return c.json(task);
  })
  .post("/", validateRequest(TaskSchema), async (c) => {
    const data = await c.req.json();
    const task = await tasksService.create(data);
    return c.json(task, 201);
  })
  .patch("/:id", validateRequest(TaskSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const task = await tasksService.update(id, data);
    if (!task) return c.json({ error: "Task not found" }, 404);
    return c.json(task);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await tasksService.delete(id);
    return c.json({ success: true });
  })
  .get("/statuses", async (c) => {
    const statuses = await taskStatusesService.getAll();
    return c.json(statuses);
  })
  .post("/statuses", validateRequest(TaskStatusSchema), async (c) => {
    const data = await c.req.json();
    const status = await taskStatusesService.create(data);
    return c.json(status, 201);
  });

export { router as tasksRouter };
