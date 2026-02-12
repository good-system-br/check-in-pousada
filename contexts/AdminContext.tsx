/**
 * Contexto de Autenticação Admin
 * Gerencia login e dados do administrador
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';

interface AdminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

// Mock de usuário admin
const MOCK_ADMIN: AdminUser = {
  id: '1',
  email: 'admin@villamonteverde.com',
  name: 'Admin Villa Monte Verde',
  tenantId: '1',
  role: 'owner',
  createdAt: new Date(),
};

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há sessão salva
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock de autenticação
    // Em produção, isso seria uma chamada à API
    if (email === 'admin@villamonteverde.com' && password === 'admin123') {
      setUser(MOCK_ADMIN);
      localStorage.setItem('adminUser', JSON.stringify(MOCK_ADMIN));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
};
