import React, { useState } from 'react';
import { 
  UserRole, 
  UserProfile 
} from '../../types';
import { 
  Shield, 
  Bell, 
  LogOut, 
  ChevronDown, 
  Building2, 
  FileCheck2, 
  Landmark, 
  Compass, 
  HeartHandshake, 
  LineChart, 
  User, 
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeRole: UserRole;
  user: UserProfile;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onOpenLanding: () => void;
  view: 'landing' | 'dashboard';
}

const ROLES_LIST: { role: UserRole; label: string; icon: React.ComponentType<{ className?: string }>; ministry: string }[] = [
  { role: 'requiring_body', label: 'Land Requiring Body', icon: Building2, ministry: 'NHAI / Indian Railways' },
  { role: 'collector', label: 'District Collector (CALA)', icon: FileCheck2, ministry: 'Revenue & RFCTLARR Authority' },
  { role: 'state_gov', label: 'State Government', icon: Landmark, ministry: 'Revenue Dept / Chief Sec' },
  { role: 'central_ministry', label: 'Central Ministries', icon: Compass, ministry: 'MoRD / MoRTH / PMO' },
  { role: 'rehabilitation', label: 'Rehabilitation Authority', icon: HeartHandshake, ministry: 'R&R Commissionerate' },
  { role: 'policy_maker', label: 'Policy Maker & Analytics', icon: LineChart, ministry: 'NITI Aayog / DoLR Policy' },
  { role: 'citizen', label: 'Citizen / Landowner', icon: User, ministry: 'Bhashini Vernacular Portal' },
];

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  user,
  onRoleChange,
  onLogout,
  onOpenLanding,
  view
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const activeRoleMeta = ROLES_LIST.find(r => r.role === activeRole) || ROLES_LIST[1];
  const ActiveIcon = activeRoleMeta.icon;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* 3.5px Continuous Micro-gradient Indian Tricolor Ribbon */}
      <div className="tricolor-ribbon" />

      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Brand & Project Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <button 
              onClick={onOpenLanding}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
              title="Return to VASUDHA Overview"
            >
              {/* Official VASUDHA Logo */}
              <div className="relative group-hover:scale-105 transition-transform shrink-0">
                <img 
                  src="/logo.png" 
                  alt="VASUDHA Logo" 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain bg-[#fbf9f4] border border-slate-200 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              
              <div className="shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-mono">
                    VASUDHA
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 hidden 2xl:block whitespace-nowrap">
                  National Land Acquisition & Legal Workflow Engine • DoLR, GoI
                </p>
              </div>
            </button>

            {/* Breadcrumb (Single line, no wrapping) */}
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs text-slate-600 shrink-0">
              <span className="text-slate-400 hidden xl:inline">Project:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-mono font-medium text-slate-800 border border-slate-200 whitespace-nowrap text-xs">
                <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>NH-48 Dharwad Expressway Bypass</span>
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Live RBAC Stakeholder Workspace Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-slate-800 transition-all shadow-subtle shrink-0 whitespace-nowrap"
                aria-expanded={roleDropdownOpen}
              >
                <ActiveIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700 shrink-0" />
                <span className="hidden lg:inline text-slate-500 font-normal">Active Workspace:</span>
                <span className="font-bold text-slate-900 max-w-[95px] sm:max-w-none truncate">{activeRoleMeta.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5 shrink-0" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-xl bg-white border border-slate-200 shadow-enterprise py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Role-Based Access Control (RBAC) Switcher
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Switch stakeholder persona for testing & audit simulation:
                    </p>
                  </div>

                  <div className="py-1 max-h-[380px] overflow-y-auto">
                    {ROLES_LIST.map((item) => {
                      const ItemIcon = item.icon;
                      const isSelected = item.role === activeRole;
                      return (
                        <button
                          key={item.role}
                          onClick={() => {
                            onRoleChange(item.role);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 px-3.5 py-2.5 text-left text-xs transition-colors ${
                            isSelected ? 'bg-blue-50/80 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md mt-0.5 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <ItemIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate">{item.label}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">{item.ministry}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                title="Statutory Alerts & Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-1.5rem)] rounded-xl bg-white border border-slate-200 shadow-enterprise p-4 z-50"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Live Statutory Alerts (3)
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                      High Priority
                    </span>
                  </div>
                  <div className="space-y-3 mt-3">
                    <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>12-Month Section 19 Clock Running</span>
                      </div>
                      <p className="text-[11px] text-amber-900/80">
                        NH-48 Dharwad Bypass: 68 days remaining before statutory Section 11 notice lapses under Sec 19(7).
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-50/80 border border-rose-200/80 text-xs">
                      <div className="flex items-center gap-1.5 text-rose-800 font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Spatial GIS Clash Detected</span>
                      </div>
                      <p className="text-[11px] text-rose-900/80">
                        Parcel #KA-BLR-0982 overlaps Bannerghatta ESZ buffer zone. Gazette publication held.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PFMS DBT Clearance Batch Verified</span>
                      </div>
                      <p className="text-[11px] text-emerald-900/80">
                        Batch #PFMS-DWD-889022: ₹58.40 Lakhs successfully credited to Khatedar Smt. Savita Kulkarni.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Mini Badge */}
            <div className="hidden md:flex items-center gap-2 pl-2.5 border-l border-slate-200 shrink-0">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 leading-tight whitespace-nowrap max-w-[150px] truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-[150px] mt-0.5 font-mono whitespace-nowrap">
                  {user.badgeId}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs border border-slate-300 shrink-0">
                {user.name.charAt(0)}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shrink-0 whitespace-nowrap"
              title="Sign out of portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
