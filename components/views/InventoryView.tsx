import React from 'react';
import { Card } from '../ui/Card';
import { MOCK_UNITS } from '../../constants';
import { UnitStatus } from '../../types';
import { Filter, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const InventoryView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2 text-gray-500 border-r pr-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
        </div>
        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2">
            <option>All Projects</option>
            <option>Skyline Heights</option>
            <option>Green Valley Villas</option>
        </select>
        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2">
            <option>Price Range</option>
            <option>Under 1 Cr</option>
            <option>1 Cr - 2 Cr</option>
            <option>2 Cr +</option>
        </select>
        <div className="ml-auto">
             <span className="text-sm text-gray-500 mr-2">Showing {MOCK_UNITS.length} units</span>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_UNITS.map((unit) => (
            <div key={unit.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Image Placeholder */}
                <div className="h-40 bg-gray-200 relative">
                     <img 
                        src={`https://picsum.photos/400/300?random=${unit.id}`} 
                        alt="Unit View" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-3 right-3">
                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase shadow-sm ${
                             unit.status === UnitStatus.AVAILABLE ? 'bg-white text-emerald-600' :
                             unit.status === UnitStatus.BOOKED ? 'bg-amber-100 text-amber-700' :
                             'bg-red-100 text-red-700'
                         }`}>
                             {unit.status}
                         </span>
                     </div>
                </div>
                
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-900">{unit.unitCode}</h3>
                            <p className="text-xs text-gray-500">{unit.projectId === 'p1' ? 'Skyline Heights' : 'Green Valley'}</p>
                        </div>
                        <p className="font-bold text-brand-600">₹{(unit.price / 10000000).toFixed(2)} Cr</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 my-4 text-xs text-gray-600">
                        <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                            <span className="font-semibold">{unit.type}</span>
                            <span className="text-gray-400">Type</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                            <span className="font-semibold">{unit.area}</span>
                            <span className="text-gray-400">Sq. Ft.</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                            <span className="font-semibold">{unit.facing}</span>
                            <span className="text-gray-400">Facing</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                            <span className="font-semibold">{unit.floor === 0 ? 'G' : unit.floor}</span>
                            <span className="text-gray-400">Floor</span>
                        </div>
                    </div>

                    <Button 
                        fullWidth 
                        size="sm" 
                        disabled={unit.status !== UnitStatus.AVAILABLE}
                        variant={unit.status === UnitStatus.AVAILABLE ? 'primary' : 'outline'}
                    >
                        {unit.status === UnitStatus.AVAILABLE ? 'Block Unit' : 'Waitlist'}
                    </Button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
