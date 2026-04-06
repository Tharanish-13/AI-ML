import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, KeyRound, Sparkles, ShieldCheck, Zap, AlertCircle, CheckCircle } from 'lucide-react';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    old_password: oldPassword,
                    new_password: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to change password');
            }

            setSuccess('Security credentials updated. Redirecting to authentication portal...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 items-center justify-center relative overflow-hidden p-6 font-sans">
            {/* Advanced Background Mesh & Blobs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-violet-500/10 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-lg z-10 animate-fade-in-up">
                <div className="mb-8 flex justify-center lg:justify-start">
                    <Link to="/login" className="px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Portal Login
                    </Link>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-white/60 relative overflow-hidden group">
                    {/* Decorative glow */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6 shadow-2xl shadow-slate-900/20 transform group-hover:rotate-6 transition-transform">
                            <KeyRound size={28} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-2">Update Credentials</h1>
                        <p className="text-slate-500 font-medium text-sm">Reinforce your account with a new access key.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-md text-red-600 rounded-2xl text-sm font-black border border-red-100 flex items-center gap-3 animate-shake">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-8 p-5 bg-emerald-50/80 backdrop-blur-md text-emerald-600 rounded-2xl text-sm font-black border border-emerald-100 flex items-center gap-3 animate-fade-in">
                            <CheckCircle size={20} className="flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-indigo-600 transition-colors">Institutional Email</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                    placeholder="name@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-indigo-600 transition-colors">Current Access Key</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group/field">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-indigo-600 transition-colors">New Access Key</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                    <Zap size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="w-full relative overflow-hidden group/btn bg-slate-900 text-white py-5 rounded-2xl font-black shadow-2xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                        >
                             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                             <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Commit Changes <Sparkles size={18} /></>
                                )}
                             </span>
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center animate-fade-in delay-500">
                    <div className="inline-flex items-center gap-3 text-slate-400 font-medium text-xs uppercase tracking-widest">
                        <ShieldCheck size={16} /> Data encrypted with SHA-256 protocols
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
