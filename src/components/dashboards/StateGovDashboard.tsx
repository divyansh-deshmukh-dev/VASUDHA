import React, { useState } from 'react';
import { 
  DistrictRanking, 
  UserProfile 
} from '../../types';
import { 
  Landmark, 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building, 
  ShieldAlert, 
  ChevronRight, 
  FileText, 
  Layers, 
  Search,
  Filter,
  Check
} from 'lucide-react';

interface StateGovDashboardProps {
  user: UserProfile;
  districtRankings: DistrictRanking[];
}

export const StateGovDashboard: React.FC<StateGovDashboardProps> = ({
  user,
  districtRankings: initialRankings
}) => {
  const [districtRankings, setDistrictRankings] = useState<DistrictRanking[]>(initialRankings);
  const [approvalQueue, setApprovalQueue] = useState([
    {
      id: 'APP-KN-2024-01',
      project: 'NH-48 Dharwad Expressway Greenfield Bypass (Section 19 Declaration)',
      district: 'Dharwad',
      requestedBy: 'Dr. Divya Chandrashekhar, IAS (CALA)',
      extentHa: 342.50,
      treasuryImpactCr: 1240.0,
      status: 'AWAITING_CABINET_NOTE'
    },
    {
      id: 'APP-KN-2024-02',
      project: 'Hubballi-Ankola New Railway Corridor (Forest Land Diversion)',
      district: 'Uttara Kannada',
      requestedBy: 'Shri Gangubai, IAS (CALA)',
      extentHa: 595.00,
      treasuryImpactCr: 890.0,
      status: 'AWAITING_CABINET_NOTE'
    }
  ]);

  const handleApproveCabinetNote = (id: string) => {
    setApprovalQueue(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'CABINET_APPROVED' };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  State Land Administration & Cabinet Approval Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Vidhana Soudha Secretariat
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Principal Secretary: <span className="font-semibold text-slate-700">{user.name}</span> • {user.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              State: Karnataka (31 Districts)
            </span>
          </div>
        </div>

        {/* State Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              State-Wide Corridors
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">28</span>
              <span className="text-xs font-semibold text-slate-600">Active</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">NHAI, Railways & State Highways</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total State Land Footprint
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">6,420</span>
              <span className="text-xs font-semibold text-slate-600">Hectares</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">4,810 Ha already possessed</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Inter-District Dispute Backlog
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-600 font-mono">2</span>
              <span className="text-xs font-semibold text-amber-700">Boundary Issues</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Dharwad-Belagavi Border Taluk</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              State Treasury Outlay
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-mono">₹4,890</span>
              <span className="text-xs font-semibold text-slate-600">Cr Disbursed</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Via PFMS direct benefit transfer</p>
          </div>
        </div>
      </div>

      {/* Main Grid: State Cabinet Approval Queue & District Velocity Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Interactive State Cabinet Approval Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  State Cabinet & Section 19 Approval Queue
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                2 Pending
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Proposals requiring State Government Gazette Notification clearance under RFCTLARR Section 19(1) and State Land Revenue Rules:
            </p>

            <div className="mt-4 space-y-3">
              {approvalQueue.map((item) => {
                const isApproved = item.status === 'CABINET_APPROVED';
                return (
                  <div 
                    key={item.id}
                    className={`p-4 rounded-xl border text-xs space-y-2.5 transition-all ${
                      isApproved 
                        ? 'bg-emerald-50/60 border-emerald-300' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-500">{item.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 leading-snug">
                      {item.project}
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                      <div>District: <b className="text-slate-800">{item.district}</b></div>
                      <div>Extent: <b className="text-slate-800 font-mono">{item.extentHa} Ha</b></div>
                      <div>Outlay: <b className="text-slate-800 font-mono">₹{item.treasuryImpactCr} Cr</b></div>
                      <div>Authority: <b className="text-slate-800">{item.requestedBy.split(',')[0]}</b></div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                      {isApproved ? (
                        <div className="text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Cabinet Resolution Passed
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApproveCabinetNote(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          Approve Cabinet Clearance
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): District Velocity Leaderboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  District Collector Velocity & RFCTLARR Compliance Leaderboard
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Audited by DoLR</span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Ranking District Collectors across the state by milestone completion speed, zero statutory lapses, and PFMS velocity.
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 text-center">Rank</th>
                    <th className="py-2.5 px-3 text-left">District & Collector</th>
                    <th className="py-2.5 px-3 text-center">Projects</th>
                    <th className="py-2.5 px-3 text-center">Avg Cycle</th>
                    <th className="py-2.5 px-3 text-center">Sec 19 Lapse</th>
                    <th className="py-2.5 px-3 text-center">PFMS Velocity</th>
                    <th className="py-2.5 px-3 text-center">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
                  {districtRankings.map((d) => (
                    <tr key={d.district} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 text-center">
                        <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full font-bold text-xs ${
                          d.rank === 1 ? 'bg-amber-100 text-amber-900' : d.rank === 2 ? 'bg-slate-200 text-slate-800' : 'text-slate-600'
                        }`}>
                          {d.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{d.district}</p>
                        <p className="text-[10px] text-slate-500">{d.collectorName}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold">{d.activeProjects}</td>
                      <td className="py-3 px-3 text-center font-mono">{d.avgCycleDays} days</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`font-mono font-bold ${d.sec19LapseRate === 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {d.sec19LapseRate}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-blue-700">
                        {d.pfmsVelocityScore}/100
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {d.auditRating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
