
import React, { useState } from 'react';
// Added Loader2 import to fix "Cannot find name 'Loader2'" error
import { Loader2 } from 'lucide-react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import WorkerList from './components/WorkerList';
import AuditChat from './components/AuditChat';
import AgentCenter from './components/AgentCenter';
import RiskAnalysis from './components/RiskAnalysis';
import DocumentVault from './components/DocumentVault';
import OnboardingFlow from './components/OnboardingFlow';
import AuditTrail from './components/AuditTrail';
import TimelineManager from './components/TimelineManager';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRequestingIncrease, setIsRequestingIncrease] = useState(false);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRequestIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRequestingIncrease(true);
    setTimeout(() => {
      setIsRequestingIncrease(false);
      window.alert('REQUEST TRANSMITTED: Supplementary allocation request for 10 Undefined CoS slots has been securely pushed to UKVI SMS via Reporting Agent proxy. Response expected within 5 business days.');
    }, 1500);
  };

  const handleViewHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.alert('TRANSACTION LOGS: Synchronizing historical CoS assignment ledger with SMS metadata... 45 successful assignments verified for the current cycle.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'workers':
        return <WorkerList />;
      case 'onboarding':
        return <OnboardingFlow />;
      case 'documents':
        return <DocumentVault />;
      case 'audit':
        return <AuditChat />;
      case 'agents':
        return <AgentCenter />;
      case 'risk':
        return <RiskAnalysis />;
      case 'trail':
        return <AuditTrail />;
      case 'timeline':
        return <TimelineManager />;
      case 'cos':
        return (
          <div className="bg-white p-12 lg:p-20 rounded-[48px] border border-slate-200 text-center space-y-10 animate-in zoom-in-95 duration-500 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10 border border-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Sponsor Certificate Management</h2>
              <p className="text-slate-500 leading-relaxed font-bold text-lg opacity-80">
                Automated CoS allocation and lifecycle management. Integrated UKVI SMS Gateway is currently online and synced.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-3xl mx-auto">
               <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 text-left hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Defined CoS Pool</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">12 <span className="text-xl text-slate-400 font-bold uppercase tracking-widest ml-2">Slots</span></p>
                  <div className="mt-8 w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner border border-white">
                    <div className="bg-blue-500 h-full w-[40%] transition-all duration-1000 shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 font-bold">L-88912-X ALLOCATED FOR Q3 2024</p>
               </div>
               <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 text-left hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Undefined CoS Pool</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">45 <span className="text-xl text-slate-400 font-bold uppercase tracking-widest ml-2">Slots</span></p>
                  <div className="mt-8 w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner border border-white">
                    <div className="bg-emerald-500 h-full w-[85%] transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 font-bold">L-88912-X ALLOCATED FOR 2024 CYCLE</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16 pb-6">
              <button 
                onClick={handleRequestIncrease}
                disabled={isRequestingIncrease}
                className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isRequestingIncrease ? <Loader2 size={20} className="animate-spin text-emerald-400" /> : null}
                {isRequestingIncrease ? 'Syncing...' : 'Request Allocation Increase'}
              </button>
              <button 
                onClick={handleViewHistory}
                className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-[24px] font-black text-sm tracking-widest uppercase hover:bg-slate-50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
              >
                View Assignment History
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
