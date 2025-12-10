

export enum Role {
  BUILDER = 'BUILDER',
  BROKER = 'BROKER',
  BUYER = 'BUYER'
}

export enum UnitStatus {
  AVAILABLE = 'AVAILABLE',
  BLOCKED = 'BLOCKED',
  BOOKED = 'BOOKED',
  SOLD = 'SOLD'
}

export enum LeadStatus {
  NEW = 'NEW',
  QUALIFIED = 'QUALIFIED',
  VISITING = 'VISITING',
  OFFER = 'OFFER',
  CLOSED = 'CLOSED',
  LOST = 'LOST'
}

export interface Unit {
  id: string;
  projectId: string;
  unitCode: string;
  type: string; // e.g., "3BHK"
  area: number;
  price: number;
  floor: number;
  facing: string;
  status: UnitStatus;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  totalUnits: number;
  availableUnits: number;
  absorptionRate: number; // Percentage
}

export interface Lead {
  id: string;
  name: string;
  phoneHash: string;
  budget: string;
  status: LeadStatus;
  lastActivity: string;
  score: number; // 0-100
  assignedBrokerId?: string;
}

export interface BrokerStats {
  bii: number; // Broker Impact Index
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalEarnings: number;
  activeDeals: number;
  conversionRate: number;
}

export interface BrokerProfile {
  id: string;
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  bii: number;
  specialization: string;
  dealsClosed: number;
  rating: number; // 0-5
  avatarUrl?: string;
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'call' | 'visit' | 'offer' | 'document';
  description: string;
  timestamp: string;
  verified: boolean;
}

export interface AllocationRequest {
  id: string;
  brokerId: string;
  brokerName: string;
  brokerBii: number;
  leadId: string;
  leadName: string;
  projectId: string;
  projectName: string;
  investmentAppetite: number; // In Rupees
  status: 'PENDING' | 'APPROVED' | 'WAITLISTED' | 'REJECTED';
  timestamp: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'CLEARED' | 'PENDING' | 'FAILED';
  referenceId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  brokerId: string;
  name: string;
  bii: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  dealsThisMonth: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  area: string;
}
