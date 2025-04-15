import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme, language, setLanguage } = useApp();

  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
