
import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const Settings = () => {
  const { t } = useTranslation();
  const { 
    theme, setTheme, 
    language, setLanguage, 
    currencyLocale, setCurrencyLocale: setCurrencyLocaleContext 
  } = useApp();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'pt' | 'en' | 'es');
    toast.success(t('settings.languageChanged'));
  };

  const handleCurrencyChange = (value: string) => {
    setCurrencyLocaleContext(value as any);
    toast.success(t('settings.currencyChanged'));
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark');
    toast.success(t('settings.themeChanged'));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t('settings.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                {t('settings.languageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.currency')}</CardTitle>
              <CardDescription>
                {t('settings.currencyDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={currencyLocale} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Real (R$)</SelectItem>
                  <SelectItem value="en-US">US Dollar ($)</SelectItem>
                  <SelectItem value="en-GB">Pound Sterling (£)</SelectItem>
                  <SelectItem value="es-ES">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.theme')}</CardTitle>
              <CardDescription>
                {t('settings.themeDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('settings.lightTheme')}</SelectItem>
                  <SelectItem value="dark">{t('settings.darkTheme')}</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.profile')}</CardTitle>
              <CardDescription>
                {t('settings.profileDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button variant="outline">{t('settings.editProfile')}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
