'use client';

import { useState } from 'react';
import { Habit } from '@/lib/types';
import { useLifeOSStore } from '@/lib/store';
import { getLevelColor, getStreakEmoji } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Trash2, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { logProgress, deleteHabit } = useLifeOSStore();
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Get icon dynamically
  const IconComponent = (LucideIcons as any)[habit.icon] || LucideIcons.Target;

  const progressPercentage = (habit.xp / habit.xpToNextLevel) * 100;
  const levelColor = getLevelColor(habit.level);
  const streakEmoji = getStreakEmoji(habit.streak);

  const handleLogProgress = () => {
    const value = parseFloat(inputValue);
    if (value > 0) {
      const result = logProgress(habit.id, value);
      
      // Trigger confetti on level up
      if (result.leveledUp) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff41', '#00d9ff', '#c900ff'],
        });
        
        // Additional neon flash effect
        const card = document.getElementById(`habit-${habit.id}`);
        if (card) {
          card.classList.add('animate-pulse-neon');
          setTimeout(() => {
            card.classList.remove('animate-pulse-neon');
          }, 2000);
        }
      }
      
      setInputValue('');
      setShowInput(false);
    }
  };

  const quickLog = (multiplier: number) => {
    const value = habit.target * multiplier;
    const result = logProgress(habit.id, value);
    
    if (result.leveledUp) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff41', '#00d9ff', '#c900ff'],
      });
    }
  };

  return (
    <div
      id={`habit-${habit.id}`}
      className="bg-cyber-dark border-2 border-cyber-gray hover:border-cyber-neon transition-all duration-300 rounded-lg p-4 relative overflow-hidden group"
      style={{ borderColor: habit.color + '40' }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ backgroundColor: habit.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: habit.color + '20', color: habit.color }}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-cyber-neon">{habit.name}</h3>
            <p className="text-xs text-cyber-neon/50">
              Target: {habit.target} {habit.unit}/day
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => {
            if (confirm(`Delete "${habit.name}"? This cannot be undone.`)) {
              deleteHabit(habit.id);
            }
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-cyber-red/20 rounded"
        >
          <Trash2 className="w-4 h-4 text-cyber-red" />
        </button>
      </div>

      {/* Level & Streak */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded border-2 font-bold text-sm"
            style={{ borderColor: levelColor, color: levelColor }}
          >
            LVL {habit.level}
          </div>
          <div className="text-2xl">{streakEmoji}</div>
          <span className="text-sm text-cyber-neon/70">{habit.streak} days</span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4 relative z-10">
        <div className="flex justify-between text-xs text-cyber-neon/50 mb-1">
          <span>XP: {habit.xp}</span>
          <span>{habit.xpToNextLevel}</span>
        </div>
        <div className="h-3 bg-cyber-black rounded-full overflow-hidden border border-cyber-gray">
          <div
            className="h-full transition-all duration-500 ease-out relative"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: levelColor,
              boxShadow: `0 0 10px ${levelColor}`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 relative z-10">
        {!showInput ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLog(0.5)}
                className="px-3 py-2 bg-cyber-gray hover:bg-cyber-neon/20 border border-cyber-neon/30 hover:border-cyber-neon rounded text-sm text-cyber-neon transition-all"
              >
                50%
              </button>
              <button
                onClick={() => quickLog(1)}
                className="px-3 py-2 bg-cyber-gray hover:bg-cyber-neon/20 border border-cyber-neon/30 hover:border-cyber-neon rounded text-sm text-cyber-neon transition-all"
              >
                100%
              </button>
              <button
                onClick={() => quickLog(1.5)}
                className="px-3 py-2 bg-cyber-gray hover:bg-cyber-neon/20 border border-cyber-neon/30 hover:border-cyber-neon rounded text-sm text-cyber-neon transition-all"
              >
                150%
              </button>
            </div>
            <button
              onClick={() => setShowInput(true)}
              className="w-full px-4 py-2 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Log Custom
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${habit.unit}...`}
                className="flex-1 px-3 py-2 bg-cyber-black border border-cyber-neon/30 focus:border-cyber-neon rounded text-cyber-neon outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogProgress();
                  if (e.key === 'Escape') setShowInput(false);
                }}
              />
              <button
                onClick={handleLogProgress}
                className="px-4 py-2 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all"
              >
                ✓
              </button>
            </div>
            <button
              onClick={() => setShowInput(false)}
              className="w-full px-4 py-2 bg-cyber-gray hover:bg-cyber-red/20 text-cyber-neon rounded transition-all flex items-center justify-center gap-2"
            >
              <Minus className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
