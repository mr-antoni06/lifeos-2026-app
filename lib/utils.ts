import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { HabitLog } from './types';

export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const getDateRange = (timeframe: 'week' | 'month' | 'year'): { start: Date; end: Date } => {
  const now = new Date();
  
  switch (timeframe) {
    case 'week':
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case 'month':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now),
      };
    case 'year':
      return {
        start: startOfYear(now),
        end: endOfYear(now),
      };
  }
};

export const generateHeatmapData = (logs: HabitLog[], daysBack: number = 365) => {
  const now = new Date();
  const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  
  const dateMap: Record<string, number> = {};
  
  // Initialize all dates with 0
  const days = eachDayOfInterval({ start: startDate, end: now });
  days.forEach((day) => {
    dateMap[format(day, 'yyyy-MM-dd')] = 0;
  });
  
  // Count logs per day
  logs.forEach((log) => {
    if (dateMap[log.date] !== undefined) {
      dateMap[log.date]++;
    }
  });
  
  return Object.entries(dateMap).map(([date, count]) => ({
    date,
    count,
  }));
};

export const getStreakEmoji = (streak: number): string => {
  if (streak === 0) return '💀';
  if (streak < 7) return '🔥';
  if (streak < 30) return '⚡';
  if (streak < 100) return '💎';
  return '👑';
};

export const getLevelColor = (level: number): string => {
  if (level < 5) return '#00ff41'; // Neon green
  if (level < 10) return '#00d9ff'; // Cyan
  if (level < 20) return '#c900ff'; // Purple
  return '#ffd700'; // Gold
};
