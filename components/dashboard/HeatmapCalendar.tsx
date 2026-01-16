'use client';

import { useMemo } from 'react';
import { HabitLog } from '@/lib/types';
import { generateHeatmapData } from '@/lib/utils';
import { format, startOfYear, eachWeekOfInterval, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import GlassContainer from '@/components/ui/GlassContainer';
import TextDecoder from '@/components/ui/TextDecoder';
import { motion } from 'framer-motion';

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
    if (count <= 2) return 'rgba(0, 255, 65, 0.2)';
    if (count <= 5) return 'rgba(0, 255, 65, 0.4)';
    if (count <= 8) return 'rgba(0, 255, 65, 0.6)';
    return '#00ff41';
  };

  const getGlow = (count: number) => {
    if (count === 0) return 'none';
    if (count <= 2) return '0 0 2px rgba(0, 255, 65, 0.3)';
    if (count <= 5) return '0 0 4px rgba(0, 255, 65, 0.5)';
    if (count <= 8) return '0 0 6px rgba(0, 255, 65, 0.7)';
    return '0 0 8px rgba(0, 255, 65, 1)';
  };

  return (
    <GlassContainer enableSpotlight={true} enableScanline={true} className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyber-neon shadow-neon"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <h3 className="text-sm font-medium text-cyber-text-muted tracking-wider uppercase">
          <TextDecoder text="SYSTEM ACTIVITY LOG" speed={30} />
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
                    <motion.div
                      key={dayIndex}
                      className="w-[10px] h-[10px] rounded-[1px] relative group cursor-pointer"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: getGlow(count),
                      }}
                      title={`${dateStr}: ${count} logs`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      animate={count > 0 ? {
                        boxShadow: [
                          getGlow(count),
                          `0 0 ${count * 2}px rgba(0, 255, 65, ${Math.min(count * 0.2, 1)})`,
                          getGlow(count),
                        ],
                      } : {}}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-cyber-black/90 backdrop-blur-sm border border-cyber-neon rounded text-xs text-cyber-neon whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-neon">
                        <span className="font-computation">{format(day, 'MMM d, yyyy')}</span><br />
                        <span className="text-cyber-neon-bright font-computation">{count} {count === 1 ? 'log' : 'logs'}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyber-gray/50">
        <div className="flex items-center gap-2 text-xs text-cyber-text-dim uppercase tracking-wider font-computation">
          <span className="text-cyber-text-dim">IDLE</span>
          <div className="flex gap-1">
            {[0, 2, 5, 8, 10].map((count) => (
              <motion.div
                key={count}
                className="w-3 h-3 rounded-[1px]"
                style={{ 
                  backgroundColor: getColor(count),
                  boxShadow: getGlow(count),
                }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              />
            ))}
          </div>
          <span className="text-neon-glow">OVERCLOCK</span>
        </div>
      </div>
    </GlassContainer>
  );
}
