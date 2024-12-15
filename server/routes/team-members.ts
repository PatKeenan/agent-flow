import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { teamMembersService } from "../services/team-members";

const TeamMemberSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: z.string().min(1),
  avatar: z.string().url().optional(),
});

const router = new Hono()
  .get("/", async (c) => {
    const teamMembers = await teamMembersService.getAll();
    return c.json(teamMembers);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const teamMember = await teamMembersService.getById(id);
    if (!teamMember) return c.json({ error: "Team member not found" }, 404);
    return c.json(teamMember);
  })
  .post("/", validateRequest(TeamMemberSchema), async (c) => {
    const data = await c.req.json();
    const teamMember = await teamMembersService.create(data);
    return c.json(teamMember, 201);
  })
  .patch("/:id", validateRequest(TeamMemberSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const teamMember = await teamMembersService.update(id, data);
    if (!teamMember) return c.json({ error: "Team member not found" }, 404);
    return c.json(teamMember);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await teamMembersService.delete(id);
    return c.json({ success: true });
  });

export { router as teamMembersRouter };
