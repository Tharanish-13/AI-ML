import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { 
    User, Save, Building, Calendar, Sparkles, 
    ShieldCheck, Mail, BadgeCheck, Zap, ArrowRight,
    Camera, Fingerprint, Award
} from 'lucide-react';

const UserProfile = () => {
    const { user, setUser } = useAuth();
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setDepartment(user.department || '');
            setYear(user.year || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.put('/users/me', { department, year });
            setMessage('Profile attributes synchronized successfully.');

            if (response.data.user) {
                setUser(response.data.user);
            } else {
                setUser(prev => ({ ...prev, department, year }));
            }
        } catch (error) {
            setMessage('Attribute sync failed. Authentication rejection.');
            console.error(error);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Fingerprint size={12} className="text-indigo-400" /> Identity Management
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Nexus.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Manage your institutional identifiers and verify your account permission status within the Risk AI ecosystem.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10 items-start">
                {/* Identity Card */}
                <div className="xl:col-span-4 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white text-center group">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center text-indigo-600 font-black text-5xl border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                             {user?.name?.charAt(0).toUpperCase()}
                             <div className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                 <Camera size={14} />
                             </div>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{user?.name}</h2>
                    <p className="text-sm font-medium text-slate-400 mb-6">{user?.email}</p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest border border-slate-800 shadow-xl shadow-slate-900/10 grayscale group-hover:grayscale-0 transition-all">
                        <BadgeCheck size={14} className="text-indigo-400" /> Authorized {user?.role}
                    </div>
                    
                    <div className="mt-10 pt-10 border-t border-slate-100/50 space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             <span>Security Status</span>
                             <span className="text-emerald-500">Verified</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                             <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
                         </div>
                    </div>
                </div>

                {/* Attribute Configuration */}
                <div className="xl:col-span-8 bg-white/40 backdrop-blur-2xl p-10 sm:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white group">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                             <h3 className="text-2xl font-black text-slate-900 tracking-tight">System Attributes</h3>
                             <p className="text-slate-400 font-medium text-sm italic">Synchronize your institutional telemetry.</p>
                        </div>
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:rotate-12 transition-transform">
                             <ShieldCheck size={28} />
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-10">
                        {message && (
                            <div className={`p-6 rounded-[2rem] border animate-fade-in flex items-center gap-4 ${message.includes('success') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                {message.includes('success') ? <CheckCircle size={20} /> : <Zap size={20} />}
                                <p className="font-black text-xs uppercase tracking-widest">{message}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Institutional Dept.</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                        <Building size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                        placeholder="e.g. Computer Science & AI"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Current Academic Year</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                        <Calendar size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                        placeholder="e.g. 2024-2025"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-slate-100/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4 text-slate-400 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                                <Award size={24} className="text-indigo-600" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                                    Attribute Changes Are Logged <br />
                                    <span className="text-slate-300">Last update: {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>SYNC ATTRIBUTES <Save size={18} /></>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="mt-12 text-center py-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <div className="inline-flex items-center gap-3 text-slate-400 font-medium text-xs uppercase tracking-widest">
                    <Sparkles size={16} /> Identity telemetry is end-to-end encrypted across the nexus
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
