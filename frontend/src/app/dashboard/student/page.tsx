'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { AnimatedTimeline } from '@/components/AnimatedTimeline';
import { 
  GitCommit, Users, TrendingUp, Code, Award,
  Calendar, ChevronRight, Star, Activity,
  BookOpen, Github, Clock, Brain, ArrowRight,
  Sparkles, CheckCircle, Target, Zap, Crown,
  BarChart3, UserCheck, Medal, LogOut
} from 'lucide-react';

// Animated counter component
const AnimatedCounter = ({ value, label, icon: Icon, color, suffix = '' }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-indigo-100/60 hover:border-indigo-300/80 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-indigo-600/70 font-medium">{label}</p>
          <p className="text-2xl font-semibold text-indigo-900 mt-1">
            {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : '0'}
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-emerald-600 mt-2 font-medium"
          >
            ↑ 12% this week
          </motion.p>
        </div>
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Visible Commit Timeline
const CommitTimeline = () => {
  const commits = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 8 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 10 },
    { day: 'Fri', count: 7 },
    { day: 'Sat', count: 3 },
    { day: 'Sun', count: 5 },
  ];

  const maxCommits = Math.max(...commits.map(c => c.count));

  return (
    <div className="flex items-end justify-between h-32 gap-2 mt-4">
      {commits.map((commit, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(commit.count / maxCommits) * 100}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg hover:from-indigo-600 hover:to-purple-600 transition-all cursor-pointer relative group"
            style={{ minHeight: '4px' }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {commit.count} commits
            </div>
          </motion.div>
          <span className="text-xs text-indigo-600/70 font-medium mt-2">{commit.day}</span>
        </div>
      ))}
    </div>
  );
};

