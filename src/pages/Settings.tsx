
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Profile is now the only setting managed in this page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab !== 'profile') {
      navigate('/configuracoes?tab=profile');
    }
  }, [location, navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t('settings.profile')}</h1>
        
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
    </MainLayout>
  );
};

export default Settings;
