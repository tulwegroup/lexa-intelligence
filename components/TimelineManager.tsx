
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, Info, ShieldAlert, Sparkles, Loader2, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { MOCK_WORKERS } from '../constants';

const TimelineManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [isUpdatingPolicies, setIsUpdatingPolicies] = useState(false);
  const [activePipelines, setActivePipelines] = useState<string[]>([]);
  
  const upcomingExpiries = [...MOCK_WORKERS].sort((a, b) => new Date(a.visaExpiry).getTime() - new Date(b.visaExpiry).getTime());

  const handleToggleView = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Toggling timeline view mode...');
    setViewMode(prev => prev === 'list' ? 'calendar' : 'list');
  };

  const handleUpdatePolicies = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdatingPolicies(true);
    setTimeout(() => {
      setIsUpdatingPolicies(false);
      window.alert('SUCCESS: Predictive Buffer Policies recalibrated. New safety buffer set to 105 days (+15d adjustment for UKVI current backlog).');
    }, 1500);
  };

  const handleInitiatePipeline = (e: React.MouseEvent, workerName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (activePipelines.includes(workerName)) return;
    setActivePipelines(prev => [...prev, workerName]);
    setTimeout(() => {
      window.alert(`Extension Pipeline Protocol Initiated for ${workerName}. HRIS and Payroll agents alerted for threshold locking.`);
    }, 100);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-top-8 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Predictive Visa Timeline</h2>
          <p className="text-slate-500 mt-1">Timeline Agent optimizing renewal buffers and expiry tracking</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={handleToggleView}
            className="px-8 py-3 bg-slate-900 text-white rounded-[20px] text-sm font-black tracking-tight shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-95 transition-all hover:bg-slate-800"
           >
             <CalendarIcon size={20} />
             {viewMode === 'list' ? 'SWITCH TO CALENDAR' : 'SWITCH TO LIST'}
           </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="bg-white p-20 rounded-[40px] border border-slate-200 text-center animate-in zoom-in-95 duration-500 shadow-sm">
           <div className="w-24 h-24 bg-slate-50 text-slate-400 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CalendarIcon size={48} />
           </div>
           <h3 className="text-3xl font-black text-slate-900 tracking-tight">Interactive Calendar (BETA)</h3>
           <p className="text-slate-500 max-w-md mx-auto mt-4 leading-relaxed font-medium">Predictive timeline events are being synchronized with your enterprise Google/O365 calendars. Real-time conflict detection active.</p>
           <button 
             onClick={handleToggleView} 
             className="mt-10 px-8 py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-100 transition-all active:scale-95"
           >
             Return to List Analysis
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          {/* Active Expiry Feed */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
              <Clock size={24} className="text-emerald-500" />
              Impending Expiry Queue
            </h3>
            {upcomingExpiries.map((worker) => {
              const daysLeft = Math.ceil((new Date(worker.visaExpiry).getTime() - Date.now()) / (1000*60*60*24));
              const progress = Math.max(0, Math.min(100, (daysLeft / 365) * 100));
              const isProcessing = activePipelines.includes(worker.name);

              return (
                <div key={worker.id} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-5">
                      <div className="w-16 h-16 bg-slate-100 rounded-[22px] flex items-center justify-center font-black text-slate-600 text-xl shadow-inner">
                        {worker.name[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg leading-tight">{worker.name}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{worker.visaType} • EXP: {worker.visaExpiry}</p>
                      </div>
                    </div>
                    <div className={`text-right ${daysLeft < 60 ? 'text-red-500' : 'text-slate-400'}`}>
                      <p className="text-3xl font-black tracking-tighter">{daysLeft}d</p>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Remaining</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                      <div className={`h-full rounded-full transition-all duration-1000 ease-out ${daysLeft < 60 ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'}`} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="text-[10px] bg-slate-900 text-slate-300 px-3 py-1 rounded-full font-black uppercase tracking-widest">AI Buffer: 90d</span>
                        {daysLeft < 90 && !isProcessing && <span className="text-[10px] bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 flex items-center gap-2 font-black uppercase tracking-widest animate-pulse"><ShieldAlert size={14} /> Action Due</span>}
                        {isProcessing && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-2 font-black uppercase tracking-widest"><CheckCircle2 size={14} /> Pipeline Active</span>}
                      </div>
                      <button 
                        onClick={(e) => handleInitiatePipeline(e, worker.name)}
                        disabled={isProcessing}
                        className={`text-xs font-black uppercase tracking-[0.1em] transition-all px-6 py-2 rounded-xl border-2 ${isProcessing ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 active:scale-95'}`}
                      >
                        {isProcessing ? 'PIPELINE ENGAGED' : 'INITIATE EXTENSION →'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Predictive Insights Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] -ml-16 -mt-16 transition-all group-hover:bg-blue-500/20"></div>
               <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                 <Sparkles size={24} className="text-emerald-400" />
                 Timeline Intelligence
               </h3>
               <div className="space-y-8">
                  <div>
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3">Predicted Success Rate</p>
                     <p className="text-3xl font-black text-emerald-400 tracking-tighter">96.2%</p>
                     <p className="text-xs opacity-60 leading-relaxed font-medium mt-2">
                       Quarterly forecast based on organizational performance and current UKVI Appendix Skilled Worker thresholds.
                     </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-[24px] border border-white/10 shadow-inner">
                     <p className="text-xs font-black mb-2 text-blue-400 uppercase tracking-widest">Bottleneck Identified</p>
                     <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                       BRP verification cycle increased (+4d). The Timeline Agent has auto-adjusted extension triggers for Q3 expiries.
                     </p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <button 
                      onClick={handleUpdatePolicies}
                      disabled={isUpdatingPolicies}
                      className="w-full py-5 bg-emerald-500 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isUpdatingPolicies ? <Loader2 size={18} className="animate-spin" /> : null}
                      {isUpdatingPolicies ? 'Updating Policies...' : 'Update Buffer Policies'}
                    </button>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
               <h4 className="font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tighter text-sm">
                 <Bell size={20} className="text-blue-500" />
                 Predictive Tasks
               </h4>
               <div className="space-y-4">
                  {[
                    { title: 'Check RTW for David C.', date: 'Tomorrow', type: 'High' },
                    { title: 'Sarah J. Salary Review', date: 'In 4 days', type: 'Med' },
                    { title: 'Sponsor Audit Prep', date: 'In 1 week', type: 'High' },
                  ].map((rem, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-[20px] border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group active:scale-[0.98]">
                      <div className="space-y-1">
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{rem.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rem.date}</p>
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${rem.type === 'High' ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' : 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'}`}>{rem.type}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineManager;
