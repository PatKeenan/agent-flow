import { Hono } from 'hono';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate';
import { activitiesService } from '../services/activities';

const router = new Hono();

const ActivitySchema = z.object({
  name: z.string().min(1),
  status: z.string(),
  avatar: z.string().url()
});

router.get('/', async (c) => {
  const activities = await activitiesService.getAll();
  return c.json(activities);
});

router.post('/', validateRequest(ActivitySchema), async (c) => {
  const data = await c.req.json();
  const activity = await activitiesService.create(data);
  return c.json(activity, 201);
});

export { router as activitiesRouter };