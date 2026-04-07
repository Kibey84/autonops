import type {
  Account, Contact, MissionRequest, Mission, Sortie, Aircraft,
  Pilot, Invoice, Expense, Report, Message, AuditLog,
  FinancialSummary, OperationsSummary,
  MissionChatEntry, MissionEvidence,
} from './types';

// ============================================================
// ACCOUNTS
// ============================================================

export const accounts: Account[] = [
  {
    id: 'acct-001', name: 'Rio Verde Fire Dept', address: '18402 E Rio Verde Dr',
    city: 'Rio Verde', state: 'AZ', zip: '85263', phone: '(480) 555-0198',
    type: 'fire', status: 'active', contractStart: '2024-10-01', pricePerSortie: 1000,
    leadSource: 'Referral', notes: 'First customer. Primary contact: Chief Malone.',
  },
  {
    id: 'acct-002', name: 'Maricopa County Sheriff', address: '550 W Jackson St',
    city: 'Phoenix', state: 'AZ', zip: '85003', phone: '(602) 555-0142',
    type: 'law', status: 'active', contractStart: '2025-01-15', pricePerSortie: 1000,
    leadSource: 'Conference',
  },
  {
    id: 'acct-003', name: 'Scottsdale Fire Dept', address: '8401 E Indian School Rd',
    city: 'Scottsdale', state: 'AZ', zip: '85251', phone: '(480) 555-0300',
    type: 'fire', status: 'prospect', contractStart: '', pricePerSortie: 1000,
    leadSource: 'Website',
  },
];

// ============================================================
// CONTACTS
// ============================================================

export const contacts: Contact[] = [
  { id: 'con-001', accountId: 'acct-001', name: 'Chief Malone', title: 'Fire Chief', phone: '(480) 555-0199', email: 'malone@rioverdefd.gov', isPrimary: true },
  { id: 'con-002', accountId: 'acct-001', name: 'Capt. Harris', title: 'Station Captain', phone: '(480) 555-0192', email: 'harris@rioverdefd.gov', isPrimary: false },
  { id: 'con-003', accountId: 'acct-001', name: 'Lt. Nguyen', title: 'Drone Liaison', phone: '(480) 555-0194', email: 'nguyen@rioverdefd.gov', isPrimary: false },
  { id: 'con-004', accountId: 'acct-002', name: 'Sgt. Williams', title: 'Tactical Lead', phone: '(602) 555-0143', email: 'williams@mcso.gov', isPrimary: true },
  { id: 'con-005', accountId: 'acct-003', name: 'Chief Torres', title: 'Fire Chief', phone: '(480) 555-0301', email: 'torres@scottsdalefd.gov', isPrimary: true },
];

// ============================================================
// REQUESTS
// ============================================================

export const requests: MissionRequest[] = [
  {
    id: 'req-001', displayId: 'REQ-2025-0001', accountId: 'acct-001', accountName: 'Rio Verde FD',
    userId: 'usr-001', incidentType: 'fire', location: 'Rio Verde, AZ',
    lat: 33.5000, lng: -111.8100, urgency: 'immediate',
    description: 'Brush fire reported near E Rio Verde Dr. Smoke visible from Station 1. Request aerial assessment.',
    requestedTiming: 'Immediate', status: 'active',
    createdAt: '2025-03-16T14:28:00Z', updatedAt: '2025-03-16T14:30:00Z',
  },
  {
    id: 'req-002', displayId: 'REQ-2025-0002', accountId: 'acct-001', accountName: 'Rio Verde FD',
    userId: 'usr-001', incidentType: 'recon', location: 'Rio Verde, AZ',
    lat: 33.54, lng: -111.87, urgency: 'scheduled',
    description: 'Post-fire perimeter check on last week\'s burn area. Need thermal sweep.',
    requestedTiming: 'Within 48 hours', status: 'submitted',
    createdAt: '2025-03-17T09:15:00Z', updatedAt: '2025-03-17T09:15:00Z',
  },
  {
    id: 'req-003', displayId: 'REQ-2024-0003', accountId: 'acct-001', accountName: 'Rio Verde FD',
    userId: 'usr-001', incidentType: 'sar', location: 'Rio Verde, AZ',
    lat: 33.51, lng: -111.82, urgency: 'immediate',
    description: 'Missing hiker in desert terrain east of town.',
    requestedTiming: 'Immediate', status: 'completed',
    createdAt: '2024-12-03T08:00:00Z', updatedAt: '2024-12-03T16:30:00Z',
  },
  {
    id: 'req-004', displayId: 'REQ-2024-0004', accountId: 'acct-002', accountName: 'Maricopa County Sheriff',
    userId: 'usr-002', incidentType: 'law', location: 'Phoenix, AZ',
    lat: 33.45, lng: -112.07, urgency: 'scheduled',
    description: 'Perimeter surveillance for ongoing tactical operation.',
    requestedTiming: 'Dec 15 0600', status: 'completed',
    createdAt: '2024-12-14T10:00:00Z', updatedAt: '2024-12-15T18:00:00Z',
  },
];

