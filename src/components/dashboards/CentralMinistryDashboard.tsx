import React, { useState } from 'react';
import { 
  NationalCorridorSummary, 
  UserProfile 
} from '../../types';
import { 
  Compass, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Globe, 
  Clock, 
  ShieldAlert, 
  ExternalLink, 
  DollarSign, 
  Building2, 
  ArrowUpRight,
  Filter,
  BarChart3
} from 'lucide-react';

interface CentralMinistryDashboardProps {
  user: UserProfile;
  corridors: NationalCorridorSummary[];
}

export const CentralMinistryDashboard: React.FC<CentralMinistryDashboardProps> = ({
  user,
  corridors: initialCorridors
}) => {
  const [corridors, setCorridors] = useState<NationalCorridorSummary[]>(initialCorridors);
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredCorridors = filterRisk === 'ALL' 
    ? corridors 
    : corridors.filter(c => c.riskStatus === filterRisk);

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  National Land Acquisition & Central Ministry Oversight Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  Cabinet Secretariat / MoRD PMG
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Principal Executive: <span className="font-semibold text-slate-700">{user.name}</span> • {user.designation} • {user.jurisdiction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> PM Gati Shakti NMP Connected
            </span>
          </div>
        </div>

        {/* Pan-India Macro KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total National Land Required
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">31,592</span>
              <span className="text-xs font-semibold text-slate-600">Hectares</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">29,588 Ha Possessed (93.6%)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total PFMS DBT Disbursed
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-mono">₹42,662</span>
              <span className="text-xs font-semibold text-slate-600">Crores</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Direct to 1.84 Lakh Beneficiaries</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Corridors at Lapse Risk (&lt;60d)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-rose-600 font-mono">1</span>
              <span className="text-xs font-bold text-rose-600">Urgent Notice</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">NH-48 Dharwad Bypass (Sec 19)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Inter-Ministerial PMG Queue
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">4</span>
              <span className="text-xs font-semibold text-slate-600">Escalations</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">MoEFCC Wildlife & Railway Bridges</p>
          </div>
        </div>
      </div>

      {/* Critical-Path Delay Predictor Alert */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 text-white shadow-enterprise border border-rose-800/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-rose-500 text-white">
                  Critical-Path Delay Alert
                </span>
                <span className="text-xs text-slate-300 font-mono">ID: PMG-ESCALATE-2024-89</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                NH-48 Dharwad Bypass: Section 19 Statutory Lapse Impending in 68 Days
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                Section 11 Preliminary Notification was gazetted on 18 Mar 2024. If Section 19 Declaration is not published before 17 Mar 2025, the acquisition lapses completely under RFCTLARR Section 19(7). Action required: Expedite CALA objection determination order for Sy 142/B.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Statutory Directive dispatched to Karnataka Chief Secretary & CALA Dharwad.")}
            className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-all"
          >
            Issue Cabinet Sec Directive
          </button>
        </div>
      </div>

      {/* National Corridor Velocity Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-700" />
              <span>National Mega-Corridor Acquisition Velocity Matrix</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live statutory progress across PM Gati Shakti National Master Plan corridors.
            </p>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Filter by Risk:</span>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800"
            >
              <option value="ALL">All National Corridors</option>
              <option value="CRITICAL_LAPSE_RISK">Critical Lapse Risk</option>
              <option value="MODERATE_DELAY">Moderate Delay</option>
              <option value="ON_SCHEDULE">On Schedule</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {filteredCorridors.map((c) => {
            const acquiredPercent = Math.round((c.landPossessedHa / c.landRequiredHa) * 100);
            const isCritical = c.riskStatus === 'CRITICAL_LAPSE_RISK';
            const isDelay = c.riskStatus === 'MODERATE_DELAY';

            return (
              <div 
                key={c.id} 
                className={`p-4 rounded-xl border text-xs transition-all ${
                  isCritical 
                    ? 'bg-rose-50/40 border-rose-300' 
                    : isDelay
                      ? 'bg-amber-50/40 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {c.leadAgency}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {c.corridorName}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isCritical 
                      ? 'bg-rose-100 text-rose-800' 
                      : isDelay
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {c.riskStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Length</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">{c.totalLengthKm} km</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">States Traversed</span>
                    <p className="text-slate-800 truncate mt-0.5">{c.statesTraversed.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">PFMS Outlay</span>
                    <p className="font-mono font-bold text-emerald-700 mt-0.5">₹{c.totalPFMSDisbursedCr} Cr</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Acquisition Progress</span>
                    <p className="font-mono font-bold text-blue-700 mt-0.5">{acquiredPercent}% ({c.landPossessedHa} / {c.landRequiredHa} Ha)</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${
                      isCritical ? 'bg-rose-500' : isDelay ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${acquiredPercent}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 mt-2 font-medium">
                  <b>Critical Issues & Bottlenecks:</b> {c.criticalIssues}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
