import React, { useState } from 'react';
import { 
  PAFRecord, 
  ResettlementColony, 
  UserProfile 
} from '../../types';
import { 
  HeartHandshake, 
  Home, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Droplet, 
  Sun, 
  Activity, 
  Building, 
  Check,
  Search,
  Sparkles
} from 'lucide-react';

interface RehabilitationDashboardProps {
  user: UserProfile;
  pafs: PAFRecord[];
  colony: ResettlementColony;
}

export const RehabilitationDashboard: React.FC<RehabilitationDashboardProps> = ({
  user,
  pafs: initialPafs,
  colony: initialColony
}) => {
  const [pafs, setPafs] = useState<PAFRecord[]>(initialPafs);
  const [colony, setColony] = useState<ResettlementColony>(initialColony);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'ST' | 'SC' | 'DISPLACED'>('ALL');

  const filteredPafs = pafs.filter(p => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'DISPLACED') return p.isDisplacedPhysically;
    return p.category === selectedFilter;
  });

  const handleDisburseHousing = (pafId: string) => {
    setPafs(prev => prev.map(p => {
      if (p.id === pafId) {
        return {
          ...p,
          scheduleII_HousingGrant: {
            ...p.scheduleII_HousingGrant,
            disbursed: true
          }
        };
      }
      return p;
    }));
  };

  const handleDisburseRelocation = (pafId: string) => {
    setPafs(prev => prev.map(p => {
      if (p.id === pafId) {
        return {
          ...p,
          scheduleII_RelocationAllowance: {
            ...p.scheduleII_RelocationAllowance,
            disbursed: true
          }
        };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  Rehabilitation & Resettlement (R&R) Statutory Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  RFCTLARR Schedule II & III Authority
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Commissioner: <span className="font-semibold text-slate-700">{user.name}</span> • {user.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Special SC/ST Safeguards Active (Sec 41/42)
            </span>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Project Affected Families (PAFs)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">184</span>
              <span className="text-xs font-semibold text-slate-600">Identified in SIA</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">84 Physically Displaced</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Schedule II Housing Grants
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">₹2.10</span>
              <span className="text-xs font-semibold text-slate-600">Cr Disbursed</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Free plot or ₹2.5L construction grant</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ₹50,000 Relocation Grants
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-mono">100%</span>
              <span className="text-xs font-semibold text-emerald-600">Disbursed</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">To all displaced families</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Resettlement Colony Readiness
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700 font-mono">96%</span>
              <span className="text-xs font-semibold text-indigo-600">Audited</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">25 Schedule III Civic Amenities</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Resettlement Colony Amenities Tracker + Family Entitlements Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Schedule III Resettlement Colony Civic Infrastructure Tracker */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Resettlement Colony Civic Infrastructure (Schedule III)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {colony.overallReadiness}% Ready
              </span>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800">{colony.name}</span>
                <span className="text-slate-500">Cap: {colony.resettledFamilies} / {colony.totalCapacityFamilies} PAFs</span>
              </div>
            </div>

            {/* Amenity checklist with progress gauges */}
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Droplet className="w-3.5 h-3.5 text-blue-600" />
                    <span>24x7 Potable Piped Water Connections</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">{colony.amenities.potableWaterTaps}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${colony.amenities.potableWaterTaps}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Solar Micro-Grid & Street Illumination</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">{colony.amenities.solarMicroGrid}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${colony.amenities.solarMicroGrid}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Building className="w-3.5 h-3.5 text-slate-600" />
                    <span>Pucca Internal Asphalt Roads & Storm Drains</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">{colony.amenities.puccaInternalRoads}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className="bg-slate-700 h-1.5 rounded-full" style={{ width: `${colony.amenities.puccaInternalRoads}%` }} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Primary Health Sub-Center</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Anganwadi & School</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Community Hall</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Land Title Mutation (Podi)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Schedule II Statutory Entitlements Family Ledger */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>Schedule II Family Statutory Welfare Entitlement Ledger</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Individual statutory guarantees under RFCTLARR Section 31
                </p>
              </div>

              <div className="flex gap-1.5 text-xs">
                {(['ALL', 'ST', 'SC', 'DISPLACED'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedFilter === f 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {filteredPafs.map((paf) => (
                <div key={paf.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{paf.headOfFamily}</span>
                      <span className="text-slate-500 ml-2">
                        ({paf.village} • {paf.familyMembersCount} Members)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        paf.category === 'ST' ? 'bg-amber-100 text-amber-800' :
                        paf.category === 'SC' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        Category: {paf.category}
                      </span>
                      {paf.isDisplacedPhysically && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          Displaced
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Entitlement Components */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    {/* Housing Grant */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Housing (Sch-II §4):</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {paf.scheduleII_HousingGrant.eligible ? (
                          paf.scheduleII_HousingGrant.disbursed ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Allotted Plot #24
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDisburseHousing(paf.id)}
                              className="text-blue-700 hover:underline font-bold"
                            >
                              Disburse ₹2.5L Grant
                            </button>
                          )
                        ) : (
                          <span className="text-slate-400">Not Applicable</span>
                        )}
                      </p>
                    </div>

                    {/* Relocation Allowance */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Relocation (Sch-II §6):</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {paf.scheduleII_RelocationAllowance.eligible ? (
                          paf.scheduleII_RelocationAllowance.disbursed ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> ₹50,000 Credited
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDisburseRelocation(paf.id)}
                              className="text-blue-700 hover:underline font-bold"
                            >
                              Disburse ₹50,000
                            </button>
                          )
                        ) : (
                          <span className="text-slate-400">Not Applicable</span>
                        )}
                      </p>
                    </div>

                    {/* Subsistence Assistance */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-500 font-medium">Subsistence (Sch-II §3):</span>
                      <p className="font-mono font-bold text-slate-900 mt-0.5">
                        ₹3,000/mo ({paf.scheduleII_SubsistenceAssistance.monthsCompleted}/{paf.scheduleII_SubsistenceAssistance.totalMonths} mos)
                      </p>
                    </div>
                  </div>

                  {/* Special SC/ST Statutory Safeguard Badge */}
                  {paf.specialSTSafeguardsApplied && (
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-[10px] text-amber-900 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        <b>Section 41/42 Safeguard:</b> 1/3rd advance compensation credited; fishing & forest rights preserved in sanctuary catchment.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
