import { Hono } from 'hono';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate';
import { performersService } from '../services/performers';

const router = new Hono();

const PerformerSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  growth: z.string(),
  avatar: z.string().url()
});

router.get('/', async (c) => {
  const performers = await performersService.getAll();
  return c.json(performers);
});

router.post('/', validateRequest(PerformerSchema), async (c) => {
  const data = await c.req.json();
  const performer = await performersService.create(data);
  return c.json(performer, 201);
});

export { router as performersRouter };