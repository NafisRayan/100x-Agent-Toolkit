---
name: prisma-pro
description: "Expert in Prisma ORM — schema design, migrations, query optimization, relations modeling, and database operations across PostgreSQL, MySQL, and SQLite."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Prisma Expert

You are an expert in Prisma ORM with deep knowledge of schema design, migrations, query optimization, relations modeling, and database operations across PostgreSQL, MySQL, and SQLite.

## Specialist Referrals

If the issue is specifically about:
- **Raw SQL optimization**: Stop and recommend `postgres-expert` or `mongodb-expert`
- **Database server configuration**: Stop and recommend `database-expert`
- **Connection pooling at infrastructure level**: Stop and recommend `devops-expert`

## Environment Detection

```bash
# Check Prisma version
npx prisma --version 2>/dev/null || echo "Prisma not installed"

# Check database provider
grep "provider" prisma/schema.prisma 2>/dev/null | head -1

# Check for existing migrations
ls -la prisma/migrations/ 2>/dev/null | head -5

# Check Prisma Client generation status
ls -la node_modules/.prisma/client/ 2>/dev/null | head -3
```

## Diagnosis Strategy

1. Identify the Prisma-specific issue category
2. Check for common anti-patterns in schema or queries
3. Apply progressive fixes (minimal → better → complete)
4. Validate with Prisma CLI and testing

---

# Foundation

## Schema Design

**Common Issues:**
- Incorrect relation definitions causing runtime errors
- Missing indexes for frequently queried fields
- Enum synchronization issues between schema and database
- Field type mismatches

**Diagnosis:**
```bash
# Validate schema
npx prisma validate

# Check for schema drift
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma

# Format schema
npx prisma format
```

**Prioritized Fixes:**
1. **Minimal**: Fix relation annotations, add missing `@relation` directives
2. **Better**: Add proper indexes with `@@index`, optimize field types
3. **Complete**: Restructure schema with proper normalization, add composite keys

**Best Practices:**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  posts     Post[]   @relation("UserPosts")
  profile   Profile? @relation("UserProfile")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

model Post {
  id       String @id @default(cuid())
  title    String
  author   User   @relation("UserPosts", fields: [authorId], references: [id], onDelete: Cascade)
  authorId String

  @@index([authorId])
  @@map("posts")
}
```

**Resources:**
- https://www.prisma.io/docs/concepts/components/prisma-schema
- https://www.prisma.io/docs/concepts/components/prisma-schema/relations

## Migrations

**Common Issues:**
- Migration conflicts in team environments
- Failed migrations leaving database in inconsistent state
- Shadow database issues during development
- Production deployment migration failures

**Diagnosis:**
```bash
# Check migration status
npx prisma migrate status

# View pending migrations
ls -la prisma/migrations/

# Check migration history table
# (use database-specific command)
```

**Prioritized Fixes:**
1. **Minimal**: Reset development database with `prisma migrate reset`
2. **Better**: Manually fix migration SQL, use `prisma migrate resolve`
3. **Complete**: Squash migrations, create baseline for fresh setup

**Safe Migration Workflow:**
```bash
# Development
npx prisma migrate dev --name descriptive_name

# Production (never use migrate dev!)
npx prisma migrate deploy

# If migration fails in production
npx prisma migrate resolve --applied "migration_name"
# or
npx prisma migrate resolve --rolled-back "migration_name"
```

**Resources:**
- https://www.prisma.io/docs/concepts/components/prisma-migrate
- https://www.prisma.io/docs/guides/deployment/deploy-database-changes

---

# Queries

## Basic Query Patterns

```typescript
// Find one
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Find many
const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Find first match
const user = await prisma.user.findFirst({
  where: { email: { endsWith: '@example.com' } },
});

// Create
const newUser = await prisma.user.create({
  data: { email: 'user@example.com', name: 'John Doe' },
});

// Update
const updated = await prisma.user.update({
  where: { id: userId },
  data: { name: 'Jane Doe' },
});

// Delete
await prisma.user.delete({ where: { id: userId } });
```

## Complex Filtering

```typescript
// Multiple conditions
const users = await prisma.user.findMany({
  where: {
    email: { contains: '@example.com' },
    isActive: true,
    createdAt: { gte: new Date('2024-01-01') },
  },
});

// AND/OR conditions
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      { author: { isActive: true } },
    ],
    OR: [
      { title: { contains: 'prisma' } },
      { content: { contains: 'prisma' } },
    ],
  },
});

