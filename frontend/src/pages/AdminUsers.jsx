import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    Users, UserCheck, Shield, Edit3, Trash2, 
    Lock, Unlock, Search, Filter, Sparkles, 
    MoreHorizontal, GraduationCap, Briefcase, 
    Check, X, UserMinus, AlertCircle
} from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    // Edit state
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', role: '', department: '', year: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setError('System Access Restricted. Admin credentials verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('IRREVERSIBLE ACTION: Are you sure you want to purge this user account?')) return;

        const userToDelete = users.find(u => u.id === userId);
        if (userToDelete && userToDelete.email === user.email) {
            alert("Self-termination is restricted for administrative security.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== userId));
        } catch (err) {
            console.error('Failed to delete user:', err);
            alert(err.response?.data?.detail || 'Execution failed.');
        }
    };

    const handleToggleBan = async (userToToggle) => {
        if (userToToggle.email === user.email) {
            alert("Administrative restriction: Cannot lock primary active session.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/users/${userToToggle.id}`, {
                banned: !userToToggle.banned
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(users.map(u => u.id === userToToggle.id ? response.data : u));
        } catch (err) {
            console.error('Failed to update ban status:', err);
            alert(err.response?.data?.detail || 'Restriction update failed.');
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setEditForm({
            name: user.name,
            role: user.role,
            department: user.department || '',
            year: user.year || ''
        });
    };

    const handleEditSave = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const dataToUpdate = { ...editForm };
            if (!dataToUpdate.department) dataToUpdate.department = null;
            if (!dataToUpdate.year) dataToUpdate.year = null;

            const response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, dataToUpdate, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(users.map(u => u.id === userId ? response.data : u));
            setEditingUser(null);
        } catch (err) {
            console.error('Failed to update user:', err);
            alert(err.response?.data?.detail || 'Update save failed.');
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Syncing User Directory...</p>
        </div>
    );

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             {/* Background Decorative Blobs */}
             <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
             <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Shield size={12} className="text-indigo-400" /> Identity Management
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Directory.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Orchestrate institutional permissions, manage identity status, and oversee global system access.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/50 p-4 rounded-3xl shadow-xl shadow-slate-200/50">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Population</div>
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{users.length}</div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="relative flex-1 group w-full">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search identities by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/50 backdrop-blur-lg border-2 border-slate-100 pl-14 pr-6 py-5 rounded-[2rem] focus:outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-800 font-bold shadow-sm hover:shadow-md placeholder:text-slate-300"
                    />
                </div>
                
                <button className="w-full md:w-auto px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Filter size={18} /> Advanced Filters
                </button>
            </div>

            {error && (
                <div className="p-6 bg-red-50/80 backdrop-blur-md text-red-600 rounded-3xl border border-red-100 flex items-center gap-4 animate-shake">
                    <AlertCircle size={24} />
                    <p className="font-black text-sm uppercase tracking-tight">{error}</p>
                </div>
            )}

            {/* Users Table / Matrix */}
            <div className="relative z-10 overflow-hidden bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/30">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-900/5">
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] first:rounded-tl-[3rem]">User Identity</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Permission Level</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit & Deployment</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] last:rounded-tr-[3rem]">Protocols</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {filteredUsers.map((u, idx) => (
                                <tr key={u.id} className="group hover:bg-white/60 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        {editingUser === u.id ? (
                                            <div className="space-y-2 animate-fade-in">
                                                <input
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full bg-white border-2 border-indigo-100 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-indigo-500"
                                                />
                                                <div className="text-xs font-black text-slate-300 uppercase tracking-widest">{u.email}</div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white
                                                    ${u.banned ? 'bg-slate-100 text-slate-400 grayscale' : 'bg-gradient-to-br from-indigo-50 to-white text-indigo-600'}`}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                                        {u.name}
                                                        {u.banned && (
                                                            <span className="px-2 py-0.5 rounded-lg text-[8px] font-black bg-red-50 text-red-600 border border-red-100 uppercase tracking-widest">
                                                                Restricted
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs font-medium text-slate-400 tracking-wide">{u.email}</div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        {editingUser === u.id ? (
                                            <div className="relative animate-fade-in">
                                                <select
                                                    value={editForm.role}
                                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                    className="w-full bg-white border-2 border-indigo-100 rounded-xl px-3 py-2 text-sm font-bold appearance-none cursor-pointer"
                                                >
                                                    <option value="student">Student</option>
                                                    <option value="staff">Staff</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        ) : (
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-inner flex items-center gap-2 w-max
                                                ${u.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                    u.role === 'staff' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                        'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${u.role === 'admin' ? 'bg-purple-600' : u.role === 'staff' ? 'bg-indigo-600' : 'bg-emerald-600'}`} />
                                                {u.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        {editingUser === u.id ? (
                                            <div className="space-y-2 flex flex-col w-40 animate-fade-in">
                                                <input
                                                    placeholder="Department"
                                                    value={editForm.department}
                                                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                                    className="w-full bg-white border-2 border-indigo-100 rounded-xl px-3 py-2 text-xs font-bold"
                                                />
                                                <input
                                                    placeholder="Year"
                                                    value={editForm.year}
                                                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                                                    className="w-full bg-white border-2 border-indigo-100 rounded-xl px-3 py-2 text-xs font-bold"
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-1.5">
                                                {u.department ? (
                                                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-tight">
                                                        <Briefcase size={14} className="text-slate-300" /> {u.department}
                                                    </div>
                                                ) : <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest italic">Undefined Unit</span>}
                                                
                                                {u.year && (
                                                    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        <GraduationCap size={12} /> Level {u.year}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {editingUser === u.id ? (
                                            <div className="flex justify-end gap-3 animate-fade-in">
                                                <button
                                                    onClick={() => handleEditSave(u.id)}
                                                    className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all outline-none"
                                                    title="Commit Update"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingUser(null)}
                                                    className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all outline-none"
                                                    title="Abourt Process"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditClick(u)}
                                                    className="p-2.5 bg-white text-indigo-600 rounded-xl border border-indigo-50 shadow-sm hover:scale-110 active:scale-95 transition-all outline-none"
                                                    title="Modify Record"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleBan(u)}
                                                    className={`p-2.5 bg-white border shadow-sm rounded-xl hover:scale-110 active:scale-95 transition-all outline-none
                                                        ${u.banned ? 'text-emerald-600 border-emerald-50' : 'text-orange-600 border-orange-50'}`}
                                                    title={u.banned ? "Restore Access" : "Restrict Access"}
                                                    disabled={u.email === user?.email}
                                                >
                                                    {u.banned ? <Unlock size={18} /> : <Lock size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u.id)}
                                                    className="p-2.5 bg-white text-red-600 border border-red-50 rounded-xl shadow-sm hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95 transition-all outline-none"
                                                    title="Purge Record"
                                                    disabled={u.email === user?.email}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="py-32 text-center flex flex-col items-center">
                        <div className="p-8 bg-slate-50 rounded-full text-slate-200 mb-6">
                            <UserMinus size={64} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No matching identities.</h3>
                        <p className="text-slate-400 font-medium max-w-xs mx-auto">
                            The current search parameters do not correlate with any active user records.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
