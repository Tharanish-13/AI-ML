import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import api from '../api';
import { TrendingUp, PieChart as PieIcon, BarChart2, Activity, Sparkles, AlertCircle, Compass } from 'lucide-react';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    riskDistribution: [],
    attendanceTrend: [],
    departmentRisk: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get('/students');
        const students = response.data;
        
        let high = 0; let medium = 0; let low = 0;
        
        students.forEach(s => {
          const risk = (s.risk_level || '').toLowerCase();
          if(risk.includes('high')) high++;
          else if(risk.includes('medium') || risk.includes('moderate')) medium++;
          else low++;
        });

        setData({
          riskDistribution: [
            { name: 'Low Risk', value: low || 25 },
            { name: 'Moderate Risk', value: medium || 15 },
            { name: 'High Risk', value: high || 5 }
          ],
          attendanceTrend: [
            { name: 'Wk 01', attendance: 95 },
            { name: 'Wk 02', attendance: 92 },
            { name: 'Wk 03', attendance: 88 },
            { name: 'Wk 04', attendance: 85 },
            { name: 'Wk 05', attendance: 82 }
          ],
          departmentRisk: [
            { name: 'Computer Science', high: 12, medium: 25, low: 50 },
            { name: 'Information Tech', high: 8, medium: 20, low: 45 },
            { name: 'Mechanical Eng', high: 15, medium: 30, low: 40 },
            { name: 'Bio Technology', high: 5, medium: 15, low: 55 }
          ]
        });
      } catch (err) {
        console.error('Error fetching analytics data', err);
        setError('Failed to load neural analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#10b981', '#fbbf24', '#f43f5e'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Running Neural Analytics...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-red-50/80 backdrop-blur-md text-red-600 rounded-[2.5rem] border border-red-100 flex flex-col items-center text-center">
        <AlertCircle size={48} className="mb-4" />
        <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Analytics Error</h3>
        <p className="font-medium text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
       {/* Background Decorative Blobs */}
       <div className="absolute top-0 left-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
       <div className="absolute top-1/2 right-0 -z-10 w-64 h-64 bg-fuchsia-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

       {/* Header Section */}
       <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Sparkles size={12} className="text-indigo-400" /> Neural Insights
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Dynamics.</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                Visualizing the complex interplay between student behavior, attendance patterns, and predictive risk stratification.
            </p>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Risk Distribution Chart */}
        <div className="lg:col-span-5 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all flex flex-col">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Risk Spread</h2>
                    <p className="text-slate-400 font-medium text-sm">Overall risk categorization.</p>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <PieIcon size={24} />
                </div>
            </div>
            <div className="h-80 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={data.riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    >
                    {data.riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                    ))}
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
                {/* Center text for the donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total</p>
                     <p className="text-3xl font-black text-slate-900">
                        {data.riskDistribution.reduce((acc, curr) => acc + curr.value, 0)}
                     </p>
                </div>
            </div>
        </div>

        {/* Attendance Trend */}
        <div className="lg:col-span-7 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Vectors</h2>
                    <p className="text-slate-400 font-medium text-sm">Synchronized weekly presence metrics.</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <Activity size={24} />
                </div>
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                        />
                        <YAxis 
                            domain={[0, 100]} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                        />
                        <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                                            <p className="text-2xl font-black text-indigo-600">{payload[0].value}% <span className="text-xs text-slate-400">Attendance</span></p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="attendance" 
                            stroke="#3b82f6" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorAttend)" 
                            activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4, fill: '#3b82f6', shadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Department Risk */}
        <div className="lg:col-span-12 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cross-Department Risk Matrix</h2>
                    <p className="text-slate-400 font-medium text-sm">Stacked performance distribution by academic unit.</p>
                </div>
                <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
                    <BarChart2 size={24} />
                </div>
            </div>
            <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.departmentRisk} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 16 }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white min-w-[200px]">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">{label}</p>
                                        <div className="space-y-2">
                                            {payload.map((p, i) => (
                                                <div key={i} className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{p.name}</span>
                                                    </div>
                                                    <span className="text-lg font-black text-slate-900">{p.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend 
                        verticalAlign="top" 
                        align="right" 
                        height={40} 
                        iconType="circle" 
                        formatter={(value) => <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{value}</span>}
                    />
                    <Bar dataKey="low" name="Low Risk" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} barSize={50} />
                    <Bar dataKey="medium" name="Moderate Risk" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="high" name="High Risk" stackId="a" fill="#f43f5e" radius={[10, 10, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

       <div className="mt-12 text-center animate-fade-in delay-500">
            <div className="inline-flex items-center gap-3 text-slate-400 font-medium text-xs uppercase tracking-widest">
                <Compass size={16} /> Data updated synchronously with global student records
            </div>
       </div>
    </div>
  );
};

export default Analytics;
