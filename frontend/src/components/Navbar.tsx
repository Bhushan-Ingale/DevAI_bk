'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <nav style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      backgroundColor: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 222, 34, 0.1)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ffde22, #ff8928)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Code style={{ width: '20px', height: '20px', color: '#000' }} />
            </div>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffde22, #ff8928, #ff414e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DevAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div style={{ 
            display: 'none', 
            gap: '2rem', 
            alignItems: 'center',
            '@media (min-width: 768px)': { 
              display: 'flex' 
            }
          }}>
            {['Home', 'Features', 'How It Works'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase().replace(' ', '-')}`}
                style={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  textDecoration: 'none',
                  fontSize: '0.95rem'
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div style={{ 
            display: 'none', 
            gap: '1rem', 
            alignItems: 'center',
            '@media (min-width: 768px)': { 
              display: 'flex' 
            }
          }}>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              Sign in
            </Link>
            <Link 
              href="/login" 
              style={{
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                color: '#000',
                borderRadius: '0.75rem',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'block',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.5rem',
              '@media (min-width: 768px)': {
                display: 'none'
              }
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Side Menu - Slides from right */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 40,
                animation: 'fadeIn 0.2s ease'
              }}
            />
            
            {/* Side Panel */}
            <div style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '300px',
              height: '100vh',
              backgroundColor: '#0a0a0a',
              borderLeft: '1px solid rgba(255,222,34,0.2)',
              zIndex: 50,
              padding: '2rem 1.5rem',
              animation: 'slideIn 0.3s ease',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {['Home', 'Features', 'How It Works'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'Home' ? '/' : `#${item.toLowerCase().replace(' ', '-')}`}
                    style={{ 
                      color: '#fff', 
                      textDecoration: 'none',
                      padding: '0.75rem',
                      fontSize: '1.1rem',
                      borderBottom: '1px solid rgba(255,222,34,0.1)'
                    }}
                  >
                    {item}
                  </Link>
                ))}
                
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link
                    href="/login"
                    style={{ 
                      color: '#fff', 
                      textDecoration: 'none',
                      padding: '0.75rem',
                      textAlign: 'center',
                      border: '1px solid rgba(255,222,34,0.3)',
                      borderRadius: '0.75rem'
                    }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    style={{
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                      color: '#000',
                      borderRadius: '0.75rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      textAlign: 'center'
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
}