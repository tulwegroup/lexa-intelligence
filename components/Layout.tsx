
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  SearchCheck, 
  ShieldAlert, 
  Bell, 
  Settings,
  Menu,
  FileBox,
  Ticket,
  UserPlus,
  History,
  Calendar,
  Zap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workers', label: 'Sponsored List', icon: Users },
    { id: 'onboarding', label: 'AI Onboard', icon: UserPlus },
    { id: 'documents', label: 'Evidence Vault', icon: FileBox },
    { id: 'agents', label: 'Intelligence Hive', icon: Bot },
    { id: 'audit', label: 'Audit Assistant', icon: SearchCheck },
    { id: 'risk', label: 'Risk Mapping', icon: ShieldAlert },
    { id: 'timeline', label: 'Visa Timeline', icon: Calendar },
    { id: 'trail', label: 'Audit Trail', icon: History },
    { id: 'cos', label: 'CoS Gateway', icon: Ticket },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-5 overflow-y-auto custom-scrollbar border-r border-white/5">
      <div className="flex items-center gap-4 px-3 py-8 shrink-0">
        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-600/20 border border-emerald-500/30">
          L
        </div>
        <div>
          <h1 className="font-black text-xl leading-tight tracking-tight">Lexa <span className="text-emerald-500">Intell</span></h1>
          <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Autonomous Audit</p>
        </div>
      </div>

      <nav className="mt-10 flex-1 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20 translate-x-1' 
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-600 group-hover:text-emerald-500 transition-colors'} />
            <span className="text-sm tracking-tight">{item.label}</span>
            {activeTab === item.id && <Zap size={14} className="ml-auto text-emerald-300 animate-pulse" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5 space-y-3 shrink-0">
        <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-3">
             <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Licence Health</p>
             <ShieldAlert size={14} className="text-emerald-500" />
          </div>
          <p className="text-sm font-black text-white mb-2">L-88912-X</p>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
            <div className="bg-emerald-500 h-full w-[94%] shadow-[0_0_12px_#10b981]"></div>
          </div>
          <div className="flex justify-between mt-2.5">
            <p className="text-[9px] text-emerald-500 font-black">94% COMPLIANT</p>
            <p className="text-[9px] text-slate-500 font-bold">Q3 2024</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
          <Settings size={18} />
          <span>System Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-80 h-full animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-slate-100/80 border border-slate-200/60 rounded-2xl px-5 py-2.5 w-full max-w-md focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group">
              <SearchCheck size={18} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Query Lexa Agents or UKVI Guidance..." 
                className="bg-transparent border-none outline-none text-sm w-full ml-3 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Autonomous Sync Active</span>
            </div>
            
            <button className="relative p-3 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-2xl transition-all active:scale-90">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-bounce"></span>
            </button>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Sterling, R.</p>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Authorizing Officer</p>
              </div>
              <div className="w-11 h-11 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center text-white text-sm font-black shadow-lg">
                RS
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-12 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
