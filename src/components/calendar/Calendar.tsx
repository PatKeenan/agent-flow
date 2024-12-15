import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import type { ViewType, CalendarEvent } from './types';

// Sample events - replace with actual data from your backend
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Property Viewing',
    start: '2024-03-15T10:00:00',
    end: '2024-03-15T11:00:00',
    location: '123 Main St',
  },
  {
    id: '2',
    title: 'Client Meeting',
    start: '2024-03-15T14:00:00',
    end: '2024-03-15T15:00:00',
    location: 'Office',
  },
];

export default function Calendar() {
  const [view, setView] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevious = () => {
    switch (view) {
      case 'day':
        setCurrentDate(subDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(subMonths(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(addMonths(currentDate, 1));
        break;
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />
      {view === 'day' && <DayView date={currentDate} events={sampleEvents} />}
      {view === 'week' && <WeekView date={currentDate} events={sampleEvents} />}
      {view === 'month' && <MonthView date={currentDate} events={sampleEvents} />}
    </div>
  );
}