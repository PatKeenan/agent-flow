import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { CalendarEvent } from "./calender-types";

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
}

export function WeekView({ date, events }: WeekViewProps) {
  const weekStart = startOfWeek(date);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-7 border-b">
        {days.map((day) => (
          <div
            key={day.toString()}
            className="p-2 text-center border-r last:border-r-0"
          >
            <div className="text-sm font-medium">{format(day, "EEE")}</div>
            <div
              className={`text-2xl ${
                isSameDay(day, new Date()) ? "text-blue-600 font-bold" : ""
              }`}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 h-full">
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(new Date(event.start), day)
          );

          return (
            <div
              key={day.toString()}
              className="border-r min-h-[600px] relative"
            >
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="mx-1 my-1 p-2 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-blue-600">
                    {format(new Date(event.start), "h:mm a")}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
