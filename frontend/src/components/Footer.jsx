import { Link } from 'react-router-dom';
import { Github, Briefcase, Linkedin, Heart, Sparkles, Zap, ShieldCheck, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto relative z-10 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 p-12 md:p-16 relative overflow-hidden group">
                    {/* Background Decorative Blob */}
                    <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-50/30 rounded-full blur-[100px] group-hover:scale-120 transition-transform duration-1000"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-4 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl transition-transform group-hover:rotate-6">
                                     <Zap size={22} className="text-indigo-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">RISK<span className="text-indigo-600">AI</span></span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 ml-0.5">Nexus Engine</span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                                Empowering global academic institutions with neural-driven insights to proactive success stratification and dropout mitigation. Built on the next-generation Glass Excellence architecture.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com/Tharanish-13" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-xl hover:scale-110 transition-all border border-slate-100 shadow-sm" title="GitHub"><Github size={20} /></a>
                                <a href="https://www.linkedin.com/in/tharanish-j/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-xl hover:scale-110 transition-all border border-slate-100 shadow-sm" title="LinkedIn"><Linkedin size={20} /></a>
                                <a href="https://tharanish-dev.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:shadow-xl hover:scale-110 transition-all border border-slate-100 shadow-sm" title="Portfolio"><Briefcase size={20} /></a>
                            </div>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Protocol</h4>
                                <ul className="space-y-4">
                                    <li><a href="/#features" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> Predictive Matrix</a></li>
                                    <li><a href="/#features" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> Security Ledger</a></li>
                                    <li><Link to="/register" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> Asset Tiers</Link></li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Nodes</h4>
                                <ul className="space-y-4">
                                    <li><a href="/#about" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> About Nexus</a></li>
                                    <li><a href="https://github.com/Tharanish-13" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> Developer Link</a></li>
                                    <li><a href="https://www.linkedin.com/in/tharanish-j/" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-slate-900 hover:text-indigo-600 transition-all tracking-tight flex items-center gap-2 group/link"><span className="w-1 h-1 bg-slate-200 rounded-full group-hover/link:bg-indigo-600 transition-colors" /> Contact Node</a></li>
                                </ul>
                            </div>

                            <div className="space-y-6 col-span-2 md:col-span-1">
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Telemetry</h4>
                                <div className="p-6 bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-900/20 relative overflow-hidden group/card">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover/card:bg-white/10 transition-colors"></div>
                                     <p className="text-white font-black text-xs uppercase tracking-widest mb-2 relative z-10">Global Access</p>
                                     <p className="text-white/40 text-[10px] font-medium leading-relaxed mb-4 relative z-10">System accuracy currently calculated at 97.8% across internal clusters.</p>
                                     <div className="flex items-center gap-2 text-indigo-400 font-black text-[8px] uppercase tracking-widest relative z-10">
                                         <Globe size={12} /> Live Status: Optimal
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">© 2026 RISK AI NEXUS. SYNC: 1.2.0</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                                <ShieldCheck size={14} /> SOC2 Compliant
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-400 grayscale hover:grayscale-0 transition-grayscale duration-500 cursor-default opacity-40 hover:opacity-100">
                             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Crafted For Academic Excellence</span>
                             <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                             <Sparkles size={14} className="text-indigo-600" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
