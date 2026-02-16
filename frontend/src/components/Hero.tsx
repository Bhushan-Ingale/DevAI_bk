'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Github } from 'lucide-react';

export default function Hero() {
  const router = useRouter();

  return (
    <section style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: '6rem 1.5rem',
      backgroundColor: '#0a0a0a'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          fontFamily: 'Satoshi, sans-serif',
          color: '#ffffff',
          marginBottom: '1.5rem',
          lineHeight: '1.1'
        }}>
          Monitor <span style={{
            background: 'linear-gradient(135deg, #ffde22, #ff8928, #ff414e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>student code</span> with AI
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Automatically analyze GitHub repositories and track student contributions
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/login')}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ffde22, #ff8928)',
              color: '#000',
              borderRadius: '0.75rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Start Analyzing
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              color: '#ffffff',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <Github style={{ width: '1.25rem', height: '1.25rem' }} />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}