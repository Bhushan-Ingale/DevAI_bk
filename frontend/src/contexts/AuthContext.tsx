'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'guide' | 'student' | 'teamleader';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: 'guide' | 'student') => Promise<void>;
  logout: () => void;
  isGuide: boolean;
  isStudent: boolean;
  isTeamLeader: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('devai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role?: 'guide' | 'student') => {
    // Mock authentication
    let userRole: 'guide' | 'student' | 'teamleader' = 'student';
    
    if (role) {
      userRole = role;
    } else if (email.toLowerCase().includes('guide') || email.toLowerCase().includes('professor')) {
      userRole = 'guide';
    } else if (email.toLowerCase().includes('leader')) {
      userRole = 'teamleader';
    } else {
      userRole = 'student';
    }
    
    const userData: User = {
      id: email.split('@')[0],
      name: email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
      role: userRole,
      email: email
    };
    
    setUser(userData);
    localStorage.setItem('devai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devai_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isGuide: user?.role === 'guide',
      isStudent: user?.role === 'student',
      isTeamLeader: user?.role === 'teamleader'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};