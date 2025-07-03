import { NextRequest, NextResponse } from 'next/server';
import { createUser, createToken } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ 
        error: 'Email, password, and name are required' 
      }, { status: 400 });
    }

    const userData = await createUser(email, password, name);
    if (!userData) {
      return NextResponse.json({ 
        error: 'User already exists or registration failed' 
      }, { status: 409 });
    }

    const token = await createToken({ userId: userData.id });
    
    return NextResponse.json({ 
      success: true, 
      user: userData, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}