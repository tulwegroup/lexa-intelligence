
import React, { useState } from 'react';
import { 
  MoreVertical, 
  ExternalLink, 
  Filter, 
  Search, 
  X, 
  ShieldCheck, 
  Clock, 
  Banknote, 
  FileCheck 
} from 'lucide-react';
import { MOCK_WORKERS, MOCK_DOCUMENTS } from '../constants';
import { ComplianceStatus, Worker } from '../types';

const WorkerList: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status: ComplianceStatus) => {
    switch (status) {
      case 'Compliant': return 'bg-emerald-100 text-emerald-700';
      case 'Warning': return 'bg-amber-100 text-amber-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredWorkers = MOCK_WORKERS.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.socCode.includes(searchTerm) ||
    w.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const workerDocs = selectedWorker ? MOCK_DOCUMENTS.filter(d => d.workerId === selectedWorker.id) : [];

  const handleRowClick = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Action clicked');
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Sponsored Worker Register</h2>
            <p className="text-sm text-slate-500">Continuous monitoring of all {MOCK_WORKERS.length} active sponsorships</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by name, SOC..." 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter size={18} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Worker Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SOC Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Visa Expiry</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Risk Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkers.map((worker) => (
                <tr 
                  key={worker.id} 
                  onClick={() => handleRowClick(worker)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{worker.name}</p>
                        <p className="text-xs text-slate-500">{worker.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-600">{worker.socCode}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-700">{worker.visaExpiry}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({Math.ceil((new Date(worker.visaExpiry).getTime() - Date.now()) / (1000*60*60*24))}d left)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full border-4 ${
                        worker.riskScore > 60 ? 'border-red-500' : worker.riskScore > 20 ? 'border-amber-400' : 'border-emerald-400'
                      } flex items-center justify-center text-xs font-bold`}>
                        {worker.riskScore}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(worker.status)}`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={handleActionClick}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button 
                        onClick={handleActionClick}
                        className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>Showing {filteredWorkers.length} of {MOCK_WORKERS.length} workers</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">Previous</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded shadow-sm font-medium">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedWorker(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-bold">
                  {selectedWorker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedWorker.name}</h3>
                  <p className="text-slate-500 font-medium">{selectedWorker.role} • {selectedWorker.visaType}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedWorker(null)}
                className="p-3 hover:bg-slate-200 rounded-2xl transition-all text-slate-400 hover:text-slate-900 active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Compliance Status</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <ShieldCheck size={18} className="text-emerald-500" /> Overall Risk
                      </div>
                      <span className={`text-lg font-black ${selectedWorker.riskScore > 60 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {selectedWorker.riskScore}/100
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Clock size={18} className="text-blue-500" /> Visa Expiry
                      </div>
                      <span className="text-sm font-black text-slate-800">{selectedWorker.visaExpiry}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Banknote size={18} className="text-emerald-500" /> Annual Salary
                      </div>
                      <span className="text-sm font-black text-slate-800">£{selectedWorker.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Documents Verified</h4>
                  <div className="space-y-2">
                    {workerDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all border border-slate-100/50 hover:border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileCheck size={16} className={doc.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'} />
                          <span className="text-sm font-bold text-slate-700">{doc.type}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{doc.lastChecked}</span>
                      </div>
                    ))}
                    {workerDocs.length === 0 && <p className="text-xs text-slate-400 italic py-4 text-center">No document records found.</p>}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={20} />
                  AI Agent Recommendation
                </h4>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {selectedWorker.riskScore > 60 
                    ? "CRITICAL: Immediate Action Required. High risk score detected due to document mismatch and impending expiry. The Orchestrator has prepared a remediation plan to secure documentation update via manager portal."
                    : "STABLE: No immediate compliance risks identified. Continuous monitoring of HRIS synchronization events for salary and role variance is currently active and reporting nominal status."
                  }
                </p>
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs font-black transition-all shadow-lg active:scale-95">Manual Mock Audit</button>
                  <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-black transition-all active:scale-95">Request RTW Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerList;
