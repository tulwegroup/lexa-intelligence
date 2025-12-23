
import React, { useState } from 'react';
import { UserPlus, FileUp, Sparkles, Check, ChevronRight, Calculator, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const steps = [
    { id: 1, title: 'Upload Offer', icon: FileUp },
    { id: 2, title: 'AI Extraction', icon: Sparkles },
    { id: 3, title: 'Compliance Check', icon: ShieldCheck },
    { id: 4, title: 'Draft CoS', icon: Calculator },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1) {
      console.log('Step 1: Processing upload...');
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
      }, 2000);
    } else {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleAssignCos = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Action: Assigning CoS...');
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
      window.alert('SUCCESS: Certificate of Sponsorship (CoS) successfully assigned via secure UKVI Gateway.\n\nTransaction ID: L-88912-X-VANCE-9901\nWorker: Julianne Vance\nStatus: PENDING_BRP_COLLECTION');
    }, 2500);
  };

  const handleSaveForReview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Action: Saving for review...');
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      window.alert('DRAFT SAVED: Julianne Vance\'s sponsorship draft has been moved to the review vault. The Orchestrator Agent will verify threshold compliance periodically until final approval.');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">AI-Assisted Sponsorship Onboarding</h2>
        <p className="text-slate-500">Zero-touch compliance verification from offer letter to CoS generation</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between px-12">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-3 relative group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                step >= s.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white text-slate-400 border-slate-100 shadow-sm'
              }`}>
                {step > s.id ? <Check size={24} strokeWidth={3} /> : <s.icon size={24} />}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1 bg-slate-100 mx-4 mt-[-28px] rounded-full overflow-hidden">
                <div className={`h-full bg-emerald-500 transition-all duration-1000 ease-in-out`} style={{ width: step > i + 1 ? '100%' : '0%' }}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white p-10 lg:p-14 rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50">
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div 
              onClick={handleNext}
              className="group border-3 border-dashed border-slate-100 rounded-[28px] p-16 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:text-emerald-500 group-hover:bg-white transition-all duration-500 shadow-inner">
                <FileUp size={40} />
              </div>
              <div>
                <p className="text-slate-800 font-black text-lg">Drop candidate offer letter here</p>
                <p className="text-sm text-slate-500 mt-2 max-w-sm">PDF, DOCX supported. Doc Intel Agent will auto-extract terms and verify against UKVI 2024 guidance.</p>
              </div>
              <button 
                onClick={handleNext}
                disabled={isProcessing}
                className={`mt-6 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50`}
              >
                {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
                {isProcessing ? 'Agent Extracting...' : 'Upload & Process'}
                {!isProcessing && <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-4 p-5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm">
              <Sparkles size={24} className="animate-pulse" />
              <p className="text-sm font-bold uppercase tracking-tight">Extraction Complete: Doc Intel Agent identified 8 key data points with high confidence.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Candidate Name', value: 'Julianne Vance' },
                { label: 'Proposed Salary', value: '£42,500' },
                { label: 'Proposed Start Date', value: '2024-06-01' },
                { label: 'Suggested SOC Code', value: '2136 (Programmers)', confidence: '94%' },
              ].map((field, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{field.label}</p>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 flex justify-between items-center shadow-sm">
                    <span className="text-sm">{field.value}</span>
                    {field.confidence && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black">{field.confidence} Match</span>}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleNext} 
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              VERIFY COMPLIANCE THRESHOLDS
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-emerald-50 rounded-[20px] border border-emerald-100 text-center shadow-sm">
                <p className="text-[10px] text-emerald-600 font-black uppercase mb-3 tracking-widest">Going Rate Check</p>
                <p className="text-2xl font-black text-emerald-800">PASSED</p>
                <p className="text-[11px] text-emerald-600/70 mt-1 font-bold">£42.5k vs Min £38.7k</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-[20px] border border-emerald-100 text-center shadow-sm">
                <p className="text-[10px] text-emerald-600 font-black uppercase mb-3 tracking-widest">SOC Eligibility</p>
                <p className="text-2xl font-black text-emerald-800">PASSED</p>
                <p className="text-[11px] text-emerald-600/70 mt-1 font-bold">Skilled Worker Eligible</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-[20px] border border-emerald-100 text-center shadow-sm">
                <p className="text-[10px] text-emerald-600 font-black uppercase mb-3 tracking-widest">Licence Space</p>
                <p className="text-2xl font-black text-emerald-800">AVAILABLE</p>
                <p className="text-[11px] text-emerald-600/70 mt-1 font-bold">12 Undefined slots left</p>
              </div>
            </div>
            <div className="p-8 bg-slate-900 text-white rounded-[24px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <h4 className="font-bold flex items-center gap-2 mb-3 text-emerald-400">
                <ShieldCheck size={20} />
                Orchestrator Determination
              </h4>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                "System verification confirms Julianne Vance meets all 2024 threshold requirements for a Skilled Worker visa. Salary is compliant with SOC 2136 going rates. No historical organizational red flags detected. Proceeding to certificate drafting."
              </p>
            </div>
            <button 
              onClick={handleNext} 
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              GENERATE DRAFT COS
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500 text-center">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Check size={48} strokeWidth={4} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Draft CoS Ready for Submission</h3>
              <p className="text-slate-500 mt-2 font-medium">All justificatory narratives and SMS metadata have been pre-filled by the Narrative Agent.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[24px] border border-slate-200 text-left font-mono text-[11px] leading-relaxed shadow-inner">
              <p className="text-slate-400 mb-3 font-bold uppercase tracking-widest">// UKVI SMS METADATA PACK</p>
              <p className="text-slate-700"><span className="text-blue-600">COS_TYPE:</span> SKILLED_WORKER_UNDEFINED</p>
              <p className="text-slate-700"><span className="text-blue-600">SALARY_DATA:</span> 42500_GBP_ANNUAL_GROSS</p>
              <p className="text-slate-700"><span className="text-blue-600">OCCUPATION:</span> 2136_PROGRAMMER_SOFTWARE_DEV</p>
              <p className="text-slate-700"><span className="text-blue-600">CERT_HASH:</span> B3D9-902F-771C-001X</p>
              <p className="text-slate-700"><span className="text-blue-600">EXPIRY_SYNC:</span> 2024-06-01_T_09:00:00Z</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAssignCos}
                disabled={isAssigning || isSaving}
                className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50"
              >
                {isAssigning ? <Loader2 size={24} className="animate-spin" /> : <Calculator size={24} />}
                {isAssigning ? 'PUSHING TO SMS...' : 'ASSIGN COS (PUSH TO SMS)'}
              </button>
              <button 
                onClick={handleSaveForReview}
                disabled={isAssigning || isSaving}
                className="flex-1 py-5 bg-white border-2 border-slate-200 rounded-2xl font-black text-slate-900 hover:bg-slate-50 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 size={20} className="animate-spin" /> : null}
                {isSaving ? 'SAVING...' : 'SAVE FOR REVIEW'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
