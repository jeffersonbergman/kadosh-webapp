
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { setCurrencyLocale } from '@/utils/currency';

type Theme = 'light' | 'dark';
type Language = 'pt' | 'en' | 'es';
type CurrencyLocale = 'pt-BR' | 'en-US' | 'en-GB' | 'es-ES' | 'de-DE' | 'fr-FR';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppContextType {
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

const AppContext = createContext<AppContextType | undefined>(undefined);

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
    setCurrencyLocale(currencyLocale);
  }, [currencyLocale]);
  
  // Efeito para verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      // Aqui seria uma verificação real com backend
      // Por enquanto, apenas simulamos com localStorage
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
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };
  
  const setCurrencyLocaleInternal = (newLocale: CurrencyLocale) => {
    setCurrencyLocaleState(newLocale);
  };
  
  const login = async (email: string, password: string) => {
    // Simulação de login - em produção, isso seria uma chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // Mock user
          const mockUser = {
            id: '1',
            name: 'Usuário da Igreja',
            email,
            role: 'admin'
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    currencyLocale,
    setCurrencyLocale: setCurrencyLocaleInternal,
    isAuthenticated,
    user,
    login,
    logout
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
