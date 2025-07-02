import { NextRequest, NextResponse } from 'next/server';
import { runMigration } from '../../lib/migrate';

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check (you might want to add a proper secret)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.MIGRATION_SECRET || 'migrate-secret-123'}`;
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await runMigration();
    
    if (result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Migration endpoint',
      instructions: 'POST to this endpoint with Authorization: Bearer <MIGRATION_SECRET> to run migrations'
    },
    { status: 200 }
  );
}