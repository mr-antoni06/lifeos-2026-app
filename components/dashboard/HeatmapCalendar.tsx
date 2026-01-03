'use client';

import { useMemo } from 'react';
import { HabitLog } from '@/lib/types';
import { generateHeatmapData } from '@/lib/utils';
import { format, startOfYear, eachWeekOfInterval, eachDayOfInterval, startOfWeek, endOfWeek, getDay } from 'date-fns';

interface HeatmapCalendarProps {
  logs: HabitLog[];
}

export default function HeatmapCalendar({ logs }: HeatmapCalendarProps) {
  const heatmapData = useMemo(() => {
    return generateHeatmapData(logs, 365);
  }, [logs]);

  const dataMap = useMemo(() => {
    const map: Record<string, number> = {};
    heatmapData.forEach(({ date, count }) => {
      map[date] = count;
    });
    return map;
  }, [heatmapData]);

  const yearStart = startOfYear(new Date());
  const weeks = eachWeekOfInterval({
    start: yearStart,
    end: new Date(),
  });

  const getColor = (count: number) => {
    if (count === 0) return '#1a1a1a';
    if (count <= 2) return '#00331a';
    if (count <= 5) return '#00661a';
    if (count <= 8) return '#00991a';
    return '#00ff41';
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyber-neon mb-4">
        {'>'} ACTIVITY_HEATMAP.render()
      </h3>
      
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((weekStart, weekIndex) => {
            const days = eachDayOfInterval({
              start: weekStart,
              end: endOfWeek(weekStart),
            });

            return (
              <div key={weekIndex} className="flex flex-col gap-1">
                {days.map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const count = dataMap[dateStr] || 0;
                  const color = getColor(count);

                  return (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm transition-all hover:scale-150 hover:z-10 relative group"
                      style={{ backgroundColor: color }}
                      title={`${dateStr}: ${count} logs`}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-cyber-black border border-cyber-neon rounded text-xs text-cyber-neon whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {format(day, 'MMM d, yyyy')}<br />
                        {count} {count === 1 ? 'log' : 'logs'}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-cyber-neon/50">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 2, 5, 8, 10].map((count) => (
            <div
              key={count}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getColor(count) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
