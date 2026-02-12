/**
 * Tela Admin - Wrapper que gerencia login e dashboard
 */

import React, { useState } from 'react';
import { useAdmin, AdminProvider } from '../contexts/AdminContext';
import { AdminLogin, AdminDashboard } from './admin';

interface AdminScreenProps {
  onBack: () => void;
}

const AdminScreenContent: React.FC<AdminScreenProps> = ({ onBack }) => {
  const { isAuthenticated } = useAdmin();
  const [showDashboard, setShowDashboard] = useState(false);

  if (!isAuthenticated && !showDashboard) {
    return <AdminLogin onLoginSuccess={() => setShowDashboard(true)} />;
  }

  return <AdminDashboard onBack={onBack} />;
};

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
  return (
    <AdminProvider>
      <AdminScreenContent onBack={onBack} />
    </AdminProvider>
  );
};
