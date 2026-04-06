import { useEffect, useState } from 'react';
import api from '../api';
import { 
    User, Activity, BookOpen, Clock, AlertTriangle, 
    CheckCircle, Sparkles, Brain, Bell, ArrowRight,
    Target, Zap, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/students/me');
                setStudent(res.data);
                const notifRes = await api.get('/actions/notifications');
                setNotifications(notifRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Academic Portal...</p>
        </div>
    );

    if (!student) return (
        <div className="max-w-2xl mx-auto mt-20 p-12 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white text-center shadow-2xl overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            <div className="relative z-10">
                <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-8 border border-slate-100">
                    <User size={64} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">Profile Not Found.</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8 max-w-sm mx-auto">
                    It seems your institutional student record hasn't been established or linked to this account yet.
                </p>
                <div className="p-4 bg-indigo-50/50 backdrop-blur-md rounded-2xl border border-indigo-100 text-indigo-700 text-sm font-bold">
                    Please contact your system administrator to initialize your profile.
                </div>
            </div>
        </div>
    );

    const getRiskStyles = (level) => {
        switch (level) {
            case 'High': return {
                color: 'text-red-600',
                bg: 'bg-red-50/80',
                border: 'border-red-100',
                glow: 'shadow-red-500/10',
                icon: <AlertTriangle size={64} />
            };
            case 'Moderate': return {
                color: 'text-amber-600',
                bg: 'bg-amber-50/80',
                border: 'border-amber-100',
                glow: 'shadow-amber-500/10',
                icon: <Zap size={64} />
            };
            case 'Low': return {
                color: 'text-emerald-600',
                bg: 'bg-emerald-50/80',
                border: 'border-emerald-100',
                glow: 'shadow-emerald-500/10',
                icon: <CheckCircle size={64} />
            };
            default: return {
                color: 'text-slate-500',
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                glow: '',
                icon: <Activity size={64} />
            };
        }
    };

    const risk = getRiskStyles(student.risk_level);

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Welcome Hero Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 mb-16">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={12} className="text-indigo-400" /> Student Access Hub
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{student.name.split(' ')[0]}.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Analyzing your academic trajectory using real-time predictive modeling.
                    </p>
                </div>
                
                <div className="flex flex-col items-start lg:items-end p-5 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl shadow-slate-200/50 animate-fade-in-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{student.email}</span>
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <Brain size={20} />
                         </div>
                         <div className="font-black text-slate-900 tracking-tight">Active Session</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Profile Detail Grid */}
                <div className="lg:col-span-12 xl:col-span-7 bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-slate-200/30 p-10 border border-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Pulse</h3>
                            <p className="text-slate-400 font-medium text-sm">Key performance indicators from this semester.</p>
                        </div>
                        <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-900/20">
                            <Target size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Efficiency</span>
                            </div>
                            <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">Study Volume</h4>
                            <div className="text-4xl font-black text-slate-900 tracking-tighter">
                                {student.study_hours}<span className="text-lg text-slate-400 ml-1">hrs/wk</span>
                            </div>
                        </div>

                        <div className="group bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                    <Activity size={24} />
                                </div>
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Presence</span>
                            </div>
                            <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">Attendance</h4>
                            <div className="text-4xl font-black text-slate-900 tracking-tighter">
                                {student.attendance}<span className="text-lg text-slate-400 ml-1">%</span>
                            </div>
                        </div>

                        <div className="group bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
                                    <BookOpen size={24} />
                                </div>
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Workload</span>
                            </div>
                            <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">Assignments</h4>
                            <div className="text-4xl font-black text-slate-900 tracking-tighter">
                                {student.assignments}
                            </div>
                        </div>

                        <div className="group bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                    <ShieldCheck size={24} />
                                </div>
                                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Standard</span>
                            </div>
                            <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">Current Marks</h4>
                            <div className="text-4xl font-black text-slate-900 tracking-tighter">
                                {student.marks}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Gauge Panel */}
                <div className={`lg:col-span-12 xl:col-span-5 ${risk.bg} backdrop-blur-2xl rounded-[3rem] p-10 border ${risk.border} flex flex-col items-center justify-center text-center shadow-2xl ${risk.glow} transition-colors duration-500 relative overflow-hidden group`}>
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform"></div>
                    
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Predictive Status</h2>
                    
                    <div className={`p-10 rounded-[2.5rem] bg-white backdrop-blur-md shadow-2xl ${risk.color} mb-12 transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        {risk.icon}
                    </div>

                    <h3 className={`text-6xl font-black tracking-tighter mb-4 ${risk.color}`}>
                        {student.risk_level.toUpperCase()} <br /> <span className="text-2xl text-slate-900 uppercase tracking-[0.2em]">Risk</span>
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xs mb-10">
                        {student.risk_level === 'High'
                            ? "CRITICAL ATTENTION: Please prioritize academic advisory consultation."
                            : student.risk_level === 'Moderate'
                            ? "TRANSITION ALERT: Minor adjustments required to maintain trajectory."
                            : "OPTIMAL FLOW: You are tracking towards complete academic success."}
                    </p>

                    <Link 
                        to="/predict" 
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        MANUAL RE-ASSESSMENT <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Notifications & Warning Hub */}
            <div className="mt-12 bg-white/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white shadow-2xl shadow-slate-200/30">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                            <Bell size={24} />
                        </div>
                        <div>
                             <h3 className="text-2xl font-black text-slate-900 tracking-tight">Notification Hub</h3>
                             <p className="text-slate-400 font-medium text-sm">System alerts and behavioral warnings.</p>
                        </div>
                    </div>
                    <div className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {notifications.length} ACTIVE
                    </div>
                </div>

                {notifications.length > 0 ? (
                    <div className="space-y-4">
                        {notifications.map((notif, idx) => (
                            <div 
                                key={notif.id} 
                                className="group p-6 bg-white/60 backdrop-blur-md border border-white rounded-[2rem] flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white hover:shadow-xl transition-all duration-300"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                                    <AlertTriangle size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-slate-900 text-lg tracking-tight mb-1">{notif.message}</p>
                                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">TRANSMITTED: {new Date(notif.created_at).toLocaleString()}</p>
                                </div>
                                <div className="w-full md:w-auto px-6 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                    ACKNOWLEDGE
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-20 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2">Nexus Clear.</h4>
                        <p className="text-slate-400 font-medium">No pending warnings or system notifications found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
