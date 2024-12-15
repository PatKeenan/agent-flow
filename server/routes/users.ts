import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { usersService } from "../services/users";

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  avatar: z.string().url().optional(),
  organizationId: z.string().uuid().optional(),
  isAdmin: z.boolean().default(false),
});

const router = new Hono()
  .get("/", async (c) => {
    const users = await usersService.getAll();
    return c.json(users);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const user = await usersService.getById(id);
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  })
  .post("/", validateRequest(UserSchema), async (c) => {
    const data = await c.req.json();
    const user = await usersService.create(data);
    return c.json(user, 201);
  })
  .patch("/:id", validateRequest(UserSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const user = await usersService.update(id, data);
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await usersService.delete(id);
    return c.json({ success: true });
  });

export { router as usersRouter };
