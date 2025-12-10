import React from 'react';
import { Role } from '../types';
import { LayoutDashboard, Building2, Users, Briefcase, Menu, Bell, Search, LogOut, MessageSquare, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentRole, 
  onRoleChange,
  currentView,
  onNavigate 
}) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  // If we are on the landing page, we might want a different layout or just render children full width.
  // But assuming the Landing Page is just another view inside this shell for now, or we hide sidebar.
  const isLanding = currentView === 'landing';

  const getNavItems = () => {
    switch (currentRole) {
      case Role.BUILDER:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'projects', label: 'Projects', icon: Building2 },
          { id: 'brokers', label: 'Brokers', icon: Users },
        ];
      case Role.BROKER:
        return [
          { id: 'dashboard', label: 'My Pipeline', icon: LayoutDashboard },
          { id: 'inventory', label: 'Inventory', icon: Building2 },
          { id: 'wallet', label: 'Earnings', icon: Briefcase },
        ];
      case Role.BUYER:
        return [
          { id: 'home', label: 'Concierge', icon: MessageSquare },
          { id: 'browse', label: 'Browse Homes', icon: Home },
          { id: 'shortlist', label: 'Shortlist', icon: Building2 },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleScrollTo = (id: string) => {
    if (currentView !== 'landing') {
        onNavigate('landing');
        // Allow time for render then scroll
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLanding) {
    return (
        <div className="min-h-screen bg-white">
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                     <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                     >
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30">W</div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">WeBroker</span>
                    </div>
                    <div className="flex gap-6">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Home</button>
                        <button onClick={() => handleScrollTo('features')} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">About</button>
                        <button onClick={() => handleScrollTo('contact')} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Contact</button>
                    </div>
                </div>
            </header>
            <main className="pt-16">
                {children}
            </main>
        </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <div 
            className="p-6 flex items-center space-x-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onNavigate('landing')}
        >
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">W</div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">WeBroker</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        currentView === item.id 
                            ? 'bg-brand-50 text-brand-700' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-brand-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>

        {/* Role Switcher (For Prototype Demo) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">Simulate Persona</p>
            <div className="flex flex-col space-y-2">
                <button 
                    onClick={() => onRoleChange(Role.BUILDER)}
                    className={`text-xs px-3 py-2 rounded border ${currentRole === Role.BUILDER ? 'bg-white border-brand-500 shadow-sm text-brand-700' : 'border-gray-200 text-gray-600 hover:bg-white'}`}
                >
                    Builder View
                </button>
                <button 
                    onClick={() => onRoleChange(Role.BROKER)}
                    className={`text-xs px-3 py-2 rounded border ${currentRole === Role.BROKER ? 'bg-white border-brand-500 shadow-sm text-brand-700' : 'border-gray-200 text-gray-600 hover:bg-white'}`}
                >
                    Broker View
                </button>
                <button 
                    onClick={() => onRoleChange(Role.BUYER)}
                    className={`text-xs px-3 py-2 rounded border ${currentRole === Role.BUYER ? 'bg-white border-brand-500 shadow-sm text-brand-700' : 'border-gray-200 text-gray-600 hover:bg-white'}`}
                >
                    Buyer View
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b z-20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
            <span className="font-bold text-gray-900">WeBroker</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <Menu className="w-6 h-6 text-gray-600" />
          </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-14 md:mt-0">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {currentRole === Role.BUYER && currentView === 'home' ? 'Concierge' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
                </h1>
                <p className="text-sm text-gray-500">
                    {currentRole === Role.BUILDER ? 'Admin Overview' : currentRole === Role.BROKER ? 'Partner Portal' : 'Find Your Dream Home'}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
                    />
                </div>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>

        {children}
      </main>
    </div>
  );
};