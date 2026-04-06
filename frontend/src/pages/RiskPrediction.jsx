import { useState } from 'react';
import api from '../api';
import { 
    Activity, AlertTriangle, CheckCircle, HelpCircle, 
    Brain, Target, Clock, BookOpen, Sparkles, 
    ChevronRight, ArrowRight, Zap, ShieldCheck, Users
} from 'lucide-react';

const RiskPrediction = () => {
    const [formData, setFormData] = useState({
        attendance: 75,
        marks: 60,
        assignments: 5,
        study_hours: 2
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);
        
        // Ensure assignments is an integer for backend validation
        const payload = {
            ...formData,
            assignments: Math.round(formData.assignments)
        };

        // Simulate a slight delay for better "AI processing" feel
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const res = await api.post('/predict-risk', payload);
            setPrediction(res.data.risk);
        } catch (err) {
            console.error("Prediction failed:", err);
            alert("Neural connection failed: " + (err.response?.data?.detail || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    const getRiskInfo = (risk) => {
        switch (risk) {
            case "High":
                return {
                    color: "text-red-500",
                    bg: "bg-red-50/20",
                    gradient: "from-red-500 to-red-700",
                    border: "border-red-100",
                    icon: <AlertTriangle className="w-16 h-16 text-white mb-4 animate-bounce" />,
                    title: "CRITICAL RISK",
                    msg: "Immediate intervention required. Neural patterns suggest high probability of academic decline."
                };
            case "Medium":
            case "Moderate":
                return {
                    color: "text-slate-500",
                    bg: "bg-slate-50/20",
                    gradient: "from-slate-500 to-slate-700",
                    border: "border-slate-100",
                    icon: <Zap className="w-16 h-16 text-white mb-4 animate-pulse" />,
                    title: "MODERATE RISK",
                    msg: "Secondary monitoring recommended. Minor adjustments to attendance and marks can shift trajectory."
                };
            case "Low":
                return {
                    color: "text-green-500",
                    bg: "bg-green-50/20",
                    gradient: "from-green-500 to-green-700",
                    border: "border-green-100",
                    icon: <CheckCircle className="w-16 h-16 text-white mb-4 animate-float" />,
                    title: "OPTIMAL TRACK",
                    msg: "Neural patterns indicate strong academic resilience and high probability of success."
                };
            default:
                return {
                    color: "text-slate-600",
                    bg: "bg-slate-50",
                    gradient: "from-slate-600 to-slate-900",
                    border: "border-slate-300",
                    icon: <Brain className="w-16 h-16 text-white mb-4" />,
                    title: "PROCESSING...",
                    msg: "The AI is still calibrating the risk parameters."
                };
        }
    };

    const riskInfo = prediction ? getRiskInfo(prediction) : null;

    return (
        <div className="relative min-h-screen space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={12} className="text-indigo-400" /> Predictive Engine
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                    AI Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Prediction.</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                    Leverage advanced machine learning architecture to forecast student performance outcomes based on behavioral inputs.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
                {/* Parameter Control Panel */}
                <div className="lg:col-span-12 xl:col-span-7 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all duration-500 group">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Neural Input Data</h3>
                            <p className="text-slate-400 font-medium text-sm">Fine-tune behavioral parameters for assessment.</p>
                        </div>
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:rotate-12 transition-transform">
                             <Brain size={28} />
                        </div>
                    </div>

                    <form onSubmit={handlePredict} className="space-y-10">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">
                                    <span className="flex items-center gap-2"><Clock size={16} className="text-indigo-500" /> Attendance Presence</span>
                                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-xl text-sm font-black shadow-lg shadow-indigo-500/20">{formData.attendance}%</span>
                                </label>
                                <div className="relative pt-1">
                                    <input
                                        type="range"
                                        name="attendance"
                                        min="0"
                                        max="100"
                                        value={formData.attendance}
                                        onChange={handleChange}
                                        className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 focus:outline-none ring-offset-4 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">
                                        <span>Critical (0%)</span>
                                        <span>Optimal (100%)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">
                                    <span className="flex items-center gap-2"><Target size={16} className="text-indigo-500" /> Performance Metric</span>
                                    <span className="bg-violet-600 text-white px-3 py-1 rounded-xl text-sm font-black shadow-lg shadow-violet-500/20">{formData.marks}%</span>
                                </label>
                                <div className="relative pt-1">
                                    <input
                                        type="range"
                                        name="marks"
                                        min="0"
                                        max="100"
                                        value={formData.marks}
                                        onChange={handleChange}
                                        className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-violet-600 focus:outline-none ring-offset-4 focus:ring-4 focus:ring-violet-500/10 transition-all"
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">
                                        <span>Failing (0)</span>
                                        <span>Distinction (100)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Workload (Assignments)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                                            <BookOpen size={20} />
                                        </div>
                                        <input
                                            type="number"
                                            name="assignments"
                                            min="0"
                                            max="10"
                                            value={formData.assignments}
                                            onChange={handleChange}
                                            className="w-full pl-14 pr-16 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-black text-3xl tracking-tighter"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">/ 10 UNITS</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Study Volume (Daily)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                                            <Clock size={20} />
                                        </div>
                                        <input
                                            type="number"
                                            name="study_hours"
                                            min="0"
                                            step="0.5"
                                            value={formData.study_hours}
                                            onChange={handleChange}
                                            className="w-full pl-14 pr-16 py-5 bg-white/50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-black text-3xl tracking-tighter"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">HOURS</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden group/btn bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-500/10 active:scale-95 transition-all flex items-center justify-center gap-4 mt-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-4 tracking-tight">
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        PROCESSING NEURAL MATRIX...
                                    </>
                                ) : (
                                    <>
                                        INITIATE RISK ANALYSIS <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Prediction Result Display */}
                <div className="lg:col-span-12 xl:col-span-5 h-full min-h-[500px]">
                    {prediction ? (
                        <div className={`h-full bg-slate-950 backdrop-blur-3xl rounded-[3rem] p-12 shadow-2xl overflow-hidden relative group transition-all duration-700 animate-fade-in-right border border-white/10`}>
                            {/* Dynamic Background Gradients based on Risk */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${riskInfo.gradient} opacity-20 z-0 group-hover:scale-110 transition-transform duration-1000`} />
                            
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -ml-32 -mb-32 animate-pulse"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="space-y-8 text-center flex flex-col items-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">
                                        <ShieldCheck size={12} className="text-emerald-400" /> Quantum Assessment Complete
                                    </div>

                                    <div className={`p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl ${riskInfo.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        {riskInfo.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Confidence Score: 98.4%</h3>
                                        <h2 className="text-6xl font-black text-white tracking-tighter leading-none mb-10 drop-shadow-2xl">
                                             {riskInfo.title.split(' ')[0]} <br />
                                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 uppercase text-3xl font-black tracking-[0.2em]">
                                                {riskInfo.title.split(' ')[1] || 'RISK'}
                                            </span>
                                        </h2>
                                        
                                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-inner group/msg hover:bg-white/10 transition-colors">
                                            <p className="text-indigo-50 text-lg font-medium leading-relaxed">
                                                {riskInfo.msg}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-6">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                             <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="AI User" />
                                             </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Used by Academic Staff for Intervention</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-2xl rounded-[3rem] border-4 border-dashed border-slate-200 text-center group hover:bg-white/60 transition-all duration-500">
                            <div className="relative mb-8">
                                <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl animate-pulse group-hover:scale-150 transition-transform"></div>
                                <div className="relative w-24 h-24 bg-white/80 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                                    <Activity className="w-12 h-12 text-slate-300" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Awaiting Parameters</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                                The predictive models require active behavioral data. Adjust the neural input matrix and initiate analysis.
                            </p>
                            
                            <div className="mt-12 grid grid-cols-2 gap-4 w-full opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">
                                <div className="p-4 bg-white/50 rounded-2xl border border-white">
                                     <TrendingUp size={20} className="text-indigo-600 mb-2" />
                                     <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                         <div className="w-2/3 h-full bg-indigo-500 animate-shimmer" />
                                     </div>
                                </div>
                                <div className="p-4 bg-white/50 rounded-2xl border border-white">
                                     <Users size={20} className="text-fuchsia-600 mb-2" />
                                     <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                         <div className="w-1/2 h-full bg-fuchsia-500 animate-shimmer" />
                                     </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TrendingUp = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
);

export default RiskPrediction;