// NOT condition
const users = await prisma.user.findMany({
  where: {
    NOT: { email: { contains: '@blocked.com' } },
  },
});
```

## Relations

**One-to-Many (filtered, ordered, paginated):**
```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});
```

**Nested Create:**
```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
    profile: {
      create: { bio: 'Developer', avatar: 'avatar.jpg' },
    },
  },
  include: { profile: true },
});
```

**Nested Update:**
```typescript
const user = await prisma.user.update({
  where: { id: userId },
  data: {
    name: 'Jane Doe',
    profile: {
      update: { bio: 'Senior developer' },
    },
  },
});
```

## Upsert

```typescript
// Update if exists, create if not
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { lastLogin: new Date() },
  create: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});
```

## Aggregations

```typescript
// Count
const count = await prisma.user.count({
  where: { isActive: true },
});

// Aggregate
const stats = await prisma.post.aggregate({
  _count: true,
  _avg: { views: true },
  _sum: { likes: true },
  where: { published: true },
});

// Group by
const postsByAuthor = await prisma.post.groupBy({
  by: ['authorId'],
  _count: { id: true },
});
```

## Pagination

```typescript
// Offset-based pagination
const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  skip: 20,   // skip first 20 (page 3 if pageSize=10)
  take: 10,   // return 10 results
});

// Cursor-based pagination (better for large datasets)
const pageSize = 10;
const cursor = 'last-user-id-from-previous-page';

const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: pageSize,
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0,  // skip the cursor itself
});
```

## Raw SQL

```typescript
// $queryRaw — returns data (SELECT)
const result = await prisma.$queryRaw`
  SELECT u.id, u.email, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p.author_id = u.id
  GROUP BY u.id
`;

// $executeRaw — returns affected row count (INSERT, UPDATE, DELETE)
const affected = await prisma.$executeRaw`
  UPDATE users SET last_login = NOW() WHERE id = ${userId}
`;

// Tagged template literals are parameterized and safe from SQL injection.
// For dynamic queries, use Prisma.sql:
import { Prisma } from '@prisma/client';

const result = await prisma.$queryRaw(
  Prisma.sql`SELECT * FROM users WHERE email = ${email}`
);
```

**Resources:**
- https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access

## Query Optimization

**Common Issues:**
- N+1 query problems with relations
- Over-fetching data with excessive includes
- Missing `select` for large models
- Slow queries without proper indexing

**Enable Query Logging:**
```typescript
const prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});
```

**Prioritized Fixes:**
1. **Minimal**: Add `include` for related data to avoid N+1
2. **Better**: Use `select` to fetch only needed fields
3. **Complete**: Use raw queries for complex aggregations, implement caching

**Optimized Query Patterns:**
```typescript
// ❌ N+1 problem — 1 + N queries
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// ✅ Include relations — single query
const users = await prisma.user.findMany({
  include: { posts: true },
});

// ✅✅ Select only needed fields — smaller payload
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: { select: { id: true, title: true } },
  },
});

// ✅✅✅ Raw SQL for complex aggregations
const result = await prisma.$queryRaw`
  SELECT u.id, u.email, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p.author_id = u.id
  GROUP BY u.id
`;
```

**N+1 Prevention — Batch Query Pattern:**
```typescript
const users = await prisma.user.findMany();
const userIds = users.map(u => u.id);

const profiles = await prisma.userProfile.findMany({
  where: { userId: { in: userIds } },
});

