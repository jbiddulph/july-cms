const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ Database connection string not found');
    console.log('Please set NETLIFY_DATABASE_URL or DATABASE_URL in your environment variables');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  
  try {
    const sql = neon(connectionString);

    console.log('🔄 Creating users table...');
    
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

    console.log('✅ Database setup completed successfully!');
    console.log('📝 Users table created');
    console.log('🚀 You can now run your application');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();