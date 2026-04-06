import React from 'react';
import { 
    Mail, Phone, MapPin, FileQuestion, MessageCircle, 
    Sparkles, ArrowRight, ShieldCheck, HelpCircle,
    ChevronDown, Globe, Clock, Zap
} from 'lucide-react';

const Support = () => {
    const faqs = [
        {
            q: "How is the predictive risk level calculated?",
            a: "Our Machine Learning architecture analyzes a multi-dimensional matrix of attendance presence, internal academic scores, assignment volumes, and study-hour entropy to generate real-time risk stratification."
        },
        {
            q: "System credential reset protocols?",
            a: "Contact your institutional administrator to initiate a secure SHA-256 password reset, or utilize the 'Update Credentials' portal within your secure account settings."
        },
        {
            q: "How to modify verified profile telemetry?",
            a: "Access the 'Profile Nexus' within the navigation menu to synchronize and update your personal identifier attributes, including department and contact nexus."
        }
    ];

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-fuchsia-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="text-center animate-fade-in-up relative z-10 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <Sparkles size={12} className="text-indigo-400" /> Support Ecosystem
                </div>
                <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
                    Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Nexus.</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Technical assistance, system documentation, and direct administrative communication channels for the Risk AI platform.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10 items-stretch">
                {/* Contact Interface */}
                <div className="lg:col-span-5 bg-white/40 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white flex flex-col group">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                             <h3 className="text-2xl font-black text-slate-900 tracking-tight">Direct Comms</h3>
                             <p className="text-slate-400 font-medium text-sm">Institutional contact protocols.</p>
                        </div>
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:rotate-12 transition-transform">
                             <MessageCircle size={28} />
                        </div>
                    </div>

                    <div className="space-y-8 flex-1">
                        <div className="group/item flex items-start gap-6 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-50">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-slate-900/10">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Neural Mail</h4>
                                <p className="text-lg font-black text-slate-800 tracking-tight mb-1">tharanishj1318@gmail.com</p>
                                <p className="text-xs font-bold text-indigo-500">24h Response Protocol</p>
                            </div>
                        </div>

                        <div className="group/item flex items-start gap-6 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-50">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-100">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Voice Uplink</h4>
                                <p className="text-lg font-black text-slate-800 tracking-tight mb-1">+91 9489229976</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mon - Fri • 09:00 - 17:00</p>
                            </div>
                        </div>

                        <div className="group/item flex items-start gap-6 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-50">
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-100">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Physical Node</h4>
                                <p className="text-lg font-black text-slate-800 tracking-tight leading-tight">Sathyamangalam, Erode<br />Tamil Nadu - 638402</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group/cta">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        <h4 className="text-white font-black text-xl mb-2 relative z-10">Global Access 24/7</h4>
                        <p className="text-white/40 text-xs font-medium leading-relaxed relative z-10 mb-6">Our automated diagnostic tools are available anytime for self-service risk evaluation.</p>
                        <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                             <Globe size={14} className="text-indigo-600" /> Access Knowledge Hub
                        </button>
                    </div>
                </div>

                {/* FAQ & Form Interface */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white group">
                        <div className="mb-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Common Inquiries</h3>
                                <p className="text-slate-400 font-medium text-sm">Automated documentation protocols.</p>
                            </div>
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                                <HelpCircle size={28} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="group/faq bg-white/60 backdrop-blur-md rounded-[2rem] border border-slate-50 overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:border-indigo-100">
                                    <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                                        <span className="text-lg font-black text-slate-800 tracking-tight pr-10">{faq.q}</span>
                                        <div className="p-2 bg-slate-50 rounded-xl group-open/faq:bg-indigo-600 group-open/faq:text-white transition-all group-open/faq:rotate-180">
                                            <ChevronDown size={20} />
                                        </div>
                                    </summary>
                                    <div className="px-8 pb-8">
                                        <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-50 text-slate-500 font-bold leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/30 border border-white group">
                        <div className="mb-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Inquiry Transmission</h3>
                                <p className="text-slate-400 font-medium text-sm">Send a message to the control node.</p>
                            </div>
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Zap size={28} />
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Transmission Successful. Feedback Loop established.'); }}>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transmission Subject</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-5 bg-white/50 border-2 border-slate-50 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-black shadow-sm" 
                                    placeholder="Briefly define the inquiry vector" 
                                    required 
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Payload</label>
                                <textarea 
                                    rows="4" 
                                    className="w-full px-6 py-5 bg-white/50 border-2 border-slate-50 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-black shadow-sm" 
                                    placeholder="Provide granular details regarding your inquiry..." 
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3">
                                    INITIATE TRANSMISSION <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center animate-fade-in delay-500 py-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <div className="inline-flex items-center gap-12 font-black text-[10px] uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-indigo-600" /> Secure Data Link
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-indigo-600" /> Real-time Support
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
