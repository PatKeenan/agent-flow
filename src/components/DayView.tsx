import { format, addHours, startOfDay } from "date-fns";
import { CalendarEvent } from "./calender-types";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayView({ date, events, onDateSelect }: DayViewProps) {
  const getEventsForTimeSlot = (timeSlot: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        (eventStart <= timeSlot && eventEnd >= timeSlot) || // Event spans over this timeslot
        format(eventStart, "HH") === format(timeSlot, "HH") // Event starts in this hour
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-w-[768px]">
        {HOURS.map((hour) => {
          const timeSlot = addHours(startOfDay(date), hour);
          const timeEvents = getEventsForTimeSlot(timeSlot);

          return (
            <div key={hour} className="flex border-b border-gray-200">
              <div className="w-20 py-4 px-4 text-right text-gray-500 text-sm sticky left-0 bg-white">
                {format(timeSlot, "ha")}
              </div>
              <div
                className="flex-1 min-h-[64px] group cursor-pointer hover:bg-gray-50"
                onClick={() => onDateSelect(timeSlot)}
                onKeyDown={(e) => e.key === "Enter" && onDateSelect(timeSlot)}
                role="button"
                tabIndex={0}
              >
                {timeEvents.map((event) => (
                  <div
                    key={event.id}
                    className="mx-2 mb-1 p-2 text-sm bg-blue-100 text-blue-700 rounded"
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs text-blue-600">
                      {event.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
