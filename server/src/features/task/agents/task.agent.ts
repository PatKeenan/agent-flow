import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { UtaskService } from '../services/task.service';
import { UtaskSchema } from '../types/task.types';

export class UtaskAgent {
    private model: ChatOpenAI;
    
    constructor(private taskService: UtaskService) {
        this.model = new ChatOpenAI({
            modelName: 'gpt-4-turbo-preview',
            temperature: 0
        });
    }

    async handleCommand(agentId: string, command: string) {
        try {
            const extractedData = await this.model
                .withStructuredOutput(UtaskSchema)
                .invoke(command);

            return await this.taskService.create({
                ...extractedData,
                agentId
            });
        } catch (error) {
            console.error('Error in task agent:', error);
            throw error;
        }
    }
}
