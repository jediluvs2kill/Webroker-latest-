
import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_LEADS, MOCK_BROKER_STATS, MOCK_ACTIVITIES, MOCK_PROJECTS } from '../../constants';
import { Lead, LeadStatus } from '../../types';
import { Phone, CheckCircle2, Award, Wallet, ArrowRight, UserPlus, FileText, Sparkles, Send, X, Zap, Loader2 } from 'lucide-react';
import { SmartCopilot } from '../SmartCopilot';
import { suggestNextAction } from '../../services/geminiService';

export const BrokerDashboard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<{ action: string, reasoning: string } | null>(null);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [allocationForm, setAllocationForm] = useState({ projectId: '', amount: '' });
  
  // Simulated incoming ticket from Buyer AI
  const [incomingTicket, setIncomingTicket] = useState<{id: string, buyer: string, summary: string, budget: string} | null>({
    id: 'tkt-live-01',
    buyer: 'Anjali Desai',
    summary: 'High-intent buyer via Astra. Looking for 3BHK in Downtown. Budget verified > 2Cr. Immediate site visit requested.',
    budget: '2.5 Cr'
  });

  useEffect(() => {
    if (selectedLead) {
      setAiSuggestion(null); // Clear previous
      suggestNextAction(selectedLead).then(setAiSuggestion);
    }
  }, [selectedLead]);

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW: return 'bg-blue-100 text-blue-700';
      case LeadStatus.QUALIFIED: return 'bg-indigo-100 text-indigo-700';
      case LeadStatus.VISITING: return 'bg-amber-100 text-amber-700';
      case LeadStatus.OFFER: return 'bg-purple-100 text-purple-700';
      case LeadStatus.CLOSED: return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAllocationSubmit = () => {
      // In a real app, this would create an allocation request via API
      alert("Ticket Raised! The builder will review your request based on your BII and buyer appetite.");
      setIsAllocationModalOpen(false);
  };

  const handleAcceptTicket = () => {
      setIncomingTicket(null);
      // In a real app, this would add the lead to the database
      alert("Lead accepted! Added 'Anjali Desai' to your pipeline.");
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Priority Desk (Incoming Tickets) */}
      {incomingTicket && (
        <div className="animate-slide-up">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" /> Priority Desk
            </h2>
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white mb-8 border-none shadow-lg shadow-indigo-500/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-white/20 text-indigo-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center">
                                AI Alert
                            </span>
                            <span className="text-indigo-200 text-xs">Just now</span>
                        </div>
                        <h3 className="text-xl font-bold">{incomingTicket.buyer}</h3>
                        <p className="text-indigo-100 text-sm mt-1 max-w-xl leading-relaxed opacity-90">{incomingTicket.summary}</p>
                        <div className="mt-3 flex items-center space-x-4">
                            <span className="text-xs bg-black/20 px-2 py-1 rounded border border-white/10">Budget: {incomingTicket.budget}</span>
                            <span className="text-xs bg-black/20 px-2 py-1 rounded border border-white/10">Source: Astra Concierge</span>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0 w-full md:w-auto">
                        <Button 
                            onClick={() => setIncomingTicket(null)} 
                            variant="ghost" 
                            className="text-indigo-100 hover:bg-white/10 hover:text-white flex-1 md:flex-none"
                        >
                            Pass
                        </Button>
                        <Button 
                            onClick={handleAcceptTicket} 
                            className="bg-white text-indigo-700 hover:bg-indigo-50 border-none flex-1 md:flex-none font-bold"
                        >
                            Accept Lead
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      )}

      {/* Broker Impact Index & Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Award className="text-amber-400 w-5 h-5" />
                        <span className="text-amber-400 font-semibold tracking-wide uppercase text-xs">Broker Impact Index</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{MOCK_BROKER_STATS.bii} / 100</h2>
                    <p className="text-slate-400 text-sm">You are in the <span className="text-white font-medium">{MOCK_BROKER_STATS.tier} Tier</span>. Keep pushing to reach Platinum.</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                    <div className="text-center px-4 border-r border-slate-700">
                        <div className="text-2xl font-bold">{MOCK_BROKER_STATS.activeDeals}</div>
                        <div className="text-xs text-slate-400">Active Deals</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold">{MOCK_BROKER_STATS.conversionRate}%</div>
                        <div className="text-xs text-slate-400">Win Rate</div>
                    </div>
                </div>
            </div>
        </Card>

        <Card className="bg-white border-l-4 border-l-emerald-500">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm font-medium">Wallet Balance</span>
                    <Wallet className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-gray-900">₹{(MOCK_BROKER_STATS.totalEarnings / 100000).toFixed(2)} L</div>
                    <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded">
                        Available for Payout
                    </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full justify-between group">
                    View Ledger <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </Button>
            </div>
        </Card>
      </div>

      {/* Main Content: Pipeline & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline List */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader 
                    title="Active Pipeline" 
                    subtitle="Prioritized by AI score"
                    action={<Button size="sm"><UserPlus className="w-4 h-4 mr-2" />Add Lead</Button>} 
                />
                <div className="space-y-3">
                    {MOCK_LEADS.sort((a,b) => b.score - a.score).map((lead) => (
                        <div 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${selectedLead?.id === lead.id ? 'border-brand-500 bg-brand-50' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${selectedLead?.id === lead.id ? 'bg-brand-200 text-brand-800' : 'bg-gray-100 text-gray-600'}`}>
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                                        <p className="text-xs text-gray-500 truncate">{lead.budget} • Score: <span className="text-green-600 font-medium">{lead.score}</span></p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-xs text-gray-500">Last: {lead.lastActivity}</p>
                                <div className="flex space-x-2">
                                    <button 
                                        className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-100 rounded-full transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedLead(lead);
                                            setIsAllocationModalOpen(true);
                                        }}
                                        title="Request Allocation Ticket"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* Right Rail: AI Insight & Activity */}
        <div className="space-y-6">
            {selectedLead && (
                 <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">AI Recommended Action</h3>
                            {aiSuggestion ? (
                                <>
                                    <p className="text-lg font-bold text-indigo-700">{aiSuggestion.action}</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{aiSuggestion.reasoning}</p>
                                    <div className="mt-3 flex gap-2">
                                        <Button size="sm" variant="secondary" onClick={() => setIsAllocationModalOpen(true)}>Request Allocation</Button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-xs text-gray-400 animate-pulse">Analyzing lead context...</p>
                            )}
                        </div>
                    </div>
                 </Card>
            )}

            <Card>
                <CardHeader title="Recent Activity" subtitle="Verified on chain" />
                <div className="relative pl-4 border-l border-gray-200 space-y-6 my-2">
                    {MOCK_ACTIVITIES.map((activity) => (
                        <div key={activity.id} className="relative">
                            <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-white ${activity.verified ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                            <div className="text-sm">
                                <p className="text-gray-900 font-medium">{activity.type.toUpperCase()}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{activity.description}</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <span className="text-[10px] text-gray-400">{activity.timestamp}</span>
                                    {activity.verified && (
                                        <span className="flex items-center text-[10px] text-emerald-600 font-medium">
                                            <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>

      {/* Allocation Request Modal */}
      {isAllocationModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4 flex justify-between items-center text-white">
                      <h3 className="font-bold">Raise Allocation Ticket</h3>
                      <button onClick={() => setIsAllocationModalOpen(false)}><X className="w-5 h-5" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                      <p className="text-sm text-gray-600">
                        Request priority inventory for <span className="font-bold text-gray-900">{selectedLead?.name}</span>.
                        Your Broker BII ({MOCK_BROKER_STATS.bii}) will be used to prioritize this request.
                      </p>
                      
                      <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Select Project</label>
                          <select 
                            className="w-full border-gray-300 rounded-lg text-sm"
                            value={allocationForm.projectId}
                            onChange={(e) => setAllocationForm({...allocationForm, projectId: e.target.value})}
                          >
                              <option value="">-- Choose Project --</option>
                              {MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                      </div>

                      <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Investment Appetite (INR)</label>
                          <input 
                            type="number" 
                            className="w-full border-gray-300 rounded-lg text-sm" 
                            placeholder="e.g. 15000000"
                            value={allocationForm.amount}
                            onChange={(e) => setAllocationForm({...allocationForm, amount: e.target.value})}
                          />
                      </div>
                      
                      <div className="pt-4 flex gap-3">
                          <Button fullWidth variant="outline" onClick={() => setIsAllocationModalOpen(false)}>Cancel</Button>
                          <Button fullWidth onClick={handleAllocationSubmit}>Submit Request</Button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Floating Copilot */}
      <SmartCopilot contextData={selectedLead || undefined} />
    </div>
  );
};
