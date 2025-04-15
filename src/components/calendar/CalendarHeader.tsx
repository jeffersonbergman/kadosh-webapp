
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-medium">{t('administrative.churchCalendar')}</div>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={onPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center px-2 font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
