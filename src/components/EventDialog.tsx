import * as React from "react";
import { format, isSameDay, addDays } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import type { CalendarEvent } from "./calender-types";
import { Checkbox } from "./ui/checkbox";

// Generate time options for every 30 minutes
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      options.push(time);
    }
  }
  return options;
};

const TIME_OPTIONS = generateTimeOptions();

type EventDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  initialDate?: Date;
};

type EventDialogState = {
  title: string;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  startTime: string;
  endTime: string;
  isMultipleDays: boolean;
};

const eventDialogReducer = (
  state: EventDialogState,
  action: Partial<EventDialogState>
) => ({ ...state, ...action });

export const EventDialog = ({
  isOpen,
  onClose,
  onSave,
  initialDate,
}: EventDialogProps) => {
  console.log(isOpen);
  const [state, dispatch] = React.useReducer(eventDialogReducer, {
    title: "",
    location: "",
    startDate: initialDate,
    endDate: initialDate,
    startTime: "09:00",
    endTime: "10:00",
    isMultipleDays: false,
  });

  const handleStartDateChange = (date: Date | undefined) => {
    dispatch({ startDate: date });
    if (!state.isMultipleDays && date) {
      dispatch({ endDate: date });
    }
  };

  const isSingleDayEvent =
    state.startDate &&
    state.endDate &&
    isSameDay(state.startDate, state.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.startDate || !state.endDate) return;

    const start = new Date(state.startDate);
    const end = new Date(state.endDate);

    if (isSingleDayEvent) {
      const [startHours, startMinutes] = state.startTime.split(":").map(Number);
      const [endHours, endMinutes] = state.endTime.split(":").map(Number);

      start.setHours(startHours, startMinutes);
      end.setHours(endHours, endMinutes);
    }

    onSave({
      title: state.title,
      location: state.location,
      start: start.toISOString(),
      end: end.toISOString(),
    });

    // Reset form
    dispatch({
      title: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      startTime: "09:00",
      endTime: "10:00",
      isMultipleDays: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={state.title}
              onChange={(e) => dispatch({ title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={state.location}
              onChange={(e) => dispatch({ location: e.target.value })}
            />
          </div>
          <div
            className={cn(
              "grid items-center gap-4",
              state.isMultipleDays
                ? "grid-cols-[2fr_1fr_2fr]"
                : "grid-cols-[5fr_1fr]"
            )}
          >
            <div className="space-y-2 flex flex-col items-center">
              <Label className="mr-auto">
                {state.isMultipleDays ? "Start Date" : "Date"}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !state.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state.startDate ? (
                      format(state.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={state.startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-4">
              <Checkbox
                id="multiple-days"
                checked={state.isMultipleDays}
                onCheckedChange={(checked) => {
                  dispatch({ isMultipleDays: checked === true });
                  if (checked && state.startDate) {
                    dispatch({ endDate: addDays(state.startDate, 1) });
                  } else {
                    dispatch({ endDate: state.startDate });
                  }
                }}
              />
              <Label
                htmlFor="multiple-days"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Multi Day
              </Label>
            </div>

            {state.isMultipleDays && (
              <div className="space-y-2 flex flex-col items-center">
                <Label className="mr-auto">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !state.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {state.endDate ? (
                        format(state.endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={state.endDate}
                      onSelect={(date) => dispatch({ endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {!state.isMultipleDays && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select
                  value={state.startTime}
                  onValueChange={(time) => dispatch({ startTime: time })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {format(
                          new Date().setHours(
                            Number(time.split(":")[0]),
                            Number(time.split(":")[1])
                          ),
                          "h:mm a"
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Select
                  value={state.endTime}
                  onValueChange={(time) => dispatch({ endTime: time })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {format(
                          new Date().setHours(
                            Number(time.split(":")[0]),
                            Number(time.split(":")[1])
                          ),
                          "h:mm a"
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Save Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
