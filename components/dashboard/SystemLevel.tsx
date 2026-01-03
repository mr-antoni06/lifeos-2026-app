'use client';

import { Habit, HabitLog } from '@/lib/types';
import { Zap } from 'lucide-react';

interface SystemLevelProps {
  habits: Habit[];
  logs: HabitLog[];
}

export default function SystemLevel({ habits, logs }: SystemLevelProps) {
  const totalLevel = habits.reduce((sum, h) => sum + h.level, 0);
  const avgLevel = habits.length > 0 ? Math.floor(totalLevel / habits.length) : 0;
  
  return (
    <div className="border border-cyber-neon bg-cyber-panel rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded bg-cyber-neon/10 border border-cyber-neon flex items-center justify-center">
          <Zap className="w-8 h-8 text-cyber-neon" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide mb-1">
            SYSTEM LEVEL
          </h2>
          <p className="text-xs text-cyber-text-dim uppercase tracking-wider">
            COMBINED METRICS
          </p>
        </div>
      </div>
    </div>
  );
}