// ============================================================
// MISSIONS
// ============================================================

export const missions: Mission[] = [
  {
    id: 'msn-001', displayId: 'MSN-2025-0001', requestId: 'req-001', accountId: 'acct-001',
    accountName: 'Rio Verde FD', type: 'Fire', status: 'active',
    location: 'Rio Verde, AZ', lat: 33.5000, lng: -111.8100,
    commanderId: 'plt-003', commanderName: 'Jaderic D.',
    controllerId: 'plt-001', controllerName: 'Jared K.',
    aircraftId: 'ac-001', aircraftName: 'Blackfly-01',
    score: null, startTime: '2025-03-16T14:30:00Z', endTime: null,
    aarSummary: null, createdAt: '2025-03-16T14:28:00Z',
    cmdrId: 'usr-001',
    dailyRoomUrl: 'https://autonops.daily.co/msn-2025-0001',
    aarReport: null,
  },
  {
    id: 'msn-002', displayId: 'MSN-2024-0004', requestId: 'req-003', accountId: 'acct-001',
    accountName: 'Rio Verde FD', type: 'SAR', status: 'completed',
    location: 'Rio Verde, AZ', lat: 33.51, lng: -111.82,
    commanderId: 'plt-003', commanderName: 'Jaderic D.',
    controllerId: 'plt-002', controllerName: 'Josh T.',
    aircraftId: 'ac-001', aircraftName: 'Blackfly-01',
    score: 91, startTime: '2024-12-03T08:20:00Z', endTime: '2024-12-03T10:45:00Z',
    aarSummary: 'Search and rescue operation in desert terrain east of Rio Verde. Thermal imaging located missing hiker within 22 minutes of aircraft deployment. Coordinates relayed to ground teams who completed extraction. Mission scored highly for response time and AI accuracy.',
    createdAt: '2024-12-03T08:00:00Z',
  },
  {
    id: 'msn-003', displayId: 'MSN-2024-0003', accountId: 'acct-001',
    accountName: 'Rio Verde FD', type: 'Fire', status: 'completed',
    location: 'Rio Verde, AZ', lat: 33.49, lng: -111.80,
    commanderId: 'plt-003', commanderName: 'Jaderic D.',
    controllerId: 'plt-001', controllerName: 'Jared K.',
    aircraftId: 'ac-001', aircraftName: 'Blackfly-01',
    score: 87, startTime: '2024-11-14T15:00:00Z', endTime: '2024-11-14T17:30:00Z',
    aarSummary: 'Fire response mission in the Rio Verde brush fire zone. Aircraft deployed within 6 minutes of dispatch. Thermal imaging identified active fire line and 3 hotspots. One heat signature flagged — determined to be livestock. After-action report delivered same day.',
    createdAt: '2024-11-14T14:45:00Z',
  },
  {
    id: 'msn-004', displayId: 'MSN-2024-0002', requestId: 'req-004', accountId: 'acct-002',
    accountName: 'Maricopa County Sheriff', type: 'Law', status: 'completed',
    location: 'Phoenix, AZ', lat: 33.45, lng: -112.07,
    commanderId: 'plt-004', commanderName: 'Matt S.',
    controllerId: 'plt-001', controllerName: 'Jared K.',
    aircraftId: 'ac-002', aircraftName: 'Blackfly-02',
    score: 78, startTime: '2024-12-15T06:10:00Z', endTime: '2024-12-15T09:00:00Z',
    aarSummary: 'Law enforcement aerial support for MCSO perimeter surveillance. Single sortie at 1,000ft AGL. EO camera provided effective overwatch. Lower score attributed to limited thermal effectiveness in urban heat environment.',
    createdAt: '2024-12-15T06:00:00Z',
  },
];

// ============================================================
// AIRCRAFT
// ============================================================

