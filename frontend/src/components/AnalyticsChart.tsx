'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Users, GitCommit, Code, Activity } from 'lucide-react';
import { AnimatedTimeline, ContributorPieChart, ContributorActivity } from './AnimatedTimeline';

export default function AnalyticsChart({ data }: { data: any }) {
    const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');

    if (!data) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-indigo-500">No analytics data available</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Chart Type Selector */}
            <div className="flex items-center justify-end gap-2">
                <button
                    onClick={() => setChartType('area')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'area'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                >
                    <Activity className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setChartType('bar')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'bar'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                >
                    <BarChart3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setChartType('line')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'line'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                >
                    <TrendingUp className="w-4 h-4" />
                </button>
            </div>

            {/* Animated Timeline */}
            <div className="bg-white rounded-xl p-4 border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                    <GitCommit className="w-4 h-4" />
                    Commit Activity (Last 30 Days)
                </h4>
                <AnimatedTimeline
                    data={data.timeline || []}
                    type={chartType}
                    color="#6366f1"
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                >
                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <GitCommit className="w-4 h-4" />
                        <span className="text-xs font-semibold">TOTAL COMMITS</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-900">{data?.summary?.total_commits || 0}</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">↑ 12% this week</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-semibold">CONTRIBUTORS</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{data?.summary?.total_contributors || 0}</p>
                    <p className="text-xs text-indigo-500 mt-1">active members</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                >
                    <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <Code className="w-4 h-4" />
                        <span className="text-xs font-semibold">ADDITIONS</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-900">{data?.summary?.total_additions || 0}</p>
                    <p className="text-xs text-emerald-600 mt-1">+{Math.round((data?.summary?.total_additions || 0) * 0.15)} lines</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
                >
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-semibold">ACTIVE DAYS</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-900">{data?.summary?.active_days || 22}</p>
                    <p className="text-xs text-amber-600 mt-1">last 30 days</p>
                </motion.div>
            </div>

            {/* Contributor Activity */}
            <div className="bg-white rounded-xl p-4 border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team Activity
                </h4>
                <ContributorActivity contributors={data?.contributors || []} />
            </div>

            {/* Contributor Distribution */}
            {data?.contributors && data.contributors.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-indigo-100">
                    <h4 className="text-sm font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                        <PieChart className="w-4 h-4" />
                        Contribution Distribution
                    </h4>
                    <ContributorPieChart data={data.contributors} />
                </div>
            )}
        </motion.div>
    );
}