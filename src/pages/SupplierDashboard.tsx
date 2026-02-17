
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload, DollarSign, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierDashboard() {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Supplier Dashboard</h1>
                    <p className="text-muted mt-1">Manage your active deals and create new group buys.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/analytics"
                        className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-white/10"
                    >
                        <Users className="w-5 h-5 text-secondary" /> Analytics
                    </Link>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" /> Create New Deal
                    </button>
                </div>
            </div>

            {isCreating ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Create New Deal</h2>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="text-muted hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Deal Title</label>
                            <input
                                type="text"
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="e.g. Premium Arabica Coffee Beans"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Description</label>
                            <textarea
                                rows={4}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Describe the product and the deal..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Original Price</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                    <input
                                        type="number"
                                        className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Target Price</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                    <input
                                        type="number"
                                        className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Min Quantity</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                    <input
                                        type="number"
                                        className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Duration (Days)</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                    <input
                                        type="number"
                                        className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="7"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Product Image URL</label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                <input
                                    type="url"
                                    className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-indigo-600 text-white py-3 rounded-lg font-bold transition-colors">
                            Launch Deal
                        </button>
                    </form>
                </motion.div>
            ) : (
                <div className="bg-surface border border-white/10 rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-muted" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No active deals</h3>
                    <p className="text-muted mb-6">You haven't created any deals yet. Start your first group buy today.</p>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="text-primary hover:text-indigo-400 font-medium"
                    >
                        Create a new deal
                    </button>
                </div>
            )}
        </div>
    );
}