export const aircraft: Aircraft[] = [
  { id: 'ac-001', displayId: 'AC-001', name: 'Blackfly-01', type: 'vtol', status: 'active', location: 'Rio Verde Staging', totalFlightHours: 142, lastMaintenance: '2025-02-28', nextMaintenance: '2025-04-28', insuranceExpiry: '2025-12-31' },
  { id: 'ac-002', displayId: 'AC-002', name: 'Blackfly-02', type: 'vtol', status: 'standby', location: 'Sinclair CC', totalFlightHours: 87, lastMaintenance: '2025-01-15', nextMaintenance: '2025-04-15', insuranceExpiry: '2025-12-31' },
];

// ============================================================
// PILOTS
// ============================================================

export const pilots: Pilot[] = [
  { id: 'plt-001', displayId: 'PLT-001', name: 'Jared K.', type: 'pilot', status: 'on_mission', location: 'In Flight', certifications: ['Part 107', 'Blackfly Type'], totalFlightHours: 320, certExpiry: '2026-06-15' },
  { id: 'plt-002', displayId: 'PLT-002', name: 'Josh T.', type: 'pilot', status: 'available', location: 'Springboro, OH', certifications: ['Part 107'], totalFlightHours: 180, certExpiry: '2026-03-01' },
  { id: 'plt-003', displayId: 'CTR-001', name: 'Jaderic D.', type: 'controller', status: 'on_mission', location: 'Remote', certifications: ['Part 107', 'Mission Controller'], totalFlightHours: 275, certExpiry: '2026-08-20' },
  { id: 'plt-004', displayId: 'CTR-002', name: 'Matt S.', type: 'controller', status: 'available', location: 'Remote', certifications: ['Part 107', 'Mission Controller'], totalFlightHours: 150, certExpiry: '2026-04-10' },
];

// ============================================================
// INVOICES
// ============================================================

export const invoices: Invoice[] = [
  {
    id: 'inv-001', displayId: 'INV-2025-0001', accountId: 'acct-001', accountName: 'Rio Verde FD',
    missionId: 'msn-001', missionDisplayId: 'MSN-2025-0001', amount: 1000,
    status: 'draft', dueDate: '2025-04-15', paidDate: null,
    lineItems: [{ description: 'Fire response sortie — Rio Verde', quantity: 1, unitPrice: 1000, total: 1000 }],
    createdAt: '2025-03-16T14:30:00Z',
  },
  {
    id: 'inv-002', displayId: 'INV-2024-0002', accountId: 'acct-001', accountName: 'Rio Verde FD',
    missionId: 'msn-002', missionDisplayId: 'MSN-2024-0004', amount: 1000,
    status: 'paid', dueDate: '2025-01-03', paidDate: '2024-12-28',
    lineItems: [{ description: 'SAR sortie — Rio Verde', quantity: 1, unitPrice: 1000, total: 1000 }],
    createdAt: '2024-12-03T16:30:00Z',
  },
  {
    id: 'inv-003', displayId: 'INV-2024-0001', accountId: 'acct-001', accountName: 'Rio Verde FD',
    missionId: 'msn-003', missionDisplayId: 'MSN-2024-0003', amount: 1000,
    status: 'paid', dueDate: '2024-12-14', paidDate: '2024-12-10',
    lineItems: [{ description: 'Fire response sortie — Rio Verde', quantity: 1, unitPrice: 1000, total: 1000 }],
    createdAt: '2024-11-14T17:30:00Z',
  },
  {
    id: 'inv-004', displayId: 'INV-2024-0003', accountId: 'acct-002', accountName: 'Maricopa County Sheriff',
    missionId: 'msn-004', missionDisplayId: 'MSN-2024-0002', amount: 1000,
    status: 'paid', dueDate: '2025-01-15', paidDate: '2025-01-10',
    lineItems: [{ description: 'Law enforcement sortie — Phoenix', quantity: 1, unitPrice: 1000, total: 1000 }],
    createdAt: '2024-12-15T09:00:00Z',
  },
];

// ============================================================
// EXPENSES
// ============================================================

