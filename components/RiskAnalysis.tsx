
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Target, 
  TrendingDown, 
  Info, 
  AlertTriangle,
  ArrowRight,
  X,
  ShieldCheck,
  Clock,
  Banknote,
  FileCheck,
  Loader2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer
} from 'recharts';
import { MOCK_WORKERS, MOCK_DOCUMENTS } from '../constants';
import { Worker } from '../types';

const radarData = [
  { subject: 'Timeline', A: 85, fullMark: 100 },
  { subject: 'Documentation', A: 65, fullMark: 100 },
  { subject: 'Salary', A: 92, fullMark: 100 },
  { subject: 'Reporting', A: 78, fullMark: 100 },
  { subject: 'Attendance', A: 45, fullMark: 100 },
];

const RiskAnalysis: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [execStatus, setExecStatus] = useState('');
  
  const highRiskWorkers = [...MOCK_WORKERS].sort((a, b) => b.riskScore - a.riskScore);
  const workerDocs = selectedWorker ? MOCK_DOCUMENTS.filter(d => d.workerId === selectedWorker.id) : [];

  const handleExecutePlan = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExecuting(true);
    const steps = [
      "Orchestrator: Initializing remediation protocol...",
      "DocIntel: Scanning vault for missing evidence...",
      "Timeline: Adjusting buffers for high-risk profiles...",
      "Reporting: Drafted 3 preemptive UKVI disclosures.",
      "Success: Compliance score stabilized (+4.2%)."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setExecStatus(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsExecuting(false);
          setExecStatus('');
          window.alert('Autonomous Remediation Plan Executed. 4 critical vulnerabilities addressed and organizational health index restored.');
        }, 800);
      }
    }, 1000);
  };

  const handleDrillDown = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Predictive Risk Analysis</h2>
        <p className="text-slate-500 mt-1">AI-driven forecasting and probability mapping of compliance vulnerabilities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Surface Area */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-lg text-slate-900">Vulnerability Surface Area</h3>
             <div className="flex gap-2">
                <span className="text-[10px] font-black bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">Stress Detected</span>
             </div>
          </div>
          <div className="flex-1 w-full min-h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Radar
                  name="Organization"
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="#10b981"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-center text-slate-500 mt-6 px-12 leading-relaxed font-medium">
            Lexa Intelligence identified a <span className="text-red-600 font-bold">45% stress level</span> in Attendance Tracking. Automated remediation recommended.
          </p>
        </div>

        {/* Top Risk Workers */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-lg text-slate-900">High Risk Profiles</h3>
            <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700">Full Exposure Report</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {highRiskWorkers.map((worker) => (
              <div 
                key={worker.id} 
                onClick={() => handleDrillDown(worker)}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black shadow-lg transition-all ${
                    worker.riskScore > 60 ? 'bg-red-500 text-white shadow-red-500/20' : worker.riskScore > 20 ? 'bg-amber-400 text-white shadow-amber-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20'
                  }`}>
                    {worker.riskScore}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{worker.name}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-1">{worker.role} • {worker.visaType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Risk</p>
                     <p className="text-xs font-bold text-slate-700">{worker.riskScore > 60 ? 'Timeline Expiry' : 'Doc Verification'}</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-all" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
             <AlertTriangle size={18} className="text-amber-400 shrink-0" />
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">2 additional profiles trending toward "Warning" within 14 days.</p>
          </div>
        </div>
      </div>

      {/* Strategic Risk Insights */}
      <div className="bg-slate-900 p-8 lg:p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-emerald-500/20"></div>
        {isExecuting && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300">
             <div className="flex flex-col items-center gap-6 text-center px-8">
                <Loader2 className="animate-spin text-emerald-400" size={64} />
                <div className="space-y-2">
                  <p className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase font-black">Remediation in Progress</p>
                  <p className="text-lg font-bold text-white max-w-sm">{execStatus}</p>
                </div>
             </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="p-8 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 shadow-inner group-hover:bg-white/10 transition-all">
            <Target size={56} className="text-emerald-400" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-3xl font-black tracking-tight leading-tight">Autonomous Remediation Plan</h3>
            <p className="text-slate-400 leading-relaxed text-sm max-w-2xl font-medium">
              The Orchestrator has formulated a prioritized mitigation roadmap. 
              Execution of these 4 steps will increase organizational compliance health from <span className="font-black text-emerald-400">94% to 98%</span>.
            </p>
          </div>
          <button 
            onClick={handleExecutePlan}
            disabled={isExecuting}
            className="px-12 py-5 bg-emerald-500 text-white rounded-[24px] font-black text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 whitespace-nowrap border-b-4 border-emerald-700 hover:border-emerald-600"
          >
            EXECUTE PLAN
          </button>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 lg:p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedWorker(null)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-8 duration-300 border border-slate-200">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-[24px] flex items-center justify-center text-3xl font-black shadow-2xl">
                  {selectedWorker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedWorker.name}</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">{selectedWorker.role} • {selectedWorker.visaType}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedWorker(null)} 
                className="p-4 hover:bg-slate-200 rounded-[20px] transition-all text-slate-400 hover:text-slate-900 active:scale-90"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="p-10 space-y-10 max-h-[65vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance Health Index</h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 text-sm font-black text-slate-600 uppercase tracking-tight">
                        <ShieldCheck size={20} className="text-emerald-500" /> Overall Risk
                      </div>
                      <span className={`text-2xl font-black ${selectedWorker.riskScore > 60 ? 'text-red-600' : 'text-emerald-600'}`}>{selectedWorker.riskScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 text-sm font-black text-slate-600 uppercase tracking-tight">
                        <Clock size={20} className="text-blue-500" /> Visa Expiry
                      </div>
                      <span className="text-lg font-black text-slate-800">{selectedWorker.visaExpiry}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Evidence Repository</h4>
                  <div className="space-y-3">
                    {workerDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileCheck size={18} className={doc.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'} />
                          <span className="text-sm font-bold text-slate-700">{doc.type}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{doc.lastChecked}</span>
                      </div>
                    ))}
                    {workerDocs.length === 0 && <p className="text-center py-6 text-slate-400 font-medium italic text-sm">No evidence artifacts synced.</p>}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-900 text-white rounded-[32px] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
                <h4 className="font-black mb-4 flex items-center gap-3 text-emerald-400 uppercase tracking-widest text-xs">
                  <ShieldCheck size={20} />
                  Remediation Context
                </h4>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {selectedWorker.riskScore > 60 
                    ? "SYSTEM ALERT: Critical sponsorship breach vulnerability. Lexa Intelligence detected a passport expiry mismatch and missing degree evidence. Automated secure evidence request is pending AO confirmation."
                    : "STABLE: No critical remediation required. Lexa continuous monitoring active via the Change Detection Agent."
                  }
                </p>
                <div className="mt-8 flex gap-4">
                   <button className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95 border-b-4 border-emerald-700">Initiate Case</button>
                   <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">Manual RTW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAnalysis;
