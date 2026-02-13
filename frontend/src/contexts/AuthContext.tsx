'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'guide' | 'student';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
  isGuide: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (id: string, password: string, role?: 'guide' | 'student') => {
  // Mock authentication with explicit role
  let userRole: 'guide' | 'student';
  
  if (role) {
    userRole = role; // Use provided role (for signup)
  } else {
    // Determine from email prefix (for login)
    userRole = id.toLowerCase().startsWith('guide') ? 'guide' : 'student';
  }
  
  const userData: User = {
    id,
    name: userRole === 'guide' 
      ? `Guide ${id.split('@')[0].replace('guide', '').replace(/[^a-zA-Z]/g, '') || 'Smith'}` 
      : `Student ${id.split('@')[0].replace(/[^a-zA-Z]/g, '') || 'User'}`,
    role: userRole,
    email: id
  };
    
    // In production, verify with backend
    setUser(userData);
    localStorage.setItem('devai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devai_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isGuide: user?.role === 'guide' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};