'use client';

import { useState, useRef, useEffect } from 'react';
import { Habit } from '@/lib/types';
import { useLifeOSStore } from '@/lib/store';
import { Zap, MoreVertical } from 'lucide-react';
import GlassContainer from '@/components/ui/GlassContainer';
import MagneticButton from '@/components/ui/MagneticButton';
import OverdriveModal from '@/components/ui/OverdriveModal';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export default function HabitCard({ habit, onEdit }: HabitCardProps) {
  const { logProgress, logs, deleteHabit } = useLifeOSStore();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showOverdrive, setShowOverdrive] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate today's progress
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter((l) => l.habitId === habit.id && l.date === today);
  const todayProgress = todayLogs.reduce((sum, log) => sum + log.value, 0);
  const progressPercentage = Math.min((todayProgress / habit.target) * 100, 100);

  // XP Progress
  const xpPercentage = (habit.xp / habit.xpToNextLevel) * 100;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleLog = (value: number) => {
    const result = logProgress(habit.id, value);
    
    if (result.leveledUp) {
      setNewLevel(result.newLevel || habit.level);
      setShowOverdrive(true);
    }
  };

  const handleCustomLog = () => {
    const value = parseFloat(customValue);
    if (value > 0) {
      handleLog(value);
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <GlassContainer enableSpotlight={true} enableScanline={true} className="p-4 group">
        <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-white font-medium text-base mb-1">{habit.name}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-cyber-text-dim uppercase tracking-wider">
                LVL {habit.level}
              </span>
              <span className="text-cyber-text-dim">|</span>
              <span className="text-cyber-text-muted uppercase tracking-wider">
                {habit.unit}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-cyber-yellow">
              <Zap className="w-4 h-4 fill-cyber-yellow" />
              <span className="text-sm font-bold">{habit.streak}</span>
            </div>

            {/* Three-dot Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-cyber-gray rounded transition-all opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="w-4 h-4 text-cyber-text-muted hover:text-cyber-neon" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-8 w-32 bg-cyber-panel border border-cyber-gray rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      onEdit(habit);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-cyber-text-muted hover:text-cyber-neon hover:bg-cyber-gray transition-all rounded-t-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-cyber-red hover:bg-cyber-red/10 transition-all rounded-b-lg"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Daily Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-cyber-text-dim uppercase tracking-wider">
            DAILY: {todayProgress} / {habit.target} {habit.unit}
          </span>
          <span className="text-xs text-cyber-neon font-computation">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 bg-cyber-gray rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyber-neon to-cyber-neon-cyan transition-all duration-500 shadow-neon"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-cyber-text-dim font-computation">
            XP: {habit.xp} / {habit.xpToNextLevel}
          </span>
          <span className="text-xs text-cyber-text-dim uppercase tracking-wider">
            NEXT LVL
          </span>
        </div>
        <div className="h-1.5 bg-cyber-gray rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan transition-all duration-500 shadow-cyan"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      {!showCustomInput ? (
        <div className="flex gap-2">
          <MagneticButton
            onClick={() => setShowCustomInput(true)}
            className="px-4 py-2 bg-cyber-gray/50 border border-cyber-gray-light rounded text-xs text-cyber-text-muted hover:text-cyber-neon hover:border-cyber-neon transition-all uppercase tracking-wider backdrop-blur-sm"
          >
            Qty
          </MagneticButton>
          <MagneticButton
            onClick={() => handleLog(habit.target)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-neon-cyan border border-cyber-neon rounded text-xs text-cyber-black font-bold hover:shadow-neon-strong transition-all uppercase tracking-wider"
            magneticStrength={0.4}
          >
            + LOG DATA
          </MagneticButton>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="0"
            className="flex-1 px-3 py-2 bg-cyber-gray border border-cyber-gray-light rounded text-sm text-white outline-none focus:border-cyber-neon transition-all"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCustomLog();
              if (e.key === 'Escape') setShowCustomInput(false);
            }}
          />
          <MagneticButton
            onClick={handleCustomLog}
            className="px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-neon-cyan border border-cyber-neon rounded text-xs text-cyber-black font-bold hover:shadow-neon-strong transition-all"
          >
            ✓
          </MagneticButton>
          <MagneticButton
            onClick={() => setShowCustomInput(false)}
            className="px-4 py-2 bg-cyber-gray/50 border border-cyber-gray-light rounded text-xs text-cyber-text-muted hover:text-cyber-red hover:border-cyber-red transition-all backdrop-blur-sm"
          >
            ✕
          </MagneticButton>
        </div>
      )}
        </div>
      </GlassContainer>

      {/* Overdrive Level Up Modal */}
      <OverdriveModal 
        isOpen={showOverdrive} 
        level={newLevel}
        onClose={() => setShowOverdrive(false)} 
      />

    {/* Delete Confirmation Modal */}
    {showDeleteConfirm && (
      <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-cyber-panel border border-cyber-red rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-medium text-white mb-4">Delete Protocol?</h3>
          <p className="text-sm text-cyber-text-muted mb-6">
            Are you sure you want to delete "{habit.name}"? This will remove all logs and progress. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2 bg-cyber-gray border border-cyber-gray-light rounded text-sm text-cyber-text-muted hover:text-white hover:border-cyber-neon transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-cyber-red border border-cyber-red rounded text-sm text-white font-bold hover:bg-cyber-red/80 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
