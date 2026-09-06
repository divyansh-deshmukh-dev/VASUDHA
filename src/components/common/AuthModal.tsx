import React, { useState } from 'react';
import { UserRole } from '../../types';
import { 
  X, 
  Shield, 
  Lock, 
  KeyRound, 
  Smartphone, 
  Mic, 
  Building2, 
  FileCheck2, 
  Landmark, 
  Compass, 
  HeartHandshake, 
  LineChart, 
  User, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
  initialTab?: 'officer' | 'citizen';
  initialRole?: UserRole;
}

const OFFICER_DEFAULT_EMAILS: Record<string, string> = {
  collector: 'divya.chandrashekhar@ias.nic.in',
  requiring_body: 'rajeshwar.rao@nhai.gov.in',
  state_gov: 'manoj.meena@karnataka.gov.in',
  central_ministry: 'anuradha.thakur@nic.in',
  rehabilitation: 'bs.patil@karnataka.gov.in',
  policy_maker: 'arvind.subramanian@niti.gov.in',
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'officer',
  initialRole = 'collector'
}) => {
  const [activeTab, setActiveTab] = useState<'officer' | 'citizen'>(initialTab);
  
  // Officer form state
  const [selectedOfficerRole, setSelectedOfficerRole] = useState<UserRole>(initialRole !== 'citizen' ? initialRole : 'collector');
  const [officerId, setOfficerId] = useState(OFFICER_DEFAULT_EMAILS[initialRole] || 'divya.chandrashekhar@ias.nic.in');
  const [securityPin, setSecurityPin] = useState('••••••••');
  
  // Citizen form state
  const [identifierType, setIdentifierType] = useState<'ulpin' | 'aadhaar'>('ulpin');
  const [identifierVal, setIdentifierVal] = useState('KA-BLR-0982');
  const [mobileNumber, setMobileNumber] = useState('9845012345');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [bhashiniText, setBhashiniText] = useState('');

  // Sync state whenever modal is opened with new props
  React.useEffect(() => {
    if (isOpen) {
      if (initialRole === 'citizen' || initialTab === 'citizen') {
        setActiveTab('citizen');
      } else {
        setActiveTab('officer');
        if (initialRole) {
          setSelectedOfficerRole(initialRole);
          setOfficerId(OFFICER_DEFAULT_EMAILS[initialRole] || 'divya.chandrashekhar@ias.nic.in');
        }
      }
    }
  }, [isOpen, initialTab, initialRole]);

  const handleRoleSelectionChange = (newRole: UserRole) => {
    setSelectedOfficerRole(newRole);
    if (OFFICER_DEFAULT_EMAILS[newRole]) {
      setOfficerId(OFFICER_DEFAULT_EMAILS[newRole]);
    }
  };

  if (!isOpen) return null;

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedOfficerRole);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setOtpVal('729401'); // autofill realistic simulated OTP for demo ease
  };

  const handleCitizenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('citizen');
    onClose();
  };

  const toggleMic = () => {
    setMicActive(!micActive);
    if (!micActive) {
      setBhashiniText('Bhashini AI Listening (Kannada/Hindi/English)... "ಖಾತೆ ಸಂಖ್ಯೆ 142/B ಪರಿಹಾರ ಸ್ಥಿತಿ"');
      setTimeout(() => {
        setIdentifierType('ulpin');
        setIdentifierVal('KA-BLR-0982');
        setBhashiniText('Transcribed: Parcel ULPIN KA-BLR-0982 detected');
      }, 1800);
    } else {
      setBhashiniText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Tricolor Ribbon */}
        <div className="tricolor-ribbon shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img 
              src="/logo.png" 
              alt="VASUDHA Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-contain bg-[#fbf9f4] border border-slate-200 shadow-sm shrink-0" 
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>VASUDHA Portal Access</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">Government of India Single Sign-On Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('officer')}
            className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'officer'
                ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Official Parichay SSO / e-Pramaan</span>
            <span className="sm:hidden">Official SSO</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('citizen')}
            className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'citizen'
                ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Citizen & Landowner (Aadhaar/OTP)</span>
            <span className="sm:hidden">Citizen (OTP)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'officer' ? (
            <form onSubmit={handleOfficerLogin} className="space-y-4">
              {/* Role Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Designated Administrative Role
                </label>
                <div className="relative">
                  <select
                    value={selectedOfficerRole}
                    onChange={(e) => handleRoleSelectionChange(e.target.value as UserRole)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  >
                    <option value="collector">District Collector / CALA (Acquiring Authority)</option>
                    <option value="requiring_body">Land Requiring Body (NHAI / Indian Railways)</option>
                    <option value="state_gov">State Government (Revenue Dept / Chief Secretary)</option>
                    <option value="central_ministry">Central Ministries (MoRD / MoRTH / PMO)</option>
                    <option value="rehabilitation">Rehabilitation Authority (R&R Desk)</option>
                    <option value="policy_maker">Policy Maker & Analytics Cell (NITI / DoLR)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NIC / Parichay Government Email ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    required
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    placeholder="officer.name@gov.in"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Digital Token PIN / e-Pramaan Passkey
                  </label>
                  <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                    Hardware Token Active
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={securityPin}
                    onChange={(e) => setSecurityPin(e.target.value)}
                    required
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* Parichay 2FA Trust Banner */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-700 shrink-0" />
                <div className="text-[11px] text-blue-900">
                  <span className="font-bold">e-Pramaan Tier-3 Certified:</span> Enforces cryptographic audit trail for all statutory orders and PFMS compensation releases.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:gap-3"
              >
                <span>Authenticate & Open Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={otpSent ? handleCitizenLogin : handleSendOtp} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIdentifierType('ulpin')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    identifierType === 'ulpin'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  14-Digit ULPIN Code
                </button>
                <button
                  type="button"
                  onClick={() => setIdentifierType('aadhaar')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    identifierType === 'aadhaar'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  12-Digit Aadhaar (Linked)
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {identifierType === 'ulpin' ? 'Unique Land Parcel ID (ULPIN)' : 'Aadhaar Number'}
                  </label>
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium transition-all ${
                      micActive ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Mic className="w-3 h-3" />
                    <span>{micActive ? 'Listening...' : 'Bhashini Voice Search'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={identifierVal}
                  onChange={(e) => setIdentifierVal(e.target.value)}
                  required
                  placeholder={identifierType === 'ulpin' ? 'e.g. KA-BLR-0982' : 'XXXX-XXXX-9412'}
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
                {bhashiniText && (
                  <p className="mt-1 text-[11px] text-emerald-700 font-medium italic">
                    {bhashiniText}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Mobile Number (Aadhaar OTP)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    placeholder="98XXXXXXXX"
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {otpSent && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      Enter 6-Digit OTP received on +91-{mobileNumber}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">01:58s</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpVal}
                    onChange={(e) => setOtpVal(e.target.value)}
                    required
                    placeholder="729401"
                    className="w-full text-center tracking-widest text-lg font-mono font-bold bg-white border border-emerald-400 rounded-lg py-1 text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <p className="text-[10px] text-emerald-700 text-center">
                    Simulated verification OTP provided for sandbox access.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {otpSent ? (
                  <>
                    <span>Verify OTP & Access Land Record</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Send Aadhaar OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
