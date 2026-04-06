import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShieldCheck, Activity, TrendingUp, AlertCircle, PieChart as PieIcon, LayoutDashboard, Sparkles } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Premium Color palettes for charts
    const COLORS_ROLE = ['#6366f1', '#10b981', '#f59e0b']; // Indigo, Emerald, Amber
    const COLORS_RISK = ['#f43f5e', '#fbbf24', '#10b981', '#64748b']; // Rose, Amber, Emerald, Slate

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users/dashboard-stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
                setError("Failed to load analytics data.");
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Aggregating Intel...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-red-50/80 backdrop-blur-md text-red-600 rounded-[2.5rem] border border-red-100 flex flex-col items-center text-center">
            <AlertCircle size={48} className="mb-4" />
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">System Access Error</h3>
            <p className="font-medium text-red-400">{error}</p>
        </div>
    );

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={12} className="text-indigo-400" /> Administrative Nexus
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Analytics.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        A real-time, AI-driven overview of institutional engagement and student risk architecture.
                    </p>
                </div>
                
                <div className="hidden lg:flex flex-col items-end p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/50 animate-fade-in-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</span>
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                        DATA SYNCED: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="group relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-slate-200/30 p-8 border border-white hover:bg-white/60 transition-all duration-500">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Users size={16} /> Total Registered Users
                            </h3>
                            <div className="text-7xl font-black text-slate-900 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                                {stats?.summary?.total_users || 0}
                            </div>
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                                <TrendingUp size={12} /> Active Directory
                            </div>
                        </div>
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                             <LayoutDashboard size={32} />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-slate-200/30 p-8 border border-white hover:bg-white/60 transition-all duration-500">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity size={16} /> Tracked Student Assets
                            </h3>
                            <div className="text-7xl font-black text-slate-900 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                                {stats?.summary?.total_students || 0}
                            </div>
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                <Sparkles size={12} /> Live Monitoring
                            </div>
                        </div>
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                             <TrendingUp size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

                {/* User Roles Bar Chart */}
                <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-slate-200/30 p-10 border border-white hover:shadow-indigo-500/5 transition-all">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Role Distribution</h3>
                            <p className="text-slate-400 font-medium text-sm">Quantifiable user access segments.</p>
                        </div>
                        <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                            <PieIcon size={20} />
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stats?.charts?.roles_distribution || []}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                                    padding={{ left: 20, right: 20 }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 16 }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                                                    <p className="text-2xl font-black text-indigo-600">{payload[0].value} <span className="text-xs text-slate-400">Users</span></p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="value" radius={[12, 12, 12, 12]} maxBarSize={45}>
                                    {
                                        (stats?.charts?.roles_distribution || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS_ROLE[index % COLORS_ROLE.length]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Student Risk Pie Chart */}
                <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-slate-200/30 p-10 border border-white hover:shadow-indigo-500/5 transition-all flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Risk Architecure</h3>
                            <p className="text-slate-400 font-medium text-sm">Categorized predictive risk stratification.</p>
                        </div>
                        <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="h-80 w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.charts?.risk_distribution || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={115}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {
                                        (stats?.charts?.risk_distribution || []).map((entry, index) => {
                                            let fill = COLORS_RISK[3];
                                            const n = entry.name.toLowerCase();
                                            if (n === 'high') fill = COLORS_RISK[0];
                                            if (n === 'moderate' || n === 'medium') fill = COLORS_RISK[1];
                                            if (n === 'low') fill = COLORS_RISK[2];

                                            return <Cell key={`cell-${index}`} fill={fill} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                                        })
                                    }
                                </Pie>
                                <Tooltip
                                     content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].name}</p>
                                                    <p className="text-2xl font-black text-slate-900">{payload[0].value} <span className="text-xs text-slate-400">Students</span></p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36} 
                                    iconType="circle" 
                                    formatter={(value) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center display for donuts */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total</p>
                             <p className="text-3xl font-black text-slate-900">{stats?.summary?.total_students || 0}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
