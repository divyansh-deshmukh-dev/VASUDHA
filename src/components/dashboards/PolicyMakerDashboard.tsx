import React, { useState } from 'react';
import { 
  UserProfile 
} from '../../types';
import { POLICY_METRICS } from '../../mock/data';
import { 
  LineChart, 
  TrendingUp, 
  AlertTriangle, 
  Sliders, 
  Cpu, 
  BarChart2, 
  FileText, 
  Scale, 
  PieChart, 
  Layers, 
  HelpCircle,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface PolicyMakerDashboardProps {
  user: UserProfile;
}

export const PolicyMakerDashboard: React.FC<PolicyMakerDashboardProps> = ({
  user
}) => {
  // Interactive Predictive Policy Simulator Levers
  const [ruralMultiplier, setRuralMultiplier] = useState<number>(2.0); // Factor of 1.0 to 2.0 under First Schedule
  const [solatiumRate, setSolatiumRate] = useState<number>(100); // 100% under Sec 30(1)
  const [siaExemptionThreshold, setSiaExemptionThreshold] = useState<number>(100); // Hectares
  const [enableDigitalHearings, setEnableDigitalHearings] = useState<boolean>(true);

  // Dynamic simulation outputs
  const baselineExchequerCr = 84920;
  // Multiplier impact calculation
  const simulatedExchequerCr = Math.round(baselineExchequerCr * (1 + ((ruralMultiplier - 1.5) * 0.18) + ((solatiumRate - 100) * 0.005)));
  const simulatedCycleDays = Math.max(
    180, 
    Math.round(POLICY_METRICS.nationalAvgCycleDays - (enableDigitalHearings ? 38 : 0) - ((siaExemptionThreshold - 50) * 0.25))
  );
  const simulatedLitigationRate = (POLICY_METRICS.litigationRatePercent - (enableDigitalHearings ? 1.4 : 0)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  Policy Maker & Legislative Analytics Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  NITI Aayog / DoLR Macro Planning Cell
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Economic & Legislative Advisor: <span className="font-semibold text-slate-700">{user.name}</span> • {user.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Policy Simulation Active
            </span>
          </div>
        </div>

        {/* Strategic Macro KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              National Avg Cycle Duration
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {POLICY_METRICS.nationalAvgCycleDays}
              </span>
              <span className="text-xs font-semibold text-slate-600">days</span>
            </div>
            <p className="text-[10px] text-emerald-600 mt-1 font-semibold">
              ↓ 53 days vs 365-day statutory limit
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              National Litigation Rate
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">
                {POLICY_METRICS.litigationRatePercent}%
              </span>
              <span className="text-xs font-semibold text-slate-600">High Court / NGT</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Down from 18.2% under 1894 Act</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Budget Utilization Efficiency
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-mono">
                {POLICY_METRICS.budgetUtilizationPercent}%
              </span>
              <span className="text-xs font-semibold text-emerald-600">Disbursed</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Total ₹84,920 Cr Outlay</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Statutory Compliance Index
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-purple-700 font-mono">
                {POLICY_METRICS.statutoryComplianceIndex}
              </span>
              <span className="text-xs font-semibold text-purple-700">/ 100</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Audited across 412 projects</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Historical Cost Inflation Curves & Statutory Lapse Stage Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Acquisition Cost & Inflation Trends */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Circle Rate vs. Final Award Compensation Trends (₹ Lakhs/Ha)
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Multi-year trajectory demonstrating the impact of First Schedule 100% Solatium, rural factor multiplier, and 12% interest on overall project exchequer outlay:
            </p>

            <div className="mt-5 space-y-3">
              {POLICY_METRICS.historicalInflation.map((item) => {
                const diff = (item.finalAwardAvg - item.circleRateAvg).toFixed(1);
                const ratio = (item.finalAwardAvg / item.circleRateAvg).toFixed(2);

                return (
                  <div key={item.year} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-bold text-slate-900 font-mono text-sm">FY {item.year}</span>
                      <span className="text-[11px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {ratio}x statutory multiplier factor
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500">Circle / Ready Reckoner:</span>
                        <p className="font-mono font-bold text-slate-700">₹{item.circleRateAvg} L/Ha</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Final RFCTLARR Award:</span>
                        <p className="font-mono font-bold text-emerald-700">₹{item.finalAwardAvg} L/Ha</p>
                      </div>
                    </div>

                    {/* Comparative horizontal bars */}
                    <div className="mt-2 space-y-1">
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(item.circleRateAvg / 70) * 100}%` }} 
                        />
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-1.5 rounded-full" 
                          style={{ width: `${(item.finalAwardAvg / 70) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Statutory Lapse & Delay Stage Heatmap */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Statutory Lapse & Procedural Delay Heatmap
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Isolating structural friction points where administrative delays threaten statutory lapsing under RFCTLARR Act 2013:
            </p>

            <div className="mt-5 space-y-3">
              {POLICY_METRICS.delayStageHeatmap.map((item, idx) => {
                const isCritical = item.bottleneckSeverity === 'Critical';
                const isHigh = item.bottleneckSeverity === 'High';

                return (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isCritical 
                        ? 'bg-rose-50/50 border-rose-300' 
                        : isHigh 
                          ? 'bg-amber-50/50 border-amber-300' 
                          : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{item.stage}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical 
                          ? 'bg-rose-100 text-rose-800' 
                          : isHigh 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.bottleneckSeverity} Severity
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2">
                      <span>Actual Avg Duration: <b className="font-mono text-slate-900">{item.avgDays} days</b></span>
                      <span>Statutory Maximum: <b className="font-mono text-slate-700">{item.statutoryDays} days</b></span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          isCritical ? 'bg-rose-600' : isHigh ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min(100, (item.avgDays / item.statutoryDays) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Policy Simulation Engine */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-enterprise border border-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Predictive Legislative & Policy Reform Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Simulate amendments to First & Second Schedule statutory multipliers to predict macro exchequer impact and corridor velocity.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setRuralMultiplier(2.0);
              setSolatiumRate(100);
              setSiaExemptionThreshold(100);
              setEnableDigitalHearings(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Reset to RFCTLARR 2013 Base
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Policy Levers (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="font-semibold text-slate-200">
                  Rural Multiplier Factor (First Schedule §26(2))
                </label>
                <span className="font-mono font-bold text-purple-400">{ruralMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={ruralMultiplier}
                onChange={(e) => setRuralMultiplier(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">Multiplies ready reckoner market rate for non-urban agricultural land.</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="font-semibold text-slate-200">
                  Statutory Solatium Rate (Section 30(1))
                </label>
                <span className="font-mono font-bold text-purple-400">{solatiumRate}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                step="10"
                value={solatiumRate}
                onChange={(e) => setSolatiumRate(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">Compulsory acquisition solatium granted in addition to market value.</p>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="font-semibold text-slate-200">
                  SIA Exemption Threshold for Linear Infrastructure
                </label>
                <span className="font-mono font-bold text-purple-400">{siaExemptionThreshold} Hectares</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={siaExemptionThreshold}
                onChange={(e) => setSiaExemptionThreshold(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">Allows accelerated Section 11 notice for national security & critical transport.</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <div>
                <p className="font-bold text-white">Mandatory Digital Section 15 Hearings</p>
                <p className="text-[10px] text-slate-400">Enforces Bhashini video enquiry recordings to curb court challenges.</p>
              </div>
              <input
                type="checkbox"
                checked={enableDigitalHearings}
                onChange={(e) => setEnableDigitalHearings(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded bg-slate-700 border-slate-600"
              />
            </div>
          </div>

          {/* Simulated Impact Projections (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Simulated Macro Impact Projections
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Projected National Exchequer Outlay:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-mono font-black text-amber-400">₹{simulatedExchequerCr.toLocaleString()}</span>
                  <span className="text-[10px] font-semibold text-slate-400">Crores</span>
                </div>
                <span className={`text-[10px] font-medium ${simulatedExchequerCr > baselineExchequerCr ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {simulatedExchequerCr > baselineExchequerCr ? `+₹${simulatedExchequerCr - baselineExchequerCr} Cr (+${(((simulatedExchequerCr - baselineExchequerCr) / baselineExchequerCr) * 100).toFixed(1)}%)` : `Optimal baseline balance`}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Projected Avg Acquisition Duration:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-mono font-black text-emerald-400">{simulatedCycleDays}</span>
                  <span className="text-[10px] font-semibold text-slate-400">days</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">
                  Saving ~{POLICY_METRICS.nationalAvgCycleDays - simulatedCycleDays} days per national corridor
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Projected High Court Stay Rate:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-mono font-black text-blue-400">{simulatedLitigationRate}%</span>
                </div>
                <span className="text-[10px] text-blue-300 font-medium">
                  {enableDigitalHearings ? 'Digital video hearings minimize injunction risk' : 'Standard court review rate'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
