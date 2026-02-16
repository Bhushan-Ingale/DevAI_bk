'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(user.role === 'guide' ? '/dashboard/guide' : '/dashboard/student');
    }
  }, [user, router]);

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
    </main>
  );
}