import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, Mail, Lock, User, ArrowRight, Shield, Zap, Sparkles, Phone, Users } from 'lucide-react';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        mobile_no: '',
        parent_mobile_no: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...submitData } = formData;
            const data = await register(submitData);
            if (data.role === 'staff' || data.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError('Registration failed. Email might be in use.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 relative overflow-x-hidden font-sans">
            {/* Advanced Background Mesh & Blobs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            {/* Left Side - Immersive Panel */}
            <div className="hidden lg:flex w-2/5 fixed top-0 bottom-0 left-0 overflow-hidden bg-slate-900 z-20">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                        alt="Students Learning"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900/90 to-blue-950/80 mix-blend-multiply" />
                
                <div className="relative z-10 w-full p-16 flex flex-col justify-center">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-20">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                            <Brain size={20} />
                        </div>
                        <span className="font-black tracking-tighter text-white text-lg">STUDENT RISK AI</span>
                    </Link>

                    <div className="max-w-md animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6">
                            <Zap size={10} className="fill-indigo-400" /> Shaping Futures
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.1] mb-8">
                            Empower Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Education Journey.</span>
                        </h1>
                        <p className="text-indigo-100/60 text-lg font-medium leading-relaxed mb-12">
                            Join our AI-powered ecosystem to gain predictive insights, proactive support, and a path to excellence.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-all duration-300">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-sm uppercase tracking-widest">Enterprise Security</h4>
                                    <p className="text-xs text-indigo-100/40">Student data privacy at our core.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-all duration-300">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-sm uppercase tracking-widest">Seamless Collaboration</h4>
                                    <p className="text-xs text-indigo-100/40">Connecting staff and students instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Premium Form */}
            <div className="w-full lg:w-3/5 lg:ml-auto flex items-center justify-center p-6 sm:p-12 z-10 animate-fade-in-right relative">
                <div className="w-full max-w-xl py-12">
                    <div className="mb-12 lg:hidden mt-8">
                         <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                            Create <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">Account.</span>
                        </h1>
                    </div>

                    <div className="bg-white/40 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-white/60 relative overflow-visible group">
                        {/* Decorative Blob */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-focus-within:bg-emerald-500/10 transition-colors" />

                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h1 className="hidden lg:block text-4xl font-black text-slate-900 tracking-tighter mb-2">Registration</h1>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Personal & Institutional Details</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Step 01/01</span>
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-emerald-500 animate-shimmer" />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-md text-red-600 rounded-2xl text-sm font-black border border-red-100 flex items-center gap-3 animate-shake">
                                <AlertCircle size={20} className="flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Identified Name</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                            placeholder="John Wick"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Official Email</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                            placeholder="name@university.edu"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Mobile Nexus</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="mobile_no"
                                            value={formData.mobile_no}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                            placeholder="Personal Mobile"
                                            required
                                        />
                                    </div>
                                </div>

                                {formData.role === 'student' && (
                                    <div className="space-y-2 group/field animate-fade-in">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Guardian Contact</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                                <Users size={18} />
                                            </div>
                                            <input
                                                type="tel"
                                                name="parent_mobile_no"
                                                value={formData.parent_mobile_no}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                                placeholder="Parent Mobile"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Access Key</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">Confirm Key</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 group/field">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-indigo-600">I am joining as...</label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full pl-6 pr-10 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-800 font-bold shadow-sm"
                                    >
                                        <option value="student">Student</option>
                                        <option value="staff">Staff Member</option>
                                        <option value="admin">System Administrator</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative overflow-hidden group/btn bg-slate-900 text-white py-5 rounded-2xl font-black shadow-2xl shadow-indigo-500/10 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3">
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            CREATE FREE ACCOUNT <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Already registered?</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        
                        <Link 
                            to="/login" 
                            className="mt-6 w-full py-4 border-2 border-slate-100 rounded-2xl text-slate-600 font-black text-sm uppercase tracking-widest text-center hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all block"
                        >
                            Sign In to Portal
                        </Link>
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

export default Register;
