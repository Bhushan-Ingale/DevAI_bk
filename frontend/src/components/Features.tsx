'use client';

import { motion } from 'framer-motion';
import { Github, BarChart3, Brain, Users, GitCommit, Award, Calendar, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Github,
    title: 'GitHub Integration',
    description: 'Automatically clone and analyze any GitHub repository. Track commits, additions, and deletions per student in real-time.',
    color: 'from-indigo-500 to-blue-500',
    delay: 0.1
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Visualize individual and team progress with commit timelines, activity scores, and code contribution metrics.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get intelligent insights about code quality, collaboration patterns, and personalized recommendations for each student.',
    color: 'from-emerald-500 to-teal-500',
    delay: 0.3
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Create and manage multiple teams, assign team leaders, and monitor group dynamics effortlessly.',
    color: 'from-amber-500 to-orange-500',
    delay: 0.4
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Gamify the learning experience with achievements, streaks, and leaderboards to motivate students.',
    color: 'from-rose-500 to-red-500',
    delay: 0.5
  },
  {
    icon: Calendar,
    title: 'Sprint Tracking',
    description: 'Track sprint progress, velocity, and completion rates. Never miss a deadline with automatic reminders.',
    color: 'from-cyan-500 to-sky-500',
    delay: 0.6
  }
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
          Built for coding courses and team projects
        </h2>
        <p className="text-xl text-indigo-600/70 max-w-3xl mx-auto">
          Everything you need to monitor student progress and provide targeted feedback
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 border border-indigo-100/60 hover:border-indigo-300/80 transition-all hover:shadow-xl"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-indigo-900 mb-3 group-hover:text-indigo-700 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-indigo-600/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { value: '10k+', label: 'Commits Analyzed', icon: GitCommit },
          { value: '50+', label: 'Active Teams', icon: Users },
          { value: '100%', label: 'Automated', icon: Brain },
          { value: '24/7', label: 'Monitoring', icon: Calendar }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-3">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-indigo-900">{stat.value}</div>
              <div className="text-sm text-indigo-600/70">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}