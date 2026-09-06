import React, { useState, useEffect } from 'react';
import { 
  ProjectProposal, 
  Parcel, 
  ObjectionRecord, 
  UserProfile, 
  RFCTLARRStage,
  StageKey
} from '../../types';
import { 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  FileText, 
  Coins, 
  Landmark, 
  Scale, 
  Gavel, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface CollectorDashboardProps {
  user: UserProfile;
  project: ProjectProposal;
  parcels: Parcel[];
  objections: ObjectionRecord[];
  stages: RFCTLARRStage[];
}

export const CollectorDashboard: React.FC<CollectorDashboardProps> = ({
  user,
  project: initialProject,
  parcels: initialParcels,
  objections: initialObjections,
  stages: initialStages
}) => {
  const [stages, setStages] = useState<RFCTLARRStage[]>(initialStages);
  const [objections, setObjections] = useState<ObjectionRecord[]>(initialObjections);
  const [parcels, setParcels] = useState<Parcel[]>(initialParcels);
  const [possessionCertificateIssued, setPossessionCertificateIssued] = useState(false);

  // Countdown timer for 12-Month Sec 19 lapse
  const [secondsRemaining, setSecondsRemaining] = useState(68 * 86400 + 14 * 3600 + 22 * 60 + 45);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${d}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
  };

  // Check if Section 15 objections are all resolved
  const pendingObjections = objections.filter(o => o.status !== 'RESOLVED_ENHANCED' && o.status !== 'DISMISSED');
  const allObjectionsResolved = pendingObjections.length === 0;

  // Check PFMS clearance status
  const allParcelsCredited = parcels.every(p => p.pfmsStatus === 'CREDITED');

  // Action: Mark Objection Resolved
  const handleResolveObjection = (id: string) => {
    setObjections(prev => prev.map(obj => {
      if (obj.id === id) {
        return {
          ...obj,
          status: 'RESOLVED_ENHANCED',
          collectorOrderNo: 'CALA/DWD/ORD-2024/914',
          enhancementAmount: 350000,
          resolvedDate: new Date().toISOString().split('T')[0]
        };
      }
      return obj;
    }));

    // Unlock Section 19 stage if all are now resolved
    setStages(prev => prev.map(st => {
      if (st.id === 'sec15_hearings') {
        return { ...st, status: 'completed', completionDate: 'Today' };
      }
      if (st.id === 'sec19_declaration') {
        return { ...st, status: 'active' };
      }
      return st;
    }));
  };

  // Action: Publish Section 19 Declaration
  const handlePublishSec19 = () => {
    setStages(prev => prev.map(st => {
      if (st.id === 'sec19_declaration') {
        return { ...st, status: 'completed', completionDate: 'Published' };
      }
      if (st.id === 'sec23_award') {
        return { ...st, status: 'active' };
      }
      return st;
    }));
    alert("Section 19 Declaration published in Official Gazette & 2 Vernacular Dailies. 12-Month statutory lapse clock superseded successfully!");
  };

  // Action: Finalize Section 23 Award
  const handleFinalizeAward = () => {
    setStages(prev => prev.map(st => {
      if (st.id === 'sec23_award') {
        return { ...st, status: 'completed', completionDate: 'Finalized' };
      }
      if (st.id === 'sec38_possession') {
        return { ...st, status: 'active' };
      }
      return st;
    }));
  };

  // Action: Simulate PFMS Direct Benefit Transfer
  const handleSimulatePfmsDisbursement = () => {
    setParcels(prev => prev.map(p => ({
      ...p,
      pfmsStatus: 'CREDITED',
      pfmsTransactionId: `PFMS-2024-DWD-${Math.floor(100000 + Math.random() * 900000)}`
    })));
  };

  // Action: Issue Section 38 Possession Handover Certificate
  const handleIssuePossession = () => {
    if (!allParcelsCredited) {
      alert("Prohibited by RFCTLARR Section 38(1): 100% PFMS disbursement must be completed before issuing possession.");
      return;
    }
    setPossessionCertificateIssued(true);
    setStages(prev => prev.map(st => {
      if (st.id === 'sec38_possession') {
        return { ...st, status: 'completed', completionDate: 'Handover Issued' };
      }
      return st;
    }));
    alert("Section 38 Handover Certificate Issued to NHAI. Physical possession legally completed without judicial liability.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  Competent Authority for Land Acquisition (CALA) Legal Workbench
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Judicial & Quasi-Judicial Desk
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Presiding Officer: <span className="font-semibold text-slate-700">{user.name}</span> • {user.designation} • {user.jurisdiction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800">
              Project: {initialProject.code}
            </span>
          </div>
        </div>

        {/* 12-Month Section 19 Clock & Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Active 12-Month Digital Countdown Timer */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                Sec 19(7) Lapse Countdown
              </span>
              <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="mt-2 text-xl font-black font-mono tracking-tight text-amber-900">
              {formatTimer(secondsRemaining)}
            </div>
            <p className="text-[10px] text-amber-800/80 mt-1 font-medium">
              Mandatory deadline from Section 11 notice (18 Mar 2024).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Section 15 Objections
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {pendingObjections.length}
              </span>
              <span className="text-xs font-semibold text-slate-600">Pending Determination</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Total 19 filed • 18 determined</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              PFMS Compensation Outlay
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-mono">₹10.61</span>
              <span className="text-xs font-semibold text-slate-600">Cr Computed</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Includes 100% Solatium & 12% Interest</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Section 38 Possession Status
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              {allParcelsCredited ? (
                <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                  <Unlock className="w-4 h-4" /> 100% Disbursed
                </span>
              ) : (
                <span className="text-sm font-bold text-rose-600 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> PFMS Held (Pending)
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Physical handover legally barred</p>
          </div>
        </div>
      </div>

      {/* RFCTLARR 2013 Statutory State Machine */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Gavel className="w-4 h-4 text-blue-700" />
              <span>RFCTLARR 2013 Automated Legal State Machine</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict statutory progression: No phase can be declared without prerequisite fulfillment under Indian law.
            </p>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-5">
          {stages.map((st) => {
            const isCompleted = st.status === 'completed';
            const isActive = st.status === 'active';
            const isLocked = st.status === 'locked';

            return (
              <div 
                key={st.id} 
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isCompleted 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : isActive
                      ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-sm ring-2 ring-blue-600/20'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                      Stage 0{st.stepNumber}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isActive ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-xs leading-snug">{st.label}</h3>
                  <p className="text-[10px] font-mono mt-0.5 opacity-80">{st.statutorySection}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px]">
                  <span className={`font-semibold ${
                    isCompleted ? 'text-emerald-700' : isActive ? 'text-blue-700' : 'text-slate-400'
                  }`}>
                    {isCompleted ? `Done (${st.completionDate || 'Recorded'})` : isActive ? 'Active Proceeding' : 'Locked Prerequisite'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Section 15 Hearing Desk on Left, Compensation & PFMS Rails on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Section 15 Hearings & State Machine Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 15 Objection Hearing Desk */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Section 15 Formal Objection Hearing Desk
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Statutory 60-day window under Sec 15(1)
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Every landowner has the statutory right to be heard in person by CALA. Resolving pending objections is the <b>mandatory legal prerequisite</b> to declare Section 19.
            </p>

            <div className="mt-4 space-y-3">
              {objections.map((obj) => {
                const isResolved = obj.status === 'RESOLVED_ENHANCED';
                return (
                  <div 
                    key={obj.id} 
                    className={`p-4 rounded-xl border text-xs transition-all ${
                      isResolved 
                        ? 'bg-slate-50 border-slate-200' 
                        : 'bg-amber-50/50 border-amber-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900">{obj.claimantName}</span>
                        <span className="text-slate-500 ml-2">
                          (Survey No. <b className="font-mono text-slate-800">{obj.surveyNumber}</b> • ULPIN: {obj.ulpin})
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isResolved 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {obj.status}
                      </span>
                    </div>

                    <p className="text-slate-700 mt-2 leading-relaxed">
                      <b>Objection Grounds:</b> {obj.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Hearing Date: {obj.hearingDate}
                      </span>

                      {isResolved ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Order: {obj.collectorOrderNo} (+₹{(obj.enhancementAmount! / 100000).toFixed(2)}L Enhanced)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleResolveObjection(obj.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Gavel className="w-3.5 h-3.5" />
                          <span>Enquire & Mark Hearing Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage Transition Controllers */}
            <div className="mt-5 p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Section 19 Declaration Status:
                </p>
                <p className="text-[11px] text-slate-500">
                  {allObjectionsResolved 
                    ? 'All Section 15 objections resolved. Section 19 Gazette Declaration is now UNLOCKED.' 
                    : '1 objection pending enquiry. Declaration cannot be published under Sec 19(1).'}
                </p>
              </div>

              <button
                onClick={handlePublishSec19}
                disabled={!allObjectionsResolved}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                  allObjectionsResolved 
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Publish Section 19 Gazette Declaration
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): First Schedule Valuation & Section 38 Possession Rail */}
        <div className="lg:col-span-5 space-y-6">
          {/* First Schedule Statutory Valuation Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  First Schedule Statutory Award Computation
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Sec 26-30
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Mandatory statutory multipliers for Sample Parcel <span className="font-mono font-bold">#KA-BLR-0982 (1.45 Ha)</span>:
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Base Circle Valuation (Section 26):</span>
                <span className="font-mono font-bold text-slate-900">₹65,25,000</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-amber-50/50 border border-amber-200/80">
                <span className="text-amber-900 font-medium">100% Statutory Solatium (Section 30(1)):</span>
                <span className="font-mono font-bold text-amber-800">+₹65,25,000</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">12% Per Annum Interest (Section 30(3)):</span>
                <span className="font-mono font-bold text-slate-900">+₹11,74,500</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Assets Attached to Land (Borewell/Crops):</span>
                <span className="font-mono font-bold text-slate-900">+₹6,20,000</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-blue-900 text-white font-bold">
                <span>Final Statutory Award Total:</span>
                <span className="font-mono text-sm text-amber-300">₹1,48,44,500</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleFinalizeAward}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow transition-all"
              >
                Sign Section 23 Award Order
              </button>
            </div>
          </div>

          {/* PFMS Disbursement & Section 38 Possession Gate */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Section 38 PFMS Payment Lock & Handover
                </h3>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Direct Benefit Transfer Gateway:</span>
                <span className="font-mono font-bold text-slate-800">PFMS / NPCI Aadhaar Bridge</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Disbursement Status across Project:</span>
                <span className={`font-bold ${allParcelsCredited ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {allParcelsCredited ? '100% Credited to Khatedar Accounts' : 'Pending Batch Verification'}
                </span>
              </div>
            </div>

            {/* PFMS Simulation Action */}
            <div className="mt-4">
              <button
                onClick={handleSimulatePfmsDisbursement}
                disabled={allParcelsCredited}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2 ${
                  allParcelsCredited 
                    ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{allParcelsCredited ? '✓ PFMS Clearance Batches Completed' : 'Simulate Instant PFMS Clearance'}</span>
              </button>
            </div>

            {/* Section 38 Possession Button */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={handleIssuePossession}
                disabled={!allParcelsCredited || possessionCertificateIssued}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2 ${
                  possessionCertificateIssued
                    ? 'bg-emerald-800 text-white'
                    : allParcelsCredited
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {possessionCertificateIssued ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Section 38 Handover Certificate Issued to NHAI</span>
                  </>
                ) : allParcelsCredited ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>🔓 Issue Handover Certificate (Section 38)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>🔒 Locked: Disburse PFMS to Authorize Possession</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Under RFCTLARR §38, taking possession prior to payment constitutes statutory contempt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
