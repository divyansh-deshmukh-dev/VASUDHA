import React, { useState } from 'react';
import { 
  ProjectProposal, 
  Parcel, 
  UserProfile 
} from '../../types';
import { 
  Building2, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  FileUp, 
  Search, 
  Layers, 
  Compass, 
  Sliders, 
  Clock, 
  ShieldAlert, 
  FileText,
  X,
  Eye
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Circle } from 'react-leaflet';
import L from 'leaflet';

interface RequiringBodyDashboardProps {
  user: UserProfile;
  projects: ProjectProposal[];
  parcels: Parcel[];
  onSelectProject?: (proj: ProjectProposal) => void;
}

// Custom Leaflet DivIcons to avoid image loading issues
const createDivIcon = (color: string, label: string, isClash = false) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        color: white;
        border: 2px solid white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        border-radius: 9999px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: bold;
        font-family: monospace;
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        ${isClash ? 'animation: pulse 1.5s infinite; border-color: #ef4444;' : ''}
      ">
        <span>${label}</span>
      </div>
    `,
    iconSize: [80, 24],
    iconAnchor: [40, 12]
  });
};

export const RequiringBodyDashboard: React.FC<RequiringBodyDashboardProps> = ({
  user,
  projects,
  parcels: initialParcels
}) => {
  const [activeProject, setActiveProject] = useState<ProjectProposal>(projects[0]);
  const [scanExecuted, setScanExecuted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  // New proposal form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newAgency, setNewAgency] = useState<'NHAI' | 'INDIAN_RAILWAYS'>('NHAI');
  const [newChainage, setNewChainage] = useState('54.5');
  const [newDistrict, setNewDistrict] = useState('Belagavi');
  const [kmlFileUploaded, setKmlFileUploaded] = useState(false);

  // Alignment coordinates for Dharwad Bypass
  const alignmentRoute: [number, number][] = [
    [15.4450, 74.9650], // Start: Chainage 0+000
    [15.4589, 74.9823], // Clashing Parcel 142/B
    [15.4710, 74.9980], // Mid-corridor
    [15.4812, 75.0115], // Parcel 89/1A
    [15.4855, 75.0142], // Parcel 89/2
    [15.5210, 74.9450], // End: Chainage 42+800
  ];

  const handleExecuteScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanExecuted(true);
    }, 1200);
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Project Proposal "${newProjectName || 'NHAI Greenfield Alignment'}" submitted to State Revenue Department & CALA for SIA approval.`);
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Land Requiring Body Operational Desk
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  NHAI / MoRTH Node
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Officer: <span className="font-semibold text-slate-700">{user.name}</span> • {user.designation} • {user.jurisdiction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>+ Submit New Project Alignment</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Corridor Chainage
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono">195.0</span>
              <span className="text-xs font-semibold text-slate-600">km active</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">3 Highway & Freight Corridors</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Cadastral Footprint
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">1,286.7</span>
              <span className="text-xs font-semibold text-slate-600">Hectares</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">1,494 Landowner Parcels</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Flagged GIS Clashes
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-rose-600 font-mono">1</span>
              <span className="text-xs font-bold text-rose-600">Critical ESZ</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Section 11 Gazette Blocked</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SLA Scrutiny Velocity
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-600 font-mono">88.4%</span>
              <span className="text-xs font-semibold text-emerald-600">Compliant</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">CALA Scrutiny within 30 days</p>
          </div>
        </div>
      </div>

      {/* Main Grid: GIS Route Scanner on Left, Conflict Scrutiny & Parcels on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Leaflet GIS Map + Pre-Screening Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>PM Gati Shakti Spatial Corridor Alignment Scanner</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Overlaying Highway Alignment with Cadastral Khasra Boundaries & MOEFCC Eco-Sensitive Layers
                </p>
              </div>

              {/* Conflict Scan Action Button */}
              <button
                onClick={handleExecuteScan}
                disabled={isScanning}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  isScanning 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : scanExecuted
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Querying Gati Shakti Layers...' : scanExecuted ? 'Rescan Spatial Alignment' : 'Execute Spatial Conflict Scan'}</span>
              </button>
            </div>

            {/* Map Canvas Container */}
            <div className="h-[300px] sm:h-[420px] rounded-xl overflow-hidden border border-slate-300 relative shadow-inner">
              <MapContainer 
                center={[15.4750, 74.9850]} 
                zoom={12} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Proposed Highway Alignment Corridor Polyline */}
                <Polyline 
                  positions={alignmentRoute} 
                  pathOptions={{ 
                    color: scanExecuted ? '#e11d48' : '#2563eb', 
                    weight: 5, 
                    dashArray: '8, 6' 
                  }} 
                />

                {/* 100m Buffer Zone around alignment */}
                <Circle 
                  center={[15.4589, 74.9823]} 
                  radius={1200}
                  pathOptions={{ 
                    color: '#ef4444', 
                    fillColor: '#fee2e2', 
                    fillOpacity: scanExecuted ? 0.35 : 0.1,
                    dashArray: '4, 4'
                  }} 
                />

                {/* Markers for Cadastral Parcels */}
                {initialParcels.map((parcel) => {
                  const isClash = scanExecuted && parcel.ulpin === 'KA-BLR-0982';
                  const markerColor = isClash ? '#dc2626' : parcel.hasObjection ? '#d97706' : '#16a34a';
                  
                  return (
                    <Marker 
                      key={parcel.ulpin} 
                      position={parcel.coordinates}
                      icon={createDivIcon(markerColor, `Sy ${parcel.surveyNumber}`, isClash)}
                      eventHandlers={{
                        click: () => setSelectedParcel(parcel)
                      }}
                    >
                      <Popup>
                        <div className="text-xs space-y-1 font-sans">
                          <p className="font-bold text-slate-900">Survey No. {parcel.surveyNumber} ({parcel.village})</p>
                          <p className="font-mono text-[10px] text-slate-600">ULPIN: {parcel.ulpin}</p>
                          <p className="text-slate-700">Khatedar: <b>{parcel.ownerName}</b></p>
                          <p className="text-slate-700">Area: {parcel.areaHectares} Ha ({parcel.landClassification})</p>
                          {isClash && (
                            <p className="font-bold text-rose-600 text-[11px] pt-1">
                              ⚠️ Protected Eco-Sensitive Zone Clash!
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-300 shadow-md text-[11px] z-[1000] space-y-1">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[9px]">Map Layers</div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-blue-600 inline-block rounded" />
                  <span>Proposed 6-Lane Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span>Clear Cadastral Parcel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
                  <span>Flagged Spatial Conflict</span>
                </div>
              </div>
            </div>

            {/* Spatial Conflict Diagnostic Box */}
            {scanExecuted && (
              <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">
                        CRITICAL CLASH: Bannerghatta / Western Ghats Protected Eco-Sensitive Buffer
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-200 text-rose-900">
                        45m Separation (Min: 100m)
                      </span>
                    </div>
                    <p className="text-rose-900/90 leading-relaxed">
                      Parcel <span className="font-mono font-bold">#KA-BLR-0982 (Survey No. 142/B)</span> directly intersects the mandatory statutory eco-sensitive buffer. Section 11 gazette notification is <b>hard-locked</b> by the RFCTLARR State Machine.
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-rose-800 font-medium text-[11px]">
                        Engineering Mitigation: Realignment Shift chainage 14+200 to 16+800 by 120m Northward.
                      </span>
                      <button
                        onClick={() => alert("Mitigation plan draft generated and forwarded to Survey of India & MoEFCC Desk.")}
                        className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded text-[11px] font-bold"
                      >
                        Forward Realignment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Active Proposals List & Selected Parcel Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Corridor Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activeProject.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {activeProject.name}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {activeProject.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Chainage</span>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{activeProject.chainageKm} km</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Total Land</span>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{activeProject.totalHectares} Ha</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Estimated Cost</span>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">₹{activeProject.estimatedCostCr} Cr</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 uppercase font-bold">CALA Authority</span>
                <p className="font-semibold text-slate-900 text-xs mt-0.5">{activeProject.district}, {activeProject.state}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Active Legal Stage:</span>
              <span className="font-bold text-blue-700">Section 15 Objection Hearings</span>
            </div>
          </div>

          {/* Selected Parcel Inspector */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Cadastral Parcel Inspector</span>
              {selectedParcel && (
                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  ULPIN: {selectedParcel.ulpin}
                </span>
              )}
            </h3>

            {selectedParcel ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Survey No:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedParcel.surveyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khatedar (Owner):</span>
                    <span className="font-semibold text-slate-900">{selectedParcel.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Classification:</span>
                    <span className="font-medium text-slate-800">{selectedParcel.landClassification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Acquired Extent:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedParcel.areaHectares} Ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Computed Award:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      ₹{(selectedParcel.totalAwardCompensation / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-[11px]">
                  <span className="text-slate-600">Field Verification:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p>Click any cadastral marker on the map to scrutinize ownership and valuation parameters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Submit New Proposal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="tricolor-ribbon" />
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Submit New Infrastructure Corridor Proposal
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Project Title & Corridor Nomenclature
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. NH-48 Dharwad Ring Road Bypass"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requiring Agency</label>
                  <select
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium"
                  >
                    <option value="NHAI">National Highways Authority (NHAI)</option>
                    <option value="INDIAN_RAILWAYS">Ministry of Railways (Railway Board)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Chainage (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newChainage}
                    onChange={(e) => setNewChainage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Upload KML / GeoJSON Corridor Alignment File
                </label>
                <div 
                  onClick={() => setKmlFileUploaded(true)}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    kmlFileUploaded 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
                      : 'bg-slate-50 border-slate-300 hover:border-blue-400 text-slate-500'
                  }`}
                >
                  <FileUp className="w-7 h-7 mx-auto mb-2 text-slate-400" />
                  {kmlFileUploaded ? (
                    <div>
                      <p className="font-bold text-xs text-emerald-900">NH48_Dharwad_Final_Alignment.geojson</p>
                      <p className="text-[10px] text-emerald-700 mt-0.5">384 Khasra polygons parsed successfully</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-xs text-slate-700">Click to upload KML/GeoJSON</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Automated screening against Survey of India GIS</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shadow"
                >
                  Submit Proposal to CALA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