export const expenses: Expense[] = [
  { id: 'exp-001', missionId: 'msn-001', missionDisplayId: 'MSN-2025-0001', category: 'pilot_payout', description: 'Pilot payout — Jared K.', amount: 250, date: '2025-03-16' },
  { id: 'exp-002', missionId: 'msn-001', missionDisplayId: 'MSN-2025-0001', category: 'fuel', description: 'Battery charge cycle', amount: 35, date: '2025-03-16' },
  { id: 'exp-003', missionId: 'msn-002', missionDisplayId: 'MSN-2024-0004', category: 'pilot_payout', description: 'Pilot payout — Josh T.', amount: 250, date: '2024-12-03' },
  { id: 'exp-004', missionId: 'msn-003', missionDisplayId: 'MSN-2024-0003', category: 'pilot_payout', description: 'Pilot payout — Jared K.', amount: 250, date: '2024-11-14' },
  { id: 'exp-005', missionId: 'msn-004', missionDisplayId: 'MSN-2024-0002', category: 'pilot_payout', description: 'Pilot payout — Jared K.', amount: 250, date: '2024-12-15' },
  { id: 'exp-006', missionId: null, category: 'insurance', description: 'Aircraft liability insurance — Q1 2025', amount: 2400, date: '2025-01-01' },
  { id: 'exp-007', missionId: null, category: 'software', description: 'Supabase Pro plan', amount: 25, date: '2025-03-01' },
  { id: 'exp-008', missionId: null, category: 'equipment', description: 'Replacement propeller set — AC-001', amount: 180, date: '2025-02-20' },
  { id: 'exp-009', missionId: null, category: 'maintenance', description: 'Blackfly-01 scheduled maintenance', amount: 450, date: '2025-02-28' },
];

// ============================================================
// REPORTS / DELIVERABLES
// ============================================================

export const reports: Report[] = [
  { id: 'rpt-001', missionId: 'msn-002', missionDisplayId: 'MSN-2024-0004', accountId: 'acct-001', type: 'aar', title: 'After-Action Report — SAR Dec 03', description: 'Full mission AAR including AI analysis, timeline, and recommendations.', createdAt: '2024-12-03T17:00:00Z' },
  { id: 'rpt-002', missionId: 'msn-002', missionDisplayId: 'MSN-2024-0004', accountId: 'acct-001', type: 'thermal', title: 'Thermal Imagery Package', description: 'Geo-tagged thermal images from search grid.', fileSize: 45000000, createdAt: '2024-12-03T17:15:00Z' },
  { id: 'rpt-003', missionId: 'msn-003', missionDisplayId: 'MSN-2024-0003', accountId: 'acct-001', type: 'aar', title: 'After-Action Report — Fire Nov 14', description: 'Full mission AAR with fire line analysis and hotspot map.', createdAt: '2024-11-14T18:00:00Z' },
  { id: 'rpt-004', missionId: 'msn-003', missionDisplayId: 'MSN-2024-0003', accountId: 'acct-001', type: 'imagery', title: 'EO/RGB Imagery Package', description: 'High-resolution aerial photos of burn area.', fileSize: 120000000, createdAt: '2024-11-14T18:15:00Z' },
  { id: 'rpt-005', missionId: 'msn-004', missionDisplayId: 'MSN-2024-0002', accountId: 'acct-002', type: 'aar', title: 'After-Action Report — Law Dec 15', description: 'Surveillance mission AAR.', createdAt: '2024-12-15T10:00:00Z' },
  { id: 'rpt-006', missionId: 'msn-004', missionDisplayId: 'MSN-2024-0002', accountId: 'acct-002', type: 'video', title: 'EO Video Recording', description: 'Full sortie video recording from EO camera.', fileSize: 850000000, createdAt: '2024-12-15T10:30:00Z' },
];

// ============================================================
// MESSAGES
// ============================================================

