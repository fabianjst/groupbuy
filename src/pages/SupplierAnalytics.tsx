
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, Package, Users, Activity, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierAnalytics() {
    // Mock data for charts
    const monthlyRevenue = [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 85, 95];
    const maxRevenue = Math.max(...monthlyRevenue);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white">Supplier Analytics</h1>
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" /> PREMIUM
                        </span>
                    </div>
                    <p className="text-muted mt-1">Deep insights into your sales performance and customer engagement.</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted">
                    Last updated: Just now
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <KpiCard
                    title="Total Revenue"
                    value="€124,592"
                    change="+12.5%"
                    isPositive={true}
                    icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
                />
                <KpiCard
                    title="Units Sold"
                    value="8,450"
                    change="+5.2%"
                    isPositive={true}
                    icon={<Package className="w-6 h-6 text-blue-400" />}
                />
                <KpiCard
                    title="Active Participants"
                    value="1,240"
                    change="-2.1%"
                    isPositive={false}
                    icon={<Users className="w-6 h-6 text-purple-400" />}
                />
                <KpiCard
                    title="Avg. Deal Size"
                    value="€185"
                    change="+8.4%"
                    isPositive={true}
                    icon={<TrendingUp className="w-6 h-6 text-pink-400" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-surface border border-white/10 rounded-xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Revenue Overview
                        </h3>
                        <select className="bg-slate-800 border border-slate-700 rounded-lg text-sm text-white px-2 py-1 focus:outline-none cursor-pointer">
                            <option>Last 12 Months</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2">
                        {monthlyRevenue.map((value, index) => (
                            <div key={index} className="w-full h-full flex flex-col items-center gap-2 group">
                                <div className="w-full relative h-full flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(value / maxRevenue) * 100}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="w-full bg-emerald-500 rounded-t-sm relative group-hover:opacity-80 transition-opacity"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            €{value}k
                                        </div>
                                    </motion.div>
                                </div>
                                <span className="text-xs text-muted">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-surface border border-white/10 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-secondary" />
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-muted shrink-0">
                                    U{i}
                                </div>
                                <div>
                                    <p className="text-sm text-white">
                                        <span className="font-bold">User {i}24</span> joined <span className="text-primary">Coffee Bulk Buy</span>
                                    </p>
                                    <p className="text-xs text-muted mt-1">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            {/* Secondary Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Category Performance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-surface border border-white/10 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-400" />
                        Sales by Category
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Food', value: 45000, color: 'bg-emerald-500', percent: '36%' },
                            { name: 'Beverage', value: 32000, color: 'bg-blue-500', percent: '25%' },
                            { name: 'Packaging', value: 28000, color: 'bg-yellow-500', percent: '22%' },
                            { name: 'Cleaning', value: 19592, color: 'bg-purple-500', percent: '15%' },
                        ].map((category, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white">{category.name}</span>
                                    <div className="flex gap-4">
                                        <span className="text-white font-medium">€{category.value.toLocaleString()}</span>
                                        <span className="text-muted w-8 text-right">{category.percent}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: category.percent }}
                                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                                        className={`h-full ${category.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Conversion Funnel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-surface border border-white/10 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Conversion Funnel
                    </h3>
                    <div className="space-y-6">
                        {[
                            { stage: 'Page Views', value: 12500, conv: '100%', width: '100%', color: 'bg-indigo-500' },
                            { stage: 'Add to Cart', value: 3200, conv: '25.6%', width: '25.6%', color: 'bg-indigo-400' },
                            { stage: 'Joined Deal', value: 2100, conv: '65.6%', width: '16.8%', color: 'bg-indigo-300' }, // 2100/3200
                            { stage: 'Paid', value: 1950, conv: '92.8%', width: '15.6%', color: 'bg-indigo-200' }, // 1950/2100
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center justify-between mb-2 z-10 relative">
                                    <span className="text-sm font-medium text-white">{step.stage}</span>
                                    <span className="text-sm font-bold text-white">{step.value.toLocaleString()}</span>
                                </div>
                                <div className="h-10 bg-white/5 rounded-lg relative overflow-hidden flex items-center px-3">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: step.width }} // Visual width relative to total views for funnel effect
                                        transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                                        className={`absolute bg-current opacity-20 left-0 top-0 bottom-0 ${step.color.replace('bg-', 'text-')}`}
                                    />
                                    {index > 0 && (
                                        <span className="text-xs text-green-400 ml-auto flex items-center gap-1 font-bold">
                                            {step.conv} conv.
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, change, isPositive, icon }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {change}
                </div>
            </div>
            <h3 className="text-muted text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </motion.div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 019 15z" clipRule="evenodd" />
        </svg>
    );
}
