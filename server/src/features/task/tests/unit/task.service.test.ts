import { UtaskService } from '../../services/task.service';
import { UtaskRepository } from '../../repositories/task.repository';

describe('UtaskService', () => {
    let service: UtaskService;
    let repository: jest.Mocked<UtaskRepository>;

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findById: jest.fn()
        } as any;
        service = new UtaskService(repository);
    });

    describe('create', () => {
        it('should create a new task', async () => {
            // Add your test here
        });
    });
});
