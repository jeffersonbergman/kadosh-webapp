
import React from 'react';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { 
  Home, 
  DollarSign, 
  Users, 
  Music, 
  Settings, 
  LogOut
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme, language, setLanguage } = useApp();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 text-gray-700">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
