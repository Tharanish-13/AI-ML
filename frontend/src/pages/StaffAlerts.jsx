import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    Mail, AlertCircle, CheckCircle, Send, 
    History, User, Sparkles, Megaphone,
    X, ArrowRight, Zap, ShieldAlert
} from 'lucide-react';

const StaffAlerts = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Email Form State
    const [isSending, setIsSending] = useState(false);
    const [emailForm, setEmailForm] = useState({ to_email: '', subject: '', content: '' });
    const [sendSuccess, setSendSuccess] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/actions/all-notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError('Neural communication link disrupted. Failed to load history.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            setIsSending(true);
            setSendSuccess('');
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/actions/email`, emailForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSendSuccess('Communication broadcasted and logged in neural vault.');
            setEmailForm({ to_email: '', subject: '', content: '' });
            fetchNotifications(); // Refresh log
        } catch (err) {
            console.error('Failed to send email:', err);
            alert(err.response?.data?.detail || 'Handshake rejected.');
        } finally {
            setIsSending(false);
            setTimeout(() => setSendSuccess(''), 5000);
        }
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-red-100/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-indigo-100/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <ShieldAlert size={12} className="text-red-400" /> Crisis Protocols
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Staff <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Intervention.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Initiate proactive communication channels and manage the historical log of student support engagements.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10 items-start">
                {/* Intervention Terminal */}
                <div className="xl:col-span-5 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all duration-500 group">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Broadcast Center</h3>
                            <p className="text-slate-400 font-medium text-sm">Direct neural-link to student assets.</p>
                        </div>
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:rotate-12 transition-transform">
                            <Megaphone size={28} />
                        </div>
                    </div>

                    {sendSuccess && (
                        <div className="mb-8 p-6 bg-emerald-50 text-emerald-600 rounded-3xl border border-emerald-100 flex items-center gap-4 animate-fade-in">
                            <CheckCircle size={24} />
                            <p className="font-black text-xs uppercase tracking-widest">{sendSuccess}</p>
                        </div>
                    )}

                    <form onSubmit={handleSendEmail} className="space-y-6">
                        <div className="space-y-3 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-red-600">Target Identity Email</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-red-600 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={emailForm.to_email}
                                    onChange={(e) => setEmailForm({ ...emailForm, to_email: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                    placeholder="student@university.edu"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-red-600">Intervention Vector (Subject)</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-red-600 transition-colors">
                                    <Zap size={20} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={emailForm.subject}
                                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                    placeholder="e.g. Critical Academic Review"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-red-600">Message Payload</label>
                            <textarea
                                required
                                rows={5}
                                value={emailForm.content}
                                onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
                                className="w-full px-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                placeholder="Formalize the intervention advisory here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full relative overflow-hidden group/btn bg-slate-900 text-white py-6 rounded-[2rem] font-black text-lg shadow-2xl shadow-red-500/10 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-4 uppercase tracking-[0.1em]">
                                {isSending ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>BROADCAST ALERT <Send size={24} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" /></>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Intervention Ledger */}
                <div className="xl:col-span-7 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white flex flex-col h-full animate-fade-in-right">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Neural Ledger</h3>
                            <p className="text-slate-400 font-medium text-sm">Chronological log of support operations.</p>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <History size={24} />
                        </div>
                    </div>

                    {error && (
                        <div className="p-6 bg-red-50 text-red-600 rounded-3xl border border-red-100 mb-8 font-bold text-sm uppercase tracking-tight">
                            {error}
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar" style={{ maxHeight: '700px' }}>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Syncing Log Access...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="py-32 text-center flex flex-col items-center bg-slate-50/50 rounded-[2.5rem] border border-slate-100 border-dashed">
                                <AlertCircle size={48} className="text-slate-200 mb-4" />
                                <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Nexus Clear.</h4>
                                <p className="text-slate-400 font-medium">No prior support interventions detected in this sector.</p>
                            </div>
                        ) : (
                            notifications.map((notif, idx) => (
                                <div 
                                    key={notif.id} 
                                    className="group bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-6 hover:bg-white hover:shadow-xl transition-all duration-300"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">
                                                {notif.student_email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800 tracking-tight">{notif.student_email}</div>
                                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> BROADCAST SUCCESS
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] rounded-lg border border-slate-100">
                                            {new Date(notif.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    
                                    <div className="text-sm font-bold text-slate-600 leading-relaxed bg-slate-50/80 p-5 rounded-2xl border border-slate-100 whitespace-pre-wrap group-hover:bg-white transition-colors">
                                        {notif.message}
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                         <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 group/link">
                                             Trace Origin <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                         </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffAlerts;
