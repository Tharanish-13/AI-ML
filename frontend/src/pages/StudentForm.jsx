import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
    User, Mail, ArrowLeft, Save, X, Sparkles, 
    BookOpen, Target, Activity, Clock, ShieldCheck,
    Zap, Trash2
} from 'lucide-react';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attendance: '',
        marks: '',
        assignments: '',
        study_hours: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchStudent = async () => {
                try {
                    const res = await api.get(`/students/${id}`);
                    setFormData({
                        name: res.data.name,
                        email: res.data.email,
                        attendance: res.data.attendance,
                        marks: res.data.marks,
                        assignments: res.data.assignments,
                        study_hours: res.data.study_hours
                    });
                } catch (err) {
                    console.error("Failed to load student");
                    setError("Failed to retrieve record from the neural vault.");
                }
            };
            fetchStudent();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const payload = {
                ...formData,
                attendance: parseFloat(formData.attendance),
                marks: parseFloat(formData.marks),
                assignments: parseInt(formData.assignments),
                study_hours: parseFloat(formData.study_hours)
            };

            if (isEdit) {
                await api.put(`/students/${id}`, payload);
            } else {
                await api.post('/students/', payload);
            }
            navigate('/students');
        } catch (err) {
            console.error("Failed to save student");
            setError("Commit failed. System record integrity check rejected the update.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 mb-12">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <ShieldCheck size={12} className="text-indigo-400" /> Administrative Protocol
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4 text-center lg:text-left">
                        {isEdit ? 'Modify' : 'Initialize'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Record.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed text-center lg:text-left">
                        {isEdit 
                            ? "Updating the behavioral matrix for an existing student asset in the neural registry." 
                            : "Registering a new academic entity into the predictive monitoring ecosystem."}
                    </p>
                </div>
                
                <button 
                    onClick={() => navigate('/students')}
                    className="px-6 py-3 bg-white/40 backdrop-blur-md border border-slate-100 rounded-2xl flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-sm"
                >
                    <ArrowLeft size={16} /> Back To Nexus
                </button>
            </div>

            <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-10 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white group">
                {/* Decorative blob */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors" />

                {error && (
                    <div className="mb-10 p-6 bg-red-50/80 backdrop-blur-md text-red-600 rounded-3xl border border-red-100 flex items-center gap-4 animate-shake">
                         <Zap size={24} className="flex-shrink-0 rotate-12" />
                         <p className="font-black text-sm uppercase tracking-tight">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Identity Name</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                    placeholder="Entity Real-Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Institutional Email</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold shadow-sm"
                                    placeholder="name@university.edu"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Presence (0-100%)</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500">
                                        <Activity size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        name="attendance"
                                        min="0" max="100"
                                        value={formData.attendance}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Academic Score (0-100)</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-fuchsia-500">
                                        <Target size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        name="marks"
                                        min="0" max="100"
                                        value={formData.marks}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Workload Completion (0-10)</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500">
                                        <BookOpen size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        name="assignments"
                                        min="0" max="10"
                                        value={formData.assignments}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Study Volume (Daily Hours)</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-500">
                                        <Clock size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        name="study_hours"
                                        min="0" step="0.1"
                                        value={formData.study_hours}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-5 pt-8">
                        <button 
                            type="button" 
                            onClick={() => navigate('/students')} 
                            className="px-10 py-5 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <X size={18} /> Abort Operation
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>COMMIT RECORD <Save size={18} /></>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col items-center gap-8 py-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                         <ShieldCheck size={24} className="text-indigo-600" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <Sparkles size={24} className="text-violet-600" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Risk Scoring</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
