import * as React from "react";
import { rootRoute } from "./_root-route";
import { createRoute } from "@tanstack/react-router";
import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";

import { CalendarHeader } from "@/components/CalendarHeader";
import { DayView } from "@/components/DayView";
import { WeekView } from "@/components/WeekView";
import { MonthView } from "@/components/MonthView";
import { EventDialog } from "@/components/EventDialog";
import type { ViewType, CalendarEvent } from "@/components/calender-types";

export const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: Calendar,
});

// Sample events - replace with actual data from your backend
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Property Viewing",
    start: "2024-03-15T10:00:00",
    end: "2024-03-15T11:00:00",
    location: "123 Main St",
  },
  {
    id: "2",
    title: "Client Meeting",
    start: "2024-03-15T14:00:00",
    end: "2024-03-15T15:00:00",
    location: "Office",
  },
];

function Calendar() {
  const [view, setView] = React.useState<ViewType>("month");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [events, setEvents] = React.useState<CalendarEvent[]>(sampleEvents);
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const handlePrevious = () => {
    switch (view) {
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (newEvent: Omit<CalendarEvent, "id">) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: crypto.randomUUID(),
    };
    setEvents([...events, event]);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />
      {view === "day" && (
        <DayView
          date={currentDate}
          events={events}
          onDateSelect={handleDateSelect}
        />
      )}
      {view === "week" && (
        <WeekView
          date={currentDate}
          events={events}
          onDateSelect={handleDateSelect}
        />
      )}
      {view === "month" && (
        <MonthView
          date={currentDate}
          events={events}
          onDateSelect={handleDateSelect}
        />
      )}
      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleSaveEvent}
        initialDate={selectedDate}
      />
    </div>
  );
}
