import { useState, useEffect } from 'react';
import api from '../api';
import { 
    Trash2, Edit, Search, Plus, Filter, 
    MoreVertical, FileText, User, Activity, 
    Target, Sparkles, ArrowRight, ChevronRight,
    AlertCircle, CheckCircle, Zap
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const riskParam = searchParams.get('risk');
        if (riskParam) {
            setFilter(riskParam);
        }
    }, [searchParams]);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/students/?search=${search}&risk=${filter}`);
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch students");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [search, filter]);

    const handleDelete = async (id) => {
        if (window.confirm("CRITICAL ACTION: Are you sure you want to permanently delete this student record?")) {
            try {
                await api.delete(`/students/${id}`);
                fetchStudents();
            } catch (err) {
                alert("Failed to delete record. System restriction dynamic.");
            }
        }
    };

    const getRiskStyles = (risk) => {
        const styles = {
            "High": {
                bg: "bg-red-50/80 text-red-600 border-red-100",
                dot: "bg-red-500 shadow-red-500/20",
                icon: <AlertCircle size={14} />
            },
            "Moderate": {
                bg: "bg-amber-50/80 text-amber-600 border-amber-100",
                dot: "bg-amber-500 shadow-amber-500/20",
                icon: <Zap size={14} />
            },
            "Medium": {
                bg: "bg-amber-50/80 text-amber-600 border-amber-100",
                dot: "bg-amber-500 shadow-amber-500/20",
                icon: <Zap size={14} />
            },
            "Low": {
                bg: "bg-emerald-50/80 text-emerald-600 border-emerald-100",
                dot: "bg-emerald-500 shadow-emerald-500/20",
                icon: <CheckCircle size={14} />
            }
        };
        return styles[risk] || {
            bg: "bg-slate-50 text-slate-500 border-slate-100",
            dot: "bg-slate-400",
            icon: <Activity size={14} />
        };
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
                        <Sparkles size={12} className="text-indigo-400" /> Student Registry
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Assets.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Comprehensive monitoring system for academic tracking and predictive risk management.
                    </p>
                </div>
                
                <Link 
                    to="/add-student" 
                    className="group relative overflow-hidden bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 active:scale-95 transition-all"
                >
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <span className="relative z-10 flex items-center gap-3">
                         <Plus size={18} /> INITIALIZE RECORD
                     </span>
                </Link>
            </div>

            {/* Actions & Filters bar */}
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="relative flex-1 group w-full">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search assets by identity name..."
                        className="w-full bg-white/50 backdrop-blur-lg border-2 border-slate-100 pl-14 pr-6 py-5 rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-bold shadow-sm hover:shadow-md placeholder:text-slate-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="relative w-full md:w-64 group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                        <Filter size={18} />
                    </div>
                    <select
                        className="w-full pl-12 pr-10 py-5 bg-white/50 backdrop-blur-lg border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white appearance-none cursor-pointer text-slate-800 font-bold shadow-sm hover:shadow-md"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">Global Population</option>
                        <option value="High">High Risk Segment</option>
                        <option value="Medium">Moderate Risk Segment</option>
                        <option value="Low">Optimal Track Segment</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <ChevronRight size={18} className="rotate-90" />
                    </div>
                </div>
            </div>

            {/* Student Matrix Table */}
            <div className="relative z-10 overflow-hidden bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/30 min-h-[500px]">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-900/5">
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Identity</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Presence Protocol</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance Metric</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Risk Status</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Syncing Encrypted Records...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student, idx) => {
                                    const riskStyle = getRiskStyles(student.risk_level);
                                    return (
                                        <tr key={student.id} className="group hover:bg-white/60 transition-all duration-300">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-white flex items-center justify-center font-black text-indigo-600 text-lg shadow-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{student.name}</p>
                                                        <p className="text-xs font-medium text-slate-400 tracking-wide">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1 w-24 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                        <div
                                                            className={`h-full rounded-full bg-gradient-to-r transition-all duration-1000 
                                                                ${student.attendance >= 75 ? 'from-emerald-400 to-teal-500 shadow-emerald-500/20' : 
                                                                  student.attendance >= 60 ? 'from-amber-400 to-orange-500 shadow-amber-500/20' : 
                                                                  'from-red-400 to-rose-600 shadow-red-500/20'}`}
                                                            style={{ width: `${student.attendance}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-black text-slate-900 tracking-tighter w-8">{student.attendance}%</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
                                                     <Target size={14} className="text-indigo-400" />
                                                     <span className="text-xs font-black tracking-tight">{student.marks} / 100</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${riskStyle.bg}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${riskStyle.dot}`} />
                                                    {riskStyle.icon}
                                                    {student.risk_level}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                                    <Link 
                                                        to={`/edit-student/${student.id}`} 
                                                        className="p-3 bg-white text-indigo-600 rounded-2xl border border-indigo-50 shadow-sm hover:scale-110 active:scale-95 transition-all outline-none"
                                                        title="Modify Record"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(student.id)} 
                                                        className="p-3 bg-white text-red-600 border border-red-50 rounded-2xl shadow-sm hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95 transition-all outline-none"
                                                        title="Purge Record"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-6">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                                <FileText size={40} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Registry Matrix Empty.</h3>
                                                <p className="text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
                                                    The system has no record correlation for the current search vector.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => { setSearch(''); setFilter('All'); }} 
                                                className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:text-indigo-800 transition-colors"
                                            >
                                                TERMINATE FILTERS
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {students.length > 0 && (
                    <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/20 flex flex-col md:flex-row justify-between items-center gap-6">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
                            Syncing {students.length} record nodes in current viewport
                        </span>
                        <div className="flex gap-4">
                            <button className="px-6 py-2.5 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all" disabled>
                                Back
                            </button>
                            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-900/10" disabled>
                                Next Nexus
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentList;