// Team Members with Leader Highlight
const TeamMembersList = ({ members, leader }: { members: any[], leader: string }) => {
  return (
    <div className="space-y-3">
      {members.map((member, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ backgroundColor: '#eef2ff' }}
          className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
            member.name === leader ? 'bg-indigo-50/80 border border-indigo-200' : 'hover:bg-indigo-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center relative ${
              member.name === leader 
                ? 'bg-gradient-to-br from-amber-400 to-yellow-500' 
                : 'bg-gradient-to-br from-indigo-100 to-purple-100'
            }`}>
              <span className={`text-sm font-bold ${
                member.name === leader ? 'text-white' : 'text-indigo-700'
              }`}>
                {member.name[0]}
              </span>
              {member.name === leader && (
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1"
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                </motion.div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-indigo-900">{member.name}</p>
                {member.name === leader && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    Team Leader
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-xs text-indigo-600 font-medium">{member.commits} commits</p>
                <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
                <p className="text-xs text-emerald-600 font-medium">+{member.additions}</p>
                <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
                <p className="text-xs text-rose-600 font-medium">-{member.deletions}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-indigo-700">{member.activity_score}%</p>
              <p className="text-xs text-indigo-500/70">activity</p>
            </div>
            <div className="w-16 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${member.activity_score}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [tabContent, setTabContent] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Mock team data
  const teamData = {
    name: 'Team Quantum',
    leader: 'Shlok Chandankar',
    members: [
      { name: 'Shlok Chandankar', commits: 65, additions: 1240, deletions: 320, activity_score: 98, role: 'leader' },
      { name: 'Bhushan Ingale', commits: 42, additions: 890, deletions: 210, activity_score: 76, role: 'member' },
      { name: 'Pushkar Karnik', commits: 25, additions: 450, deletions: 120, activity_score: 52, role: 'member' },
      { name: 'Tamanna Gupta', commits: 35, additions: 500, deletions: 150, activity_score: 60, role: 'member' },

    ],
    progress: 78,
    sprint: 'Sprint 4/6',
    repo: 'github.com/team-quantum'
  };

  // Tab content handler
  useEffect(() => {
    switch(selectedTab) {
      case 'overview':
        setTabContent({
          title: 'Overview',
          content: (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  Sprint Goal
                </h3>
                <p className="text-indigo-700/70">Complete user authentication flow and API integration</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-indigo-700 font-medium">Progress</span>
                      <span className="text-indigo-700 font-bold">{teamData.progress}%</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${teamData.progress}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-medium">
                    {teamData.sprint}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-xs text-indigo-600/70 font-medium mb-1">Repository</p>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    {teamData.repo}
                  </a>
                </div>
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                  <p className="text-xs text-indigo-600/70 font-medium mb-1">Next Milestone</p>
                  <p className="text-sm font-semibold text-indigo-900">Code Review</p>
                  <p className="text-xs text-indigo-500/70 mt-1">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          )
        });
        break;
      case 'activity':
        const mockTimeline = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          commits: Math.floor(Math.random() * 12) + 3
        }));

        setTabContent({
          title: 'Activity',
          content: (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Your Commit History
                </h4>
                <AnimatedTimeline 
                  data={mockTimeline} 
                  type="area"
                  color="#8b5cf6"
                  height={180}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                  <p className="text-xs text-indigo-600 font-medium mb-1">Best Day</p>
                  <p className="text-xl font-bold text-indigo-900">Wednesday</p>
                  <p className="text-xs text-indigo-500 mt-1">15 commits</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-medium mb-1">Peak Hour</p>
                  <p className="text-xl font-bold text-emerald-900">2-4 PM</p>
                  <p className="text-xs text-emerald-500 mt-1">Most productive</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-semibold text-indigo-900">Recent Commits</h4>
                {[
                  { msg: 'Fix navigation bug in dashboard', time: '2h ago', hash: 'a1b2c3d', repo: 'frontend' },
                  { msg: 'Add user authentication flow', time: '5h ago', hash: 'e4f5g6h', repo: 'api' },
                  { msg: 'Update API endpoints', time: '1d ago', hash: 'i7j8k9l', repo: 'backend' },
                ].map((commit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <GitCommit className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-900">{commit.msg}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-indigo-500">{commit.repo}</span>
                        <span className="text-xs text-indigo-300">•</span>
                        <span className="text-xs font-mono text-indigo-400">{commit.hash}</span>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-500">{commit.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        });
        break;
      case 'team':
        setTabContent({
          title: 'Team',
          content: (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Team Members
                </h3>
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-medium">
                  {teamData.members.length} members
                </span>
              </div>
              <TeamMembersList members={teamData.members} leader={teamData.leader} />
            </div>
          )
        });
        break;
    }
  }, [selectedTab]);

  // Stats
  const stats = [
    { label: 'Total Commits', value: 143, icon: GitCommit, color: 'from-blue-500 to-cyan-500' },
    { label: 'Team Progress', value: 78, icon: Target, color: 'from-emerald-500 to-green-500', suffix: '%' },
    { label: 'Code Quality', value: 92, icon: Award, color: 'from-purple-500 to-pink-500', suffix: '%' },
    { label: 'Contributions', value: 1240, icon: Code, color: 'from-amber-500 to-orange-500', suffix: '+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-indigo-100/60"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
              >
                <Code className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-semibold text-indigo-900">Student Dashboard</h1>
                <p className="text-sm text-indigo-600/70 font-medium">Welcome back, {user?.name || 'Student'}</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border border-indigo-200"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-indigo-700">{teamData.name}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 px-3 py-2 bg-amber-100 rounded-xl border border-amber-200"
              >
                <Medal className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Rank #2</span>
              </motion.div>
              
              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  localStorage.removeItem('devai_user');
                  router.push('/login');
                }}
                className="p-2 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-200 transition-all flex items-center gap-2 px-4 ml-2 border border-rose-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Working Tabs */}
          <div className="flex items-center gap-6 mt-6">
            {['overview', 'activity', 'team'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all ${
                  selectedTab === tab
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-indigo-600/70 hover:text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <AnimatedCounter 
              key={i}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
              suffix={stat.suffix || ''}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100/60 p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
            >
              <h2 className="text-lg font-semibold text-indigo-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                {tabContent?.title}
              </h2>
              {tabContent?.content}
            </motion.div>
          </div>

          {/* Right Column - DevAI Coach & Achievements */}
          <div className="space-y-6">
            {/* DevAI Coach */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur"
                >
                  <Brain className="w-4 h-4 text-white" />
                </motion.div>
                <h3 className="font-medium">DevAI Coach</h3>
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xs bg-white/20 px-2 py-1 rounded-full ml-auto"
                >
                  Active
                </motion.span>
              </div>
              
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 rounded-xl p-4 backdrop-blur border border-white/20"
                >
                  <p className="text-sm text-white mb-2">
                    🔥 You're on fire! 12 commits this week — 30% more than last week!
                  </p>
                  <div className="flex items-center gap-2 text-xs text-indigo-200">
                    <Zap className="w-3 h-3" />
                    <span>Top contributor in your team</span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask DevAI..." 
                    className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Individual Progress */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100/60 p-6 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-indigo-700 font-medium">Weekly Target</span>
                    <span className="text-indigo-700 font-bold">12/15 commits</span>
                  </div>
                  <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-xs text-indigo-600/70">Current Streak</p>
                    <p className="text-lg font-bold text-indigo-700">5 days</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-600/70">Impact Score</p>
                    <p className="text-lg font-bold text-purple-700">92%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}