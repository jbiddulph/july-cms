import { User } from '../types/auth';

export async function authenticateUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? { user: data.user, token: data.token } : null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser(email: string, password: string, name: string): Promise<{ user: User; token: string } | null> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? { user: data.user, token: data.token } : null;
  } catch (error) {
    console.error('User creation error:', error);
    return null;
  }
}

export async function verifyTokenAndGetUser(token: string): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}