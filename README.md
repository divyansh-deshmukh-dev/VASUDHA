# VASUDHA (वसुधा)
### National Land Acquisition & Legal Workflow Engine
**Ministry of Rural Development (MoRD) • Department of Land Resources (DoLR), Government of India**

---

## 🏛️ Executive Summary

**VASUDHA** is a mission-critical, enterprise-grade Civic-Tech & Legal Workflow Engine engineered for the Government of India to govern and accelerate national land acquisition across linear and mega infrastructure corridors (National Highways, Dedicated Freight Corridors, High-Speed Rail, Industrial Corridors, and Energy Pipelines).

Operating under the **Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR Act 2013)**, VASUDHA bridges three previously disconnected government silos:
1. **Spatial Infrastructure Planning** (PM Gati Shakti National Master Plan GIS)
2. **Judicial & Statutory State Enforcement** (Quasi-judicial CALA administration under Sections 11, 15, 19, 23 & 38)
3. **Direct Exchequer Disbursement** (Public Financial Management System - PFMS / NPCI Aadhaar Payment Bridge)

---

## 🛑 The Problem VASUDHA Solves

Over **₹4.2 Lakh Crore** of national infrastructure in India historically suffered from litigations, statutory lapses, and indefinite stays due to three systemic vulnerabilities:

1. **The 12-Month Section 19 Statutory Lapse Trap**:
   Under RFCTLARR Section 19(7), if the final acquisition declaration is not published within exactly 12 months from the preliminary Section 11 notice, **the entire acquisition lapses automatically**. Clerical delays previously wiped out years of field surveys and thousands of crores in public outlay.
2. **Eco-Sensitive & Forest Overlaps (Post-Facto Litigation)**:
   Linear alignments planned on paper without cadastral-level GIS buffering frequently intersected National Parks, Tiger Reserves, or Eco-Sensitive Zones (ESZ), triggering High Court stays and National Green Tribunal (NGT) injunctions *after* Section 11 gazette publication.
3. **Premature Possession & Rural Unrest**:
   Executing agencies taking physical possession of agricultural land before 100% compensation and statutory solatium were credited directly to the khatedar's bank account violated RFCTLARR Section 38, sparking contempt proceedings and landholder protests.

---

## ⚡ Core Architectural Pillars

- **Automated 6-Stage RFCTLARR Legal State Machine**:
  Enforces sequential legal progression:
  $$\text{Sec 4 SIA} \longrightarrow \text{Sec 11 Notice} \longrightarrow \text{Sec 15 Hearings} \longrightarrow \text{Sec 19 Declaration} \longrightarrow \text{Sec 23 Award} \longrightarrow \text{Sec 38 Possession}$$
  A stage cannot be initiated until its statutory prerequisites (Gram Sabha consultation, Expert Group approvals, objection disposals, and PFMS clearances) are cryptographically recorded.
- **Active 12-Month Section 19 Digital Countdown Clock**:
  Real-time countdown timer bound to Section 19(7) with automated red-alert escalation to State Chief Secretaries and the Prime Minister’s Project Monitoring Group (PMG) at 60 days.
- **PM Gati Shakti Spatial Conflict Pre-Screening**:
  Integrates Leaflet GIS to scan highway/railway alignments against cadastral khasra polygons and Ministry of Environment, Forest and Climate Change (MoEFCC) restricted zones, flagging clashing parcels (e.g., `#KA-BLR-0982`) and locking gazette publication until realignments clear statutory buffers.
- **Section 38 PFMS Payment-Locked Physical Possession Gate**:
  Physical land possession certificates cannot be issued until the PFMS Direct Benefit Transfer (DBT) gateway confirms 100% credit into khatedar accounts.
- **Schedule II & III Social Safeguards & Resettlement Colony Tracker**:
  Real-time family-wise ledger for mandatory statutory grants:
  - Housing grants under Schedule II §4 (allotted plots or ₹2.5L construction assistance)
  - ₹50,000 relocation allowances under Schedule II §6
  - 12-Month subsistence assistance under Schedule II §3
  - Schedule III 25 civic amenities tracker (potable water, solar micro-grid, primary health sub-center, pucca roads)
  - Special Schedule V / Section 41/42 protections for ST/SC vulnerable families
