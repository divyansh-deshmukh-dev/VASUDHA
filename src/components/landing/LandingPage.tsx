import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { 
  Shield, 
  ArrowRight, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Landmark, 
  Compass, 
  HeartHandshake, 
  LineChart, 
  User, 
  FileText, 
  Layers, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Scale
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (tab: 'officer' | 'citizen', role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
}) => {
  // Interactive Showcase Frame States
  const [ecoClashActive, setEcoClashActive] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [possessionUnlocked, setPossessionUnlocked] = useState(false);
  
  // Active RBAC Matrix Tab
  const [selectedRbacRole, setSelectedRbacRole] = useState<UserRole>('collector');

  // Countdown timer simulation
  const [secondsRemaining, setSecondsRemaining] = useState(68 * 86400 + 14 * 3600 + 22 * 60 + 45);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${d}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
  };

  const rbacInfo: Record<UserRole, { title: string; subtitle: string; icon: any; capabilities: string[]; statutorySection: string }> = {
    requiring_body: {
      title: 'Land Requiring Body (NHAI / Railways / MoD)',
      subtitle: 'Spatial route vetting & corridor alignment proposals',
      icon: Building2,
      capabilities: [
        'KML / GeoJSON alignment upload & cadastral overlay screening',
        'Automatic PM Gati Shakti spatial clash detection (ESZ, Forest, Heritage)',
        'Chainage tracking (km 0+000 to km 42+800) with parcel inventory',
        'Direct SLA escalation tracking to District Collectors'
      ],
      statutorySection: 'Sections 4 & 7 RFCTLARR Act 2013'
    },
    collector: {
      title: 'District Collector & Competent Authority (CALA)',
      subtitle: 'RFCTLARR statutory state machine & award declaration engine',
      icon: FileCheck2,
      capabilities: [
        'Enforces mandatory 6-stage RFCTLARR statutory progression',
        'Active 12-Month digital countdown clock to prevent Section 19 lapse',
        'Section 15 formal objection hearing desk with judicial recording',
        'First Schedule compensation formula with 100% Solatium & 12% Interest',
        'PFMS cryptographic payment lock preventing premature Section 38 possession'
      ],
      statutorySection: 'Sections 11, 15, 19, 23, 26-30 & 38 RFCTLARR'
    },
    state_gov: {
      title: 'State Government (Revenue Dept / Chief Secretary)',
      subtitle: 'Macro state portfolio governance & inter-district velocity',
      icon: Landmark,
      capabilities: [
        'State-wide corridor tracking across all 31 districts',
        'Cabinet note approval queue for Section 8 & 19 authorizations',
        'District Collector velocity leaderboard with DoLR audit rating',
        'Inter-district dispute resolution & state treasury outlay metrics'
      ],
      statutorySection: 'Sections 8, 10 & 19(1) State Rules'
    },
    central_ministry: {
      title: 'Central Ministries (MoRD / MoRTH / PMO)',
      subtitle: 'Pan-India corridor orchestration & legislative audit',
      icon: Compass,
      capabilities: [
        'National macro KPIs: Total Notified vs Possessed Land (Hectares)',
        'Pan-India DBT disbursement analytics via PFMS gateway (₹ Cr)',
        'Predictive delay alerts for corridors at risk of Section 19 lapse (<60d)',
        'Inter-Ministerial Project Monitoring Group (PMG) escalations'
      ],
      statutorySection: 'Cabinet Committee on Infrastructure (CCI) Mandate'
    },
    rehabilitation: {
      title: 'Rehabilitation & Resettlement (R&R) Authority',
      subtitle: 'Schedule II & III social safeguards & colony infrastructure',
      icon: HeartHandshake,
      capabilities: [
        'PAF (Project Affected Family) entitlement ledger with biometric audit',
        'Schedule II statutory grant tracking (₹50k relocation, housing grant §4)',
        '12-Month subsistence allowance disbursement monitoring under §3',
        'Resettlement colony civic infrastructure audit (Potable water, PHC, solar)'
      ],
      statutorySection: 'Sections 16, 18, 31 & Schedules II & III'
    },
    policy_maker: {
      title: 'Policy Maker & Legislative Analytics Desk',
      subtitle: 'Predictive legislative simulations & expenditure inflation curves',
      icon: LineChart,
      capabilities: [
        'National average cycle duration vs 365-day statutory target analysis',
        'Circle rates vs final award valuation multi-year inflation escalation',
        'Statutory lapse stage bottleneck heatmap (SIA vs Sec 15 vs Sec 19)',
        'Predictive policy sandbox simulating rural multiplier & solatium adjustments'
      ],
      statutorySection: 'Section 107 & 108 RFCTLARR Policy Review'
    },
    citizen: {
      title: 'Citizen & Khatedar (Public Landowner)',
      subtitle: 'Multilingual vernacular parcel lookup with zero admin risk',
      icon: User,
      capabilities: [
        '14-digit ULPIN or Aadhaar OTP claim lookup',
        'Bhashini AI voice synthesis in 6 Indian languages (Hindi, Kannada, etc.)',
        'Transparent compensation breakdown (Base rate + Solatium + Assets)',
        'Live PFMS bank account credit status verification & dispute filing'
      ],
      statutorySection: 'Public Transparency Charter under RFCTLARR Section 11'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 3.5px Continuous Micro-gradient Ribbon */}
      <div className="tricolor-ribbon" />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="VASUDHA Logo" 
              className="w-10 h-10 rounded-xl object-contain bg-[#fbf9f4] border border-slate-200 shadow-sm" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 font-mono">VASUDHA</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500">
                Department of Land Resources (DoLR), Govt of India
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#showcase" className="hover:text-blue-700 transition-colors">Legal Engine Demo</a>
            <a href="#crisis" className="hover:text-blue-700 transition-colors">The Acquisition Crisis</a>
            <a href="#rbac" className="hover:text-blue-700 transition-colors">7-Role RBAC</a>
            <a href="#comparison" className="hover:text-blue-700 transition-colors">National Platform Matrix</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('citizen')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-300"
            >
              Citizen Parcel Lookup
            </button>
            <button
              onClick={() => onOpenAuth('officer')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <span>Login to Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-subtle mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>Ministry of Rural Development • Department of Land Resources (DoLR)</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              The National Workflow Engine for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900">
                Digital Land Acquisition
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Eliminate the ₹4.2 Lakh Crore national infrastructure freeze. Automated legal state machine under{' '}
              <span className="font-semibold text-slate-900">RFCTLARR Act 2013</span>, instant{' '}
              <span className="font-semibold text-slate-900">PM Gati Shakti GIS</span> pre-screening, and{' '}
              <span className="font-semibold text-slate-900">PFMS-locked</span> physical possession.
            </p>

            {/* Quick Action CTAs (Require Authentication First) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenAuth('officer', 'collector')}
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-enterprise flex items-center gap-2 hover:gap-3 transition-all"
              >
                <span>Launch CALA Legal Workbench</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenAuth('officer', 'requiring_body')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold border border-slate-300 shadow-sm transition-all"
              >
                NHAI / Railways GIS Scanner
              </button>
              <button
                onClick={() => onOpenAuth('citizen')}
                className="px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-300 shadow-sm transition-all"
              >
                Public Landowner Portal
              </button>
            </div>
          </div>

          {/* Interactive Live Showcase Frame */}
          <div id="showcase" className="mt-14 max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-white">
              {/* Showcase Frame Header with 3 Interactive Action Pills */}
              <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    VASUDHA Kernel State Machine: NH-48 Dharwad Expressway Bypass
                  </span>
                </div>

                {/* 3 Interactive Action Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setEcoClashActive(!ecoClashActive)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold font-mono border transition-all ${
                      ecoClashActive 
                        ? 'bg-rose-900/80 text-rose-200 border-rose-600 shadow-sm shadow-rose-950'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {ecoClashActive ? '⚡ Eco-Clash Active' : 'Test Eco-Clash'}
                  </button>

                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold font-mono border transition-all ${
                      timerRunning 
                        ? 'bg-amber-900/80 text-amber-200 border-amber-600' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {timerRunning ? '⏱ 12M Timer Running' : 'Timer Paused'}
                  </button>

                  <button
                    onClick={() => setPossessionUnlocked(!possessionUnlocked)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold font-mono border transition-all ${
                      possessionUnlocked 
                        ? 'bg-emerald-900/80 text-emerald-200 border-emerald-600' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {possessionUnlocked ? '🔓 Possession Unlocked' : 'Unlock Possession'}
                  </button>
                </div>
              </div>

              {/* Showcase Frame Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Visual Pill 1: Eco-Clash Detector */}
                <div className={`p-4 rounded-xl border transition-all ${
                  ecoClashActive 
                    ? 'bg-rose-950/40 border-rose-600/80' 
                    : 'bg-slate-800/40 border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Gati Shakti Spatial Screen
                    </span>
                    <MapPin className={`w-4 h-4 ${ecoClashActive ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {ecoClashActive ? '🚨 Protected Zone Conflict' : 'Route Alignment Status'}
                  </h4>
                  <p className="text-xs text-slate-300 mb-3">
                    {ecoClashActive 
                      ? 'Chainage 14+200 violates Bannerghatta ESZ 100m buffer. Clashing Parcel #KA-BLR-0982.'
                      : 'Alignment buffered against Survey of India & Wildlife databases. Clean corridor.'}
                  </p>
                  <div className={`text-[11px] font-mono px-2 py-1 rounded border font-semibold ${
                    ecoClashActive 
                      ? 'bg-rose-900/60 border-rose-700 text-rose-300' 
                      : 'bg-slate-900 border-slate-700 text-emerald-400'
                  }`}>
                    {ecoClashActive ? 'STATUS: Section 11 Gazette BLOCKED' : 'STATUS: Gazette Clearance PASS'}
                  </div>
                </div>

                {/* Visual Pill 2: 12-Month Sec 19 Statutory Countdown */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      RFCTLARR Section 19(7) Clock
                    </span>
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Statutory Lapse Prevention
                  </h4>
                  <p className="text-xs text-slate-300 mb-2">
                    Enforced 1-year window from Section 11 notice to Section 19 declaration.
                  </p>
                  <div className="text-sm font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded border border-amber-500/40 text-center tracking-wider">
                    {formatTimer(secondsRemaining)}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    Auto-escalates to Chief Secretary at 60 days
                  </p>
                </div>

                {/* Visual Pill 3: PFMS-Locked Possession Gate */}
                <div className={`p-4 rounded-xl border transition-all ${
                  possessionUnlocked 
                    ? 'bg-emerald-950/40 border-emerald-600/80' 
                    : 'bg-slate-800/40 border-slate-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Section 38 Statutory Lock
                    </span>
                    {possessionUnlocked ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Physical Possession Gate
                  </h4>
                  <p className="text-xs text-slate-300 mb-3">
                    {possessionUnlocked 
                      ? '100% DBT credited via PFMS to Khatedar Aadhaar account. Section 38 unlocked.'
                      : 'Physical entry prohibited by law until PFMS payout batch completes 100% credit.'}
                  </p>
                  <div className={`text-[11px] font-mono px-2 py-1 rounded border font-semibold text-center ${
                    possessionUnlocked 
                      ? 'bg-emerald-900/60 border-emerald-700 text-emerald-300' 
                      : 'bg-rose-900/60 border-rose-700 text-rose-300'
                  }`}>
                    {possessionUnlocked ? '🔓 POSSESSION AUTHORIZED' : '🔒 LOCKED: PFMS CLEARANCE PENDING'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Infrastructure Crisis */}
      <section id="crisis" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Indian Infrastructure Dilemma
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Why 64% of Highway & Railway Projects Suffer Stays
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Legacy land acquisition processes rely on fragmented physical files, unverified cadastral maps, and uncoordinated state-central workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-subtle">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                The 12-Month Section 19 Lapse
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under RFCTLARR Section 19(7), if the final acquisition declaration is not published within exactly 12 months of Section 11, the entire proceeding lapses automatically. Over ₹38,000 Cr in surveys were wiped out nationally due to missed clerical deadlines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-subtle">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Eco-Sensitive Zone (ESZ) Injunctions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Highway alignments planned without real-time GIS overlap frequently run into National Green Tribunal (NGT) and High Court stays after Section 11 notifications, forcing multi-year realignment litigations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-subtle">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Premature Possession Lawsuits
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contractors taking bulldozers onto agricultural land before the First Schedule statutory solatium (100%) and R&R entitlements are disbursed to the khatedar's bank account violate Section 38, sparking rural unrest and court contempt orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive RBAC Matrix */}
      <section id="rbac" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Role-Based Access Control Architecture
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Tailored Workspaces for Every Stakeholder
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              VASUDHA enforces zero-trust legal isolation. Each role operates within strict statutory powers with purpose-built tooling.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(Object.keys(rbacInfo) as UserRole[]).map((r) => {
              const meta = rbacInfo[r];
              const isSelected = r === selectedRbacRole;
              const Icon = meta.icon;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRbacRole(r)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{meta.title.split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Role Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-enterprise p-8 transition-all">
            {(() => {
              const cur = rbacInfo[selectedRbacRole];
              const Icon = cur.icon;
              return (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{cur.title}</h3>
                        <p className="text-xs text-slate-500">{cur.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                      {cur.statutorySection}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cur.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onOpenAuth(selectedRbacRole === 'citizen' ? 'citizen' : 'officer', selectedRbacRole)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all"
                    >
                      <span>Authenticate & Enter {cur.title.split('(')[0]} Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Competitive Comparison Matrix */}
      <section id="comparison" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Comparative Civic Architecture
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              How VASUDHA Integrates the National Stack
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Unlike single-function portals, VASUDHA bridges spatial planning, judicial enforcement, and direct exchequer disbursement into one unified state machine.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-subtle">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 text-left">Feature / Capability</th>
                  <th className="py-3.5 px-4 text-center">DILRMP</th>
                  <th className="py-3.5 px-4 text-center">PM Gati Shakti</th>
                  <th className="py-3.5 px-4 text-center">PFMS</th>
                  <th className="py-3.5 px-4 text-center">Bhoomi Rashi</th>
                  <th className="py-3.5 px-4 text-center bg-blue-50 text-blue-900 font-black border-l border-r border-blue-200">
                    VASUDHA Engine
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">RFCTLARR 2013 State Machine Enforcement</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-amber-500">⚠️ Manual</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ Automated 6-Stage
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">12-Month Sec 19 Lapse Countdown Prevention</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ Hard Statutory Lock
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">PM Gati Shakti GIS Conflict Pre-Screening</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-emerald-600">✅ Raw GIS</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ Live Legal Blocking
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Section 38 PFMS-Locked Physical Possession</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-amber-500">⚠️ Generic DBT</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ Cryptographic Gate
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Rehabilitation Schedule II & III Entitlements</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ Family Ledger & Colony Audit
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Bhashini Multilingual Voice Inquiry</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center text-rose-500">❌ No</td>
                  <td className="py-3 px-4 text-center bg-blue-50/50 font-bold text-emerald-600 border-l border-r border-blue-100">
                    ✅ 6 Indian Languages
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <img 
                  src="/logo.png" 
                  alt="VASUDHA Logo" 
                  className="w-8 h-8 rounded-lg object-contain bg-[#fbf9f4] border border-slate-700 shadow-sm" 
                />
                <span className="font-mono font-bold text-white text-base">VASUDHA</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                National Land Acquisition & Legal Workflow Engine. Developed for the Department of Land Resources (DoLR), Ministry of Rural Development, Government of India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Statutory Authorities
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => onOpenAuth('officer', 'collector')} className="hover:text-white text-left">CALA / Competent Authority</button></li>
                <li><button onClick={() => onOpenAuth('officer', 'requiring_body')} className="hover:text-white text-left">NHAI / Railways Requiring Body</button></li>
                <li><button onClick={() => onOpenAuth('officer', 'rehabilitation')} className="hover:text-white text-left">Rehabilitation & Resettlement Desk</button></li>
                <li><button onClick={() => onOpenAuth('officer', 'state_gov')} className="hover:text-white text-left">State Revenue Departments</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Policy & Governance
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => onOpenAuth('officer', 'central_ministry')} className="hover:text-white text-left">Central PMO / MoRD Dashboard</button></li>
                <li><button onClick={() => onOpenAuth('officer', 'policy_maker')} className="hover:text-white text-left">NITI Aayog Policy Analytics</button></li>
                <li><span className="text-slate-500">RFCTLARR Act 2013 Gazette Rules</span></li>
                <li><span className="text-slate-500">PFMS Integration Specifications</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Public Transparency
              </h4>
              <ul className="space-y-2">
                <li><button onClick={() => onOpenAuth('citizen')} className="hover:text-white text-left">Citizen ULPIN Lookup</button></li>
                <li><span className="text-slate-500">Bhashini Voice Services</span></li>
                <li><span className="text-slate-500">DoLR National Grievance Portal</span></li>
                <li><span className="text-slate-500">Digital Cadastral Maps (DILRMP)</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-slate-600">
            <p>© 2024-2026 Department of Land Resources (DoLR), Ministry of Rural Development, Government of India. Designed for National Critical Infrastructure.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Security Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Parichay Terms</span>
              <span className="hover:text-slate-400 cursor-pointer">e-Pramaan Audit</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
