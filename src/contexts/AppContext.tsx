
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { setCurrencyLocale as setAppCurrencyLocale } from '@/utils/currency';

// Define our types separately
type Theme = 'light' | 'dark';
type Language = 'pt' | 'en' | 'es';
type CurrencyLocale = 'pt-BR' | 'en-US' | 'en-GB' | 'es-ES' | 'de-DE' | 'fr-FR';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Admin credentials
const ADMIN_EMAIL = 'admin@igreja.com';
const ADMIN_PASSWORD = 'admin123';

// Define the context interface without any self-references
interface AppContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currencyLocale: CurrencyLocale;
  setCurrencyLocale: (locale: CurrencyLocale) => void;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'pt' || savedLang === 'en' || savedLang === 'es') ? savedLang as Language : 'pt';
  });
  
  const [currencyLocale, setCurrencyLocaleState] = useState<CurrencyLocale>(() => {
    const savedLocale = localStorage.getItem('currency-locale');
    return (savedLocale as CurrencyLocale) || 'pt-BR';
  });
  
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Efeito para aplicar o tema
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  // Efeito para aplicar o idioma
  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language, i18n]);
  
  // Efeito para aplicar a moeda
  useEffect(() => {
    localStorage.setItem('currency-locale', currencyLocale);
    setAppCurrencyLocale(currencyLocale);
  }, [currencyLocale]);
  
  // Efeito para verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
    };
    
    checkAuth();
  }, []);
  
  // Handler functions defined separately to avoid circular references
  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
  };
  
  const setLanguage = (newLang: Language): void => {
    setLanguageState(newLang);
  };
  
  const setCurrencyLocale = (newLocale: CurrencyLocale): void => {
    setCurrencyLocaleState(newLocale);
  };
  
  const login = async (email: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Verifica se as credenciais são do admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser = {
            id: 'admin-1',
            name: 'Administrador',
            email: ADMIN_EMAIL,
            role: 'admin'
          };
          
          setUser(adminUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(adminUser));
          resolve();
        } 
        // Verificação para outros usuários simulados (mantém a lógica anterior)
        else if (email && password) {
          const mockUser = {
            id: '1',
            name: 'Usuário da Igreja',
            email,
            role: 'user'
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 500);
    });
  };
  
  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  // Create context value object with explicit type to prevent circular references
  const contextValue: AppContextValue = {
    theme,
    setTheme,
    language,
    setLanguage,
    currencyLocale,
    setCurrencyLocale,
    isAuthenticated,
    user,
    login,
    logout
  };
  
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
