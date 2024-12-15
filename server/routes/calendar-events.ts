import { Hono } from "hono";
import { z } from "zod";
import { validateRequest } from "../middleware/validate";
import { calendarEventsService } from "../services/calendar-events";

const router = new Hono();

const CalendarEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  location: z.string().optional(),
  isAllDay: z.boolean().default(false),
  clientId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  createdById: z.string().uuid(),
});

const EventAttendeeSchema = z.object({
  eventId: z.string().uuid(),
  teamMemberId: z.string().uuid(),
  status: z.enum(["pending", "accepted", "declined"]).default("pending"),
});

router
  .get("/", async (c) => {
    const events = await calendarEventsService.getAll();
    return c.json(events);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const event = await calendarEventsService.getById(id);
    if (!event) return c.json({ error: "Event not found" }, 404);
    return c.json(event);
  })
  .post("/", validateRequest(CalendarEventSchema), async (c) => {
    const data = await c.req.json();
    const event = await calendarEventsService.create(data);
    return c.json(event, 201);
  })
  .patch("/:id", validateRequest(CalendarEventSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const event = await calendarEventsService.update(id, data);
    if (!event) return c.json({ error: "Event not found" }, 404);
    return c.json(event);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await calendarEventsService.delete(id);
    return c.json({ success: true });
  })
  .post("/:id/attendees", validateRequest(EventAttendeeSchema), async (c) => {
    const data = await c.req.json();
    const attendee = await calendarEventsService.addAttendee(data);
    return c.json(attendee, 201);
  })
  .delete("/:eventId/attendees/:teamMemberId", async (c) => {
    const { eventId, teamMemberId } = c.req.param();
    await calendarEventsService.removeAttendee(eventId, teamMemberId);
    return c.json({ success: true });
  });

export { router as calendarEventsRouter };
