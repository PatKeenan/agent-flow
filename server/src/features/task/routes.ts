import { Router } from 'express';
import { UtaskController } from './controllers/task.controller';
import { UtaskService } from './services/task.service';
import { UtaskRepository } from './repositories/task.repository';
import { UtaskAgent } from './agents/task.agent';
import { prisma } from '../../core/database';

const router = Router();

// Initialize dependencies
const taskRepository = new UtaskRepository(prisma);
const taskService = new UtaskService(taskRepository);
const taskController = new UtaskController(taskService);
const taskAgent = new UtaskAgent(taskService);

// REST endpoints
router.post('/tasks', taskController.create.bind(taskController));
router.get('/tasks', taskController.findById.bind(taskController));

// AI agent endpoint
router.post('/tasks/voice', async (req, res) => {
    try {
        const result = await taskAgent.handleCommand(
            req.user.id,
            req.body.command
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
