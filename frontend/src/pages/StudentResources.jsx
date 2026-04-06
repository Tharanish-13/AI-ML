import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
    BookOpen, Video, Users, HelpCircle, ExternalLink, Activity, 
    FileText, AlertCircle, Search, Filter, Terminal, LayoutDashboard, 
    Sparkles, Compass, Target, GraduationCap 
} from 'lucide-react';

const StudentResources = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
        } catch (err) {
            console.error('Failed to fetch profile for resources', err);
        } finally {
            setLoading(false);
        }
    };

    const allResources = useMemo(() => {
        const risk = profile?.risk_level || 'Unknown';

        const general = [
            { category: 'Academic', title: "Academic Calendar", desc: "Keep track of important university dates and deadlines.", icon: <Activity className="text-teal-500" />, link: "https://calendar.google.com" },
            { category: 'Resources', title: "Writing Center (OWL)", desc: "Expert guidance for citations, grammar, and essay structure.", icon: <FileText className="text-emerald-500" />, link: "https://owl.purdue.edu" },
            { category: 'Research', title: "Library Database", desc: "Search through millions of digital journals and textbooks.", icon: <BookOpen className="text-blue-500" />, link: "https://scholar.google.com" },
            { category: 'Career', title: "Student Success Portal", desc: "Access all your essential campus services in one place.", icon: <Users className="text-indigo-500" />, link: "https://www.student.gov" },
        ];

        const highRisk = [
            { category: 'Urgent', title: "Priority Advising", desc: "Immediate 1-on-1 counseling to get your academic path back on track.", icon: <AlertCircle className="text-red-500" />, link: "#", urgent: true },
            { category: 'Academic', title: "Peer Tutoring Center", desc: "Free intensive tutoring in core STEM and Humanities subjects.", icon: <Users className="text-orange-500" />, link: "https://www.khanacademy.org", urgent: true },
            { category: 'Wellness', title: "Wellness & Counseling", desc: "Confidential support for mental health and stress management.", icon: <Activity className="text-pink-500" />, link: "https://www.betterhelp.com", urgent: true },
            { category: 'Self-Growth', title: "Study Skills Seminar", desc: "Master effective learning techniques and exam preparation.", icon: <BookOpen className="text-purple-500" />, link: "https://www.coursera.org/learn/learning-how-to-learn" },
        ];

        const moderateRisk = [
            { category: 'Productivity', title: "Time Management Toolkit", desc: "Tools and templates to organize your weekly study routine.", icon: <Activity className="text-amber-500" />, link: "https://trello.com" },
            { category: 'Self-Study', title: "Lecture Recording Suite", desc: "Video archives for deeper review of complex lecture topics.", icon: <Video className="text-cyan-500" />, link: "https://www.youtube.com/edu" },
            { category: 'Networking', title: "Collaboration Hub", desc: "Find or build study groups for your current courses.", icon: <Users className="text-blue-600" />, link: "https://www.discord.com" },
        ];

        let final = [...general];
        if (risk === 'High') final = [...highRisk, ...final];
        if (risk === 'Moderate') final = [...moderateRisk, ...final];
        
        return final;
    }, [profile]);

    const filteredResources = useMemo(() => {
        return allResources.filter(res => {
            const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                res.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = activeTab === 'All' || res.category === activeTab;
            return matchesSearch && matchesTab;
        });
    }, [allResources, searchQuery, activeTab]);

    const categories = ['All', ...new Set(allResources.map(r => r.category))];

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Initializing Portal...</p>
        </div>
    );

    return (
        <div className="relative min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/20 rounded-full blur-[80px] animate-bounce-slow"></div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-xs font-black uppercase tracking-wider mb-4">
                        <Sparkles size={12} className="fill-indigo-500" /> Help Center & Hub
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
                        Resources for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Success.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl">
                        Handcrafted toolkits, academic support, and wellness pathways designed specifically for your journey.
                    </p>
                </div>
                
                {profile && (
                    <div className="flex flex-col items-start lg:items-end p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/50 animate-fade-in-right">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Your Predictive Status</span>
                        <div className={`px-4 py-1.5 rounded-xl text-sm font-black shadow-inner flex items-center gap-2
                             ${profile.risk_level === 'High' ? 'bg-red-50 text-red-600' :
                                profile.risk_level === 'Moderate' ? 'bg-orange-50 text-orange-600' :
                                    'bg-emerald-50 text-emerald-600'}`}>
                            <div className={`w-2 h-2 rounded-full animate-ping ${profile.risk_level === 'High' ? 'bg-red-500' : profile.risk_level === 'Moderate' ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                            {profile.risk_level.toUpperCase()} RISK
                        </div>
                    </div>
                )}
            </div>

            {profile?.risk_level === 'High' && (
                <div className="mb-12 group transition-all duration-300">
                    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-3xl shadow-2xl shadow-red-500/20 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 -z-0"></div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                <AlertCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-1">Immediate Priority Intervention</h3>
                                <p className="text-red-50/80 font-medium">Your current academic trajectory needs optimization. We've matched you with priority sessions below.</p>
                            </div>
                        </div>
                        <button className="relative z-10 px-8 py-3 bg-white text-red-600 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider">
                            Book Session Now
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation & Search */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <div className="relative flex-1 group w-full">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search for tools, people, or guides..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/50 backdrop-blur-lg border-2 border-slate-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-medium shadow-sm hover:shadow-md"
                    />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-4 rounded-2xl font-black text-sm transition-all whitespace-nowrap
                                ${activeTab === cat 
                                    ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' 
                                    : 'bg-white/60 text-slate-500 hover:bg-white hover:text-indigo-600 border border-white/50 shadow-sm'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.length > 0 ? ( filteredResources.map((res, idx) => (
                    <a 
                        key={idx} 
                        href={res.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative block transition-all duration-300 hover:-translate-y-2"
                    >
                        {/* Glow effect on hover */}
                        <div className={`absolute -inset-1 bg-gradient-to-r ${res.urgent ? 'from-red-400/20 to-orange-500/20' : 'from-indigo-400/20 to-fuchsia-500/20'} rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        
                        <div className="relative h-full bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/30 flex flex-col group-hover:bg-white group-hover:shadow-indigo-500/10 transition-all">
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-4 rounded-2xl ${res.urgent ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-600'} transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                                    {res.icon}
                                </div>
                                <div className="p-2 border border-slate-100 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-100 transition-all">
                                    <ExternalLink size={18} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res.urgent ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {res.category}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {res.title}
                            </h3>
                            
                            <p className="text-slate-500 font-medium leading-relaxed flex-1">
                                {res.desc}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                View Resource <ArrowRight size={14} />
                            </div>
                        </div>
                    </a>
                ))) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-4">
                            <Compass size={48} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2">No tools found.</h4>
                        <p className="text-slate-500 font-medium">Try broadening your search or switching categories.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Internal icon for the view resource link
const ArrowRight = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
);

export default StudentResources;
