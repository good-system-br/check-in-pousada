/**
 * Dashboard Principal do Admin
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Image,
  Palette,
  UtensilsCrossed,
  BarChart3,
  Users,
  Plug,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useTenant } from '../../contexts/TenantContext';
import { 
  DashboardOverview,
  TenantSettings,
  ImageManager,
  ThemeCustomizer,
  MenuManager,
  Analytics,
  GuestManager,
  Integrations
} from './index';

type AdminTab = 'overview' | 'settings' | 'images' | 'theme' | 'menu' | 'analytics' | 'guests' | 'integrations';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { user, logout } = useAdmin();
  const { tenant } = useTenant();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'overview' as AdminTab, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'settings' as AdminTab, label: 'Configurações', icon: Settings },
    { id: 'images' as AdminTab, label: 'Imagens', icon: Image },
    { id: 'theme' as AdminTab, label: 'Tema', icon: Palette },
    { id: 'menu' as AdminTab, label: 'Cardápios', icon: UtensilsCrossed },
    { id: 'analytics' as AdminTab, label: 'Analytics', icon: BarChart3 },
    { id: 'guests' as AdminTab, label: 'Hóspedes', icon: Users },
    { id: 'integrations' as AdminTab, label: 'Integrações', icon: Plug },
  ];

  const handleLogout = () => {
    logout();
    onBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'settings':
        return <TenantSettings />;
      case 'images':
        return <ImageManager />;
      case 'theme':
        return <ThemeCustomizer />;
      case 'menu':
        return <MenuManager />;
      case 'analytics':
        return <Analytics />;
      case 'guests':
        return <GuestManager />;
      case 'integrations':
        return <Integrations />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-lg truncate">{tenant?.name}</h2>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all"
            title={!sidebarOpen ? 'Sair' : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {menuItems.find((item) => item.id === activeTab)?.label}
            </h1>
            <p className="text-slate-600">
              Gerencie as configurações da {tenant?.name}
            </p>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