- **Bhashini Multilingual AI Voice Integration**:
  Enables rural landowners to track parcel status, view transparent award calculations, and submit geo-tagged crop audit photos in 6 Indian languages (English, Hindi, Kannada, Tamil, Marathi, Bengali).

---

## 👥 Strict Role-Based Access Control (7 Dedicated Workspaces)

VASUDHA implements zero-trust legal isolation. Each stakeholder persona operates within a custom-tailored interface conforming to their exact statutory powers:

| Stakeholder Role | Statutory Anchor | Interface Component | Primary Powers & Capabilities |
|------------------|------------------|---------------------|-------------------------------|
| **1. Land Requiring Body** (NHAI / Indian Railways) | Sections 4 & 7 | `RequiringBodyDashboard.tsx` | • Upload KML / GeoJSON route alignments<br>• Execute PM Gati Shakti spatial clash scans<br>• Real-time clash detection on parcel `#KA-BLR-0982`<br>• Monitor CALA proposal scrutiny velocity |
| **2. District Collector / Acquiring Authority** (CALA) | Sections 11, 15, 19, 23 & 38 | `CollectorDashboard.tsx` | • Preside over 6-stage RFCTLARR state machine<br>• 12-month Section 19 digital countdown clock<br>• Section 15 objection hearing desk & determination orders<br>• First Schedule compensation calculation<br>• Section 38 PFMS possession gate with handover certificate issuance |
| **3. State Government** (Revenue Dept / Chief Sec) | Sections 8 & 19 | `StateGovDashboard.tsx` | • State-wide corridor monitoring across all 31 districts<br>• Cabinet approval queue for Section 19 gazette clearances<br>• District Collector velocity leaderboard with DoLR audit rating<br>• Inter-district boundary dispute resolution |
| **4. Central Ministries** (MoRD, MoRTH, PMO) | Cabinet Committee on Infra | `CentralMinistryDashboard.tsx` | • Macro national KPIs (31,592 Ha required, ₹42,662 Cr DBT disbursed)<br>• PMG Critical-path delay predictor (<60d to lapse)<br>• Multi-corridor velocity matrix (NE-4, WDFC, Purvanchal Spur) |
| **5. Rehabilitation Authority** (R&R Commissionerate) | Schedules II & III | `RehabilitationDashboard.tsx` | • Resettlement Colony civic amenities audit (water, solar, PHC, roads)<br>• Family welfare ledger (housing grants §4, ₹50k relocation §6, subsistence §3)<br>• Special Section 41/42 SC/ST safeguards compliance |
| **6. Policy Makers** (NITI Aayog / DoLR Policy Cell) | Sections 107 & 108 | `PolicyMakerDashboard.tsx` | • Strategic KPIs: National cycle duration (312d), litigation rate (6.8%)<br>• Ready Reckoner circle rates vs. final award inflation curves<br>• Statutory lapse stage bottleneck heatmap<br>• **Interactive Predictive Policy Simulator** (adjust rural multiplier, solatium, SIA thresholds) |
| **7. Citizen & Landowner** (Public User) | Section 11 Charter | `CitizenDashboard.tsx` | • Multilingual vernacular interface (English, Hindi, Kannada, Tamil, Marathi, Bengali)<br>• Bhashini AI voice prompt simulator<br>• 14-digit ULPIN / Aadhaar parcel claim lookup<br>• Transparent compensation breakdown card & PFMS DBT status<br>• Revenue Inspector field verification photo audit |

---

## 📐 Statutory Valuation Mathematics

VASUDHA implements the full **First Schedule** computation formula under RFCTLARR Act 2013:

$$\text{Total Award} = \left( \text{Base Market Value} \times \text{Rural Multiplier Factor} \right) + \text{100\% Solatium} + \text{12\% Statutory Interest} + \text{Attached Assets}$$

### Concrete Sample Calculation (Sample Parcel `#KA-BLR-0982`):
- **Acquired Extent**: 1.45 Hectares (Wet Irrigated)
- **Ready Reckoner / Circle Rate**: ₹45,00,000 / Hectare
- **Base Market Value (Sec 26)**: ₹65,25,000
- **100% Statutory Solatium (Sec 30(1))**: +₹65,25,000
- **12% Per Annum Interest from Sec 4 to Award (Sec 30(3))**: +₹11,74,500
- **Attached Assets (Borewell yield + 45 Horticultural Pomegranate trees)**: +₹6,20,000
- **Total Compensation Disbursed via PFMS**: **₹1,48,44,500**

