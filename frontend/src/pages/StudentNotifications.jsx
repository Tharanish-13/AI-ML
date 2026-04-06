import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Bell, AlertCircle, CheckCircle, Sparkles, 
    ArrowRight, Clock, ShieldCheck, Mail, Megaphone 
} from 'lucide-react';

const StudentNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/actions/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError('Neural inbox synchronization failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-100/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-100/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Bell size={12} className="text-indigo-400" /> Neural Inbox
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4 text-center lg:text-left">
                    System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Alerts.</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed text-center lg:text-left">
                    Real-time administrative interventions and automated performance insights transmitted to your account.
                </p>
            </div>

            <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-10 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white min-h-[500px] group">
                {/* Decorative blob */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors" />

                {error && (
                    <div className="mb-10 p-6 bg-red-50/80 backdrop-blur-md text-red-600 rounded-3xl border border-red-100 flex items-center gap-4 animate-shake">
                         <AlertCircle size={24} className="flex-shrink-0" />
                         <p className="font-black text-sm uppercase tracking-tight">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] animate-pulse">Syncing Encrypted Inbox...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="py-24 text-center flex flex-col items-center bg-white/40 border-2 border-dashed border-slate-100 rounded-[3rem] animate-fade-in group/empty hover:bg-white/60 transition-all duration-500">
                        <div className="relative mb-8">
                            <div className="absolute -inset-6 bg-emerald-500/10 rounded-full blur-xl group-hover/empty:scale-150 transition-transform"></div>
                            <div className="relative w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-xl group-hover/empty:rotate-12 transition-transform">
                                <CheckCircle size={40} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Neural Link Clear.</h3>
                        <p className="text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
                            No active administrative interventions or systemic warnings detected in your sector.
                        </p>
                        
                        <div className="mt-12 flex items-center gap-6 opacity-30 grayscale group-hover/empty:opacity-100 group-hover/empty:grayscale-0 transition-all duration-1000">
                             <div className="flex items-center gap-2">
                                 <ShieldCheck size={18} className="text-emerald-600" />
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Sync: 100%</span>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {notifications.map((notif, idx) => (
                            <div 
                                key={notif.id} 
                                className="group/item bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Indicator border */}
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600 group-hover/item:bg-violet-600 transition-colors"></div>
                                
                                <div className="flex flex-col md:flex-row items-start gap-8">
                                    <div className="mt-1 flex-shrink-0 bg-indigo-50 p-5 rounded-2xl text-indigo-600 group-hover/item:rotate-6 transition-transform">
                                        <Megaphone size={28} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                            <div className="space-y-1">
                                                <div className="text-lg font-black text-slate-900 tracking-tight">Support Intervention</div>
                                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                                     <Mail size={12} /> Institutional Broadcast
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {new Date(notif.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        <div className="text-slate-600 font-bold leading-relaxed bg-slate-50/50 p-6 rounded-3xl border border-slate-50 whitespace-pre-wrap group-hover/item:bg-white transition-colors">
                                            {notif.message}
                                        </div>

                                        <div className="flex justify-end pt-2">
                                             <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest group/btn hover:text-indigo-800 transition-colors">
                                                 Acknowledge Receipt <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                             </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="mt-12 text-center animate-fade-in delay-500">
                <div className="inline-flex items-center gap-3 text-slate-400 font-medium text-xs uppercase tracking-widest">
                    <Sparkles size={16} /> Automated neural feedback integrated with your profile
                </div>
            </div>
        </div>
    );
};

export default StudentNotifications;
