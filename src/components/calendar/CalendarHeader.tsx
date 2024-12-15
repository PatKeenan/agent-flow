import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewType } from './types';

interface CalendarHeaderProps {
  currentDate: Date;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
      ...(view === 'day' && { day: 'numeric' }),
    };
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{formatDate()}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Today
          </button>
        </div>
      </div>
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        {(['day', 'week', 'month'] as ViewType[]).map((viewType) => (
          <button
            key={viewType}
            onClick={() => onViewChange(viewType)}
            className={`px-4 py-2 text-sm font-medium rounded-md capitalize ${
              view === viewType
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {viewType}
          </button>
        ))}
      </div>
    </div>
  );
}