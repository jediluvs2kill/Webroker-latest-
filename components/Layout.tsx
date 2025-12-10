
import React from 'react';
import { Role } from '../types';
import { LayoutDashboard, Building2, Users, Briefcase, Menu, Bell, Search, LogOut, MessageSquare, Home, UserCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  currentView: string;
  onNavigate: (view: string) => void;
  userEmail?: string;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentRole, 
  onRoleChange,
  currentView,
  onNavigate,
  userEmail,
  onLogout
}) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

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
          { id: 'browse', label: 'Browse Brokers', icon: Users },
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
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Home</button>
                            <button onClick={() => handleScrollTo('features')} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">About</button>
                            <button onClick={() => handleScrollTo('contact')} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Contact</button>
                        </div>
                        {userEmail ? (
                            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                <div className="text-right hidden md:block">
                                    <p className="text-xs text-gray-400">Logged in as</p>
                                    <p className="text-sm font-bold text-gray-800">{userEmail.split('@')[0]}</p>
                                </div>
                                <button 
                                    onClick={onLogout}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button className="text-sm font-bold text-brand-600 hover:text-brand-700">Sign In</button>
                        )}
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
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10 shadow-sm">
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        currentView === item.id 
                            ? 'bg-brand-50 text-brand-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-brand-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            {userEmail && (
                <div className="mb-4 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                        {userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-900 truncate">{userEmail.split('@')[0]}</p>
                        <p className="text-xs text-gray-500 truncate">{currentRole}</p>
                    </div>
                </div>
            )}
            
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
            >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
            </button>
        </div>

        {/* Role Switcher (Simulator) - Kept for Demo purposes, but behind auth in real app */}
        <div className="p-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Persona Simulator</p>
            <div className="grid grid-cols-3 gap-1">
                <button 
                    onClick={() => onRoleChange(Role.BUILDER)}
                    title="Switch to Builder"
                    className={`text-xs p-1.5 rounded text-center transition-colors ${currentRole === Role.BUILDER ? 'bg-brand-100 text-brand-700 font-bold' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    Bldr
                </button>
                <button 
                    onClick={() => onRoleChange(Role.BROKER)}
                    title="Switch to Broker"
                    className={`text-xs p-1.5 rounded text-center transition-colors ${currentRole === Role.BROKER ? 'bg-brand-100 text-brand-700 font-bold' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    Brok
                </button>
                <button 
                    onClick={() => onRoleChange(Role.BUYER)}
                    title="Switch to Buyer"
                    className={`text-xs p-1.5 rounded text-center transition-colors ${currentRole === Role.BUYER ? 'bg-brand-100 text-brand-700 font-bold' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    Buyr
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b z-20 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2" onClick={() => onNavigate('landing')}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
            <span className="font-bold text-gray-900">WeBroker</span>
          </div>
          <div className="flex items-center gap-2">
              {userEmail && (
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {userEmail.charAt(0).toUpperCase()}
                 </div>
              )}
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1">
                  <Menu className="w-6 h-6 text-gray-600" />
              </button>
          </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-14 md:mt-0 transition-all">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {currentRole === Role.BUYER && currentView === 'home' ? 'Concierge' : currentView === 'browse' && currentRole === Role.BUYER ? 'Partner Directory' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
                </h1>
                <p className="text-sm text-gray-500">
                    {currentRole === Role.BUILDER ? 'Admin Overview' : currentRole === Role.BROKER ? 'Partner Portal' : 'Verified Broker Network'}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden lg:flex relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-500" />
                    <input 
                        type="text" 
                        placeholder="Search ecosystem..." 
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 w-64 transition-all"
                    />
                </div>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors bg-white hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-200">
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
