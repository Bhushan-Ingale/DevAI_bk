'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  GitCommit, Users, TrendingUp, Code, Award,
  Calendar, ChevronRight, Star, Activity,
  BookOpen, Github, Clock, Brain, ArrowRight,
  Target, Zap, Crown, BarChart3, UserCheck,
  MessageSquare, Plus, Filter, Download
} from 'lucide-react';

interface Commit {
  message: string;
  repo: string;
  time: string;
  hash: string;
}

interface Member {
  name: string;
  commits: number;
  additions: number;
  deletions: number;
  activity_score: number;
  role?: 'leader' | 'member';
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [teamData, setTeamData] = useState({
    name: 'Team Quantum',
    leader: 'Alice Chen',
    members: [
      { name: 'Alice Chen', commits: 65, additions: 1240, deletions: 320, activity_score: 98, role: 'leader' },
      { name: 'Bob Smith', commits: 42, additions: 890, deletions: 210, activity_score: 76, role: 'member' },
      { name: 'Charlie Brown', commits: 25, additions: 450, deletions: 120, activity_score: 52, role: 'member' },
    ] as Member[],
    progress: 78,
    sprint: 'Sprint 4/6',
    repo: 'github.com/team-quantum'
  });

  const [commits] = useState<Commit[]>([
    { message: 'Fix navigation bug in dashboard', repo: 'frontend', time: '2h ago', hash: 'a1b2c3d' },
    { message: 'Add user authentication flow', repo: 'api', time: '5h ago', hash: 'e4f5g6h' },
    { message: 'Update API endpoints', repo: 'backend', time: '1d ago', hash: 'i7j8k9l' },
  ]);

  const stats = [
    { label: 'Total Commits', value: 143, icon: GitCommit, change: '+12', color: '#ffde22' },
    { label: 'Team Progress', value: '78%', icon: Target, change: '+8%', color: '#ff8928' },
    { label: 'Code Quality', value: '92%', icon: Award, change: '+5%', color: '#ff414e' },
    { label: 'Contributions', value: '1,240', icon: Code, change: '+342', color: '#ffde22' },
  ];

  const activities = [
    { user: 'Alice', action: 'pushed 3 commits', time: '10m ago', repo: 'frontend' },
    { user: 'Bob', action: 'opened PR #42', time: '25m ago', repo: 'api' },
    { user: 'Charlie', action: 'commented on PR #41', time: '1h ago', repo: 'backend' },
    { user: 'Alice', action: 'merged PR #40', time: '2h ago', repo: 'frontend' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,222,34,0.1)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Student Dashboard</h1>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  Welcome back, {user?.name || 'Student'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,222,34,0.1)',
                borderRadius: '2rem',
                border: '1px solid rgba(255,222,34,0.2)'
              }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#ffde22', borderRadius: '50%' }} />
                <span style={{ color: '#ffde22', fontSize: '0.875rem', fontWeight: '500' }}>{teamData.name}</span>
              </div>
              
              <button
                onClick={() => {
                  localStorage.removeItem('devai_user');
                  router.push('/login');
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,222,34,0.3)',
                  color: '#fff',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
            {['overview', 'activity', 'team', 'kanban', 'calendar'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === tab ? '#ffde22' : 'rgba(255,255,255,0.6)',
                  borderBottom: activeTab === tab ? '2px solid #ffde22' : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === tab ? '600' : '400',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,222,34,0.1)',
                  borderRadius: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</span>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.75rem',
                      background: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <stat.icon style={{ width: '1.25rem', height: '1.25rem', color: stat.color }} />
                    </div>
                  </div>
                  <p style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{stat.value}</p>
                  <p style={{ fontSize: '0.875rem', color: '#ffde22', margin: 0 }}>{stat.change} this week</p>
                </div>
              ))}
            </div>

            {/* Team Progress */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,222,34,0.1)',
              borderRadius: '1rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                {teamData.name} Progress
              </h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Sprint Completion</span>
                  <span style={{ color: '#ffde22', fontWeight: 'bold' }}>{teamData.progress}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${teamData.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #ffde22, #ff8928)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[
                  { label: 'Sprint Velocity', value: '24 pts', change: '+3' },
                  { label: 'Code Coverage', value: '82%', change: '+5%' },
                  { label: 'Open PRs', value: '3', change: '2 need review' }
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '0.75rem'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 0.5rem 0' }}>{item.label}</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
                    <p style={{ fontSize: '0.75rem', color: '#ffde22', margin: '0.25rem 0 0 0' }}>{item.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,222,34,0.1)',
              borderRadius: '1rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Activity</h2>
              
              {activities.map((activity, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(255,222,34,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <GitCommit style={{ width: '1rem', height: '1rem', color: '#ffde22' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0 }}>
                        <span style={{ fontWeight: '600', color: '#ffde22' }}>{activity.user}</span>
                        <span style={{ color: 'rgba(255,255,255,0.8)' }}> {activity.action}</span>
                      </p>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', margin: '0.25rem 0 0 0' }}>
                        {activity.repo} • {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'team' && (
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,222,34,0.1)',
            borderRadius: '1rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Team Members</h2>
            
            {teamData.members.map((member, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                marginBottom: i < teamData.members.length - 1 ? '0.5rem' : 0,
                background: member.role === 'leader' ? 'rgba(255,222,34,0.05)' : 'transparent',
                borderRadius: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    background: member.role === 'leader' ? '#ffde22' : 'rgba(255,222,34,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: member.role === 'leader' ? '#000' : '#ffde22' }}>
                      {member.name[0]}
                    </span>
                    {member.role === 'leader' && (
                      <Crown style={{
                        position: 'absolute',
                        top: '-0.5rem',
                        right: '-0.5rem',
                        width: '1rem',
                        height: '1rem',
                        color: '#ffde22'
                      }} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <p style={{ fontWeight: '600', margin: 0 }}>{member.name}</p>
                      {member.role === 'leader' && (
                        <span style={{
                          padding: '0.125rem 0.5rem',
                          background: 'rgba(255,222,34,0.2)',
                          color: '#ffde22',
                          borderRadius: '1rem',
                          fontSize: '0.75rem'
                        }}>
                          Team Leader
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: '0.25rem 0 0 0' }}>
                      {member.commits} commits • +{member.additions}/-{member.deletions}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#ffde22' }}>
                    {member.activity_score}%
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>activity</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,222,34,0.1)',
            borderRadius: '1rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Commit History</h2>
            
            {/* Simple commit timeline visualization */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '200px', marginBottom: '2rem' }}>
              {[12, 8, 15, 10, 7, 3, 5].map((count, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: `${count * 10}px`,
                    background: 'linear-gradient(180deg, #ffde22, #ff8928)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>

            {commits.map((commit, i) => (
              <div key={i} style={{
                padding: '1rem',
                marginBottom: i < commits.length - 1 ? '0.5rem' : 0,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255,222,34,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <GitCommit style={{ width: '1rem', height: '1rem', color: '#ffde22' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '500', margin: 0 }}>{commit.message}</p>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', margin: '0.25rem 0 0 0' }}>
                      {commit.repo} • {commit.hash}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>{commit.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kanban' && (
          <Kanban />
        )}

        {activeTab === 'calendar' && (
          <CalendarPage />
        )}
      </div>
    </div>
  );
}

// Import these at the bottom
import Kanban from './Kanban';
import CalendarPage from './CalendarPage';