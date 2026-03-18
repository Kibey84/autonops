// ============================================================
// AutonOps Platform — Shared Types
// ============================================================

export type UserRole = 'customer' | 'admin' | 'cfo' | 'operations' | 'leadership';

export interface AuthSession {
  authenticated: boolean;
  userId: string;
  userName: string;
  email: string;
  role: UserRole;
  accountId: string | null;
  accountName: string | null;
}

export interface Account {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  type: string;
  status: 'active' | 'inactive' | 'prospect';
  contractStart: string;
  pricePerSortie: number;
  leadSource?: string;
  notes?: string;
}

export interface Contact {
  id: string;
  accountId: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export type RequestStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'scheduled'
  | 'active'
  | 'completed'
  | 'closed'
  | 'rejected';

export interface MissionRequest {
  id: string;
  displayId: string;
  accountId: string;
  accountName?: string;
  userId: string;
  incidentType: 'fire' | 'sar' | 'law' | 'recon' | 'other';
  location: string;
  lat: number;
  lng: number;
  urgency: 'immediate' | 'scheduled' | 'routine';
  description: string;
  requestedTiming: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type MissionStatus = 'planning' | 'briefed' | 'active' | 'debriefing' | 'completed' | 'closed';

export interface Mission {
  id: string;
  displayId: string;
  requestId?: string;
  accountId: string;
  accountName?: string;
  type: string;
  status: MissionStatus;
  location: string;
  lat: number;
  lng: number;
  commanderId?: string;
  commanderName?: string;
  controllerId?: string;
  controllerName?: string;
  aircraftId?: string;
  aircraftName?: string;
  score: number | null;
  startTime: string | null;
  endTime: string | null;
  aarSummary: string | null;
  createdAt: string;
}

export interface Sortie {
  id: string;
  missionId: string;
  sortieNumber: number;
  status: 'planned' | 'active' | 'completed' | 'aborted';
  waypoints: WaypointData[];
  startTime: string | null;
  endTime: string | null;
  flightHours: number;
}

export interface WaypointData {
  wp: number;
  stage: string;
  lat: number;
  lng: number;
  alt: string;
  objective: string;
  status: 'complete' | 'active' | 'planned';
}

export interface Aircraft {
  id: string;
  displayId: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'maintenance' | 'offline';
  location: string;
  totalFlightHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
  insuranceExpiry?: string;
}

export interface Pilot {
  id: string;
  displayId: string;
  name: string;
  type: 'pilot' | 'controller' | 'commander';
  status: 'available' | 'on_mission' | 'offline';
  location: string;
  certifications: string[];
  totalFlightHours: number;
  certExpiry?: string;
}

export interface Invoice {
  id: string;
  displayId: string;
  accountId: string;
  accountName?: string;
  missionId: string | null;
  missionDisplayId?: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate: string | null;
  lineItems: LineItem[];
  notes?: string;
  createdAt: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Expense {
  id: string;
  missionId: string | null;
  missionDisplayId?: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface Report {
  id: string;
  missionId: string;
  missionDisplayId?: string;
  accountId: string;
  type: 'aar' | 'imagery' | 'data_package' | 'analysis' | 'thermal' | 'video';
  title: string;
  description?: string;
  fileUrl?: string;
  fileSize?: number;
  createdAt: string;
}

export interface Message {
  id: string;
  missionId: string | null;
  requestId: string | null;
  accountId: string;
  userId: string;
  userName: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Admin dashboard aggregates
export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pilotPayouts: number;
  activeMissions: number;
  avgMissionScore: number;
  revenueByMonth: { month: string; revenue: number; expenses: number }[];
}

export interface OperationsSummary {
  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  totalFlightHours: number;
  avgResponseTime: string;
  aircraftUtilization: number;
}
