import React, { useState } from 'react';
import { 
  UserRole, 
  UserProfile, 
  ProjectProposal, 
  Parcel, 
  ObjectionRecord, 
  PAFRecord, 
  ResettlementColony, 
  DistrictRanking, 
  NationalCorridorSummary, 
  RFCTLARRStage 
} from './types';
import { 
  MOCK_USERS, 
  MOCK_PROJECTS, 
  MOCK_PARCELS, 
  MOCK_OBJECTIONS, 
  MOCK_PAFS, 
  MOCK_COLONY, 
  MOCK_DISTRICT_RANKINGS, 
  MOCK_NATIONAL_CORRIDORS, 
  INITIAL_STAGES 
} from './mock/data';
import { Header } from './components/common/Header';
import { AuthModal } from './components/common/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { RequiringBodyDashboard } from './components/dashboards/RequiringBodyDashboard';
import { CollectorDashboard } from './components/dashboards/CollectorDashboard';
import { StateGovDashboard } from './components/dashboards/StateGovDashboard';
import { CentralMinistryDashboard } from './components/dashboards/CentralMinistryDashboard';
import { RehabilitationDashboard } from './components/dashboards/RehabilitationDashboard';
import { PolicyMakerDashboard } from './components/dashboards/PolicyMakerDashboard';
import { CitizenDashboard } from './components/dashboards/CitizenDashboard';

export const App: React.FC = () => {
  // Global View & RBAC state (default to landing page)
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeRole, setActiveRole] = useState<UserRole>('collector');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'officer' | 'citizen'>('officer');
  const [targetAuthRole, setTargetAuthRole] = useState<UserRole>('collector');

  // Shared state records
  const [projects] = useState<ProjectProposal[]>(MOCK_PROJECTS);
  const [parcels] = useState<Parcel[]>(MOCK_PARCELS);
  const [objections] = useState<ObjectionRecord[]>(MOCK_OBJECTIONS);
  const [pafs] = useState<PAFRecord[]>(MOCK_PAFS);
  const [colony] = useState<ResettlementColony>(MOCK_COLONY);
  const [districtRankings] = useState<DistrictRanking[]>(MOCK_DISTRICT_RANKINGS);
  const [corridors] = useState<NationalCorridorSummary[]>(MOCK_NATIONAL_CORRIDORS);
  const [stages] = useState<RFCTLARRStage[]>(INITIAL_STAGES);

  const currentUser: UserProfile = MOCK_USERS[activeRole] || MOCK_USERS.collector;

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    setView('dashboard');
  };

  // Open authentication modal with specific tab and role pre-selected
  const handleOpenAuth = (tab: 'officer' | 'citizen' = 'officer', role?: UserRole) => {
    setAuthModalTab(tab);
    if (role) {
      setTargetAuthRole(role);
    } else if (tab === 'citizen') {
      setTargetAuthRole('citizen');
    }
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setActiveRole(role);
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
  };

  const handleOpenLanding = () => {
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Executive Workspace Header with Tricolor Ribbon, Breadcrumb & Live RBAC Switcher (Dashboard view only) */}
      {view === 'dashboard' && (
        <Header 
          activeRole={activeRole}
          user={currentUser}
          onRoleChange={handleRoleChange}
          onLogout={handleLogout}
          onOpenLanding={handleOpenLanding}
          view={view}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {view === 'landing' ? (
          <LandingPage 
            onOpenAuth={handleOpenAuth}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            {/* Dynamic Dashboard based on Active Role */}
            {activeRole === 'requiring_body' && (
              <RequiringBodyDashboard 
                user={currentUser}
                projects={projects}
                parcels={parcels}
              />
            )}

            {activeRole === 'collector' && (
              <CollectorDashboard 
                user={currentUser}
                project={projects[0]}
                parcels={parcels}
                objections={objections}
                stages={stages}
              />
            )}

            {activeRole === 'state_gov' && (
              <StateGovDashboard 
                user={currentUser}
                districtRankings={districtRankings}
              />
            )}

            {activeRole === 'central_ministry' && (
              <CentralMinistryDashboard 
                user={currentUser}
                corridors={corridors}
              />
            )}

            {activeRole === 'rehabilitation' && (
              <RehabilitationDashboard 
                user={currentUser}
                pafs={pafs}
                colony={colony}
              />
            )}

            {activeRole === 'policy_maker' && (
              <PolicyMakerDashboard 
                user={currentUser}
              />
            )}

            {activeRole === 'citizen' && (
              <CitizenDashboard 
                user={currentUser}
                parcels={parcels}
              />
            )}
          </div>
        )}
      </main>

      {/* Unified Authentication Modal (Parichay SSO & Aadhaar OTP) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialTab={authModalTab}
        initialRole={targetAuthRole}
      />
    </div>
  );
};
