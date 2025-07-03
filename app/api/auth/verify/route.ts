import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getUserById } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ 
        error: 'Token is required' 
      }, { status: 400 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ 
        error: 'Invalid token' 
      }, { status: 401 });
    }

    const userData = await getUserById(payload.userId);
    if (!userData) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: userData 
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}