#!/bin/bash

# Check if command and feature name are provided
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <command> <feature-name>"
    echo "Example: $0 create task"
    exit 1
fi

COMMAND=$1
FEATURE_NAME=$2
# Convert to lowercase
FEATURE_NAME_LOWER=$(echo "$FEATURE_NAME" | tr '[:upper:]' '[:lower:]')
# Convert to PascalCase
FEATURE_NAME_PASCAL=$(echo "$FEATURE_NAME" | sed -r 's/(^|-)([a-z])/\U\2/g')

# Base directory for features
BASE_DIR="server/src/features/$FEATURE_NAME_LOWER"

# Function to create directory if it doesn't exist
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "Created directory: $1"
    fi
}

# Function to create file with content if it doesn't exist
create_file() {
    if [ ! -f "$1" ]; then
        touch "$1"
        echo "$2" > "$1"
        echo "Created file: $1"
    fi
}

if [ "$COMMAND" = "create" ]; then
    # Create feature directory structure
    create_dir "$BASE_DIR"
    create_dir "$BASE_DIR/controllers"
    create_dir "$BASE_DIR/services"
    create_dir "$BASE_DIR/repositories"
    create_dir "$BASE_DIR/agents"
    create_dir "$BASE_DIR/types"
    create_dir "$BASE_DIR/tests"
    create_dir "$BASE_DIR/tests/unit"
    create_dir "$BASE_DIR/tests/integration"

    # Create controller file
    CONTROLLER_CONTENT="import { Context } from 'hono';
import { ${FEATURE_NAME_PASCAL}Service } from '../services/${FEATURE_NAME_LOWER}.service';

export class ${FEATURE_NAME_PASCAL}Controller {
    constructor(private ${FEATURE_NAME_LOWER}Service: ${FEATURE_NAME_PASCAL}Service) {}

    async create(c: Context) {
        try {
            const body = await c.req.json();
            const result = await this.${FEATURE_NAME_LOWER}Service.create(body);
            return c.json(result, 201);
        } catch (error) {
            return c.json({ error: error.message }, 400);
        }
    }

    async findById(c: Context) {
        try {
            const id = c.req.param('id');
            const result = await this.${FEATURE_NAME_LOWER}Service.findById(id);
            if (!result) {
                return c.json({ error: 'Not found' }, 404);
            }
            return c.json(result);
        } catch (error) {
            return c.json({ error: error.message }, 400);
        }
    }
}"
    create_file "$BASE_DIR/controllers/${FEATURE_NAME_LOWER}.controller.ts" "$CONTROLLER_CONTENT"

    # Create service file
    SERVICE_CONTENT="import { ${FEATURE_NAME_PASCAL}Repository } from '../repositories/${FEATURE_NAME_LOWER}.repository';
import { Create${FEATURE_NAME_PASCAL}Dto } from '../types/${FEATURE_NAME_LOWER}.types';

export class ${FEATURE_NAME_PASCAL}Service {
    constructor(private ${FEATURE_NAME_LOWER}Repository: ${FEATURE_NAME_PASCAL}Repository) {}

    async create(data: Create${FEATURE_NAME_PASCAL}Dto) {
        // Add validation and business logic here
        return this.${FEATURE_NAME_LOWER}Repository.create(data);
    }

    async findById(id: string) {
        return this.${FEATURE_NAME_LOWER}Repository.findById(id);
    }
}"
    create_file "$BASE_DIR/services/${FEATURE_NAME_LOWER}.service.ts" "$SERVICE_CONTENT"

    # Create repository file
    REPOSITORY_CONTENT="import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { ${FEATURE_NAME_LOWER}s } from '../../../db/schema/${FEATURE_NAME_LOWER}';
import { Create${FEATURE_NAME_PASCAL}Dto } from '../types/${FEATURE_NAME_LOWER}.types';

export class ${FEATURE_NAME_PASCAL}Repository {
    async create(data: Create${FEATURE_NAME_PASCAL}Dto) {
        const [result] = await db.insert(${FEATURE_NAME_LOWER}s)
            .values(data)
            .returning();
        return result;
    }

    async findById(id: string) {
        const [result] = await db.select()
            .from(${FEATURE_NAME_LOWER}s)
            .where(eq(${FEATURE_NAME_LOWER}s.id, id));
        return result;
    }
}"
    create_file "$BASE_DIR/repositories/${FEATURE_NAME_LOWER}.repository.ts" "$REPOSITORY_CONTENT"

    # Create types file
    TYPES_CONTENT="import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { ${FEATURE_NAME_LOWER}s } from '../../../db/schema/${FEATURE_NAME_LOWER}';

export const Insert${FEATURE_NAME_PASCAL}Schema = createInsertSchema(${FEATURE_NAME_LOWER}s);
export const Select${FEATURE_NAME_PASCAL}Schema = createSelectSchema(${FEATURE_NAME_LOWER}s);

