
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  type: 'service' | 'meeting' | 'special' | 'other';
}

const AdminCalendar = () => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Dummy events data - in a real app this would come from an API
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Culto de Domingo',
      date: new Date(2025, 3, 20, 19, 0),
      time: '19:00',
      description: 'Culto semanal de domingo',
      type: 'service'
    },
    {
      id: '2',
      title: 'Reunião de Líderes',
      date: new Date(2025, 3, 22, 20, 0),
      time: '20:00',
      description: 'Reunião mensal de líderes',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Culto de Louvor',
      date: new Date(2025, 3, 25, 19, 30),
      time: '19:30',
      description: 'Culto especial de louvor',
      type: 'special'
    }
  ]);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Filter events for the selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() && 
        event.date.getMonth() === selectedDate.getMonth() && 
        event.date.getFullYear() === selectedDate.getFullYear())
    : [];

  // Get dates that have events for highlighting on the calendar
  const eventDates = events.map(event => event.date);
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t('administrative.calendarTitle')}</h1>
            <p className="text-gray-500">{t('administrative.calendarDescription')}</p>
          </div>
          <Button>
            <Plus size={18} className="mr-2" /> {t('administrative.addEvent')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{t('administrative.churchCalendar')}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center px-2 font-medium">
                    {format(currentMonth, 'MMMM yyyy')}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border p-3 pointer-events-auto"
                modifiers={{
                  event: eventDates,
                }}
                modifiersStyles={{
                  event: { 
                    fontWeight: 'bold',
                    backgroundColor: '#e5deff', 
                    color: '#7e69ab',
                    borderRadius: '4px'
                  }
                }}
                classNames={{
                  day_today: "bg-church-light text-church-primary",
                }}
              />
            </CardContent>
          </Card>

          {/* Events section */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  <span>{format(selectedDate, 'dd/MM/yyyy')}</span>
                ) : (
                  t('administrative.selectDate')
                )}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length > 0 
                  ? t('administrative.eventsCount', { count: selectedDateEvents.length }) 
                  : t('administrative.noEvents')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-base">{event.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{event.time} - {event.description}</p>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          event.type === 'service' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'meeting' ? 'bg-amber-100 text-amber-800' :
                          event.type === 'special' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {t(`administrative.eventType.${event.type}`)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">{t('administrative.noEventsTitle')}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDate ? t('administrative.noEventsForDate') : t('administrative.selectDateToSeeEvents')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">{t('administrative.upcomingEvents')}</TabsTrigger>
              <TabsTrigger value="past">{t('administrative.pastEvents')}</TabsTrigger>
              <TabsTrigger value="recurring">{t('administrative.recurringEvents')}</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('administrative.upcomingEvents')}</CardTitle>
                  <CardDescription>{t('administrative.upcomingEventsDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter(event => event.date >= new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((event) => (
                        <div key={event.id} className="p-3 border rounded-md hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-base">{event.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {format(event.date, 'dd/MM/yyyy')} - {event.time}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            </div>
                            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                              event.type === 'service' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'meeting' ? 'bg-amber-100 text-amber-800' :
                              event.type === 'special' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {t(`administrative.eventType.${event.type}`)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('administrative.pastEvents')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{t('administrative.pastEventsPlaceholder')}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recurring" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('administrative.recurringEvents')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{t('administrative.recurringEventsPlaceholder')}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminCalendar;
