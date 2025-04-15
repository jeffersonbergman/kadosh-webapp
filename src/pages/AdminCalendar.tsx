
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addMonths, subMonths } from "date-fns";
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Event } from '@/types/calendar';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import AddEventDialog from '@/components/calendar/AddEventDialog';
import SelectedDateEvents from '@/components/calendar/SelectedDateEvents';
import EventTabs from '@/components/calendar/EventTabs';

const AdminCalendar = () => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  const handleAddEvent = (newEventData: Omit<Event, 'id'>) => {
    const newEventObj: Event = {
      id: (events.length + 1).toString(),
      ...newEventData
    };

    setEvents([...events, newEventObj]);
    setIsDialogOpen(false);
    toast.success("Evento adicionado com sucesso!");
  };

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
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus size={18} className="mr-2" /> {t('administrative.addEvent')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CalendarHeader 
                currentMonth={currentMonth}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
              />
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

          {/* Events for selected date */}
          <SelectedDateEvents selectedDate={selectedDate} events={events} />
        </div>

        {/* Event tabs section */}
        <div className="mt-6">
          <EventTabs events={events} />
        </div>

        {/* Add event dialog */}
        <AddEventDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          selectedDate={selectedDate}
          onAddEvent={handleAddEvent}
        />
      </div>
    </MainLayout>
  );
};

export default AdminCalendar;
