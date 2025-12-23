
import React, { useState } from 'react';
import { 
  FileBox, 
  Upload, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Filter,
  Eye,
  Download,
  Trash2,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_WORKERS } from '../constants';
import { Document as DocType } from '../types';

const DocumentVault: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const getWorkerName = (id: string) => MOCK_WORKERS.find(w => w.id === id)?.name || 'Unknown';

  const filteredDocs = filter === 'All' 
    ? MOCK_DOCUMENTS 
    : MOCK_DOCUMENTS.filter(doc => doc.status === filter);

  const handleDownload = (e: React.MouseEvent, docId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloading(docId);
    setTimeout(() => {
      setIsDownloading(null);
      setNotification(`Document ${docId} exported securely. Integrity hash verified.`);
      setTimeout(() => setNotification(null), 3000);
    }, 1200);
  };

  const handleView = (doc: DocType) => {
    setSelectedDoc(doc);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500 relative">
      {notification && (
        <div className="fixed top-24 right-8 z-[110] animate-in slide-in-from-right-8 flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-emerald-500">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">{notification}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Intelligent Document Vault</h2>
          <p className="text-slate-500 mt-1">Autonomous evidence collection and integrity verification pipeline</p>
        </div>
        <button 
          onClick={() => setNotification("Batch upload session initiated. Waiting for secure channel...")}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
        >
          <Upload size={20} />
          Batch Upload Evidence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Evidence', value: '452', icon: FileBox, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'AI Verified', value: '98.5%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Forgery Check', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            {['All', 'Verified', 'Flagged', 'Processing'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === t 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <div className="relative flex-1 lg:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search filename or worker..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full lg:w-64" />
             </div>
             <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <Filter size={20} className="text-slate-600" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                   <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Document Artifact</th>
                   <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Sponsored Worker</th>
                   <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Verification Status</th>
                   <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">AI Confidence</th>
                   <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => handleView(doc)}>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                              <FileBox size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900">{doc.type}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Checked: {doc.lastChecked}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-700">{getWorkerName(doc.workerId)}</p>
                        <p className="text-[10px] text-slate-400 font-mono">UUID: {doc.workerId}</p>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           {doc.status === 'Verified' ? (
                             <CheckCircle size={14} className="text-emerald-500" />
                           ) : doc.status === 'Flagged' ? (
                             <AlertCircle size={14} className="text-red-500" />
                           ) : (
                             <Clock size={14} className="text-amber-500 animate-spin-slow" />
                           )}
                           <span className={`text-xs font-black uppercase tracking-widest ${
                             doc.status === 'Verified' ? 'text-emerald-600' : doc.status === 'Flagged' ? 'text-red-600' : 'text-amber-600'
                           }`}>
                              {doc.status}
                           </span>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                           <div className="flex-1 max-w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner">
                              <div className={`h-full rounded-full transition-all duration-1000 ${doc.confidence > 0.9 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${doc.confidence * 100}%` }}></div>
                           </div>
                           <span className="text-xs font-black text-slate-700">{Math.round(doc.confidence * 100)}%</span>
                        </div>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-10 lg:opacity-0 group-hover:opacity-100 transition-all">
                           <button 
                            onClick={(e) => { e.stopPropagation(); handleView(doc); }}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                           >
                            <Eye size={18} />
                           </button>
                           <button 
                            onClick={(e) => handleDownload(e, doc.id)}
                            disabled={isDownloading === doc.id}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90 disabled:opacity-50"
                           >
                            {isDownloading === doc.id ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                           </button>
                           <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90" onClick={(e) => e.stopPropagation()}>
                            <Trash2 size={18} />
                           </button>
                        </div>
                     </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedDoc(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <FileBox className="text-blue-600" />
                <h3 className="font-bold text-slate-900">{selectedDoc.type} – {getWorkerName(selectedDoc.workerId)}</h3>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="p-3 hover:bg-slate-200 rounded-2xl transition-all text-slate-400 hover:text-slate-900 active:scale-95">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 lg:p-12 bg-slate-100 flex items-center justify-center min-h-[500px]">
               <div className="bg-white w-full max-w-lg aspect-[1/1.4] shadow-2xl rounded-sm border border-slate-300 p-10 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start">
                    <div className="h-10 bg-slate-100 w-3/4 rounded"></div>
                    <div className="w-12 h-12 bg-slate-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-50 w-full rounded"></div>
                    <div className="h-4 bg-slate-50 w-full rounded"></div>
                    <div className="h-4 bg-slate-50 w-5/6 rounded"></div>
                    <div className="h-4 bg-slate-50 w-4/6 rounded"></div>
                  </div>
                  <div className="mt-12 flex justify-between items-center">
                    <div className="w-28 h-28 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-center text-[8px] text-slate-300">PHOTO ID</div>
                    <div className="space-y-2">
                       <div className="w-40 h-8 bg-slate-50 rounded border border-slate-200"></div>
                       <div className="w-32 h-4 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[9px] text-slate-300 font-mono tracking-tighter">INTEGRITY_HASH: 0x{Math.random().toString(16).substring(2, 24)}</p>
                    <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
                  </div>
               </div>
            </div>
            <div className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="flex gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI Confidence</p>
                    <p className="text-sm font-black text-emerald-600">{Math.round(selectedDoc.confidence * 100)}% Verified</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Audit</p>
                    <p className="text-sm font-black text-slate-800">{selectedDoc.lastChecked}</p>
                  </div>
               </div>
               <button 
                onClick={(e) => { setSelectedDoc(null); handleDownload(e, selectedDoc.id); }}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 w-full sm:w-auto justify-center"
               >
                 <Download size={18} />
                 Download Original
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;
