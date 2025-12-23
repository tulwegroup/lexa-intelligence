
import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  ShieldCheck, 
  TrendingUp,
  AlertTriangle,
  FileText,
  Loader2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { MOCK_WORKERS, AGENTS } from '../constants';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const trendData = [
  { name: 'Jan', score: 92 },
  { name: 'Feb', score: 88 },
  { name: 'Mar', score: 94 },
  { name: 'Apr', score: 91 },
  { name: 'May', score: 96 },
  { name: 'Jun', score: 94 },
];

const exposureData = [
  { category: 'Documentation', risk: 15 },
  { category: 'Timeline', risk: 45 },
  { category: 'Right to Work', risk: 8 },
  { category: 'Salary Compliance', risk: 12 },
  { category: 'Reporting', risk: 25 },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [showToast, setShowToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const handleGenerateReport = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setShowToast({ message: 'Compliance Report L-88912-X Generated.', type: 'success' });
      setTimeout(() => setShowToast(null), 3000);
    }, 1500);
  };

  const handleInitiateAudit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      onNavigate('audit');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-10">
      {showToast && (
        <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right-8 fade-in flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700">
          <CheckCircle className="text-emerald-400" size={20} />
          <p className="text-sm font-bold">{showToast.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">UK Sponsor Licence L-88912-X Status</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
          >
            {isGeneratingReport ? <Loader2 size={16} className="animate-spin text-emerald-500" /> : <FileText size={16} />}
            {isGeneratingReport ? 'Compiling...' : 'Full Report'}
          </button>
          <button 
            onClick={handleInitiateAudit}
            disabled={isAuditing}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-600/20"
          >
            {isAuditing ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            {isAuditing ? 'Simulating...' : 'Mock Audit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Sponsored Total', value: MOCK_WORKERS.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Compliance', value: '94%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Expiry Alerts', value: 3, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Gaps Found', value: 1, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">Optimal</span>
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-2xl font-black mt-1 text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col min-h-[420px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">Compliance Health Index</h3>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Monitoring</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'}} 
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#scoreGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col min-h-[420px]">
          <h3 className="font-black text-lg mb-8 text-slate-900 uppercase tracking-tight">Exposure Heatmap</h3>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exposureData} layout="vertical" margin={{ left: -10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} width={110} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="risk" radius={[0, 6, 6, 0]} barSize={24}>
                  {exposureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.risk > 30 ? '#ef4444' : entry.risk > 20 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
            <p className="text-[11px] text-slate-500 font-medium">"Lexa Intelligence detected elevated Timeline Risk for 3 workers. Automated extension pipelines suggested."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
