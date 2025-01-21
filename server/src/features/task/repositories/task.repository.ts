import { PrismaClient } from '@prisma/client';
import { CreateUtaskDto } from '../types/task.types';

export class UtaskRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: CreateUtaskDto) {
        return this.prisma.task.create({
            data
        });
    }

    async findById(id: string) {
        return this.prisma.task.findUnique({
            where: { id }
        });
    }
}
