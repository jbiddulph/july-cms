'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User, AuthContextType } from '../types/auth';
import { authenticateUser, createUser, createToken, verifyToken, getUserById } from '../lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = Cookies.get('auth-token');
    if (token) {
      verifyTokenAndSetUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyTokenAndSetUser = async (token: string) => {
    try {
      const payload = await verifyToken(token);
      if (payload && payload.userId) {
        const userData = getUserById(payload.userId);
        if (userData) {
          setUser(userData);
        } else {
          Cookies.remove('auth-token');
        }
      } else {
        Cookies.remove('auth-token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      Cookies.remove('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await authenticateUser(email, password);
      if (userData) {
        const token = await createToken({ userId: userData.id });
        Cookies.set('auth-token', token, { expires: 1 }); // 1 day
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const userData = await createUser(email, password, name);
      if (userData) {
        const token = await createToken({ userId: userData.id });
        Cookies.set('auth-token', token, { expires: 1 }); // 1 day
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('auth-token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}