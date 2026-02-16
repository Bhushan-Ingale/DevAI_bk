'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Github, UserCog } from 'lucide-react';

interface Group {
    name: string;
    repoUrl: string;
    leader: string;
    members: string[];
}

interface AddGroupModalProps {
    onClose: () => void;
    onSubmit: (group: Group) => void;
}

export default function AddGroupModal({
    onClose,
    onSubmit,
}: AddGroupModalProps) {
    const [name, setName] = useState<string>('');
    const [repoUrl, setRepoUrl] = useState<string>('');
    const [leader, setLeader] = useState<string>('');
    const [members, setMembers] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const membersList: string[] = members
            .split(',')
            .map((m) => m.trim())
            .filter((m) => m.length > 0);

        if (leader && !membersList.includes(leader)) {
            membersList.unshift(leader);
        }

        const newGroup: Group = {
            name: name.trim(),
            repoUrl: repoUrl.trim(),
            leader: leader.trim(),
            members: membersList,
        };

        onSubmit(newGroup);
        onClose(); // optional but usually expected UX
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-indigo-950/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-indigo-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Create New Team
                            </h2>
                        </div>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-indigo-600" />
                        </motion.button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-indigo-900 mb-2">
                                Team Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="e.g., Team Quantum"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                Repository URL
                            </label>
                            <input
                                type="url"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                                <UserCog className="w-4 h-4" />
                                Team Leader
                            </label>
                            <input
                                type="text"
                                value={leader}
                                onChange={(e) => setLeader(e.target.value)}
                                className="w-full px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                placeholder="Full name of team leader"
                                required
                            />
                            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                Team leader will have additional privileges
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-indigo-900 mb-2">
                                Team Members
                            </label>
                            <textarea
                                value={members}
                                onChange={(e) => setMembers(e.target.value)}
                                className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                placeholder="Alice Chen, Bob Smith, Charlie Brown"
                                rows={3}
                                required
                            />
                            <p className="text-xs text-indigo-500 mt-2">
                                Separate names with commas. Leader will be automatically added.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                Create Team
                            </motion.button>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="flex-1 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition-all border border-indigo-200"
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
