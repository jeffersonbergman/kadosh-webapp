
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Home, DollarSign, Users, Music, 
  ChevronDown, LogOut, Settings, Globe, Sun, Moon, User
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout, user, theme, setTheme, language, setLanguage } = useApp();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logoutSuccess'));
    navigate('/login');
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'pt' | 'en' | 'es');
    toast.success(t('settings.languageChanged'));
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark');
    toast.success(t('settings.themeChanged'));
  };

  const navItems = [
    { name: t('sidebar.dashboard'), icon: <Home size={20} />, path: '/' },
    { name: t('sidebar.financial'), icon: <DollarSign size={20} />, path: '/financeiro' },
    { name: t('sidebar.administrative'), icon: <Users size={20} />, path: '/administrativo' },
    { name: t('sidebar.music'), icon: <Music size={20} />, path: '/musica' },
  ];

  return (
    <div className="min-h-screen bg-church-light flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden mr-2"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-church-primary">{t('app.name').split('Manager')[0]}</span>
              <span className="text-xl font-semibold text-church-secondary">Manager</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {user && (
              <span className="text-sm text-gray-600 hidden md:block mr-4">
                {t('app.welcome')}, {user.name}
              </span>
            )}
            
            {/* Settings Dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 flex">
                  <Settings size={18} className="mr-1" />
                  <span>{t('app.settings')}</span>
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>{t('settings.title')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Language selection directly in the dropdown */}
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <div className="w-full px-2 py-1.5">
                    <div className="flex items-center mb-2">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>{t('settings.language')}</span>
                    </div>
                    <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                      <DropdownMenuRadioItem value="pt">Português</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Theme selection directly in the dropdown */}
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <div className="w-full px-2 py-1.5">
                    <div className="flex items-center mb-2">
                      {theme === 'light' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                      <span>{t('settings.theme')}</span>
                    </div>
                    <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
                      <DropdownMenuRadioItem value="light">{t('settings.lightTheme')}</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">{t('settings.darkTheme')}</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Profile option - clickable to open profile page */}
                <DropdownMenuItem onClick={() => navigate('/configuracoes?tab=profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('settings.profile')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="text-gray-600" onClick={handleLogout}>
              <LogOut size={18} className="mr-1" />
              <span>{t('app.logout')}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`bg-white border-r border-gray-200 w-64 fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-10 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <nav className="mt-16 md:mt-5 px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-church-light text-church-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t('sidebar.quickAccess')}
              </h3>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link to="/administrativo/membros" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    {t('sidebar.members')}
                  </Link>
                </li>
                <li>
                  <Link to="/financeiro/relatorios" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    {t('sidebar.reports')}
                  </Link>
                </li>
                <li>
                  <Link to="/musica/escalas" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    {t('sidebar.schedules')}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MainLayout;
