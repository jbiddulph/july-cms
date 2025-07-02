import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { eq } from 'drizzle-orm';
import { db, users, type User } from './db';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

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

export async function authenticateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (user.length === 0) return null;

    const isValid = await verifyPassword(password, user[0].password);
    if (!isValid) return null;

    // Return user without password
    const { password: _, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser(email: string, password: string, name: string): Promise<Omit<User, 'password'> | null> {
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return null;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    }).returning();

    if (newUser.length === 0) return null;

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser[0];
    return userWithoutPassword;
  } catch (error) {
    console.error('User creation error:', error);
    return null;
  }
}

export async function getUserById(id: string): Promise<Omit<User, 'password'> | null> {
  try {
    const user = await db.select().from(users).where(eq(users.id, parseInt(id))).limit(1);
    
    if (user.length === 0) return null;

    // Return user without password
    const { password: _, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}