export const messages: Message[] = [
  { id: 'msg-001', missionId: null, requestId: 'req-001', accountId: 'acct-001', userId: 'usr-001', userName: 'Chief Malone', content: 'We have smoke visible from Station 1. Requesting immediate aerial assessment.', isInternal: false, createdAt: '2025-03-16T14:28:00Z' },
  { id: 'msg-002', missionId: null, requestId: 'req-001', accountId: 'acct-001', userId: 'usr-admin-001', userName: 'Bob Lee', content: 'Request received. Mission auto-generated. Blackfly-01 launching from staging. ETE 4 minutes.', isInternal: false, createdAt: '2025-03-16T14:29:00Z' },
  { id: 'msg-003', missionId: 'msn-001', requestId: 'req-001', accountId: 'acct-001', userId: 'usr-admin-001', userName: 'Bob Lee', content: 'Dual feeds are live. You should have video on your devices now.', isInternal: false, createdAt: '2025-03-16T14:35:00Z' },
  { id: 'msg-004', missionId: 'msn-001', requestId: 'req-001', accountId: 'acct-001', userId: 'usr-001', userName: 'Chief Malone', content: 'Confirmed, we see both feeds. Thermal shows hot spots north of the road.', isInternal: false, createdAt: '2025-03-16T14:36:00Z' },
  { id: 'msg-005', missionId: 'msn-001', requestId: null, accountId: 'acct-001', userId: 'usr-admin-001', userName: 'Bob Lee', content: 'Internal: pilot reports slight wind shift. Updating flight path. Do not relay to customer yet.', isInternal: true, createdAt: '2025-03-16T14:37:00Z' },
  { id: 'msg-006', missionId: null, requestId: 'req-002', accountId: 'acct-001', userId: 'usr-001', userName: 'Chief Malone', content: 'Need a recon pass over last week\'s burn area. Thermal sweep to confirm no remaining hotspots.', isInternal: false, createdAt: '2025-03-17T09:15:00Z' },
];

// ============================================================
// MISSION CHAT (realtime comms log)
// ============================================================

export const missionChat: MissionChatEntry[] = [
  { id: 'mc-001', missionId: 'msn-001', userId: null, userName: 'SYSTEM', role: 'system', message: 'Mission MSN-2025-0001 initiated. Aircraft Blackfly assigned.', createdAt: '2025-03-16T14:30:00Z' },
  { id: 'mc-002', missionId: 'msn-001', userId: 'plt-003', userName: 'Jaderic D.', role: 'commander', message: 'Demo-1, clear for departure. Winds 270 at 12.', createdAt: '2025-03-16T14:31:00Z' },
  { id: 'mc-003', missionId: 'msn-001', userId: 'plt-001', userName: 'Jared K.', role: 'operator', message: 'Copy. Demo-1 rolling, runway 24.', createdAt: '2025-03-16T14:31:22Z' },
  { id: 'mc-004', missionId: 'msn-001', userId: null, userName: 'SYSTEM', role: 'system', message: 'Sortie 1 launched. Climbing to 1200ft.', createdAt: '2025-03-16T14:31:45Z' },
  { id: 'mc-005', missionId: 'msn-001', userId: 'usr-001', userName: 'Chief Malone', role: 'observer', message: 'Eyes on smoke from Station 1. Need ETE to fire zone.', createdAt: '2025-03-16T14:32:10Z' },
  { id: 'mc-006', missionId: 'msn-001', userId: 'plt-003', userName: 'Jaderic D.', role: 'commander', message: 'ETE 4 minutes. Dual feed live on your devices shortly.', createdAt: '2025-03-16T14:32:13Z' },
  { id: 'mc-007', missionId: 'msn-001', userId: null, userName: 'SYSTEM', role: 'system', message: 'Waypoint 3 (Transit) reached.', createdAt: '2025-03-16T14:33:00Z' },
];

// ============================================================
// MISSION EVIDENCE (capture moments)
// ============================================================

export const missionEvidence: MissionEvidence[] = [
  { id: 'ev-001', missionId: 'msn-001', createdBy: 'plt-003', createdByName: 'Jaderic D.', label: 'Initial fire line capture', notes: 'EO frame at WP3 transit. Smoke plume bearing 045°.', capturedAt: '2025-03-16T14:32:30Z' },
  { id: 'ev-002', missionId: 'msn-001', createdBy: 'plt-003', createdByName: 'Jaderic D.', label: 'Hotspot A — IR confirmation', notes: 'Thermal capture of primary hotspot, 847°F surface temp. AI flagged as priority target.', capturedAt: '2025-03-16T14:34:15Z' },
  { id: 'ev-003', missionId: 'msn-001', createdBy: 'usr-001', createdByName: 'Chief Malone', label: 'Structure in fire path', notes: 'Ranch property visible 0.4nm SW of fire front. Coordinated with ground team.', capturedAt: '2025-03-16T14:36:00Z' },
];

// ============================================================
// AUDIT LOGS
// ============================================================

