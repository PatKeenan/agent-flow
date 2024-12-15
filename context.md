# AgentFlow Technical Context Document

## Project Overview

AgentFlow is a productivity-focused application for real estate agents, built with modern web technologies. The application aims to help agents manage their business operations, schedules, and client relationships efficiently.

## Tech Stack

### Frontend Technologies

1. **React + Vite**

   - Using React 18+ for component architecture
   - Vite for fast build tooling and development
   - Strict mode enabled
   - React Router for navigation
   - React Query for data fetching and caching

2. **TypeScript Configuration**

   - Strict type checking enabled
   - Path aliases configured
   - Type definitions for all libraries
   - Custom type definitions in `@types` directory
   - Shared types between frontend and backend

3. **Tailwind CSS**

   - Custom configuration in `tailwind.config.js`
   - Core utility classes only (no compiler)
   - Custom color palette based on brand
   - Responsive design utilities
   - Component-specific styles

4. **ShadCn UI Components**

   - Base component library
   - Custom theme configuration
   - Accessible components
   - Dark mode support
   - Component customization through CSS variables

5. **Lucide Icons**
   - Primary icon library
   - Consistent sizing (16px, 20px, 24px)
   - Color inheritance from parent
   - Lazy loading implementation

### Backend Technologies

1. **Hono Server**

   - REST API endpoints
   - Type-safe request/response handling
   - Middleware implementation
   - Error handling
   - Rate limiting
   - CORS configuration

2. **Drizzle ORM**

   - Type-safe database queries
   - Schema definitions
   - Migrations management
   - Relationship handling
   - Query building

3. **PostgreSQL Database**
   - Relational data structure
   - Complex queries optimization
   - Indexing strategy
   - Data validation
   - Backup procedures

## Project Structure

```
├── apps/
│   ├── web/             # Frontend application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   └── types/
│   │   └── public/
│   └── server/          # Backend application
│       ├── src/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── models/
│       │   └── utils/
│       └── drizzle/
├── packages/
│   ├── config/         # Shared configuration
│   └── types/          # Shared TypeScript types
└── turbo.json
```

## Development Guidelines

### TypeScript Conventions

```typescript
// Use explicit types
interface User {
  id: string;
  email: string;
  role: "admin" | "agent" | "assistant";
}

// Use type guards
function isAdmin(user: User): user is User & { role: "admin" } {
  return user.role === "admin";
}

// Use generics for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

### Component Structure

```typescript
// Component template
import { type FC } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: FC<ComponentProps> = ({ className, children }) => {
  return <div className={cn("base-styles", className)}>{children}</div>;
};
```

### API Structure

```typescript
// API route template
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

app.post("/api/users", async (c) => {
  const body = await c.req.json();
  const validated = userSchema.parse(body);
  // Implementation
});
```

### Database Schema

```typescript
// Drizzle schema example
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Key Features Implementation

### Authentication Flow

- JWT-based authentication
- Refresh token rotation
- Session management
- Role-based access control

### Real-time Updates

- WebSocket integration
- Event-driven architecture
- Client-side state management
- Server-sent events

### Data Caching

- React Query configuration
- Cache invalidation strategy
- Optimistic updates
- Prefetching policies

### Error Handling

- Global error boundary
- API error responses
- Form validation
- User feedback

### Performance Optimization

- Code splitting
- Lazy loading
- Asset optimization
- Database query optimization

## Testing Strategy

- Unit tests with Vitest
- Integration tests with Testing Library
- E2E tests with Playwright
- API tests with Supertest

## Deployment Configuration

- Docker containerization
- CI/CD pipeline
- Environment variables
- Monitoring setup

## Security Considerations

- Input validation
- XSS prevention
- CSRF protection
- Rate limiting
- SQL injection prevention

Remember: This document serves as a reference for AI assistance in development. When you need help with specific implementations, reference this context along with your specific requirements.
