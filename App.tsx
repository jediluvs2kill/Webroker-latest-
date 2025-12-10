
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { BuilderDashboard } from './components/views/BuilderDashboard';
import { BrokerDashboard } from './components/views/BrokerDashboard';
import { InventoryView } from './components/views/InventoryView';
import { BuyerView } from './components/views/BuyerView';
import { BrokerListView } from './components/views/BrokerListView';
import { LandingPage } from './components/views/LandingPage';
import { WalletView } from './components/views/WalletView';
import { AuthModal } from './components/auth/AuthModal';
import { Role } from './types';
import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>(Role.BROKER);
  const [currentView, setCurrentView] = useState('landing');
  
  // Auth State
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRoleChange = (role: Role) => {
    // If user is not logged in, force auth before changing role/view
    if (!session) {
      setPendingRole(role);
      setIsAuthOpen(true);
      return;
    }

    applyRoleChange(role);
  };

  const applyRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === Role.BUYER) {
      setCurrentView('home');
    } else {
      setCurrentView('dashboard');
    }
    // Ensure we scroll top
    window.scrollTo(0,0);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    if (pendingRole) {
      applyRoleChange(pendingRole);
      setPendingRole(null);
    } else {
      // Default to Broker Dashboard if no specific role was selected but they logged in
      applyRoleChange(Role.BROKER);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentView('landing');
    setCurrentRole(Role.BROKER); // Reset to default state
  };

  const renderView = () => {
    if (currentView === 'landing') {
      return <LandingPage onSelectRole={handleRoleChange} />;
    }

    // Protected Routes Guard (Double Check)
    if (!session) {
       // Should ideally redirect or show auth, but handleRoleChange catches this.
       // This is just a fallback for direct state manipulation or initial load issues.
       return <LandingPage onSelectRole={handleRoleChange} />;
    }

    if (currentRole === Role.BUYER) {
      if (currentView === 'browse') return <BrokerListView />;
      return <BuyerView />;
    }

    if (currentView === 'inventory' || currentView === 'projects') {
      return <InventoryView />;
    }

    if (currentView === 'wallet') {
      return <WalletView />;
    }

    if (currentRole === Role.BUILDER) {
      return <BuilderDashboard />;
    }
    
    // Default to Broker Dashboard
    return <BrokerDashboard />;
  };

  if (isInitializing) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <>
      <Layout 
        currentRole={currentRole} 
        onRoleChange={handleRoleChange}
        currentView={currentView}
        onNavigate={setCurrentView}
        userEmail={session?.user?.email}
        onLogout={handleLogout}
      >
        {renderView()}
      </Layout>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess}
        pendingRole={pendingRole?.toString()}
      />
    </>
  );
}

export default App;
