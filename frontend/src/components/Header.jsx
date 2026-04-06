import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LogOut, ChevronDown, LayoutDashboard, Users, 
    BookOpen, Settings, User, AlertCircle, 
    Upload, Bell, HelpCircle, PieChart,
    Sparkles, ShieldCheck, Zap, Menu, X,
    ArrowRight
} from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileRef = useRef(null);

    const getNavLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-500 flex items-center gap-2.5 ${isActive
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-white/80 hover:shadow-sm'
            }`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
    };

    return (
        <header className="sticky top-0 z-[100] w-full">
            <div className="bg-white/40 backdrop-blur-2xl border-b border-white/60 shadow-2xl shadow-slate-200/50 px-8 py-3 flex justify-between items-center transition-all duration-500">
                    
                    {/* Brand Identity */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group relative">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                     <Zap size={22} className="text-indigo-400 group-hover:fill-indigo-400 transition-all" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tighter text-slate-900 leading-none">RISK<span className="text-indigo-600">AI</span></span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 ml-0.5">Nexus Engine</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Pipeline */}
                        {user && (
                            <nav className="hidden xl:flex space-x-1 items-center bg-slate-50/50 p-1.5 rounded-full border border-slate-100 shadow-inner">
                                {user.role !== 'admin' && (
                                    <Link to={user.role === 'student' ? '/student-dashboard' : '/dashboard'}
                                        className={getNavLinkClass(user.role === 'student' ? '/student-dashboard' : '/dashboard')}>
                                        <LayoutDashboard size={14} /> Dashboard
                                    </Link>
                                )}
                                {user.role === 'staff' && (
                                    <>
                                        <Link to="/students" className={getNavLinkClass('/students')}>
                                            <Users size={14} /> Repository
                                        </Link>
                                        <Link to="/staff/alerts" className={getNavLinkClass('/staff/alerts')}>
                                            <AlertCircle size={14} /> Broadcast
                                        </Link>
                                        <Link to="/staff/batch-upload" className={getNavLinkClass('/staff/batch-upload')}>
                                            <Upload size={14} /> Sync CSV
                                        </Link>
                                        <Link to="/analytics" className={getNavLinkClass('/analytics')}>
                                            <PieChart size={14} /> Intelligence
                                        </Link>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <>
                                        <Link to="/admin/dashboard" className={getNavLinkClass('/admin/dashboard')}>
                                            <PieChart size={14} /> Institutional
                                        </Link>
                                        <Link to="/admin/users" className={getNavLinkClass('/admin/users')}>
                                            <Users size={14} /> IAM Vault
                                        </Link>
                                    </>
                                )}
                                {user.role !== 'admin' && (
                                    <Link to="/predict" className={getNavLinkClass('/predict')}>
                                        <BookOpen size={14} /> Analytics
                                    </Link>
                                )}
                                {user.role === 'student' && (
                                    <>
                                        <Link to="/student/notifications" className={getNavLinkClass('/student/notifications')}>
                                            <Bell size={14} /> Alerts
                                        </Link>
                                        <Link to="/student/resources" className={getNavLinkClass('/student/resources')}>
                                            <HelpCircle size={14} /> Academy
                                        </Link>
                                    </>
                                )}
                            </nav>
                        )}
                    </div>

                    {/* Operational Actions */}
                    <div className="flex items-center gap-6">
                        {user ? (
                            <div className="relative flex items-center gap-4" ref={profileRef}>
                                <div className="hidden md:flex flex-col items-end">
                                     <div className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Link Active</span>
                                     </div>
                                </div>

                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 focus:outline-none p-1 bg-white/60 hover:bg-white rounded-2xl transition-all duration-500 border border-slate-100 shadow-sm hover:shadow-xl group active:scale-95"
                                >
                                    <div className="w-10 h-10 bg-slate-900 border-2 border-white rounded-xl flex items-center justify-center text-white font-black shadow-lg">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="hidden lg:block text-left mr-2">
                                        <p className="text-xs font-black text-slate-800 tracking-tight leading-none mb-1">{user.name}</p>
                                        <div className="flex items-center gap-1.5">
                                             <Sparkles size={10} className="text-indigo-600" />
                                             <span className="text-[8px] text-slate-400 uppercase font-black tracking-widest">{user.role}</span>
                                        </div>
                                    </div>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 mr-2 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Profile Dropdown Nexus */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 top-full mt-4 w-80 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white p-3 animate-fade-in-up origin-top-right z-50">
                                        <div className="px-6 py-6 border-b border-slate-100/50 mb-3">
                                            <div className="flex items-center gap-3 mb-4">
                                                 <ShieldCheck size={16} className="text-indigo-600" />
                                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Asset</span>
                                            </div>
                                            <p className="text-xl font-black text-slate-900 tracking-tighter mb-1">{user.name}</p>
                                            <p className="text-xs font-medium text-slate-400 truncate">{user.email}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all group/item"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black tracking-tight">Identity Vault</p>
                                                    <p className="text-[10px] uppercase font-black tracking-widest opacity-40">Manage Profile</p>
                                                </div>
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all group/item"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                                                    <Settings size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black tracking-tight">Environment</p>
                                                    <p className="text-[10px] uppercase font-black tracking-widest opacity-40">System Config</p>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100/50">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all group/logout"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover/logout:bg-red-600 group-hover/logout:text-white transition-all duration-300 shadow-sm">
                                                    <LogOut size={18} />
                                                </div>
                                                <span className="text-sm font-black tracking-tight uppercase">Terminate Link</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-6 py-3 text-slate-500 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-colors">Login</Link>
                                <Link to="/register" className="relative group overflow-hidden bg-slate-900 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 active:scale-95 transition-all">
                                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                     <span className="relative z-10 flex items-center gap-2">Initialize <Sparkles size={14} /></span>
                                </Link>
                            </div>
                        )}
                        
                        {/* Mobile Toggle */}
                        <button 
                            className="xl:hidden p-3 bg-white/60 border border-slate-100 rounded-2xl text-slate-900 shadow-sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            
            {/* Mobile Navigation Mesh */}
            {isMobileMenuOpen && (
                <div className="xl:hidden fixed inset-4 top-24 bg-white/90 backdrop-blur-3xl rounded-[3rem] border border-white z-[90] shadow-2xl animate-fade-in-up p-10 overflow-y-auto">
                    <div className="flex flex-col gap-8">
                         <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Neural Navigation</h3>
                         {/* Replicate nav links here for mobile if needed, but for premium overhaul, usually separate drawer */}
                         <div className="grid grid-cols-1 gap-4">
                             {/* Mobile Links Simplified */}
                             <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-2xl font-black text-slate-900 tracking-tight flex justify-between items-center group">
                                 Home <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                             </Link>
                             {user && (
                                <Link onClick={() => setIsMobileMenuOpen(false)} to="/profile" className="text-2xl font-black text-slate-900 tracking-tight flex justify-between items-center group">
                                    Identity <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                             )}
                         </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
