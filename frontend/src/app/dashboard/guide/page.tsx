'use client';

import { useEffect } from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GuideDashboard from '@/components/GuideDashboard';

export default function GuideDashboardPage() {
  const { user, isGuide } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!isGuide) {
      router.push('/dashboard/student');
    }
  }, [user, isGuide, router]);

  if (!user || !isGuide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <GuideDashboard />;
}