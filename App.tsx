
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BuilderDashboard } from './components/views/BuilderDashboard';
import { BrokerDashboard } from './components/views/BrokerDashboard';
import { InventoryView } from './components/views/InventoryView';
import { BuyerView } from './components/views/BuyerView';
import { BrokerListView } from './components/views/BrokerListView';
import { LandingPage } from './components/views/LandingPage';
import { WalletView } from './components/views/WalletView';
import { Role } from './types';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>(Role.BROKER);
  const [currentView, setCurrentView] = useState('landing'); // Default to landing

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    // Reset view to default for that role
    if (role === Role.BUYER) {
      setCurrentView('home');
    } else {
      setCurrentView('dashboard');
    }
  };

  const renderView = () => {
    if (currentView === 'landing') {
      return <LandingPage onSelectRole={handleRoleChange} />;
    }

    if (currentRole === Role.BUYER) {
      if (currentView === 'browse') return <BrokerListView />; // Changed to BrokerListView
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

  return (
    <Layout 
      currentRole={currentRole} 
      onRoleChange={handleRoleChange}
      currentView={currentView}
      onNavigate={setCurrentView}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
