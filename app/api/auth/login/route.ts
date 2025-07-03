import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createToken } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ 
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    const userData = await authenticateUser(email, password);
    if (!userData) {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    const token = await createToken({ userId: userData.id });
    
    return NextResponse.json({ 
      success: true, 
      user: userData, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}