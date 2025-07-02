import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { User } from '../types/auth';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Mock user storage (in production, this would be a database)
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: '$2a$10$rOzJqODqGbUzKqV0Y5Mlje5Q9N3Q8E9yxXvLQhGl8K9N0Q8E9yxXv', // password: "admin123"
    createdAt: new Date(),
  }
];

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createUser(email: string, password: string, name: string): Promise<User | null> {
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return null;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: (users.length + 1).toString(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
  };

  users.push(newUser);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export function getUserById(id: string): User | null {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}