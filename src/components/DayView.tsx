import { format, addHours, startOfDay } from "date-fns";
import { CalendarEvent } from "./calender-types";

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayView({ date, events }: DayViewProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-w-[768px]">
        {HOURS.map((hour) => {
          const timeSlot = addHours(startOfDay(date), hour);
          const timeEvents = events.filter(
            (event) =>
              format(new Date(event.start), "HH") ===
              String(hour).padStart(2, "0")
          );

          return (
            <div key={hour} className="flex border-b border-gray-200">
              <div className="w-20 py-4 px-4 text-right text-gray-500 text-sm sticky left-0 bg-white">
                {format(timeSlot, "ha")}
              </div>
              <div className="flex-1 min-h-[64px] group">
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
