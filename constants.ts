

import { Lead, LeadStatus, Project, Role, Unit, UnitStatus, BrokerStats, Activity, BrokerProfile, AllocationRequest, Transaction, LeaderboardEntry } from './types';

export const APP_NAME = "WeBroker";

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Skyline Heights', location: 'Downtown, Mumbai', totalUnits: 120, availableUnits: 45, absorptionRate: 62 },
  { id: 'p2', name: 'Green Valley Villas', location: 'Whitefield, Bangalore', totalUnits: 50, availableUnits: 12, absorptionRate: 76 },
  { id: 'p3', name: 'Imperia Grand', location: 'Sector 45, Gurgaon', totalUnits: 200, availableUnits: 85, absorptionRate: 58 },
  { id: 'p4', name: 'Oceanic Bay', location: 'Marine Drive, Kochi', totalUnits: 80, availableUnits: 30, absorptionRate: 65 },
  { id: 'p5', name: 'Royal Heritage', location: 'Banjara Hills, Hyderabad', totalUnits: 60, availableUnits: 5, absorptionRate: 92 },
  { id: 'p6', name: 'Lotus Pond', location: 'Salt Lake, Kolkata', totalUnits: 150, availableUnits: 100, absorptionRate: 33 },
  { id: 'p7', name: 'Capital Greens', location: 'Connaught Place, Delhi', totalUnits: 90, availableUnits: 20, absorptionRate: 78 },
  { id: 'p8', name: 'Serene Meadows', location: 'Koregaon Park, Pune', totalUnits: 110, availableUnits: 55, absorptionRate: 50 },
  { id: 'p9', name: 'Prestige Lakeside', location: 'Hebbal, Bangalore', totalUnits: 300, availableUnits: 150, absorptionRate: 45 },
  { id: 'p10', name: 'Marina One', location: 'OMR, Chennai', totalUnits: 220, availableUnits: 90, absorptionRate: 59 },
];

export const MOCK_UNITS: Unit[] = [
  // Skyline Heights
  { id: 'u1', projectId: 'p1', unitCode: 'A-101', type: '3BHK', area: 1850, price: 15000000, floor: 1, facing: 'East', status: UnitStatus.AVAILABLE },
  { id: 'u2', projectId: 'p1', unitCode: 'A-102', type: '3BHK', area: 1850, price: 15200000, floor: 1, facing: 'North', status: UnitStatus.BOOKED },
  // Green Valley
  { id: 'u3', projectId: 'p2', unitCode: 'V-12', type: 'Villa', area: 3200, price: 45000000, floor: 0, facing: 'East', status: UnitStatus.AVAILABLE },
  { id: 'u4', projectId: 'p2', unitCode: 'V-14', type: 'Villa', area: 3500, price: 48000000, floor: 0, facing: 'South', status: UnitStatus.SOLD },
  // Imperia Grand
  { id: 'u5', projectId: 'p3', unitCode: 'B-704', type: '4BHK', area: 2800, price: 32000000, floor: 7, facing: 'West', status: UnitStatus.AVAILABLE },
  { id: 'u6', projectId: 'p3', unitCode: 'B-705', type: '2BHK', area: 1200, price: 11000000, floor: 7, facing: 'East', status: UnitStatus.AVAILABLE },
  // Oceanic Bay
  { id: 'u7', projectId: 'p4', unitCode: 'OB-301', type: '3BHK', area: 2100, price: 21000000, floor: 3, facing: 'Sea View', status: UnitStatus.BLOCKED },
  { id: 'u8', projectId: 'p4', unitCode: 'OB-302', type: '3BHK', area: 2100, price: 21500000, floor: 3, facing: 'Sea View', status: UnitStatus.AVAILABLE },
  // Royal Heritage
  { id: 'u9', projectId: 'p5', unitCode: 'RH-001', type: '5BHK', area: 5000, price: 85000000, floor: 1, facing: 'North', status: UnitStatus.SOLD },
  // Lotus Pond
  { id: 'u10', projectId: 'p6', unitCode: 'LP-102', type: '2BHK', area: 1150, price: 7500000, floor: 1, facing: 'Garden', status: UnitStatus.AVAILABLE },
  // Capital Greens
  { id: 'u11', projectId: 'p7', unitCode: 'CG-505', type: '3BHK', area: 1900, price: 28000000, floor: 5, facing: 'East', status: UnitStatus.AVAILABLE },
  // Serene Meadows
  { id: 'u12', projectId: 'p8', unitCode: 'SM-202', type: '2BHK', area: 1350, price: 12500000, floor: 2, facing: 'West', status: UnitStatus.AVAILABLE },
  { id: 'u13', projectId: 'p8', unitCode: 'SM-203', type: '3BHK', area: 1600, price: 16000000, floor: 2, facing: 'East', status: UnitStatus.BOOKED },
  // Prestige Lakeside
  { id: 'u14', projectId: 'p9', unitCode: 'PL-909', type: '3BHK', area: 1750, price: 14000000, floor: 9, facing: 'Lake', status: UnitStatus.AVAILABLE },
  // Marina One
  { id: 'u15', projectId: 'p10', unitCode: 'M-1101', type: '4BHK', area: 3100, price: 41000000, floor: 11, facing: 'Sea View', status: UnitStatus.AVAILABLE },
];

