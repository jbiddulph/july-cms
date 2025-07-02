import { neon } from '@neondatabase/serverless';

export async function runMigration() {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('Database connection string not found');
  }

  const sql = neon(connectionString);

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "email" varchar(255) NOT NULL,
        "name" varchar(255) NOT NULL,
        "password" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "users_email_unique" UNIQUE("email")
      )
    `;

    console.log('✅ Users table created successfully');
    return { success: true, message: 'Migration completed successfully' };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}