import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, Mail, Lock, ArrowRight, User, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await login(email, password);
            if (data.role === 'staff' || data.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 relative overflow-y-auto font-sans">
            {/* Advanced Background Mesh & Blobs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-50/50 to-indigo-50/30" />
            </div>

            {/* Left Side - Premium Form */}
            <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-12 z-10 animate-fade-in-right">
                <div className="w-full max-w-lg">
                    <div className="mb-12 animate-fade-in-up">
                        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-md border border-indigo-100/50 shadow-sm hover:shadow-md transition-all group mb-8">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                                <Brain size={16} />
                            </div>
                            <span className="font-black tracking-tighter text-slate-900">STUDENT RISK AI</span>
                        </Link>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                            Welcome <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">Back.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">
                            Sign in to access your AI-powered student success analytics and predictive insights.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-white/60 relative overflow-hidden group">
                        {/* Interactive glow effect */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-focus-within:bg-indigo-500/10 transition-colors" />

                        {error && (
                            <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-md text-red-600 rounded-2xl text-sm font-black border border-red-100 flex items-center gap-3 animate-shake">
                                <AlertCircle size={20} className="flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Institutional Email</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                        placeholder="name@university.edu"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group/field">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest transition-colors group-focus-within/field:text-indigo-600">Access Key</label>
                                    <Link to="/change-password" title="Recover Password" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative overflow-hidden group/btn bg-slate-900 text-white py-5 rounded-2xl font-black shadow-2xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3">
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            AUTHENTICATE <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">New to portal?</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        
                        <Link 
                            to="/register" 
                            className="mt-6 w-full py-4 border-2 border-slate-100 rounded-2xl text-slate-600 font-black text-sm uppercase tracking-widest text-center hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all block"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Immersive Panel */}
            <div className="hidden lg:flex w-2/5 relative items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
                        alt="Analytics Dashboard"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-slate-900/90 to-purple-950/80 mix-blend-multiply" />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-700" />

                <div className="relative z-10 max-w-sm p-12 text-white animate-fade-in-up delay-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce-slow">
                        <Zap size={10} className="text-yellow-400 fill-yellow-400" /> Neural Network Active
                    </div>
                    
                    <h2 className="text-4xl font-black mb-8 leading-[1.1] tracking-tighter">
                        Move beyond <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Reactive Teaching.</span>
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 backdrop-blur-md border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck size={20} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-wider mb-1">98% Accuracy</h4>
                                <p className="text-xs text-indigo-200/60 leading-relaxed font-medium">Predicting at-risk outcomes with precision engineering.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/20 backdrop-blur-md border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                                <Sparkles size={20} className="text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-wider mb-1">Instant Insights</h4>
                                <p className="text-xs text-violet-200/60 leading-relaxed font-medium">Real-time alerts for staff and students alike.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AlertCircle = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
);

export default Login;
