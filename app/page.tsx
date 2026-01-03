'use client';

import { useEffect } from 'react';
import { useLifeOSStore } from '@/lib/store';
import HabitCard from '@/components/habits/HabitCard';
import HeatmapCalendar from '@/components/dashboard/HeatmapCalendar';
import StreakCounter from '@/components/dashboard/StreakCounter';
import AddHabitButton from '@/components/habits/AddHabitButton';
import StatsOverview from '@/components/dashboard/StatsOverview';
import { Activity, TrendingUp, Zap } from 'lucide-react';

export default function Dashboard() {
  const { habits, logs, updateStreaks } = useLifeOSStore();

  useEffect(() => {
    // Update streaks on mount
    updateStreaks();
  }, [updateStreaks]);

  const totalHabits = habits.length;
  const activeStreaks = habits.filter((h) => h.streak > 0).length;
  const todayLogs = logs.filter((l) => {
    const today = new Date().toISOString().split('T')[0];
    return l.date === today;
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-2 border-cyber-neon bg-cyber-dark p-6 rounded-lg shadow-neon">
        <h1 className="text-4xl font-bold mb-2 text-cyber-neon glitch" data-text="CYBERPUNK LIFEOS">
          CYBERPUNK LIFEOS
        </h1>
        <p className="text-cyber-neon/70 text-sm">
          {'>'} SYSTEM ONLINE | STATUS: OPERATIONAL | USER: HIGH PERFORMER
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsOverview
          title="Total Habits"
          value={totalHabits}
          icon={Activity}
          color="text-cyber-neon"
        />
        <StatsOverview
          title="Active Streaks"
          value={activeStreaks}
          icon={Zap}
          color="text-cyber-blue"
        />
        <StatsOverview
          title="Today's Logs"
          value={todayLogs.length}
          icon={TrendingUp}
          color="text-cyber-purple"
        />
      </div>

      {/* Heatmap & Streak Counter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HeatmapCalendar logs={logs} />
        </div>
        <div className="lg:col-span-1">
          <StreakCounter habits={habits} />
        </div>
      </div>

      {/* Habits Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyber-neon">
            {'>'} YOUR_HABITS.exe
          </h2>
          <AddHabitButton />
        </div>

        {habits.length === 0 ? (
          <div className="border-2 border-cyber-gray bg-cyber-dark p-12 rounded-lg text-center">
            <p className="text-cyber-neon/50 text-lg mb-4">
              {'>'} NO HABITS DETECTED
            </p>
            <p className="text-cyber-neon/30 text-sm">
              Initialize your first habit to begin the transformation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
