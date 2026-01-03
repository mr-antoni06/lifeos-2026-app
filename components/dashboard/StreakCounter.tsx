'use client';

import { Habit } from '@/lib/types';
import { getStreakEmoji } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  habits: Habit[];
}

export default function StreakCounter({ habits }: StreakCounterProps) {
  const sortedHabits = [...habits].sort((a, b) => b.streak - a.streak);

  return (
    <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-6 h-6 text-cyber-neon animate-pulse" />
        <h3 className="text-xl font-bold text-cyber-neon">
          {'>'} STREAK_TRACKER
        </h3>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-8 text-cyber-neon/30">
          No habits to track
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHabits.map((habit) => {
            const emoji = getStreakEmoji(habit.streak);
            const isActive = habit.streak > 0;

            return (
              <div
                key={habit.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-cyber-neon/50 bg-cyber-neon/5'
                    : 'border-cyber-gray/50 bg-cyber-gray/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <p className={`font-semibold ${isActive ? 'text-cyber-neon' : 'text-cyber-neon/50'}`}>
                        {habit.name}
                      </p>
                      <p className="text-xs text-cyber-neon/30">
                        Best: {habit.longestStreak} days
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${isActive ? 'text-cyber-neon' : 'text-cyber-neon/30'}`}>
                      {habit.streak}
                    </p>
                    <p className="text-xs text-cyber-neon/50">days</p>
                  </div>
                </div>

                {/* Streak Progress Indicator */}
                {isActive && (
                  <div className="mt-2 h-1 bg-cyber-black rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyber-neon transition-all duration-500"
                      style={{
                        width: `${Math.min((habit.streak / 30) * 100, 100)}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
