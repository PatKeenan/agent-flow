import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { CalendarEvent } from "./calender-types";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
}

export function MonthView({ date, events, onDateSelect }: MonthViewProps) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = calendarStart;

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        (eventStart <= day && eventEnd >= day) || // Event spans over this day
        isSameDay(eventStart, day) // Event starts on this day
      );
    });
  };

  while (day <= calendarEnd) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = getEventsForDay(day);

      days.push(
        <div
          key={day.toString()}
          className={`min-h-[120px] p-2 border-r border-b relative cursor-pointer hover:bg-gray-100 ${
            isSameMonth(day, monthStart) ? "bg-gray-50" : ""
          }`}
          onClick={() => onDateSelect(day)}
          onKeyDown={(e) => e.key === "Enter" && onDateSelect(day)}
          role="button"
          tabIndex={0}
        >
          <div
            className={`text-sm ${
              isSameDay(day, new Date())
                ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                : ""
            }`}
          >
            {format(day, "d")}
          </div>
          <div className="mt-2 space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 bg-blue-100 text-blue-700 rounded truncate"
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <Button onClick={() => onDateSelect(date)} className="mb-4">
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>
      <div className="grid grid-cols-7 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-sm font-medium text-gray-700 text-center border-r"
          >
            {day}
          </div>
        ))}
      </div>
      <div>{rows}</div>
    </div>
  );
}
