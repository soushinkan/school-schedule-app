import React, { useState, useRef } from 'react';
import { format, addDays, subDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import { SchoolSession, CalendarCell } from '../types';
import { Calendar } from 'lucide-react';

interface CalendarProps {
  sessions: SchoolSession[];
  onSchoolClick: (session: SchoolSession) => void;
}

export const CalendarView: React.FC<CalendarProps> = ({ sessions, onSchoolClick }) => {
  const today = new Date();
  const startDate = subDays(today, 7);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate dates for 30 days
  const dates = Array.from({ length: 30 }, (_, i) => addDays(startDate, i));

  // Get unique months
  const months = Array.from(new Set(dates.map(date => format(date, 'M月', { locale: ja }))));

  // Sort sessions by application deadline
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
  );

  const getCellType = (session: SchoolSession, date: Date): CalendarCell['type'] | undefined => {
    const currentDate = format(date, 'yyyy-MM-dd');
    
    if (currentDate === session.sessionDate) return 'session';
    if (currentDate >= session.applicationStartDate && currentDate <= session.applicationDeadline) return 'application';
    return undefined;
  };

  const getMonthColSpan = (month: string, index: number) => {
    let count = 0;
    let currentMonth = format(dates[index], 'M月', { locale: ja });
    while (index < dates.length && currentMonth === month) {
      count++;
      index++;
      if (index < dates.length) {
        currentMonth = format(dates[index], 'M月', { locale: ja });
      }
    }
    return count;
  };

  return (
    <div className="w-full overflow-x-auto" ref={containerRef}>
      <div className="inline-block min-w-full">
        <div className="border border-gray-200 rounded-lg">
          {/* Header */}
          <div className="grid grid-cols-[200px_repeat(30,40px)] sticky top-0 bg-white z-10">
            {/* Month Row */}
            <div className="p-2 font-semibold border-r border-b border-gray-200 bg-gray-50 row-span-3">
              学校名
            </div>
            <div className="contents">
              {months.map((month, idx) => {
                const colSpan = getMonthColSpan(month, dates.findIndex(date => 
                  format(date, 'M月', { locale: ja }) === month
                ));
                return (
                  <div
                    key={month}
                    className="p-0.5 text-sm border-r border-b border-gray-200 bg-gray-50 text-center font-semibold"
                    style={{ gridColumn: `span ${colSpan}` }}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
            
            {/* Date Row */}
            {dates.map((date) => (
              <div
                key={`date-${date.toISOString()}`}
                className="p-0.5 text-xs border-r border-b border-gray-200 bg-gray-50 text-center"
              >
                {format(date, 'd', { locale: ja })}
              </div>
            ))}
            
            {/* Weekday Row */}
            {dates.map((date) => (
              <div
                key={`weekday-${date.toISOString()}`}
                className="p-0.5 text-[10px] border-r border-b border-gray-200 bg-gray-50 text-center text-gray-500"
              >
                {format(date, 'E', { locale: ja })}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          {sortedSessions.map((session) => (
            <div key={session.id} className="grid grid-cols-[200px_repeat(30,40px)]">
              <div
                className="p-2 border-r border-b border-gray-200 sticky left-0 bg-white cursor-pointer hover:bg-gray-50"
                onClick={() => onSchoolClick(session)}
              >
                <div className="font-medium truncate">{session.schoolName}</div>
              </div>
              {dates.map((date) => {
                const cellType = getCellType(session, date);
                return (
                  <div
                    key={date.toISOString()}
                    className={`border-r border-b border-gray-200 ${
                      cellType === 'session' ? 'bg-green-100' :
                      cellType === 'application' ? 'bg-yellow-100' : ''
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};