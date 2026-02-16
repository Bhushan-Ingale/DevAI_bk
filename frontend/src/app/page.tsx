'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, ArrowRight, Code } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'guide' | 'student'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      let userRole: 'guide' | 'student' = 'student';
      
      if (!isLogin) {
        userRole = role;
      } else {
        if (email.toLowerCase().startsWith('guide') || email.toLowerCase().includes('professor')) {
          userRole = 'guide';
        } else {
          userRole = 'student';
        }
      }
      
      login(email, password, userRole);
      router.push(userRole === 'guide' ? '/dashboard/guide' : '/dashboard/student');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,222,34,0.2)',
            borderRadius: '2rem'
          }}>
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
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffde22, #ff8928, #ff414e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DevAI
            </span>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,222,34,0.1)',
          borderRadius: '1.5rem',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          
          {!isLogin && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.25rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '2rem',
              marginBottom: '1.5rem'
            }}>
              {(['student', 'guide'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '2rem',
                    border: 'none',
                    background: role === r ? 'linear-gradient(135deg, #ffde22, #ff8928)' : 'transparent',
                    color: role === r ? '#000' : 'rgba(255,255,255,0.6)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <User style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                  color: 'rgba(255,222,34,0.6)'
                }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,222,34,0.2)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                  placeholder="Full name"
                  required
                />
              </div>
            )}
            
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: 'rgba(255,222,34,0.6)'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,222,34,0.2)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
                placeholder="Email address"
                required
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: 'rgba(255,222,34,0.6)'
              }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,222,34,0.2)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
                placeholder="Password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                color: '#000',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem'
              }}
            >
              {loading ? (
                <div style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  border: '2px solid rgba(0,0,0,0.3)',
                  borderTopColor: '#000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </>
              )}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem'
          }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffde22',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}