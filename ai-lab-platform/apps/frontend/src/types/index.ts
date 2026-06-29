export type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Decision = 'AGREE' | 'PARTIALLY_AGREE' | 'DISAGREE';
export type DoctorLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EXPERT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  specialty?: string;
  reputationScore: number;
  level: DoctorLevel;
  verified: boolean;
  createdAt: string;
}

export interface Marker {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: 'normal' | 'low' | 'high';
}

export interface DoctorReviewSummary {
  id: string;
  decision: Decision;
  notes?: string;
  reasonCode?: string;
  createdAt: string;
  doctor?: { name: string; specialty?: string; level: string };
}

export interface LabResult {
  id: string;
  patientId?: string;
  fileName: string;
  markers: Marker[];
  aiSummary: string;
  flags: string[];
  riskLevel: RiskLevel;
  reviewRequested: boolean;
  createdAt: string;
  reviews?: DoctorReviewSummary[];
}

export interface Reputation {
  name: string;
  specialty?: string;
  reputationScore: number;
  level: DoctorLevel;
  reviewCount: number;
  nextLevel?: { level: string; pointsNeeded: number } | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}