export const MOCK_BROKERS: BrokerProfile[] = [
  { id: 'b1', name: 'Rahul Verma', tier: 'Platinum', bii: 92, specialization: 'Luxury Villas', dealsClosed: 142, rating: 4.9 },
  { id: 'b2', name: 'Sneha Kapoor', tier: 'Gold', bii: 84, specialization: 'Downtown Apts', dealsClosed: 89, rating: 4.8 },
  { id: 'b3', name: 'Vikram Singh', tier: 'Silver', bii: 68, specialization: 'First-time Buys', dealsClosed: 45, rating: 4.6 },
  { id: 'b4', name: 'Anjali Mehta', tier: 'Platinum', bii: 95, specialization: 'Commercial Real Estate', dealsClosed: 160, rating: 5.0 },
  { id: 'b5', name: 'Rajesh Kumar', tier: 'Bronze', bii: 55, specialization: 'Affordable Housing', dealsClosed: 12, rating: 4.1 },
  { id: 'b6', name: 'Priya Reddy', tier: 'Gold', bii: 81, specialization: 'Gated Communities', dealsClosed: 76, rating: 4.7 },
  { id: 'b7', name: 'Amit Shah', tier: 'Silver', bii: 72, specialization: 'Rentals & Leases', dealsClosed: 58, rating: 4.5 },
  { id: 'b8', name: 'David Fernandes', tier: 'Platinum', bii: 88, specialization: 'Sea View Properties', dealsClosed: 110, rating: 4.9 },
  { id: 'b9', name: 'Zara Khan', tier: 'Gold', bii: 79, specialization: 'Penthouse Suites', dealsClosed: 65, rating: 4.8 },
  { id: 'b10', name: 'Suresh Patil', tier: 'Silver', bii: 62, specialization: 'Land & Plots', dealsClosed: 30, rating: 4.3 },
];

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'Rohan Gupta', phoneHash: '##29A', budget: '1.5Cr - 1.8Cr', status: LeadStatus.VISITING, lastActivity: 'Site visit confirmed', score: 85 },
  { id: 'l2', name: 'Sarah Jenkins', phoneHash: '##88B', budget: '90L - 1.1Cr', status: LeadStatus.NEW, lastActivity: 'Inquired via Website', score: 45 },
  { id: 'l3', name: 'Amit Patel', phoneHash: '##11C', budget: '2Cr+', status: LeadStatus.OFFER, lastActivity: 'Offer submitted for V-12', score: 92 },
  { id: 'l4', name: 'Priya Sharma', phoneHash: '##44D', budget: '1.2Cr', status: LeadStatus.QUALIFIED, lastActivity: 'Docs received', score: 68 },
  { id: 'l5', name: 'John Doe', phoneHash: '##99E', budget: '3Cr+', status: LeadStatus.NEW, lastActivity: 'Walk-in at Expo', score: 55 },
  { id: 'l6', name: 'Kavita Singh', phoneHash: '##33F', budget: '60L - 80L', status: LeadStatus.LOST, lastActivity: 'Budget mismatch', score: 20 },
  { id: 'l7', name: 'Mohammed Ali', phoneHash: '##55G', budget: '1.5Cr', status: LeadStatus.CLOSED, lastActivity: 'Possession taken', score: 100 },
  { id: 'l8', name: 'Arjun Das', phoneHash: '##77H', budget: '4Cr+', status: LeadStatus.VISITING, lastActivity: 'Visiting Model House', score: 88 },
  { id: 'l9', name: 'Meera Nair', phoneHash: '##22I', budget: '1.1Cr', status: LeadStatus.QUALIFIED, lastActivity: 'Pre-approval done', score: 75 },
  { id: 'l10', name: 'Deepak Chopra', phoneHash: '##66J', budget: '2.5Cr', status: LeadStatus.OFFER, lastActivity: 'Negotiating price', score: 90 },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', leadId: 'l1', type: 'visit', description: 'Completed site visit at Skyline Heights', timestamp: '2h ago', verified: true },
  { id: 'a2', leadId: 'l3', type: 'offer', description: 'Submitted offer of 4.4Cr for V-12', timestamp: '1d ago', verified: true },
  { id: 'a3', leadId: 'l2', type: 'call', description: 'Outbound call - Interested in 2BHK', timestamp: '2d ago', verified: false },
  { id: 'a4', leadId: 'l4', type: 'document', description: 'KYC Documents uploaded', timestamp: '3d ago', verified: true },
  { id: 'a5', leadId: 'l7', type: 'document', description: 'Sale Deed signed', timestamp: '1w ago', verified: true },
  { id: 'a6', leadId: 'l8', type: 'visit', description: 'Scheduled visit for Royal Heritage', timestamp: '5h ago', verified: false },
  { id: 'a7', leadId: 'l10', type: 'offer', description: 'Revised offer submitted', timestamp: '4h ago', verified: true },
  { id: 'a8', leadId: 'l5', type: 'call', description: 'Missed call returned', timestamp: '1d ago', verified: false },
  { id: 'a9', leadId: 'l9', type: 'call', description: 'Discussed loan options', timestamp: '2d ago', verified: false },
  { id: 'a10', leadId: 'l1', type: 'call', description: 'Follow up on floor preference', timestamp: '1h ago', verified: false },
];