export const auditLogs: AuditLog[] = [
  { id: 'aud-001', userId: 'usr-001', userName: 'Chief Malone', action: 'request_created', entityType: 'request', entityId: 'req-001', createdAt: '2025-03-16T14:28:00Z' },
  { id: 'aud-002', userId: 'usr-admin-001', userName: 'Bob Lee', action: 'mission_created', entityType: 'mission', entityId: 'msn-001', createdAt: '2025-03-16T14:28:30Z' },
  { id: 'aud-003', userId: 'usr-admin-001', userName: 'Bob Lee', action: 'request_status_changed', entityType: 'request', entityId: 'req-001', metadata: { from: 'submitted', to: 'active' }, createdAt: '2025-03-16T14:30:00Z' },
  { id: 'aud-004', userId: 'usr-admin-001', userName: 'Bob Lee', action: 'aircraft_dispatched', entityType: 'aircraft', entityId: 'ac-001', createdAt: '2025-03-16T14:30:00Z' },
  { id: 'aud-005', userId: 'usr-001', userName: 'Chief Malone', action: 'request_created', entityType: 'request', entityId: 'req-002', createdAt: '2025-03-17T09:15:00Z' },
];

// ============================================================
// AGGREGATES (for admin dashboards)
// ============================================================

export function getFinancialSummary(): FinancialSummary {
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'draft' || i.status === 'sent').reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const pilotPayouts = expenses.filter(e => e.category === 'pilot_payout').reduce((s, e) => s + e.amount, 0);
  const completedMissions = missions.filter(m => m.score !== null);
  const avgScore = completedMissions.length > 0
    ? Math.round(completedMissions.reduce((s, m) => s + (m.score ?? 0), 0) / completedMissions.length)
    : 0;

  return {
    totalRevenue: totalRevenue + pendingRevenue,
    totalExpenses,
    netProfit: totalRevenue - totalExpenses,
    pilotPayouts,
    activeMissions: missions.filter(m => m.status === 'active').length,
    avgMissionScore: avgScore,
    revenueByMonth: [
      { month: 'Nov 2024', revenue: 1000, expenses: 285 },
      { month: 'Dec 2024', revenue: 2000, expenses: 535 },
      { month: 'Jan 2025', revenue: 0, expenses: 2400 },
      { month: 'Feb 2025', revenue: 0, expenses: 655 },
      { month: 'Mar 2025', revenue: 1000, expenses: 310 },
    ],
  };
}

export function getOperationsSummary(): OperationsSummary {
  return {
    totalMissions: missions.length,
    activeMissions: missions.filter(m => m.status === 'active').length,
    completedMissions: missions.filter(m => m.status === 'completed').length,
    totalFlightHours: pilots.reduce((s, p) => s + p.totalFlightHours, 0),
    avgResponseTime: '5.2 min',
    aircraftUtilization: 68,
  };
}

// ============================================================
// DATA ACCESS HELPERS (scoped by account for customers)
// ============================================================

export function getMissionsForAccount(accountId: string): Mission[] {
  return missions.filter(m => m.accountId === accountId);
}

export function getRequestsForAccount(accountId: string): MissionRequest[] {
  return requests.filter(r => r.accountId === accountId);
}

export function getInvoicesForAccount(accountId: string): Invoice[] {
  return invoices.filter(i => i.accountId === accountId);
}

export function getReportsForAccount(accountId: string): Report[] {
  return reports.filter(r => r.accountId === accountId);
}

export function getMessagesForAccount(accountId: string, includeInternal: boolean): Message[] {
  return messages
    .filter(m => m.accountId === accountId && (includeInternal || !m.isInternal))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function getContactsForAccount(accountId: string): Contact[] {
  return contacts.filter(c => c.accountId === accountId);
}

// ─── Mission command helpers ────────────────────────────────

export function getActiveMissionForAccount(accountId: string): Mission | undefined {
  return missions.find(m => m.accountId === accountId && m.status === 'active');
}

export function getChatForMission(missionId: string): MissionChatEntry[] {
  return missionChat
    .filter(c => c.missionId === missionId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function getEvidenceForMission(missionId: string): MissionEvidence[] {
  return missionEvidence
    .filter(e => e.missionId === missionId)
    .sort((a, b) => new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime());
}

/**
 * Derive the user's role within a specific mission.
 * commander → user is the cmdr_id (or commanderId for legacy demo)
 * operator  → user is the controllerId (assigned operator)
 * observer  → everything else (read-only)
 */
export function deriveMissionRole(
  userId: string,
  mission: Mission
): 'commander' | 'operator' | 'observer' {
  if (mission.cmdrId === userId || mission.commanderId === userId) return 'commander';
  if (mission.controllerId === userId) return 'operator';
  return 'observer';
}
