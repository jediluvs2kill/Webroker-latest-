
import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_BROKER_STATS, MOCK_TRANSACTIONS, MOCK_LEADERBOARD } from '../../constants';
import { Wallet, TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownLeft, Crown, Award, MapPin } from 'lucide-react';

export const WalletView: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Top Wallet Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-none shadow-lg shadow-emerald-500/20">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-emerald-100 font-medium text-sm uppercase tracking-wide">Total Available Commission</p>
                                <h2 className="text-4xl font-bold mt-2">₹{(MOCK_BROKER_STATS.totalEarnings / 100000).toFixed(2)} Lakhs</h2>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Wallet className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        
                        <div className="mt-8 flex items-end justify-between">
                            <div className="flex space-x-6">
                                <div>
                                    <p className="text-emerald-200 text-xs">Escrow Hold</p>
                                    <p className="font-semibold text-lg">₹12.5 L</p>
                                </div>
                                <div>
                                    <p className="text-emerald-200 text-xs">Last Payout</p>
                                    <p className="font-semibold text-lg">Oct 12</p>
                                </div>
                            </div>
                            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 border-none font-bold">
                                Withdraw Funds
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white border-gray-200">
                    <CardHeader title="Performance Stats" />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                    <Crown className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">My Rank</p>
                                    <p className="font-bold text-gray-900">#7 Regional</p>
                                </div>
                            </div>
                            <span className="text-emerald-600 font-medium text-xs flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" /> +2
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Current BII</p>
                                    <p className="font-bold text-gray-900">{MOCK_BROKER_STATS.bii} / 100</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leaderboard Section */}
                <Card className="lg:col-span-2">
                    <CardHeader 
                        title="Regional Leaderboard" 
                        subtitle="Ranked by BII & Verified Closures this month" 
                        action={
                            <select className="text-xs border-gray-300 rounded-md text-gray-600">
                                <option>Mumbai Region</option>
                                <option>Bangalore Region</option>
                            </select>
                        }
                    />
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
                                <tr>
                                    <th className="px-6 py-3">Rank</th>
                                    <th className="px-6 py-3">Broker</th>
                                    <th className="px-6 py-3">Tier</th>
                                    <th className="px-6 py-3 text-center">Deals</th>
                                    <th className="px-6 py-3 text-right">BII Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_LEADERBOARD.map((entry) => (
                                    <tr 
                                        key={entry.rank} 
                                        className={`hover:bg-gray-50 transition-colors ${entry.name === 'You' ? 'bg-amber-50 border-l-4 border-l-amber-400' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center font-bold text-gray-900">
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                                                    entry.rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {entry.rank}
                                                </span>
                                                {entry.trend === 'UP' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                                                {entry.trend === 'DOWN' && <TrendingDown className="w-3 h-3 text-rose-500" />}
                                                {entry.trend === 'STABLE' && <Minus className="w-3 h-3 text-gray-400" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{entry.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                                <MapPin className="w-3 h-3 mr-1" /> {entry.area}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                                entry.tier === 'Platinum' ? 'bg-indigo-100 text-indigo-700' :
                                                entry.tier === 'Gold' ? 'bg-amber-100 text-amber-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {entry.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium text-gray-900">
                                            {entry.dealsThisMonth}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-gray-900">{entry.bii}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Transaction Ledger */}
                <Card>
                    <CardHeader title="Recent Transactions" />
                    <div className="space-y-0 divide-y divide-gray-100">
                        {MOCK_TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-gray-900 text-sm truncate pr-2">{tx.description}</p>
                                    <span className={`text-sm font-bold ${tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-gray-900'}`}>
                                        {tx.type === 'CREDIT' ? '+' : '-'} ₹{(tx.amount).toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-gray-400">
                                        <span>{tx.date}</span>
                                        <span className="mx-1">•</span>
                                        <span>{tx.referenceId}</span>
                                    </div>
                                    <div className="flex items-center">
                                        {tx.type === 'CREDIT' ? (
                                            <ArrowDownLeft className="w-3 h-3 text-emerald-500 mr-1" />
                                        ) : (
                                            <ArrowUpRight className="w-3 h-3 text-gray-400 mr-1" />
                                        )}
                                        <span className={`text-[10px] font-medium uppercase px-1.5 py-0.5 rounded ${
                                            tx.status === 'CLEARED' ? 'bg-emerald-50 text-emerald-600' : 
                                            tx.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <Button fullWidth variant="outline" size="sm">Download Statement</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
