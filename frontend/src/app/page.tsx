'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Code, GitCommit, Users, BarChart3, ArrowRight, Github, Brain } from 'lucide-react'; 

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(user.role === 'guide' ? '/dashboard/guide' : '/dashboard/student');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DevAI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="px-5 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Sign in
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              AI-Powered Academic Project Analytics
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Monitor student{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                project progress
              </span>{' '}
              with AI insights
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              DevAI helps educators automatically analyze student GitHub repositories, 
              track individual contributions, and provide personalized feedback — 
              all without manual code reviews.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.open('https://github.com', '_blank')}
                className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </button>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-500 ml-2">Team Quantum · CS 401 Project</span>
              </div>
              
              <div className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <GitCommit className="w-4 h-4" />
                      <span className="text-xs font-medium">COMMITS</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">142</p>
                    <p className="text-xs text-green-600">+23 this week</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">CONTRIBUTORS</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">4</p>
                    <p className="text-xs text-slate-500">Active members</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Sprint Completion</span>
                    <span className="text-sm font-bold text-indigo-600">78%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[78%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">AI Insight</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Alice has the highest commit frequency. Consider pairing her with Charlie for knowledge sharing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Built for coding courses and team projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to monitor student progress and provide targeted feedback
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-indigo-200/80 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Github className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">GitHub Integration</h3>
            <p className="text-slate-600">
              Automatically clone and analyze any GitHub repository. Track commits, additions, and deletions per student.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-indigo-200/80 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Progress Analytics</h3>
            <p className="text-slate-600">
              Visualize individual and team progress with commit timelines, activity scores, and code contribution metrics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-indigo-200/80 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Feedback</h3>
            <p className="text-slate-600">
              Get intelligent insights about code quality, collaboration patterns, and personalized code generation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}