---

## 🎨 Design System & National Identity

- **Official Tricolor Micro-Ribbon**: Continuous 4px band along the top edge: Saffron (`#ff9933`) $\rightarrow$ Bounded White (`#ffffff`) with central Navy Ashok Chakra mark $\rightarrow$ India Green (`#138808`).
- **Official Brand Mark**: Integrated national VASUDHA emblem with infrastructure & agrarian sustainability insignia.
- **Canvas & Surfaces**: Surgical slate canvas (`#f8fafc` / `bg-slate-50`), crisp white cards (`#ffffff`), hairline borders (`#e2e8f0`), and subtle multi-layered elevation shadows (`shadow-sm`, `shadow-enterprise`).
- **Typography**:
  - UI & Body: *Plus Jakarta Sans* & *Inter*
  - Data & Legal Codes: *JetBrains Mono* (for 14-digit ULPINs, Survey Numbers, Chainage coordinates, and Statutory Timers)
- **Status Colors**: Deep Navy/Cobalt (`#1e40af`), Emerald Green (`#059669`), Saffron/Amber (`#f59e0b`), Crimson/Rose (`#e11d48`).

---

## 📂 Project Directory Structure

```
d:/VASUDHA/
├── public/
│   └── logo.png                          # Official VASUDHA national portal emblem
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx                # Executive workspace topbar with RBAC switcher & notifications
│   │   │   └── AuthModal.tsx             # Parichay SSO / e-Pramaan & Aadhaar OTP Bhashini auth modal
│   │   ├── landing/
│   │   │   └── LandingPage.tsx           # Public overview, Interactive Showcase Frame, RBAC & comparison matrices
│   │   └── dashboards/
│   │       ├── RequiringBodyDashboard.tsx# NHAI/Railways GIS corridor scanner & proposal desk
│   │       ├── CollectorDashboard.tsx    # CALA RFCTLARR state machine, 12M timer, objection desk & PFMS lock
│   │       ├── StateGovDashboard.tsx     # State Cabinet approvals & District Collector leaderboard
│   │       ├── CentralMinistryDashboard.tsx # Pan-India oversight, macro KPIs & delay predictors
│   │       ├── RehabilitationDashboard.tsx # Schedule II & III R&R entitlements & colony audit
│   │       ├── PolicyMakerDashboard.tsx  # Cost curves, delay heatmap & predictive policy simulation sandbox
│   │       └── CitizenDashboard.tsx      # Multilingual Bhashini ULPIN lookup & field audit upload
│   ├── mock/
│   │   └── data.ts                       # Realistic production mock data for NH-48, WDFC & Purvanchal corridors
│   ├── types/
│   │   └── index.ts                      # Strict TypeScript domain entities, stages, parcels & PAFs
│   ├── App.tsx                           # Master view router, authentication state & role manager
│   ├── index.css                         # Tailwind directives, Leaflet overrides & Tricolor ribbon
│   └── main.tsx                          # React 18 DOM mount point
├── index.html                            # Portal HTML shell with preloaded typography & Leaflet styles
├── package.json                          # Dependencies: React 18, Vite, TypeScript, Leaflet, Tailwind
├── tailwind.config.js                    # Custom civic design tokens & font definitions
├── tsconfig.json                         # Strict TypeScript configuration
└── vite.config.ts                        # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (tested on `v22.19.0`)
- **npm**: `v9.0.0` or higher (tested on `v11.6.2`)

### 1. Installation
Clone or navigate to the project directory and install dependencies:
```bash
cd d:\VASUDHA
npm install
```

### 2. Development Server
Start the local development server:
```bash
npm run dev
```
The application will be accessible at:
```
http://localhost:3000
```

### 3. Production Build & Verification
Compile TypeScript and bundle optimized assets using Vite:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Interactive Evaluation Guide

When running a demo or audit evaluation, follow these primary test workflows:

### A. Landing Page Interactive Showcase Frame
1. Open the homepage at `http://localhost:3000`.
2. In the **Kernel State Machine Showcase Frame**, test the 3 interactive action pills:
   - **`[ Test Eco-Clash ]`**: Highlights the Bannerghatta ESZ buffer clash on parcel `#KA-BLR-0982` and locks Section 11 gazette publication.
   - **`[ Trigger 12M Timer ]`**: Demonstrates the live digital countdown clock enforcing Section 19(7).
   - **`[ Unlock Possession ]`**: Toggles the Section 38 statutory gate from *Locked - PFMS Pending* to *Authorized - 100% Paid*.

