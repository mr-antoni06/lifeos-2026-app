'use client';

import { useMemo } from 'react';
import { HabitLog } from '@/lib/types';
import { generateHeatmapData } from '@/lib/utils';
import { format, startOfYear, eachWeekOfInterval, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

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
    if (count <= 2) return '#1f3d2e';
    if (count <= 5) return '#2d5a40';
    if (count <= 8) return '#3b7752';
    return '#00ff41';
  };

  return (
    <div className="bg-cyber-panel border border-cyber-gray rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyber-neon" />
        <h3 className="text-sm font-medium text-cyber-text-muted tracking-wider uppercase">
          SYSTEM ACTIVITY LOG
        </h3>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[2px]">
          {weeks.map((weekStart, weekIndex) => {
            const days = eachDayOfInterval({
              start: weekStart,
              end: endOfWeek(weekStart),
            });

            return (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {days.map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const count = dataMap[dateStr] || 0;
                  const color = getColor(count);

                  return (
                    <div
                      key={dayIndex}
                      className="w-[10px] h-[10px] rounded-[1px] transition-all hover:scale-125 relative group cursor-pointer"
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
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyber-gray">
        <div className="flex items-center gap-2 text-xs text-cyber-text-dim uppercase tracking-wider">
          <span>IDLE</span>
          <div className="flex gap-1">
            {[0, 2, 5, 8, 10].map((count) => (
              <div
                key={count}
                className="w-3 h-3 rounded-[1px]"
                style={{ backgroundColor: getColor(count) }}
              />
            ))}
          </div>
          <span>OVERCLOCK</span>
        </div>
      </div>
    </div>
  );
}
