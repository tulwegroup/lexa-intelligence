
import React from 'react';
import { ShieldCheck, History, Database, Search, Filter, Lock } from 'lucide-react';
import { MOCK_AUDIT_TRAIL } from '../constants';

const AuditTrail: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck size={32} className="text-emerald-500" />
            Immutable Audit Trail 2.0
          </h2>
          <p className="text-slate-500 mt-1">Blockchain-hashed logs of every AI determination and compliance event</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by Hash or Action..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
           </div>
           <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter size={20} className="text-slate-600" />
           </button>
        </div>
      </div>

      {/* Network Integrity Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Chain Integrity', value: 'Verified', icon: Lock, color: 'text-emerald-600' },
          { label: 'Total Blocks', value: '18,421', icon: Database, color: 'text-blue-600' },
          { label: 'Node Sync', value: '99.99%', icon: History, color: 'text-indigo-600' },
          { label: 'Witness Count', value: '3 Active', icon: ShieldCheck, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center">
            <stat.icon size={20} className={`${stat.color} mb-2`} />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-lg font-black text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Compliance Event</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Orchestrating Agent</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Verification Hash</th>
                <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {MOCK_AUDIT_TRAIL.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-4 text-slate-400">{entry.timestamp}</td>
                  <td className="px-8 py-4 font-bold text-slate-700">{entry.action}</td>
                  <td className="px-8 py-4 text-slate-500">{entry.agent}</td>
                  <td className="px-8 py-4 text-blue-500 hover:underline cursor-pointer">{entry.hash}</td>
                  <td className="px-8 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      entry.severity === 'high' ? 'bg-red-100 text-red-600' : 
                      entry.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {entry.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50 text-center">
           <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
             <Lock size={12} />
             All logs are cryptographically sealed. Any tampering with historical data would invalidate the organizational compliance chain.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
