export type UserRole = 
  | 'requiring_body'
  | 'collector'
  | 'state_gov'
  | 'central_ministry'
  | 'rehabilitation'
  | 'policy_maker'
  | 'citizen';

export interface UserProfile {
  name: string;
  designation: string;
  department: string;
  role: UserRole;
  jurisdiction: string;
  avatarUrl?: string;
  badgeId: string;
}

export type StageKey = 
  | 'sec4_sia' 
  | 'sec11_notice' 
  | 'sec15_hearings' 
  | 'sec19_declaration' 
  | 'sec23_award' 
  | 'sec38_possession';

export interface RFCTLARRStage {
  id: StageKey;
  stepNumber: number;
  label: string;
  statutorySection: string;
  statutoryLimit: string;
  status: 'completed' | 'active' | 'locked' | 'lapsed';
  completionDate?: string;
  mandatoryPrerequisite: string;
  summary: string;
}

export interface GISConflict {
  hasConflict: boolean;
  type: 'ECO_SENSITIVE' | 'FOREST_RESERVE' | 'WATER_BODY' | 'TRIBAL_SCHEDULE_V' | 'NONE';
  zoneName: string;
  distanceMeters: number;
  blockedAction: string;
  clashingParcelUlpin: string;
  remediationAdvice: string;
}

export interface Parcel {
  ulpin: string; // 14-digit standard format
  surveyNumber: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  ownerName: string;
  aadhaarMasked: string;
  areaHectares: number;
  landClassification: 'Dry Agricultural' | 'Wet Irrigated' | 'Commercial' | 'Residential' | 'Barren';
  circleRatePerHa: number;
  baseMarketValue: number;
  solatium100: number; // 100% solatium under RFCTLARR
  interest12: number; // 12% per annum from Sec 4 to Award
  additionalAssetsValue: number;
  totalAwardCompensation: number;
  pfmsStatus: 'PENDING_APPROVAL' | 'PROCESSING' | 'CREDITED' | 'DISPUTED';
  pfmsTransactionId?: string;
  possessionIssued: boolean;
  hasObjection: boolean;
  coordinates: [number, number]; // lat, lng
  polygon?: [number, number][];
  fieldVerified: boolean;
  fieldVerificationNotes?: string;
}

export interface ObjectionRecord {
  id: string;
  ulpin: string;
  surveyNumber: string;
  claimantName: string;
  filingDate: string;
  grounds: 'VALUATION_DISPUTE' | 'BOUNDARY_OVERLAP' | 'TITLE_AMBIGUITY' | 'IRRIGATION_IMPACT' | 'SPECIAL_CROP_LOSS';
  description: string;
  hearingDate: string;
  status: 'SCHEDULED' | 'UNDER_ENQUIRY' | 'RESOLVED_ENHANCED' | 'DISMISSED';
  collectorOrderNo?: string;
  enhancementAmount?: number;
  resolvedDate?: string;
}

export interface ProjectProposal {
  id: string;
  code: string;
  name: string;
  agency: 'NHAI' | 'INDIAN_RAILWAYS' | 'STATE_PWD' | 'DEDICATED_FREIGHT_CORRIDOR';
  state: string;
  district: string;
  chainageKm: number;
  totalParcels: number;
  totalHectares: number;
  notifiedHectares: number;
  acquiredHectares: number;
  estimatedCostCr: number;
  disbursedCr: number;
  status: 'PROPOSAL_DRAFT' | 'SIA_STAGE' | 'NOTIFIED_SEC11' | 'OBJECTIONS_SEC15' | 'DECLARATION_SEC19' | 'AWARD_SEC23' | 'POSSESSION_SEC38';
  activeStage: StageKey;
  gisConflict: GISConflict;
  sec19CountdownDeadline: string; // ISO Date String
  submissionDate: string;
}

export interface PAFRecord {
  id: string;
  headOfFamily: string;
  voterIdMasked: string;
  village: string;
  category: 'SC' | 'ST' | 'OBC' | 'GENERAL' | 'VULNERABLE_BPL';
  familyMembersCount: number;
  isDisplacedPhysically: boolean;
  scheduleII_HousingGrant: {
    eligible: boolean;
    allottedPlot: string;
    grantAmount: number;
    disbursed: boolean;
  };
  scheduleII_RelocationAllowance: {
    eligible: boolean;
    amount: number; // ₹50,000 standard
    disbursed: boolean;
  };
  scheduleII_SubsistenceAssistance: {
    eligible: boolean;
    monthlyAmount: number;
    monthsCompleted: number;
    totalMonths: number; // 12 months standard under Sec 31
  };
  scheduleIII_CivicAmenitiesAssigned: boolean;
  specialSTSafeguardsApplied: boolean;
}

export interface ResettlementColony {
  id: string;
  name: string;
  district: string;
  totalCapacityFamilies: number;
  resettledFamilies: number;
  amenities: {
    potableWaterTaps: number; // percentage
    solarMicroGrid: number;
    primaryHealthCenter: boolean;
    puccaInternalRoads: number;
    drainageNetwork: number;
    communityCenter: boolean;
    primarySchool: boolean;
  };
  overallReadiness: number;
}

export interface DistrictRanking {
  rank: number;
  district: string;
  state: string;
  collectorName: string;
  activeProjects: number;
  avgCycleDays: number;
  sec19LapseRate: number; // percentage
  pfmsVelocityScore: number; // 0-100
  auditRating: 'A+' | 'A' | 'B' | 'C';
}

export interface NationalCorridorSummary {
  id: string;
  corridorName: string;
  leadAgency: string;
  statesTraversed: string[];
  totalLengthKm: number;
  landRequiredHa: number;
  landPossessedHa: number;
  totalCompensationAllocatedCr: number;
  totalPFMSDisbursedCr: number;
  riskStatus: 'CRITICAL_LAPSE_RISK' | 'MODERATE_DELAY' | 'ON_SCHEDULE';
  criticalIssues: string;
}