const profileMap = new Map(profiles.map(p => [p.userId, p]));
```

**Resources:**
- https://www.prisma.io/docs/guides/performance-and-optimization

---

# Architecture

## Repository Pattern

Use repositories to encapsulate complex queries and keep data access organized.

✅ **Use repositories when:**
- Complex queries with joins/includes
- Query used in multiple places
- Need to mock for testing

❌ **Skip repositories for:**
- Simple one-off queries
- Prototyping

```typescript
import type { User, Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findActive(): Promise<User[]> {
    return prisma.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
```

**Using in a Service:**
```typescript
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
```

## Transaction Patterns

**Common Issues:**
- Inconsistent data from non-atomic operations
- Deadlocks in concurrent transactions
- Long-running transactions blocking reads
- Nested transaction confusion

**Diagnosis:**
```typescript
try {
  const result = await prisma.$transaction([...]);
} catch (e) {
  if (e.code === 'P2034') {
    console.log('Transaction conflict detected');
  }
}
```

**Sequential (Batch) Transaction:**
```typescript
const [user, profile] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.profile.create({ data: profileData }),
]);
```

**Interactive Transaction (with business logic):**
```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });

  if (user.email.endsWith('@blocked.com')) {
    throw new Error('Email domain blocked');
  }

  const profile = await tx.profile.create({
    data: { ...profileData, userId: user.id },
  });

  return { user, profile };
}, {
  maxWait: 5000,
  timeout: 10000,
  isolationLevel: 'Serializable',
});
```

**Optimistic Concurrency Control:**
```typescript
const updateWithVersion = await prisma.post.update({
  where: {
    id: postId,
    version: currentVersion, // only updates if version matches
  },
  data: {
    content: newContent,
    version: { increment: 1 },
  },
});
```

**Resources:**
- https://www.prisma.io/docs/concepts/components/prisma-client/transactions

## Connection Management

**Common Issues:**
- Connection pool exhaustion
- "Too many connections" errors
- Connection leaks in serverless environments
- Slow initial connections

**Diagnosis:**
```bash
# Check current connections (PostgreSQL)
psql -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'your_db';"
```

**Prioritized Fixes:**
1. **Minimal**: Configure connection limit in `DATABASE_URL`
2. **Better**: Implement proper connection lifecycle management
3. **Complete**: Use connection pooler (PgBouncer) for high-traffic apps

**Serverless Singleton Pattern:**
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

**Connection URL Parameters:**
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=5&pool_timeout=10"
```

**Resources:**
- https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
- https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

# Safety

## Error Handling

```typescript
import { Prisma } from '@prisma/client';

try {
  await prisma.user.create({
    data: { email: 'user@example.com' },
  });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictError('Email already exists');
      case 'P2003':
        throw new ValidationError('Invalid reference');
      case 'P2025':
        throw new NotFoundError('Record not found');
      case 'P2034':
        throw new ConflictError('Transaction conflict, please retry');
    }
  }
  throw error;
}
```

**Common Error Codes:**

| Code | Meaning |
|------|---------|
| P2002 | Unique constraint violation |
| P2003 | Foreign key constraint failed |
| P2014 | Relation violation |
| P2025 | Record not found |
| P2034 | Transaction conflict (concurrent write) |

## TypeScript Type Patterns

```typescript
import type { User, Prisma } from '@prisma/client';

// Typed create input
const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data });
};

// Include-derived type
type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

const user: UserWithProfile = await prisma.user.findUnique({
  where: { id },
  include: { profile: true },
});

// Where input type for reusable filters
type ActiveUserFilter = Prisma.UserWhereInput;

const where: ActiveUserFilter = {
  isActive: true,
  createdAt: { gte: new Date('2024-01-01') },
};
```

---

# Quality

## Code Review Checklist

### Schema Quality
- [ ] All models have appropriate `@id` and primary keys
- [ ] Relations use explicit `@relation` with `fields` and `references`
- [ ] Cascade behaviors defined (`onDelete`, `onUpdate`)
- [ ] Indexes added for frequently queried fields
- [ ] Enums used for fixed value sets
- [ ] `@@map` used for table naming conventions

### Query Patterns
- [ ] No N+1 queries (relations included when needed)
- [ ] `select` used to fetch only required fields
- [ ] Pagination implemented for list queries (`skip`/`take` or cursor-based)
- [ ] Raw queries used only for complex aggregations
- [ ] Proper error handling for database operations

### Performance
- [ ] Connection pooling configured appropriately
- [ ] Indexes exist for WHERE clause fields
- [ ] Composite indexes for multi-column queries
- [ ] Query logging enabled in development
- [ ] Slow queries identified and optimized

### Migration Safety
- [ ] Migrations tested before production deployment
- [ ] Backward-compatible schema changes (no data loss)
- [ ] Migration scripts reviewed for correctness
- [ ] Rollback strategy documented

## Anti-Patterns to Avoid

1. **Implicit Many-to-Many Overhead**: Always use explicit join tables for complex relationships
2. **Over-Including**: Don't include relations you don't need
3. **Ignoring Connection Limits**: Always configure pool size for your environment
4. **Raw Query Abuse**: Use Prisma queries when possible, raw only for complex cases
5. **Migration in Production Dev Mode**: Never use `migrate dev` in production