export const MOCK_ALLOCATIONS: AllocationRequest[] = [
  { id: 'req1', brokerId: 'b1', brokerName: 'Rahul Verma', brokerBii: 92, leadId: 'l3', leadName: 'Amit Patel', projectId: 'p2', projectName: 'Green Valley Villas', investmentAppetite: 45000000, status: 'PENDING', timestamp: '10 mins ago' },
  { id: 'req2', brokerId: 'b3', brokerName: 'Vikram Singh', brokerBii: 68, leadId: 'l5', leadName: 'John Doe', projectId: 'p1', projectName: 'Skyline Heights', investmentAppetite: 12000000, status: 'WAITLISTED', timestamp: '2 hours ago' },
  { id: 'req3', brokerId: 'b2', brokerName: 'Sneha Kapoor', brokerBii: 84, leadId: 'l6', leadName: 'Priya M', projectId: 'p1', projectName: 'Skyline Heights', investmentAppetite: 16000000, status: 'PENDING', timestamp: '1 hour ago' },
  { id: 'req4', brokerId: 'b4', brokerName: 'Anjali Mehta', brokerBii: 95, leadId: 'l11', leadName: 'Corporate Tech', projectId: 'p3', projectName: 'Imperia Grand', investmentAppetite: 85000000, status: 'APPROVED', timestamp: '30 mins ago' },
  { id: 'req5', brokerId: 'b6', brokerName: 'Priya Reddy', brokerBii: 81, leadId: 'l12', leadName: 'Family Trust', projectId: 'p4', projectName: 'Oceanic Bay', investmentAppetite: 25000000, status: 'PENDING', timestamp: '45 mins ago' },
  { id: 'req6', brokerId: 'b8', brokerName: 'David Fernandes', brokerBii: 88, leadId: 'l13', leadName: 'NRI Investor', projectId: 'p10', projectName: 'Marina One', investmentAppetite: 50000000, status: 'PENDING', timestamp: '5 mins ago' },
  { id: 'req7', brokerId: 'b9', brokerName: 'Zara Khan', brokerBii: 79, leadId: 'l14', leadName: 'Start-up Founder', projectId: 'p5', projectName: 'Royal Heritage', investmentAppetite: 60000000, status: 'APPROVED', timestamp: '1 day ago' },
  { id: 'req8', brokerId: 'b1', brokerName: 'Rahul Verma', brokerBii: 92, leadId: 'l15', leadName: 'Retiree Couple', projectId: 'p8', projectName: 'Serene Meadows', investmentAppetite: 15000000, status: 'WAITLISTED', timestamp: '3 hours ago' },
  { id: 'req9', brokerId: 'b7', brokerName: 'Amit Shah', brokerBii: 72, leadId: 'l16', leadName: 'Retail Chain', projectId: 'p7', projectName: 'Capital Greens', investmentAppetite: 35000000, status: 'PENDING', timestamp: '20 mins ago' },
  { id: 'req10', brokerId: 'b10', brokerName: 'Suresh Patil', brokerBii: 62, leadId: 'l17', leadName: 'Land Aggregator', projectId: 'p2', projectName: 'Green Valley Villas', investmentAppetite: 90000000, status: 'REJECTED', timestamp: '1 day ago' },
];

