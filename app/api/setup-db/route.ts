import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    return NextResponse.json({ 
      error: 'Database connection string not found',
      message: 'Please set NETLIFY_DATABASE_URL or DATABASE_URL environment variable'
    }, { status: 500 });
  }

  try {
    const sql = neon(connectionString);
    
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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed' 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Allow POST requests as well for flexibility
  return GET(request);
}