### B. Strict Authentication Flow
1. Click **"Launch CALA Legal Workbench"** or **"NHAI / Railways GIS Scanner"** on the hero.
2. Notice the **Parichay SSO / e-Pramaan Auth Modal** opens automatically with the designated role pre-selected.
3. Click **"Authenticate & Open Workspace"** to enter the workspace.
4. From within any workspace, use the **`[ Active Workspace: ... ▾ ]`** topbar dropdown to switch instantly between all 7 stakeholder roles.

### C. CALA Legal State Machine Progression
1. Authenticate as **District Collector / CALA**.
2. Scroll to the **Section 15 Objection Hearing Desk**. Notice parcel `#KA-BLR-0982` has a pending valuation claim.
3. Click **`[ Enquire & Mark Hearing Resolved ]`**. Compensation is enhanced by ₹3.5L and Section 19 declaration is **unlocked**.
4. Click **`[ Publish Section 19 Gazette Declaration ]`** to advance the state machine.
5. In the **Section 38 PFMS Rail**, click **`[ Simulate Instant PFMS Clearance ]`**.
6. Click **`[ 🔓 Issue Handover Certificate (Section 38) ]`** to legally transfer physical possession to NHAI.

### D. PM Gati Shakti Spatial Route Scan
1. Switch to the **Land Requiring Body** workspace (NHAI).
2. Click **`[ Execute Spatial Conflict Scan ]`** over the interactive Leaflet map.
3. The GIS engine highlights clashing parcel `#KA-BLR-0982` in red and outputs the engineering realignment recommendation.

### E. Predictive Policy Simulation Sandbox
1. Switch to the **Policy Maker & Legislative Analytics** workspace.
2. Adjust the **Rural Multiplier Factor** (1.0x to 2.5x) or **Solatium Rate** (50% to 150%) sliders.
3. Observe instant real-time recalculations for **Projected National Exchequer Outlay (₹ Cr)**, **Average Acquisition Duration (days)**, and **High Court Stay Probability (%)**.

### F. Citizen & Landowner Vernacular Verification
1. Click **Sign Out** to return to the landing page.
2. Click **"Citizen Parcel Lookup"** to open the Aadhaar OTP verification modal.
3. In the Citizen Portal, switch languages (Kannada, Hindi, English, Tamil, Marathi, Bengali).
4. Click **`[ Play Audio Summary ]`** to test Bhashini AI voice synthesis.
5. Review the transparent First Schedule award ledger and upload a geo-tagged boundary audit photo.

---

## 📜 Compliance & Legal References

- **RFCTLARR Act 2013**: The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (No. 30 of 2013).
- **First Schedule**: Mandatory Solatium (100%), Rural Factors (1.0x - 2.0x), and Statutory Interest (12% p.a.).
- **Second Schedule**: Elements of Rehabilitation and Resettlement (Housing §4, Relocation §6, Subsistence §3).
- **Third Schedule**: Provision of 25 Essential Civic Amenities in Resettlement Colonies.
- **Section 19(7)**: Mandatory 12-month acquisition lapse threshold.
- **Section 38(1)**: Pre-possession full payment requirement.
- **Section 41 & 42**: Special safeguards for Scheduled Castes and Scheduled Tribes.

---

## 🛡️ Security & Privacy
- **Parichay / e-Pramaan SSO**: Enforces government enterprise credential authentication.
- **NPCI Aadhaar Payment Bridge**: Direct-to-beneficiary exchequer payouts with zero intermediary leakage.
- **Role-Based Isolation**: Public users are strictly sandboxed to their own 14-digit ULPIN record with zero access to administrative deliberations.

---

*Developed for the Department of Land Resources (DoLR), Ministry of Rural Development, Government of India.*