export const MOCK_BROKER_STATS: BrokerStats = {
  bii: 78,
  tier: 'Gold',
  totalEarnings: 450000,
  activeDeals: 4,
  conversionRate: 12.5
};

export const ABSORPTION_DATA = [
  { name: 'Jan', velocity: 4 },
  { name: 'Feb', velocity: 6 },
  { name: 'Mar', velocity: 9 },
  { name: 'Apr', velocity: 14 },
  { name: 'May', velocity: 12 },
  { name: 'Jun', velocity: 18 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', date: 'Oct 24, 2024', description: 'Commission - Skyline Unit A-102', amount: 304000, type: 'CREDIT', status: 'CLEARED', referenceId: 'REF-88392' },
  { id: 'tx2', date: 'Oct 12, 2024', description: 'Monthly Withdrawal', amount: 150000, type: 'DEBIT', status: 'CLEARED', referenceId: 'WD-99212' },
  { id: 'tx3', date: 'Sep 30, 2024', description: 'Bonus - Q3 Top Performer', amount: 50000, type: 'CREDIT', status: 'CLEARED', referenceId: 'BNS-22100' },
  { id: 'tx4', date: 'Sep 15, 2024', description: 'Commission - Green Valley V-12', amount: 900000, type: 'CREDIT', status: 'PENDING', referenceId: 'REF-77211' },
  { id: 'tx5', date: 'Aug 28, 2024', description: 'Withdrawal', amount: 200000, type: 'DEBIT', status: 'CLEARED', referenceId: 'WD-88122' }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, brokerId: 'b4', name: 'Anjali Mehta', bii: 95, tier: 'Platinum', dealsThisMonth: 12, trend: 'STABLE', area: 'Gurgaon' },
  { rank: 2, brokerId: 'b1', name: 'Rahul Verma', bii: 92, tier: 'Platinum', dealsThisMonth: 10, trend: 'UP', area: 'Mumbai' },
  { rank: 3, brokerId: 'b8', name: 'David Fernandes', bii: 88, tier: 'Platinum', dealsThisMonth: 8, trend: 'UP', area: 'Chennai' },
  { rank: 4, brokerId: 'b2', name: 'Sneha Kapoor', bii: 84, tier: 'Gold', dealsThisMonth: 7, trend: 'DOWN', area: 'Bangalore' },
  { rank: 5, brokerId: 'b6', name: 'Priya Reddy', bii: 81, tier: 'Gold', dealsThisMonth: 6, trend: 'UP', area: 'Hyderabad' },
  { rank: 6, brokerId: 'b9', name: 'Zara Khan', bii: 79, tier: 'Gold', dealsThisMonth: 5, trend: 'DOWN', area: 'Mumbai' },
  { rank: 7, brokerId: 'me', name: 'You', bii: 78, tier: 'Gold', dealsThisMonth: 4, trend: 'STABLE', area: 'Mumbai' },
  { rank: 8, brokerId: 'b7', name: 'Amit Shah', bii: 72, tier: 'Silver', dealsThisMonth: 4, trend: 'UP', area: 'Ahmedabad' },
  { rank: 9, brokerId: 'b3', name: 'Vikram Singh', bii: 68, tier: 'Silver', dealsThisMonth: 3, trend: 'DOWN', area: 'Delhi' },
  { rank: 10, brokerId: 'b10', name: 'Suresh Patil', bii: 62, tier: 'Silver', dealsThisMonth: 2, trend: 'STABLE', area: 'Pune' },
];
