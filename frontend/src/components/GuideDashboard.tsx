'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Users, GitCommit, Activity, TrendingUp, 
  Search, Filter, ChevronRight,
  Code, GitBranch, BarChart3, MessageSquare,
  Grid, List, Download, Calendar,
  ChevronDown, Bell, UserCircle, ArrowRight,
  Zap, AlertCircle, CheckCircle, Github,
  Target, Award, Brain,
  LogOut, Crown
} from 'lucide-react';
import GroupCard from './GroupCard';
import AnalyticsChart from './AnalyticsChart';
import AddGroupModal from './AddGroupModal';

// Define Team interface
interface Team {
  id: string;
  name: string;
  members: string[];
  leader?: string;
  progress: number;
  commits: number;
  additions: number;
  deletions: number;
  lastActive: string;
  repoUrl: string;
  tech: string[];
  activityScore: number;
  sprintVelocity?: number;
  coverage?: number;
  openPRs?: number;
}

export default function GuideDashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  // Teams state
  const [teams, setTeams] = useState<Team[]>([
    { 
      id: '1', 
      name: 'Team Quantum', 
      members: ['Alice Chen', 'Bob Smith', 'Charlie Brown'],
      leader: 'Alice Chen',
      progress: 85,
      commits: 65,
      additions: 1240,
      deletions: 320,
      lastActive: '2h ago',
      repoUrl: 'https://github.com/team/quantum',
      tech: ['React', 'Node.js', 'MongoDB'],
      activityScore: 98,
      sprintVelocity: 42,
      coverage: 78,
      openPRs: 3
    },
    { 
      id: '2', 
      name: 'Team Nebula', 
      members: ['Diana Prince', 'Eve Torres', 'Frank Castle'],
      leader: 'Diana Prince',
      progress: 72,
      commits: 42,
      additions: 890,
      deletions: 210,
      lastActive: '5h ago',
      repoUrl: 'https://github.com/team/nebula',
      tech: ['Python', 'FastAPI', 'PostgreSQL'],
      activityScore: 76,
      sprintVelocity: 34,
      coverage: 82,
      openPRs: 5
    },
    { 
      id: '3', 
      name: 'Team Phoenix', 
      members: ['Grace Hopper', 'Henry Ford', 'Ivy Chen'],
      leader: 'Grace Hopper',
      progress: 45,
      commits: 25,
      additions: 450,
      deletions: 120,
      lastActive: '1d ago',
      repoUrl: 'https://github.com/team/phoenix',
      tech: ['Vue.js', 'Flask', 'SQLite'],
      activityScore: 52,
      sprintVelocity: 18,
      coverage: 45,
      openPRs: 7
    }
  ]);

  // Generate AI insights
  useEffect(() => {
    if (selectedTeam) {
      const insights = [
        {
          id: 1,
          type: 'warning',
          icon: AlertCircle,
          color: '#ff414e',
          message: `${selectedTeam.members[0]} has 40% more commits than team average. Consider pairing with ${selectedTeam.members[2]} for knowledge sharing.`,
          time: 'Just now'
        },
        {
          id: 2,
          type: 'success',
          icon: CheckCircle,
          color: '#ffde22',
          message: `Team velocity increased by 15% this sprint. Great progress!`,
          time: '10m ago'
        },
        {
          id: 3,
          type: 'insight',
          icon: Target,
          color: '#ff8928',
          message: `Code coverage is at ${selectedTeam.coverage}%. Focus on adding tests.`,
          time: '1h ago'
        }
      ];
      setAiInsights(insights);
    }
  }, [selectedTeam]);

  const fetchAnalytics = async (teamId: string) => {
    setLoading(true);
    const team = teams.find(t => t.id === teamId);
    
    setTimeout(() => {
      const mockData = {
        summary: { 
          total_commits: team?.commits || 65, 
          total_contributors: team?.members.length || 3,
          total_additions: team?.additions || 1240,
          total_deletions: team?.deletions || 320,
          active_days: 22
        },
        contributors: team?.members.map((name, i) => ({
          name,
          progress: i === 0 ? 85 : i === 1 ? 72 : 45,
          commits: i === 0 ? 65 : i === 1 ? 42 : 25,
          additions: i === 0 ? 1240 : i === 1 ? 890 : 450,
          deletions: i === 0 ? 320 : i === 1 ? 210 : 120,
          activity_score: i === 0 ? 98 : i === 1 ? 76 : 52
        })) || [],
        timeline: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          commits: Math.floor(Math.random() * 15) + 5
        }))
      };
      setAnalytics(mockData);
      setLoading(false);
    }, 500);
  };

  const handleAddGroup = (newGroup: any) => {
    const team: Team = {
      id: `team_${teams.length + 1}`,
      name: newGroup.name,
      members: newGroup.members,
      leader: newGroup.leader,
      progress: 0,
      commits: 0,
      additions: 0,
      deletions: 0,
      lastActive: 'Just now',
      repoUrl: newGroup.repoUrl,
      tech: ['JavaScript', 'React'],
      activityScore: 0,
      sprintVelocity: 0,
      coverage: 0,
      openPRs: 0
    };
    setTeams([...teams, team]);
    setShowAddModal(false);
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.members.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalStats = {
    groups: teams.length,
    commits: teams.reduce((acc, t) => acc + t.commits, 0),
    avgProgress: Math.round(teams.reduce((acc, t) => acc + t.progress, 0) / teams.length),
    students: new Set(teams.flatMap(t => t.members)).size
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Header */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10,10,10,0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
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
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Guide Dashboard</h1>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Monitor student team performance</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '0.75rem', top: '0.625rem', width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search teams..."
                  style={{
                    padding: '0.5rem 0.5rem 0.5rem 2rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    color: '#ffffff',
                    outline: 'none',
                    width: '200px'
                  }}
                />
              </div>
              
              {/* Add Team Button */}
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                  color: '#000',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus style={{ width: '1rem', height: '1rem' }} />
                New Team
              </button>
              
              {/* View Toggle */}
              <div style={{ display: 'flex', padding: '0.25rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: viewMode === 'grid' ? '#ffde22' : 'transparent',
                    color: viewMode === 'grid' ? '#000' : 'rgba(255,255,255,0.6)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Grid style={{ width: '1rem', height: '1rem' }} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: viewMode === 'list' ? '#ffde22' : 'transparent',
                    color: viewMode === 'list' ? '#000' : 'rgba(255,255,255,0.6)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <List style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.removeItem('devai_user');
                  router.push('/login');
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogOut style={{ width: '1rem', height: '1rem' }} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Commits', value: totalStats.commits, icon: GitCommit, color: '#ffde22' },
            { label: 'Avg Progress', value: `${totalStats.avgProgress}%`, icon: Target, color: '#ff8928' },
            { label: 'Active Students', value: totalStats.students, icon: UserCircle, color: '#ff414e' },
            { label: 'Code Quality', value: '92%', icon: Award, color: '#ffde22' }
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${stat.color}20`
                }}>
                  <stat.icon style={{ width: '1.5rem', height: '1.5rem', color: stat.color }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Left Column - Teams List */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>Student Teams</h2>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Manage and monitor all active teams</p>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => {
                      setSelectedTeam(team);
                      fetchAnalytics(team.id);
                    }}
                    style={{
                      padding: '1rem',
                      marginBottom: '1rem',
                      backgroundColor: selectedTeam?.id === team.id ? 'rgba(255,222,34,0.1)' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255,222,34,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <GitBranch style={{ width: '1.25rem', height: '1.25rem', color: '#ffde22' }} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ fontWeight: '600', margin: 0 }}>{team.name}</h3>
                            {team.leader && (
                              <span style={{
                                padding: '0.125rem 0.5rem',
                                backgroundColor: 'rgba(255,222,34,0.2)',
                                color: '#ffde22',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}>
                                <Crown style={{ width: '0.75rem', height: '0.75rem' }} />
                                {team.leader.split(' ')[0]}
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: '0.25rem 0 0 0' }}>
                            {team.members.length} members • {team.commits} commits • {team.lastActive}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontWeight: '600', margin: 0 }}>{team.progress}%</p>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>progress</p>
                        </div>
                        <ChevronRight style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255,255,255,0.2)' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Panel */}
            {selectedTeam && (
              <div style={{
                marginTop: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{selectedTeam.name} Analytics</h3>
                  <button
                    onClick={() => setSelectedTeam(null)}
                    style={{
                      padding: '0.25rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronDown style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
                ) : (
                  <AnalyticsChart data={analytics} />
                )}
              </div>
            )}
          </div>

          {/* Right Column - AI Insights */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #ffde22, #ff8928)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Brain style={{ width: '1rem', height: '1rem', color: '#000' }} />
                </div>
                <h3 style={{ fontWeight: '600', margin: 0 }}>DevAI Assistant</h3>
              </div>
              
              {selectedTeam ? (
                aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    style={{
                      padding: '1rem',
                      marginBottom: '0.75rem',
                      backgroundColor: `${insight.color}10`,
                      border: `1px solid ${insight.color}30`,
                      borderRadius: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <insight.icon style={{ width: '1.25rem', height: '1.25rem', color: insight.color, flexShrink: 0 }} />
                      <p style={{ fontSize: '0.875rem', margin: 0 }}>{insight.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '2rem' }}>
                  Select a team to see insights
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Group Modal */}
      {showAddModal && (
        <AddGroupModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddGroup}
        />
      )}
    </div>
  );
}