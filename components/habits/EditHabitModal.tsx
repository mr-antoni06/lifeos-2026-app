'use client';

import { useState, useEffect } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { Habit } from '@/lib/types';
import { X } from 'lucide-react';

interface EditHabitModalProps {
  habit: Habit;
  onClose: () => void;
}

export default function EditHabitModal({ habit, onClose }: EditHabitModalProps) {
  const { updateHabit } = useLifeOSStore();
  const [formData, setFormData] = useState({
    name: habit.name,
    target: habit.target,
    unit: habit.unit,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.target > 0) {
      updateHabit(habit.id, {
        name: formData.name,
        target: formData.target,
        unit: formData.unit,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-panel border border-cyber-neon rounded-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">{'>'} EDIT PROTOCOL</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cyber-gray rounded transition-all"
          >
            <X className="w-5 h-5 text-cyber-text-muted hover:text-cyber-neon" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Protocol Name */}
          <div>
            <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">
              Protocol Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Read Books"
              className="w-full px-4 py-2 bg-cyber-gray border border-cyber-gray-light focus:border-cyber-neon rounded text-white outline-none"
              required
            />
          </div>

          {/* Target & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">
                Daily Target
              </label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 1 })}
                min="1"
                className="w-full px-4 py-2 bg-cyber-gray border border-cyber-gray-light focus:border-cyber-neon rounded text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">
                Unit
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., mins"
                className="w-full px-4 py-2 bg-cyber-gray border border-cyber-gray-light focus:border-cyber-neon rounded text-white outline-none"
                required
              />
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-cyber-gray/50 border border-cyber-gray-light rounded p-3">
            <p className="text-xs text-cyber-text-dim">
              Note: Editing will not affect your current level ({habit.level}) or XP ({habit.xp}/{habit.xpToNextLevel}).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-cyber-gray border border-cyber-gray-light rounded text-sm text-cyber-text-muted hover:text-white hover:border-cyber-neon transition-all uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all uppercase tracking-wider text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
