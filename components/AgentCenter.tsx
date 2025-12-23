
import React, { useState } from 'react';
import { 
  Bot, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Terminal, 
  RefreshCw, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  X,
  Network
} from 'lucide-react';
import { AGENTS } from '../constants';

const AgentCenter: React.FC = () => {
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [triggeringAgent, setTriggeringAgent] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [showTopology, setShowTopology] = useState(false);

  const handleRecalibrate = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Action: Recalibrating all agents...');
    setIsRecalibrating(true);
    setTimeout(() => {
      setIsRecalibrating(false);
      setShowNotification('Compliance Hive recalibrated. Synchronous loops verified at 100% health.');
      setTimeout(() => setShowNotification(null), 3000);
    }, 2500);
  };

  const handleManualTrigger = (e: React.MouseEvent, agentName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (triggeringAgent) return;
    
    console.log(`Action: Manually triggering agent: ${agentName}`);
    setTriggeringAgent(agentName);
    setTimeout(() => {
      setTriggeringAgent(null);
      setShowNotification(`${agentName} manual inspection cycle completed successfully.`);
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const handleViewTopology = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Action: Opening module topology...');
    setShowTopology(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {showNotification && (
        <div className="fixed top-24 right-8 z-[200] animate-in slide-in-from-right-8 flex items-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-[24px] shadow-2xl border border-slate-700">
          <CheckCircle2 size={24} className="text-emerald-400" />
          <p className="text-sm font-black tracking-tight">{showNotification}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Agent Intelligence Hive</h2>
          <p className="text-slate-500 mt-1">Orchestration and health monitoring of autonomous modules</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleRecalibrate}
            disabled={isRecalibrating}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[20px] text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {isRecalibrating ? <Loader2 size={18} className="animate-spin text-emerald-400" /> : <RefreshCw size={18} />}
            {isRecalibrating ? 'Recalibrating Hive...' : 'Recalibrate All'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Orchestrator Status */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-5 bg-emerald-500/20 text-emerald-400 rounded-3xl border border-emerald-500/30 shadow-inner">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">Hive Status: Optimal</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Orchestrator v4.2.1 – Secure Cluster Active</p>
              </div>
            </div>
            <div className="text-right relative z-10">
              <p className="text-5xl font-black text-emerald-400 tracking-tighter">98%</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Global Health Index</p>
            </div>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 flex-1">
             <div className="space-y-6">
                <h4 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                  <Activity size={20} className="text-emerald-500" />
                  Hive Throughput
                </h4>
                <div className="space-y-5">
                   {[
                     { label: 'Document OCR Loads', value: '45 ops/min', progress: isRecalibrating ? 100 : 65 },
                     { label: 'Regulatory Queries', value: '12 ops/min', progress: isRecalibrating ? 100 : 20 },
                     { label: 'Event Monitoring', value: '1.2k events/s', progress: isRecalibrating ? 100 : 85 },
                   ].map((metric, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-[0.1em]">
                         <span className="text-slate-500">{metric.label}</span>
                         <span className="text-slate-900">{metric.value}</span>
                       </div>
                       <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                          <div className={`h-full bg-emerald-500 rounded-full transition-all duration-1000 ${isRecalibrating ? 'animate-pulse' : ''}`} style={{ width: `${metric.progress}%` }}></div>
                       </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                  <Terminal size={20} className="text-blue-500" />
                  Intelligence Feed
                </h4>
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-3 custom-scrollbar">
                   {[
                     { msg: 'Orchestrator delegated RTW verification to DocIntel', time: '2m' },
                     { msg: 'Simulation Agent detected 1 potential gap in Skilled Worker salary threshold', time: '5m' },
                     { msg: 'Timeline Agent recalculated optimal CoS window for David Chen', time: '12m' },
                     { msg: 'ChangeDetect synced 150 HRIS records successfully', time: '1h' },
                   ].map((log, i) => (
                     <div key={i} className="text-[11px] leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all shadow-sm">
                        <span className="text-slate-400 font-mono mr-2">[{log.time}]</span>
                        <span className="text-slate-700 font-black tracking-tight">{log.msg}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Agent Grid Card */}
        <div className="bg-slate-900 rounded-[40px] p-8 shadow-2xl border border-slate-800 flex flex-col">
          <h3 className="text-white font-black mb-8 flex items-center gap-3 px-2 uppercase tracking-tighter">
            <Cpu size={24} className="text-blue-400" />
            Active Modules
          </h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {AGENTS.map((agent) => (
              <div 
                key={agent.id} 
                onClick={(e) => handleManualTrigger(e, agent.name)}
                className={`p-5 rounded-3xl border flex flex-col items-center justify-center text-center group transition-all cursor-pointer active:scale-95 ${
                  triggeringAgent === agent.name 
                    ? 'bg-emerald-500/20 border-emerald-500 scale-105' 
                    : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
                  triggeringAgent === agent.name 
                    ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                    : (agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white' : 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white')
                }`}>
                  {triggeringAgent === agent.name ? <Loader2 size={24} className="animate-spin" /> : <Bot size={24} />}
                </div>
                <p className="text-xs font-black text-slate-100 leading-tight mb-2 uppercase tracking-tight">{agent.name}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${agent.status === 'busy' || triggeringAgent === agent.name ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{triggeringAgent === agent.name ? 'RUNNING' : agent.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleViewTopology}
            className="w-full mt-10 py-5 bg-blue-600/10 text-blue-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 active:scale-95"
          >
            VIEW MODULE TOPOLOGY
          </button>
        </div>
      </div>

      {/* Detailed Agent List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
        {AGENTS.map((agent) => (
          <div key={agent.id} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-[20px] transition-all duration-500 ${
                  triggeringAgent === agent.name ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/20' : (agent.status === 'busy' ? 'bg-amber-50 text-amber-600 shadow-inner' : 'bg-emerald-50 text-emerald-600 shadow-inner')
                }`}>
                  {triggeringAgent === agent.name ? <Loader2 size={28} className="animate-spin" /> : <Bot size={28} />}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg leading-tight">{agent.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Health: {agent.healthScore}%</p>
                </div>
              </div>
              <button 
                onClick={(e) => handleManualTrigger(e, agent.name)}
                className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all active:scale-90"
              >
                <Zap size={24} />
              </button>
            </div>
            
            <div className="space-y-5 mb-8">
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-2 tracking-[0.15em]">Intelligence Loop</p>
                <p className="text-sm font-bold text-slate-700 italic leading-relaxed">
                  "{triggeringAgent === agent.name ? 'Executing prioritized manual audit cycle...' : agent.currentTask}"
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap, i) => (
                  <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border border-slate-200/50">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Last Determination</span>
                <span className="text-[11px] text-slate-600 font-bold">{agent.lastAction}</span>
              </div>
              <button 
                onClick={(e) => handleManualTrigger(e, agent.name)}
                disabled={triggeringAgent === agent.name}
                className={`text-[10px] font-black uppercase tracking-[0.1em] transition-all px-4 py-2 rounded-xl border-2 ${
                  triggeringAgent === agent.name 
                    ? 'bg-slate-50 text-slate-300 border-slate-100' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm active:scale-95'
                }`}
              >
                {triggeringAgent === agent.name ? 'RUNNING...' : 'TRIGGER'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Topology Viewer Modal */}
      {showTopology && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-10">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowTopology(false)}></div>
          <div className="relative bg-white w-full max-w-5xl rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
               <div className="flex items-center gap-5">
                 <div className="p-4 bg-blue-500 rounded-[20px] text-white shadow-xl shadow-blue-500/20">
                    <Network size={32} />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Hive Module Topology</h3>
                    <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Autonomous Inter-Agent Messaging Mesh</p>
                 </div>
               </div>
               <button onClick={() => setShowTopology(false)} className="p-4 hover:bg-slate-200 rounded-[24px] transition-all text-slate-400 hover:text-slate-900 active:scale-90">
                <X size={32} />
              </button>
            </div>
            <div className="p-20 bg-slate-100/50 min-h-[550px] flex items-center justify-center relative overflow-hidden">
               {/* Grid Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
               
               {/* Connection Lines (Simulated with fixed positioning for demo) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#000" strokeWidth="2" strokeDasharray="8,4" />
                  <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#000" strokeWidth="2" strokeDasharray="8,4" />
                  <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#000" strokeWidth="2" strokeDasharray="8,4" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#000" strokeWidth="2" strokeDasharray="8,4" />
               </svg>
               
               <div className="relative w-full h-full flex items-center justify-center">
                  {/* Central Node */}
                  <div className="p-10 bg-slate-900 rounded-[40px] text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-20 border-4 border-emerald-500/30 group cursor-default scale-110">
                     <ShieldCheck size={64} className="text-emerald-400 mx-auto mb-3" />
                     <p className="text-sm font-black tracking-[0.3em] text-center uppercase">Orchestrator</p>
                  </div>
                  
                  {/* Surrounding Nodes */}
                  <div className="absolute top-0 left-[20%] p-6 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col items-center gap-2 animate-bounce-slow hover:scale-110 transition-transform">
                     <Bot className="text-blue-500" size={28} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Doc Intel</p>
                  </div>
                  <div className="absolute top-0 right-[20%] p-6 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col items-center gap-2 animate-bounce-slow delay-75 hover:scale-110 transition-transform">
                     <Bot className="text-amber-500" size={28} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Timeline</p>
                  </div>
                  <div className="absolute bottom-0 left-[20%] p-6 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col items-center gap-2 animate-bounce-slow delay-150 hover:scale-110 transition-transform">
                     <Bot className="text-emerald-500" size={28} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Change Detect</p>
                  </div>
                  <div className="absolute bottom-0 right-[20%] p-6 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col items-center gap-2 animate-bounce-slow delay-200 hover:scale-110 transition-transform">
                     <Bot className="text-indigo-500" size={28} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Simulation</p>
                  </div>
               </div>
            </div>
            <div className="p-8 bg-white border-t border-slate-100 flex justify-center bg-slate-50/50">
               <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-3">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 Real-time RPC Cluster Relay Active • Node Latency: 8.4ms
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCenter;
