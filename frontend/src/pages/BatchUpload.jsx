import React, { useState } from 'react';
import axios from 'axios';
import { 
    Upload, FileText, CheckCircle, AlertTriangle, 
    XCircle, ArrowRight, Sparkles, Database, 
    Download, Trash2, FileSpreadsheet, ShieldCheck
} from 'lucide-react';

const BatchUpload = () => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setStatus({ type: '', message: '' });

        if (selectedFile) {
            parseCSV(selectedFile);
        } else {
            setParsedData(null);
        }
    };

    const parseCSV = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n').filter(line => line.trim() !== '');
                if (lines.length < 2) throw new Error("Dataset mismatch: File must contain header and data rows.");

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                const expectedHeaders = ['name', 'email', 'attendance', 'marks', 'assignments', 'study_hours'];

                const missingHeaders = expectedHeaders.filter(eh => !headers.includes(eh));
                if (missingHeaders.length > 0) {
                    throw new Error(`Invalid Schema: Missing ${missingHeaders.join(', ')}`);
                }

                const students = [];
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    if (values.length !== headers.length) continue;

                    const student = {};
                    headers.forEach((header, index) => {
                        if (expectedHeaders.includes(header)) {
                            student[header] = header === 'name' || header === 'email'
                                ? values[index]
                                : Number(values[index]) || 0;
                        }
                    });

                    if (!student.name) throw new Error(`Integrity Error: Row ${i + 1} missing name.`);
                    students.push(student);
                }

                if (students.length === 0) throw new Error("No valid telemetry detected.");

                setParsedData(students);
                setStatus({ type: 'success', message: `Parsed ${students.length} student nodes successfully.` });
            } catch (err) {
                console.error(err);
                setParsedData(null);
                setStatus({ type: 'error', message: err.message || "Neural parsing failed." });
            }
        };
        reader.readAsText(file);
    };

    const handleUpload = async () => {
        if (!parsedData || parsedData.length === 0) return;

        try {
            setUploading(true);
            setStatus({ type: '', message: '' });
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/students/batch`, parsedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStatus({ type: 'success', message: response.data.message || 'Data ingestion finalized.' });
            setFile(null);
            setParsedData(null);
            document.getElementById('file-upload').value = '';
        } catch (err) {
            console.error('Batch upload failed:', err);
            setStatus({ type: 'error', message: err.response?.data?.detail || 'Handshake failed.' });
        } finally {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        const headers = "name,email,attendance,marks,assignments,study_hours\n";
        const sample = "John Doe,john@example.com,85.5,78.0,8,4.5\nJane Smith,jane@example.com,92.0,88.5,10,6.0";
        const blob = new Blob([headers + sample], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'student_intelligence_template.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="relative space-y-12 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-200/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-0 -z-10 w-64 h-64 bg-violet-200/10 rounded-full blur-[80px] animate-bounce-slow"></div>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <Database size={12} className="text-indigo-400" /> Data Ingestion
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
                        Batch <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Sync.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                        Synchronize large-scale student datasets for automated risk stratification and institutional analytics.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10 items-start">
                {/* Upload Control Center */}
                <div className="xl:col-span-5 bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-white hover:bg-white/60 transition-all duration-500 group">
                    <div className="mb-10 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Transmission Hub</h3>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:rotate-12 transition-transform">
                                <Upload size={24} />
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Upload your CSV architecture here. The system will auto-calculate predictive risk models for each individual record.
                        </p>
                        <button
                            onClick={downloadTemplate}
                            className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl"
                        >
                            <Download size={14} /> Download Neural Template
                        </button>
                    </div>

                    <div className={`relative border-4 border-dashed rounded-[2.5rem] p-12 transition-all duration-500 flex flex-col items-center justify-center text-center group/drop
                        ${file ? 'border-indigo-400 bg-indigo-50/50 shadow-2xl shadow-indigo-500/10' : 'border-slate-100 bg-slate-50/30 hover:border-indigo-200 hover:bg-white/50'}`}>
                        <input
                            type="file"
                            id="file-upload"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        <label
                            htmlFor="file-upload"
                            className={`cursor-pointer w-full flex flex-col items-center ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 transition-transform duration-500 group-hover/drop:scale-110 group-hover/drop:rotate-6
                                ${file ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'}`}>
                                <FileSpreadsheet size={40} />
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tight mb-2">
                                {file ? file.name : 'Ingest CSV Dataset'}
                            </span>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                Drag and drop or browse local storage
                            </span>
                        </label>
                        
                        {file && (
                             <button 
                                onClick={(e) => { e.preventDefault(); setFile(null); setParsedData(null); }} 
                                className="absolute top-6 right-6 p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                             >
                                <Trash2 size={16} />
                             </button>
                        )}
                    </div>

                    {status.message && (
                        <div className={`mt-10 p-6 rounded-[2rem] border animate-fade-in flex items-start gap-4 
                            ${status.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            {status.type === 'error' ? <XCircle className="mt-1 flex-shrink-0" /> : <CheckCircle className="mt-1 flex-shrink-0" />}
                            <div>
                                <p className="font-black uppercase text-[10px] tracking-widest mb-1">{status.type === 'error' ? 'Protocols Disrupted' : 'Sync Established'}</p>
                                <p className="text-sm font-bold opacity-90">{status.message}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Data Preview Matrix */}
                <div className="xl:col-span-7 h-full flex flex-col min-h-[600px]">
                    {parsedData && parsedData.length > 0 && !uploading && status.type !== 'error' ? (
                        <div className="h-full bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-slate-200/30 flex flex-col animate-fade-in-right">
                             <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Preview Matrix</h3>
                                    <p className="text-slate-400 font-medium text-sm">Review {parsedData.length} identified data nodes.</p>
                                </div>
                                <button
                                    onClick={handleUpload}
                                    className="group relative overflow-hidden bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 active:scale-95 transition-all"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        INITIALIZE SYNC <ArrowRight size={18} />
                                    </span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-100 bg-white/50">
                                <table className="w-full border-separate border-spacing-0">
                                    <thead>
                                        <tr className="bg-slate-900/5">
                                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                                            <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</th>
                                            <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-black uppercase text-[10px] tracking-widest">Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {parsedData.slice(0, 8).map((row, idx) => (
                                            <tr key={idx} className="hover:bg-white transition-colors">
                                                <td className="px-6 py-4">
                                                     <div className="text-sm font-black text-slate-900 tracking-tight">{row.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-400">{row.email}</td>
                                                <td className="px-6 py-4">
                                                     <div className="flex justify-center">
                                                         <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black">{row.attendance}%</span>
                                                     </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                     <div className="flex justify-center">
                                                         <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black">{row.marks}</span>
                                                     </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {parsedData.length > 8 && (
                                    <div className="py-6 text-center border-t border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        + {parsedData.length - 8} ADDITIONAL NODES READY
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-2xl rounded-[3rem] border-4 border-dashed border-slate-100 text-center group hover:bg-white/60 transition-all duration-500">
                            <div className="relative mb-8">
                                <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-xl animate-pulse group-hover:scale-150 transition-transform"></div>
                                <div className="relative w-20 h-20 bg-white/80 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                                    <FileText className="w-10 h-10 text-slate-200" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Awaiting Telemetry</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                                The system requires a structured CSV architecture to begin the automated risk stratification process.
                            </p>
                            
                            <div className="mt-12 flex items-center gap-6 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-opacity">
                                <div className="flex items-center gap-2">
                                     <ShieldCheck size={16} className="text-indigo-600" />
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encrypted Upload</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Sparkles size={16} className="text-indigo-600" />
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Parsing</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchUpload;
