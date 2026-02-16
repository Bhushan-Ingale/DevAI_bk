'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function LandingPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push(user.role === 'guide' ? '/dashboard/guide' : '/dashboard/student');
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30">
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
}