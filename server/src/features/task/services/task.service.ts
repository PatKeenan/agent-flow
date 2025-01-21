import { UtaskRepository } from '../repositories/task.repository';
import { CreateUtaskDto } from '../types/task.types';

export class UtaskService {
    constructor(private taskRepository: UtaskRepository) {}

    async create(data: CreateUtaskDto) {
        // Add validation and business logic here
        return this.taskRepository.create(data);
    }

    async findById(id: string) {
        return this.taskRepository.findById(id);
    }
}
