import React, { useState, useEffect } from 'react';
import { 
    Bell, Shield, Monitor, CheckCircle, Sparkles, 
    Zap, Lock, Eye, Moon, Sun, Smartphone, 
    ArrowRight, Save, ShieldCheck
} from 'lucide-react';

const Settings = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            emailNotifs: true,
            smsNotifs: false,
            darkMode: false,
            twoFactor: false
        };
    });

    useEffect(() => {
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }, [settings]);

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setSuccessMsg('System preferences synchronized.');
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const Toggle = ({ enabled, onChange, icon: Icon }) => (
        <button
            onClick={onChange}
            className={`relative flex items-center h-10 w-20 rounded-full transition-all duration-500 outline-none p-1 shadow-inner
                ${enabled ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-slate-200 shadow-slate-100'}`}
        >
            <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-xl transition-all duration-500 transform
                ${enabled ? 'translate-x-10 rotate-[360deg]' : 'translate-x-0'}`}>
                {Icon && <Icon size={14} className={enabled ? 'text-indigo-600' : 'text-slate-400'} />}
            </div>
        </button>
    );

    return (
        <div className="relative space-y-12 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Lock size={12} className="text-indigo-400" /> Preferences Nexus
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Config.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Customize your environment, manage notification vectors, and tighten account security protocols.
                    </p>
                </div>
            </div>

            <div className="relative z-10 bg-white/40 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white overflow-hidden divide-y divide-slate-100/50">
                
                {successMsg && (
                    <div className="p-8 bg-emerald-50/80 backdrop-blur-md flex items-center gap-4 border-b border-emerald-100 animate-fade-in">
                        <div className="p-2 bg-emerald-600 text-white rounded-xl">
                            <CheckCircle size={20} />
                        </div>
                        <p className="font-black text-xs uppercase tracking-widest text-emerald-700">{successMsg}</p>
                    </div>
                )}

                {/* Notifications Section */}
                <div className="p-10 md:p-12 group hover:bg-white/40 transition-colors">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                            <Bell size={28} />
                        </div>
                        <div>
                             <h2 className="text-2xl font-black text-slate-900 tracking-tight">Notification Vectors</h2>
                             <p className="text-slate-400 font-medium text-sm">Control how telemetry updates are delivered.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-between p-8 bg-white/60 rounded-[2.5rem] border border-slate-50 hover:shadow-xl transition-all group/toggle">
                            <div>
                                <p className="text-lg font-black text-slate-800 tracking-tight mb-1">Email Broadcasts</p>
                                <p className="text-xs font-bold text-slate-400">Direct academic interventions</p>
                            </div>
                            <Toggle enabled={settings.emailNotifs} onChange={() => handleToggle('emailNotifs')} icon={Mail} />
                        </div>

                        <div className="flex items-center justify-between p-8 bg-white/60 rounded-[2.5rem] border border-slate-50 hover:shadow-xl transition-all group/toggle">
                            <div>
                                <p className="text-lg font-black text-slate-800 tracking-tight mb-1">SMS Gateway</p>
                                <p className="text-xs font-bold text-slate-400">Critical real-time alerts</p>
                            </div>
                            <Toggle enabled={settings.smsNotifs} onChange={() => handleToggle('smsNotifs')} icon={Smartphone} />
                        </div>
                    </div>
                </div>

                {/* Visual Architecture Section */}
                <div className="p-10 md:p-12 group hover:bg-white/40 transition-colors">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                            <Monitor size={28} />
                        </div>
                        <div>
                             <h2 className="text-2xl font-black text-slate-900 tracking-tight">Environment Ethics</h2>
                             <p className="text-slate-400 font-medium text-sm">Define your visual interface parameters.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-8 bg-white/60 rounded-[2.5rem] border border-slate-50 hover:shadow-xl transition-all group/toggle max-w-md">
                        <div className="flex items-center gap-4">
                             <div className={`p-4 rounded-2xl transition-colors ${settings.darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                                 {settings.darkMode ? <Moon size={24} /> : <Sun size={24} />}
                             </div>
                             <div>
                                <p className="text-lg font-black text-slate-800 tracking-tight mb-1">High-Contrast Mode</p>
                                <p className="text-xs font-bold text-slate-400">Initialize dark interface protocol</p>
                             </div>
                        </div>
                        <Toggle enabled={settings.darkMode} onChange={() => handleToggle('darkMode')} icon={settings.darkMode ? Moon : Sun} />
                    </div>
                </div>

                {/* Security Protocol Section */}
                <div className="p-10 md:p-12 group hover:bg-white/40 transition-colors">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                             <h2 className="text-2xl font-black text-slate-900 tracking-tight">Security Hardening</h2>
                             <p className="text-slate-400 font-medium text-sm">Fortify account access with advanced protocols.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-8 bg-white/60 rounded-[2.5rem] border border-slate-50 hover:shadow-xl transition-all group/toggle max-w-md">
                        <div>
                            <p className="text-lg font-black text-slate-800 tracking-tight mb-1">2FA Reinforcement</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Biometric / OTP Nexus</p>
                        </div>
                        <Toggle enabled={settings.twoFactor} onChange={() => handleToggle('twoFactor')} icon={Lock} />
                    </div>
                </div>

                {/* Action Sector */}
                <div className="p-10 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-white/30 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-default">
                         <Sparkles size={24} className="text-indigo-400" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                             Preference Changes Are <br />
                             <span className="text-white/60">Persistent Across Sessions</span>
                         </span>
                    </div>
                    
                    <button 
                        onClick={handleSave}
                        className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                    >
                         <span className="relative z-10 flex items-center gap-2">
                             COMMIT PREFERENCES <Save size={18} />
                         </span>
                    </button>
                </div>
            </div>
            
            <div className="text-center py-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <div className="inline-flex items-center gap-12 font-black text-[10px] uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2">
                        <Eye size={18} className="text-indigo-600" /> Interface Privacy
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-indigo-600" /> Real-time Sync
                    </div>
                </div>
            </div>
        </div>
    );
};

const Mail = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

export default Settings;
