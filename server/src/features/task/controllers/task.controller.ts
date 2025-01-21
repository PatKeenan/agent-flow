import { Request, Response } from 'express';
import { UtaskService } from '../services/task.service';

export class UtaskController {
    constructor(private taskService: UtaskService) {}

    async create(req: Request, res: Response) {
        try {
            const result = await this.taskService.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const result = await this.taskService.findById(req.params.id);
            if (!result) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
