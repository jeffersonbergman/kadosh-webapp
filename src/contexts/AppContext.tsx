
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the context
interface AppContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Mock user data - in a real app, this would come from an API
const MOCK_USER = {
  id: '1',
  name: 'Admin',
  email: 'admin@igreja.com',
  role: 'admin'
};

// Create context with default values
const AppContext = createContext<AppContextProps>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  user: null,
  theme: 'light',
  toggleTheme: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Check if user is already logged in (from localStorage in this example)
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      
      // In a real app, you would validate the token and fetch user data
      setUser(MOCK_USER);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);
  
  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes only - simple validation
    if (email === 'admin@igreja.com' && password === 'admin') {
      setIsAuthenticated(true);
      setUser(MOCK_USER);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
  };
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  return (
    <AppContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      user,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
