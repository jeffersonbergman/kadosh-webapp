
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

export interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  theme: 'light',
  setTheme: () => {},
  language: 'pt',
  setLanguage: () => {}
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const updateLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      theme: theme || 'light',
      setTheme,
      language,
      setLanguage: updateLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
