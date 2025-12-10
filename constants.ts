
import { Lead, LeadStatus, Project, Role, Unit, UnitStatus, BrokerStats, Activity, BrokerProfile, AllocationRequest } from './types';

export const APP_NAME = "WeBroker";

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Skyline Heights',
    location: 'Downtown, Tech Park',
    totalUnits: 120,
    availableUnits: 45,
    absorptionRate: 62
  },
  {
    id: 'p2',
    name: 'Green Valley Villas',
    location: 'North Suburbs',
    totalUnits: 50,
    availableUnits: 12,
    absorptionRate: 76
  }
];

export const MOCK_UNITS: Unit[] = [
  { id: 'u1', projectId: 'p1', unitCode: 'A-101', type: '3BHK', area: 1850, price: 15000000, floor: 1, facing: 'East', status: UnitStatus.AVAILABLE },
  { id: 'u2', projectId: 'p1', unitCode: 'A-102', type: '3BHK', area: 1850, price: 15200000, floor: 1, facing: 'North', status: UnitStatus.BOOKED },
  { id: 'u3', projectId: 'p1', unitCode: 'B-505', type: '2BHK', area: 1250, price: 9500000, floor: 5, facing: 'West', status: UnitStatus.AVAILABLE },
  { id: 'u4', projectId: 'p2', unitCode: 'V-12', type: 'Villa', area: 3200, price: 45000000, floor: 0, facing: 'East', status: UnitStatus.AVAILABLE },
  { id: 'u5', projectId: 'p2', unitCode: 'V-14', type: 'Villa', area: 3500, price: 48000000, floor: 0, facing: 'South', status: UnitStatus.SOLD },
];

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'Rohan Gupta', phoneHash: '##29A', budget: '1.5Cr - 1.8Cr', status: LeadStatus.VISITING, lastActivity: 'Site visit confirmed', score: 85 },
  { id: 'l2', name: 'Sarah Jenkins', phoneHash: '##88B', budget: '90L - 1.1Cr', status: LeadStatus.NEW, lastActivity: 'Inquired via Website', score: 45 },
  { id: 'l3', name: 'Amit Patel', phoneHash: '##11C', budget: '2Cr+', status: LeadStatus.OFFER, lastActivity: 'Offer submitted for V-12', score: 92 },
  { id: 'l4', name: 'Priya Sharma', phoneHash: '##44D', budget: '1.2Cr', status: LeadStatus.QUALIFIED, lastActivity: 'Docs received', score: 68 },
];

export const MOCK_BROKER_STATS: BrokerStats = {
  bii: 78,
  tier: 'Gold',
  totalEarnings: 450000,
  activeDeals: 4,
  conversionRate: 12.5
};

export const MOCK_BROKERS: BrokerProfile[] = [
  { id: 'b1', name: 'Rahul Verma', tier: 'Platinum', bii: 92, specialization: 'Luxury Villas', dealsClosed: 142, rating: 4.9 },
  { id: 'b2', name: 'Sneha Kapoor', tier: 'Gold', bii: 84, specialization: 'Downtown Apts', dealsClosed: 89, rating: 4.8 },
  { id: 'b3', name: 'Vikram Singh', tier: 'Silver', bii: 68, specialization: 'First-time Buys', dealsClosed: 45, rating: 4.6 },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', leadId: 'l1', type: 'visit', description: 'Completed site visit at Skyline Heights', timestamp: '2h ago', verified: true },
  { id: 'a2', leadId: 'l3', type: 'offer', description: 'Submitted offer of 4.4Cr for V-12', timestamp: '1d ago', verified: true },
  { id: 'a3', leadId: 'l2', type: 'call', description: 'Outbound call - Interested in 2BHK', timestamp: '2d ago', verified: false },
];

export const ABSORPTION_DATA = [
  { name: 'Jan', velocity: 4 },
  { name: 'Feb', velocity: 6 },
  { name: 'Mar', velocity: 9 },
  { name: 'Apr', velocity: 14 },
  { name: 'May', velocity: 12 },
  { name: 'Jun', velocity: 18 },
];

export const MOCK_ALLOCATIONS: AllocationRequest[] = [
  { 
    id: 'req1', 
    brokerId: 'b1', 
    brokerName: 'Rahul Verma', 
    brokerBii: 92,
    leadId: 'l3', 
    leadName: 'Amit Patel', 
    projectId: 'p2', 
    projectName: 'Green Valley Villas', 
    investmentAppetite: 45000000, 
    status: 'PENDING', 
    timestamp: '10 mins ago' 
  },
  { 
    id: 'req2', 
    brokerId: 'b3', 
    brokerName: 'Vikram Singh', 
    brokerBii: 68,
    leadId: 'l5', 
    leadName: 'John Doe', 
    projectId: 'p1', 
    projectName: 'Skyline Heights', 
    investmentAppetite: 12000000, 
    status: 'WAITLISTED', 
    timestamp: '2 hours ago' 
  },
   { 
    id: 'req3', 
    brokerId: 'b2', 
    brokerName: 'Sneha Kapoor', 
    brokerBii: 84,
    leadId: 'l6', 
    leadName: 'Priya M', 
    projectId: 'p1', 
    projectName: 'Skyline Heights', 
    investmentAppetite: 16000000, 
    status: 'PENDING', 
    timestamp: '1 hour ago' 
  }
];
