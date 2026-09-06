import React, { useState } from 'react';
import { 
  Parcel, 
  UserProfile 
} from '../../types';
import { 
  User, 
  Search, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  DollarSign, 
  Coins, 
  ShieldCheck, 
  Camera, 
  Upload, 
  HelpCircle,
  Globe,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CitizenDashboardProps {
  user: UserProfile;
  parcels: Parcel[];
}

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    portalTitle: 'Public Citizen & Landowner Transparency Portal',
    portalSub: 'DoLR Direct Benefit Transfer & Land Title Verification',
    searchTitle: 'Find Your Land Acquisition & Compensation Record',
    ulpinLabel: '14-Digit ULPIN / Survey Number',
    micSearch: 'Voice Search (Bhashini AI)',
    lookupBtn: 'Track Parcel Status',
    awardBreakdown: 'Transparent Statutory Award Computation',
    pfmsStatus: 'PFMS Direct Benefit Transfer Status',
    fieldVerifyTitle: 'Revenue Inspector Ground Verification Audit',
    uploadBtn: 'Upload Boundary Photo for Audit'
  },
  kn: {
    portalTitle: 'ಸಾರ್ವಜನಿಕ ಭೂಮಾಲೀಕರ ಪಾರದರ್ಶಕ ಪೋರ್ಟಲ್',
    portalSub: 'ಭೂ ಸಂಪನ್ಮೂಲ ಇಲಾಖೆ - ಪರಿಹಾರ ಹಾಗೂ ಡಿಬಿಟಿ ಸ್ಥಿತಿ',
    searchTitle: 'ನಿಮ್ಮ ಜಮೀನು ಸ್ವಾಧೀನ ಮತ್ತು ಪರಿಹಾರ ದಾಖಲೆ ಹುಡುಕಿ',
    ulpinLabel: '14-ಅಂಕಿಯ ಯುಎಲ್‌ಪಿಐಎನ್ / ಸರ್ವೇ ನಂಬರ್',
    micSearch: 'ಧ್ವನಿ ಹುಡುಕಾಟ (ಭಾಷಿಣಿ AI)',
    lookupBtn: 'ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
    awardBreakdown: 'ಪಾರದರ್ಶಕ ಶಾಸನಬದ್ಧ ಪರಿಹಾರ ಲೆಕ್ಕಾಚಾರ',
    pfmsStatus: 'ಪಿಎಫ್‌ಎಂಎಸ್ ನೇರ ನಗದು ವರ್ಗಾವಣೆ ಸ್ಥಿತಿ',
    fieldVerifyTitle: 'ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಸ್ಥಳ ಪರಿಶೀಲನಾ ವರದಿ',
    uploadBtn: 'ಗಡಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'
  },
  hi: {
    portalTitle: 'नागरिक एवं भू-स्वामी पारदर्शिता पोर्टल',
    portalSub: 'भूमि संसाधन विभाग - प्रत्यक्ष लाभ अंतरण (DBT) एवं मुआवजा स्थिति',
    searchTitle: 'अपनी भूमि अधिग्रहण एवं मुआवजा रिकॉर्ड खोजें',
    ulpinLabel: '14-अंकीय यूएलपीआईएन / खसरा संख्या',
    micSearch: 'ध्वनि खोज (भाषिणी AI)',
    lookupBtn: 'स्थिति देखें',
    awardBreakdown: 'पारदर्शी वैधानिक मुआवजा गणना',
    pfmsStatus: 'PFMS प्रत्यक्ष बैंक खाता अंतरण स्थिति',
    fieldVerifyTitle: 'राजस्व निरीक्षक स्थलीय सत्यापन लेखापरीक्षा',
    uploadBtn: 'सीमा फोटोग्राफ अपलोड करें'
  }
};

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  user,
  parcels
}) => {
  const [currentLang, setCurrentLang] = useState('kn'); // Default Kannada for Dharwad demo
  const [searchQuery, setSearchQuery] = useState('KA-BLR-0982');
  const [activeParcel, setActiveParcel] = useState<Parcel>(parcels[0]);
  const [micListening, setMicListening] = useState(false);
  const [speechSynthesisPlaying, setSpeechSynthesisPlaying] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const handleVoiceSearch = () => {
    setMicListening(true);
    setTimeout(() => {
      setMicListening(false);
      setSearchQuery('KA-BLR-0982');
      setActiveParcel(parcels[0]);
    }, 1800);
  };

  const handlePlayVoiceSummary = () => {
    setSpeechSynthesisPlaying(true);
    setTimeout(() => {
      setSpeechSynthesisPlaying(false);
    }, 3000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = parcels.find(p => 
      p.ulpin.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.surveyNumber.includes(searchQuery)
    );
    if (found) {
      setActiveParcel(found);
    } else {
      alert(`No parcel found matching "${searchQuery}". Showing default sample parcel KA-BLR-0982.`);
      setActiveParcel(parcels[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Multilingual Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {t.portalTitle}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Zero Admin Access • Public Transparency
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.portalSub} • Khatedar: <span className="font-semibold text-slate-800">{user.name}</span>
              </p>
            </div>
          </div>

          {/* Bhashini Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto overflow-x-auto">
            <Globe className="w-4 h-4 text-slate-600 ml-1 shrink-0" />
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline shrink-0">Language:</span>
            <div className="flex flex-nowrap sm:flex-wrap gap-1 shrink-0">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    currentLang === lang.code
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Voice Inquiry Bar */}
        <form onSubmit={handleSearch} className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. KA-BLR-0982 or Survey No. 142/B"
              className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 sm:py-3 pl-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                micListening 
                  ? 'bg-rose-100 text-rose-800 border-rose-400 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              <Mic className="w-4 h-4 shrink-0" />
              <span>{micListening ? 'Listening (Bhashini)...' : t.micSearch}</span>
            </button>

            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-all whitespace-nowrap"
            >
              {t.lookupBtn}
            </button>
          </div>
        </form>
      </div>

      {/* Main Grid: Award Breakdown on Left, PFMS Credit & Field Audit on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Transparent Statutory Compensation Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  ULPIN: {activeParcel.ulpin}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Survey No. {activeParcel.surveyNumber} ({activeParcel.village}, {activeParcel.taluk})
                </h3>
              </div>

              {/* Bhashini Voice Readout Button */}
              <button
                type="button"
                onClick={handlePlayVoiceSummary}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  speechSynthesisPlaying
                    ? 'bg-blue-100 text-blue-800 border-blue-400 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                }`}
              >
                <Volume2 className="w-4 h-4 text-blue-700" />
                <span>{speechSynthesisPlaying ? 'Reading Award (Audio)...' : 'Play Audio Summary'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Khatedar: <b className="text-slate-800">{activeParcel.ownerName}</b> • Aadhaar: <span className="font-mono">{activeParcel.aadhaarMasked}</span> • Extent: <b className="font-mono">{activeParcel.areaHectares} Hectares</b> ({activeParcel.landClassification})
            </p>

            {/* Compensation Ledger Table */}
            <div className="mt-5 space-y-2.5 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">1. Base Market Rate (Circle Rate)</p>
                  <p className="text-[11px] text-slate-500">Determined under RFCTLARR Section 26</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  ₹{activeParcel.baseMarketValue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <div>
                  <p className="font-bold text-emerald-900">2. 100% Statutory Solatium Multiplier</p>
                  <p className="text-[11px] text-emerald-700">Guaranteed compulsory acquisition compensation (§30(1))</p>
                </div>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  +₹{activeParcel.solatium100.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">3. 12% Per Annum Statutory Interest</p>
                  <p className="text-[11px] text-slate-500">From SIA notification to final award declaration (§30(3))</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  +₹{activeParcel.interest12.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">4. Attached Assets Valuation</p>
                  <p className="text-[11px] text-slate-500">Horticultural trees & irrigation borewell certified by PWD</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  +₹{activeParcel.additionalAssetsValue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
                <div>
                  <p className="font-bold text-sm">Total First Schedule Statutory Award</p>
                  <p className="text-[11px] text-emerald-200">Net compensation payable directly to khatedar</p>
                </div>
                <span className="font-mono font-black text-xl text-amber-300">
                  ₹{activeParcel.totalAwardCompensation.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): PFMS Direct Benefit Transfer & Ground Verification Audit */}
        <div className="lg:col-span-5 space-y-6">
          {/* PFMS Bank Credit Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.pfmsStatus}
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeParcel.pfmsStatus === 'CREDITED' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {activeParcel.pfmsStatus}
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">PFMS Ref Number:</span>
                <span className="font-mono font-bold text-slate-900">{activeParcel.pfmsTransactionId || 'Awaiting Batch Batching'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aadhaar Linked Account:</span>
                <span className="font-mono text-slate-800">State Bank of India (***4812)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Physical Possession Status:</span>
                <span className={`font-semibold ${activeParcel.possessionIssued ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {activeParcel.possessionIssued ? 'Handover Authorized' : 'Protected (Section 38 Lock Active)'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              If your bank account or Aadhaar number is unlinked, please contact the CALA Dharwad helpdesk or submit a correction below.
            </p>
          </div>

          {/* Revenue Inspector Field Verification with Photo Audit Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.fieldVerifyTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Official verification notes from Revenue Inspector field visit:
            </p>

            <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-semibold">Inspector Audit Report:</p>
              <p className="text-[11px] leading-relaxed">
                "{activeParcel.fieldVerificationNotes || 'Boundary verified with GPS stone coordinates. Standing crops and irrigation assets inspected.'}"
              </p>
            </div>

            {/* Photo upload simulator */}
            <div className="mt-4">
              <div 
                onClick={() => setUploadedPhoto(true)}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  uploadedPhoto 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900' 
                    : 'bg-slate-50 border-slate-300 hover:border-emerald-400 text-slate-600'
                }`}
              >
                <Camera className="w-6 h-6 mx-auto mb-1.5 text-slate-400" />
                {uploadedPhoto ? (
                  <div>
                    <p className="text-xs font-bold text-emerald-900">✓ Geo-Tagged Photo Uploaded</p>
                    <p className="text-[10px] text-emerald-700 font-mono mt-0.5">Lat: 15.4589° N, Lng: 74.9823° E (Pomegranate Borewell)</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold">{t.uploadBtn}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Geo-tagged audit verification</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
