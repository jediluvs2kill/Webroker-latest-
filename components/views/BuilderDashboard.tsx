
import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ABSORPTION_DATA, MOCK_PROJECTS, MOCK_ALLOCATIONS } from '../../constants';
import { TrendingUp, Building2, Users, AlertCircle, Check, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const BuilderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brand-500">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-brand-50 rounded-lg text-brand-600">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Avg Absorption</p>
                    <p className="text-2xl font-bold text-gray-900">18.2%</p>
                </div>
            </div>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                    <Building2 className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Inventory</p>
                    <p className="text-2xl font-bold text-gray-900">845 Units</p>
                </div>
            </div>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Active Brokers</p>
                    <p className="text-2xl font-bold text-gray-900">142</p>
                </div>
            </div>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
             <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">8 Offers</p>
                </div>
            </div>
        </Card>
      </div>

      {/* Allocation Demand Queue (Ticket System) */}
      <Card>
        <div className="flex items-center justify-between mb-4">
             <div>
                 <h3 className="text-lg font-semibold text-gray-900">Demand Allocation Queue</h3>
                 <p className="text-sm text-gray-500">Smart Priority: Broker BII × Buyer Appetite</p>
             </div>
             <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full">
                 Ai Sorted
             </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-3">Broker (BII)</th>
                        <th className="px-6 py-3">Buyer</th>
                        <th className="px-6 py-3">Project Interest</th>
                        <th className="px-6 py-3">Investment Appetite</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Sorting logic: (BII * 100000) + Investment amount to prioritize high reputation high value deals */}
                    {MOCK_ALLOCATIONS
                        .sort((a,b) => ((b.brokerBii * 100000) + b.investmentAppetite) - ((a.brokerBii * 100000) + a.investmentAppetite))
                        .map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{req.brokerName}</div>
                                <div className="text-xs flex items-center gap-1 text-gray-500">
                                    <span className={`w-2 h-2 rounded-full ${req.brokerBii > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    BII: {req.brokerBii}
                                </div>
                            </td>
                            <td className="px-6 py-4">{req.leadName}</td>
                            <td className="px-6 py-4 text-indigo-600 font-medium">{req.projectName}</td>
                            <td className="px-6 py-4 font-bold text-gray-900">₹{(req.investmentAppetite/10000000).toFixed(2)} Cr</td>
                            <td className="px-6 py-4">
                                {req.status === 'PENDING' ? (
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 px-2" title="Assign Inventory">
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-8 px-2 text-gray-500" title="Waitlist">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="danger" className="h-8 px-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border-none" title="Reject">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md font-medium uppercase">{req.status}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96">
            <CardHeader title="Absorption Velocity" subtitle="Monthly unit sales across all projects" />
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ABSORPTION_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                        />
                        <Line type="monotone" dataKey="velocity" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card className="h-96">
            <CardHeader title="Project Performance" subtitle="Available vs Total Units" />
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_PROJECTS} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                         <XAxis type="number" hide />
                         <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12, fill: '#475569'}} />
                         <Tooltip cursor={{fill: 'transparent'}} />
                         <Bar dataKey="totalUnits" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} name="Total" />
                         <Bar dataKey="availableUnits" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} name="Available" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      {/* Recent Projects Table */}
      <Card title="Active Projects">
        <CardHeader title="Project Registry" />
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-3">Project Name</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Absorption</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_PROJECTS.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                            <td className="px-6 py-4">{project.location}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${project.absorptionRate}%` }} />
                                    </div>
                                    <span className="text-xs">{project.absorptionRate}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Live
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};
