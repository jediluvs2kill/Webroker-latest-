import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_BROKERS } from '../../constants';
import { Award, ShieldCheck, Star, Ticket, CheckCircle2, Loader2, Zap } from 'lucide-react';

export const BrokerListView: React.FC = () => {
    const [ticketState, setTicketState] = useState<{[key: string]: 'idle' | 'loading' | 'sent'}>({});

    const handleRaiseTicket = async (brokerId: string) => {
        setTicketState(prev => ({...prev, [brokerId]: 'loading'}));
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTicketState(prev => ({...prev, [brokerId]: 'sent'}));
    };

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-r from-brand-600 to-indigo-700 text-white border-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Verified Broker Directory</h2>
                        <p className="text-brand-100 max-w-2xl text-sm leading-relaxed">
                            Browse our top-rated partners. All brokers are ranked by their <strong>Broker Impact Index (BII)</strong>, which tracks verified closures, speed, and client satisfaction.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <ShieldCheck className="w-16 h-16 text-brand-300 opacity-50" />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_BROKERS.sort((a,b) => b.bii - a.bii).map((broker, index) => (
                    <div key={broker.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group relative">
                         {index === 0 && (
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm z-10 flex items-center">
                                <Zap className="w-3 h-3 mr-1 fill-current" /> #1 RANKED
                            </div>
                         )}
                         <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                                        broker.tier === 'Platinum' ? 'bg-slate-50 border-indigo-200 text-indigo-700' : 
                                        broker.tier === 'Gold' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                        'bg-gray-50 border-gray-200 text-gray-700'
                                    }`}>
                                        {broker.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{broker.name}</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                                broker.tier === 'Platinum' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                                broker.tier === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                                {broker.tier}
                                            </span>
                                            <div className="flex items-center text-amber-400 text-xs">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="ml-1 text-gray-600 font-medium">{broker.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-gray-900">{broker.bii}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">BII Score</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-gray-900">{broker.dealsClosed}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Verified Deals</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Specialization</span>
                                    <span className="font-medium text-gray-900">{broker.specialization}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Response Time</span>
                                    <span className="font-medium text-emerald-600">&lt; 15 Mins</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <Button 
                                    fullWidth 
                                    onClick={() => handleRaiseTicket(broker.id)}
                                    disabled={ticketState[broker.id] === 'sent'}
                                    variant={ticketState[broker.id] === 'sent' ? 'secondary' : 'primary'}
                                >
                                    {ticketState[broker.id] === 'loading' ? (
                                        <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Processing...</span>
                                    ) : ticketState[broker.id] === 'sent' ? (
                                        <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2"/> Request Sent</span>
                                    ) : (
                                        <span className="flex items-center"><Ticket className="w-4 h-4 mr-2"/> Raise Priority Ticket</span>
                                    )}
                                </Button>
                            </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
}