export type ${FEATURE_NAME_PASCAL} = z.infer<typeof Select${FEATURE_NAME_PASCAL}Schema>;
export type Create${FEATURE_NAME_PASCAL}Dto = z.infer<typeof Insert${FEATURE_NAME_PASCAL}Schema>;
"
    create_file "$BASE_DIR/types/${FEATURE_NAME_LOWER}.types.ts" "$TYPES_CONTENT"

    # Create agent file
    AGENT_CONTENT="import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { ${FEATURE_NAME_PASCAL}Service } from '../services/${FEATURE_NAME_LOWER}.service';
import { Insert${FEATURE_NAME_PASCAL}Schema } from '../types/${FEATURE_NAME_LOWER}.types';

export class ${FEATURE_NAME_PASCAL}Agent {
    private model: ChatOpenAI;
    
    constructor(private ${FEATURE_NAME_LOWER}Service: ${FEATURE_NAME_PASCAL}Service) {
        this.model = new ChatOpenAI({
            modelName: 'gpt-4-turbo-preview',
            temperature: 0
        });
    }

    async handleCommand(agentId: string, command: string) {
        try {
            const extractedData = await this.model
                .withStructuredOutput(Insert${FEATURE_NAME_PASCAL}Schema)
                .invoke(command);

            return await this.${FEATURE_NAME_LOWER}Service.create({
                ...extractedData,
                agentId
            });
        } catch (error) {
            console.error('Error in ${FEATURE_NAME_LOWER} agent:', error);
            throw error;
        }
    }
}"
    create_file "$BASE_DIR/agents/${FEATURE_NAME_LOWER}.agent.ts" "$AGENT_CONTENT"

    # Create routes file
    ROUTES_CONTENT="import { Hono } from 'hono';
import { ${FEATURE_NAME_PASCAL}Controller } from './controllers/${FEATURE_NAME_LOWER}.controller';
import { ${FEATURE_NAME_PASCAL}Service } from './services/${FEATURE_NAME_LOWER}.service';
import { ${FEATURE_NAME_PASCAL}Repository } from './repositories/${FEATURE_NAME_LOWER}.repository';
import { ${FEATURE_NAME_PASCAL}Agent } from './agents/${FEATURE_NAME_LOWER}.agent';

const router = new Hono();

// Initialize dependencies
const ${FEATURE_NAME_LOWER}Repository = new ${FEATURE_NAME_PASCAL}Repository();
const ${FEATURE_NAME_LOWER}Service = new ${FEATURE_NAME_PASCAL}Service(${FEATURE_NAME_LOWER}Repository);
const ${FEATURE_NAME_LOWER}Controller = new ${FEATURE_NAME_PASCAL}Controller(${FEATURE_NAME_LOWER}Service);
const ${FEATURE_NAME_LOWER}Agent = new ${FEATURE_NAME_PASCAL}Agent(${FEATURE_NAME_LOWER}Service);

// REST endpoints
router.post('/${FEATURE_NAME_LOWER}s', (c) => ${FEATURE_NAME_LOWER}Controller.create(c));
router.get('/${FEATURE_NAME_LOWER}s/:id', (c) => ${FEATURE_NAME_LOWER}Controller.findById(c));

// AI agent endpoint
router.post('/${FEATURE_NAME_LOWER}s/voice', async (c) => {
    try {
        const { command } = await c.req.json();
        const userId = c.get('userId'); // Assuming you have middleware that sets this
        const result = await ${FEATURE_NAME_LOWER}Agent.handleCommand(userId, command);
        return c.json(result);
    } catch (error) {
        return c.json({ error: error.message }, 400);
    }
});

export default router;"
    create_file "$BASE_DIR/routes.ts" "$ROUTES_CONTENT"

    # Create test files
    TEST_CONTENT="import { ${FEATURE_NAME_PASCAL}Service } from '../../services/${FEATURE_NAME_LOWER}.service';
import { ${FEATURE_NAME_PASCAL}Repository } from '../../repositories/${FEATURE_NAME_LOWER}.repository';

describe('${FEATURE_NAME_PASCAL}Service', () => {
    let service: ${FEATURE_NAME_PASCAL}Service;
    let repository: jest.Mocked<${FEATURE_NAME_PASCAL}Repository>;

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findById: jest.fn()
        } as any;
        service = new ${FEATURE_NAME_PASCAL}Service(repository);
    });

    describe('create', () => {
        it('should create a new ${FEATURE_NAME_LOWER}', async () => {
            // Add your test here
        });
    });
});"
    create_file "$BASE_DIR/tests/unit/${FEATURE_NAME_LOWER}.service.test.ts" "$TEST_CONTENT"

    echo "✅ Feature scaffold created successfully!"
    echo "🎯 Next steps:"
    echo "1. Create your schema in db/schema/${FEATURE_NAME_LOWER}.ts"
    echo "2. Run 'bun run generate' to generate the database migrations"
    echo "3. Implement business logic in services/${FEATURE_NAME_LOWER}.service.ts"
    echo "4. Add the feature routes to your main router"
    echo "5. Write tests in tests/unit and tests/integration"
else
    echo "Unknown command: $COMMAND"
    exit 1
fi