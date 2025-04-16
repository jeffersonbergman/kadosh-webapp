
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Users, 
  Music, 
  Settings, 
  LogOut,
  Calendar
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme, language, setLanguage } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Início', 
      icon: Home, 
      url: '/',
      onClick: () => navigate('/')
    },
    { 
      title: 'Financeiro', 
      icon: DollarSign, 
      url: '/financeiro',
      onClick: () => navigate('/financeiro')
    },
    { 
      title: 'Administrativo', 
      icon: Users, 
      url: '/administrativo',
      onClick: () => navigate('/administrativo')
    },
    { 
      title: 'Calendário', 
      icon: Calendar, 
      url: '/administrativo/calendario',
      onClick: () => navigate('/administrativo/calendario')
    },
    { 
      title: 'Música', 
      icon: Music, 
      url: '/musica',
      onClick: () => navigate('/musica')
    },
    { 
      title: 'Configurações', 
      icon: Settings, 
      url: '/configuracoes',
      onClick: () => navigate('/configuracoes')
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={item.onClick}
                      tooltip={item.title}
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/login')}>
                <LogOut className="mr-2" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
