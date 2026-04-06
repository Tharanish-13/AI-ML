import { useState } from 'react';
import { X, Mail, Send, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import api from '../api';

const ActionPopup = ({ isOpen, onClose, studentEmail }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await api.post('/actions/email', {
                to_email: studentEmail,
                subject,
                content
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        } catch (error) {
            alert("Transmission failed. Re-verify outbound protocols.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-[200] backdrop-blur-xl animate-fade-in p-4">
            <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_100px_rgba(0,0,0,0.2)] w-full max-w-lg p-10 transform animate-fade-in-up border border-white relative overflow-hidden group">
                {/* Background Decorative Blob */}
                <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest mb-3">
                             <Sparkles size={10} className="text-indigo-400" /> Outbound Protocol
                        </div>
                        <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900 tracking-tighter">
                            Inquiry Transmission
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white hover:bg-slate-900 hover:text-white rounded-2xl transition-all duration-300 border border-slate-100 shadow-sm active:scale-90">
                        <X size={20} />
                    </button>
                </div>

                {success ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10 relative">
                             <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] animate-ping opacity-20"></div>
                             <Send size={40} className="relative z-10" />
                        </div>
                        <p className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">Transmission Successful</p>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">establishing feedback loop...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Address</label>
                            <div className="relative">
                                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
                                      <Zap size={18} />
                                 </div>
                                 <input
                                    type="text"
                                    value={studentEmail}
                                    disabled
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border-2 border-slate-50 rounded-2xl text-slate-400 font-bold text-sm cursor-not-allowed uppercase tracking-wider"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-indigo-600 transition-colors">Communication Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-6 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold text-sm shadow-sm"
                                required
                                placeholder="e.g. Mandatory Intervention Protocol"
                            />
                        </div>

                        <div className="space-y-3 group/field">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-indigo-600 transition-colors">Intelligence Payload</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-6 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl h-32 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-bold text-sm shadow-sm resize-none"
                                required
                                placeholder="Provide comprehensive details regarding the required action..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end items-center gap-6 pt-4">
                             <div className="flex items-center gap-2 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-grayscale">
                                  <ShieldCheck size={20} className="text-indigo-600" />
                                  <span className="text-[8px] font-black uppercase tracking-widest leading-none">Encrypted Link <br /> Layer: Tier III</span>
                             </div>
                             
                             <div className="flex gap-4 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-2xl transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex-1 sm:flex-none px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                                >
                                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                     <span className="relative z-10 flex items-center gap-2">
                                         {sending ? (
                                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                         ) : (
                                             <>TRANSMIT DATA <Send size={16} /></>
                                         )}
                                     </span>
                                </button>
                             </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ActionPopup;
