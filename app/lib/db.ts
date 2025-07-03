import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// Helper function to get database connection
function createDbConnection() {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'Database connection string not found. Please set NETLIFY_DATABASE_URL or DATABASE_URL environment variable with format: postgresql://user:password@host.tld/dbname'
    );
  }

  // Validate connection string format
  if (!connectionString.startsWith('postgresql://') && !connectionString.startsWith('postgres://')) {
    throw new Error(
      'Database connection string format for neon() should be: postgresql://user:password@host.tld/dbname?option=value'
    );
  }

  const sql = neon(connectionString);
  return drizzle(sql);
}

// Lazy database connection - only created when first accessed
let _db: ReturnType<typeof createDbConnection> | null = null;

export const db = new Proxy({} as ReturnType<typeof createDbConnection>, {
  get(target, prop) {
    if (!_db) {
      _db = createDbConnection();
    }
    return (_db as any)[prop];
  }
});

// Users table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;