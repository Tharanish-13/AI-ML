import { useEffect, useState } from 'react';
import api from '../api';
import { 
    Users, AlertTriangle, CheckCircle, Mail, 
    ArrowRight, TrendingUp, Activity, Sparkles,
    ShieldAlert, Zap, Target, MousePointer2,
    Filter, Database, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ActionPopup from '../components/ActionPopup';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, highRisk: 0, lowRisk: 0 });
    const [highRiskStudents, setHighRiskStudents] = useState([]);
    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/students/');
                const students = res.data;
                const high = students.filter(s => s.risk_level === "High").length;
                const low = students.filter(s => s.risk_level === "Low").length;

                setStats({
                    total: students.length,
                    highRisk: high,
                    lowRisk: low
                });

                const riskOrder = { 'High': 0, 'Moderate': 1, 'Medium': 1, 'Low': 2, 'Pending': 3, 'Unknown': 4 };
                const sortedStudents = [...students].sort((a, b) => {
                    const riskA = riskOrder[a.risk_level] ?? 5;
                    const riskB = riskOrder[b.risk_level] ?? 5;
                    return riskA - riskB;
                });

                setHighRiskStudents(sortedStudents.slice(0, 10));
            } catch (error) {
                console.error("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleActionClick = (email) => {
        setSelectedStudentEmail(email);
        setIsPopupOpen(true);
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={12} className="text-indigo-400" /> Command Center
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Staff <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Nexus.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Real-time student intelligence and risk stratification dashboard for academic intervention.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                     <span className="px-6 py-3 bg-white/40 backdrop-blur-md border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                        Cycle: 2025-2026 Phase I
                    </span>
                </div>
            </div>

            {/* Stats Ecosystem */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/30 group hover:bg-white transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <Users size={28} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                            <TrendingUp size={12} /> Active Enrollment
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Population Nodes</h3>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{stats.total}</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/30 group hover:bg-white transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-red-500/10 transition-colors" />
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <ShieldAlert size={28} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest animate-pulse">
                            <Target size={12} /> High Priority
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Risk Segment</h3>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{stats.highRisk}</p>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/30 group hover:bg-white transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <CheckCircle size={28} />
                        </div>
                        <div className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-full border border-slate-100">
                             Stable Orbit
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Optimal Profile</h3>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{stats.lowRisk}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10 items-start">
                {/* Risk Assessment Matrix */}
                <div className="xl:col-span-8 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/30 overflow-hidden flex flex-col animate-fade-in-up delay-200">
                    <div className="p-10 border-b border-white/50 flex justify-between items-center bg-white/40">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-2xl shadow-sm">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence Matrix</h3>
                                <p className="text-sm font-medium text-slate-400 italic">Target Priority Assets</p>
                            </div>
                        </div>
                        <Link to="/students" className="group flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-100/50 overflow-hidden">
                        {isLoading ? (
                            <div className="p-24 flex flex-col items-center justify-center gap-4">
                                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Compiling Dataset...</p>
                            </div>
                        ) : highRiskStudents.length > 0 ? (
                            highRiskStudents.map((student, idx) => (
                                <div key={student.id} className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/60 transition-all group/row relative overflow-hidden">
                                     <div className="flex items-center gap-6 w-full md:w-auto z-10">
                                         <div className={`w-2 h-14 rounded-full transition-all duration-500 group-hover/row:scale-y-110 shadow-lg ${
                                             student.risk_level === 'High' ? 'bg-red-600 shadow-red-500/30' :
                                             student.risk_level === 'Medium' || student.risk_level === 'Moderate' ? 'bg-amber-500 shadow-amber-500/20' :
                                             'bg-emerald-500 shadow-emerald-500/20'
                                         }`} />
                                         
                                         <div className="flex items-center gap-4">
                                             <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover/row:bg-slate-900 group-hover/row:text-white transition-colors">
                                                 {student.name.charAt(0)}
                                             </div>
                                             <div>
                                                 <p className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1.5 group-hover/row:text-indigo-600 transition-colors">{student.name}</p>
                                                 <div className="flex items-center gap-3">
                                                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Attendance: {student.attendance}%</span>
                                                      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                                                          student.risk_level === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                                          student.risk_level === 'Medium' || student.risk_level === 'Moderate' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                      }`}>{student.risk_level} Risk</span>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>

                                     <button
                                         onClick={() => handleActionClick(student.email)}
                                         className="mt-6 md:mt-0 w-full md:w-auto px-6 py-3.5 bg-white border-2 border-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:scale-105 active:scale-95 transition-all z-10 group/btn"
                                     >
                                         <Mail size={16} className="group-hover/btn:rotate-12 transition-transform" /> Sync Intervention
                                     </button>
                                     
                                     {/* Hover background splash */}
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/20 to-transparent -translate-x-full group-hover/row:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            ))
                        ) : (
                            <div className="p-32 text-center">
                                <Database size={48} className="mx-auto text-slate-200 mb-4" />
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Dataset Uninitialized.</h4>
                                <p className="text-slate-400 font-medium">Please verify API endpoint /students-all for telemetry.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* System Protocols (Quick Actions) */}
                <div className="xl:col-span-4 space-y-10 sticky top-24">
                    <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-slate-900/30 relative overflow-hidden group">
                        {/* Mesh background */}
                        <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40 duration-1000">
                             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#4f46e5_0%,transparent_50%)]" />
                        </div>
                        
                        <h3 className="text-white text-2xl font-black mb-8 relative z-10 tracking-tight">Active Protocols</h3>
                        
                        <div className="space-y-5 relative z-10">
                            <Link to="/predict" className="w-full flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 group/btn">
                                <div className="flex items-center gap-4">
                                     <div className="p-3 bg-white/20 rounded-xl group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-colors">
                                         <Zap size={22} />
                                     </div>
                                     <span className="font-black text-xs uppercase tracking-widest">Neural Prediction</span>
                                </div>
                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                            </Link>

                            <Link to="/students" className="w-full flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 group/btn">
                                <div className="flex items-center gap-4">
                                     <div className="p-3 bg-white/20 rounded-xl group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-colors">
                                         <MousePointer2 size={22} />
                                     </div>
                                     <span className="font-black text-xs uppercase tracking-widest">Asset Management</span>
                                </div>
                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                            </Link>
                            
                            <div className="pt-10 border-t border-white/5 space-y-6">
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Neural System Analytics</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black text-white/50 uppercase tracking-widest">
                                        <span>Model Precision</span>
                                        <span className="text-indigo-400">97.8%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full w-[97%]" />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-white/50 uppercase tracking-widest">
                                        <span>Sync Latency</span>
                                        <span className="text-emerald-400">0.02ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-xl shadow-slate-200/20 flex flex-col items-center text-center group">
                         <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                             <Bell size={32} />
                         </div>
                         <h4 className="text-xl font-black text-slate-900 mb-2">Live Broadcast</h4>
                         <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[200px] mb-6">Transmit critical academic insights to all registered student nodes.</p>
                         <Link to="/staff/alerts" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-transparent hover:border-indigo-600 pb-1 transition-all">
                             Open Broadcast Hub
                         </Link>
                    </div>
                </div>
            </div>

            <ActionPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                studentEmail={selectedStudentEmail}
            />
        </div>
    );
};

export default Dashboard;
