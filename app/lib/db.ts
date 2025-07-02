import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// Database connection
const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://localhost:5432/dev';
const sql = neon(connectionString);
export const db = drizzle(sql);

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