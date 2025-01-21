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

type CalendarState = {
  view: ViewType;
  currentDate: Date;
  events: CalendarEvent[];
  isEventDialogOpen: boolean;
  selectedDate: Date | undefined;
};

const calendarReducer = (
  state: CalendarState,
  action: Partial<CalendarState>
) => ({ ...state, ...action });

function Calendar() {
  const [state, dispatch] = React.useReducer(calendarReducer, {
    view: "month",
    currentDate: new Date(),
    events: sampleEvents,
    isEventDialogOpen: false,
    selectedDate: undefined,
  });

  const handlePrevious = () => {
    switch (state.view) {
      case "day":
        dispatch({ currentDate: subDays(state.currentDate, 1) });
        break;
      case "week":
        dispatch({ currentDate: subWeeks(state.currentDate, 1) });
        break;
      case "month":
        dispatch({ currentDate: subMonths(state.currentDate, 1) });
        break;
    }
  };

  const handleNext = () => {
    switch (state.view) {
      case "day":
        dispatch({ currentDate: addDays(state.currentDate, 1) });
        break;
      case "week":
        dispatch({ currentDate: addWeeks(state.currentDate, 1) });
        break;
      case "month":
        dispatch({ currentDate: addMonths(state.currentDate, 1) });
        break;
    }
  };

  const handleToday = () => {
    dispatch({ currentDate: new Date() });
  };

  const handleDateSelect = (date: Date) => {
    dispatch({ selectedDate: date, isEventDialogOpen: true });
  };

  const handleSaveEvent = (newEvent: Omit<CalendarEvent, "id">) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: crypto.randomUUID(),
    };
    dispatch({ events: [...state.events, event] });
  };

  return (
    <div className="flex flex-col h-full p-4">
      <CalendarHeader
        currentDate={state.currentDate}
        view={state.view}
        onViewChange={(view) => dispatch({ view })}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />
      {state.view === "day" && (
        <DayView
          date={state.currentDate}
          events={state.events}
          onDateSelect={handleDateSelect}
        />
      )}
      {state.view === "week" && (
        <WeekView
          date={state.currentDate}
          events={state.events}
          onDateSelect={handleDateSelect}
        />
      )}
      {state.view === "month" && (
        <MonthView
          date={state.currentDate}
          events={state.events}
          onDateSelect={handleDateSelect}
        />
      )}
      <EventDialog
        isOpen={state.isEventDialogOpen}
        onClose={() => dispatch({ isEventDialogOpen: false })}
        onSave={handleSaveEvent}
        initialDate={state.selectedDate}
      />
    </div>
  );
}
