
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Home, DollarSign, Users, Music, 
  ChevronDown, LogOut, Settings
} from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Financeiro', icon: <DollarSign size={20} />, path: '/financeiro' },
    { name: 'Administrativo', icon: <Users size={20} />, path: '/administrativo' },
    { name: 'Música', icon: <Music size={20} />, path: '/musica' },
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
              <span className="text-xl font-bold text-church-primary">Igreja</span>
              <span className="text-xl font-semibold text-church-secondary">Manager</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hidden md:flex">
              <Settings size={18} className="mr-1" />
              <span>Configurações</span>
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <LogOut size={18} className="mr-1" />
              <span>Sair</span>
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
                Acesso Rápido
              </h3>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link to="/administrativo/membros" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    Cadastro de Membros
                  </Link>
                </li>
                <li>
                  <Link to="/financeiro/relatorios" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    Relatórios Financeiros
                  </Link>
                </li>
                <li>
                  <Link to="/musica/escalas" className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    Escalas de Músicos
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
