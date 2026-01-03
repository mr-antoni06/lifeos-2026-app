'use client';

import { useState } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const iconOptions = [
  'Target', 'BookOpen', 'Dumbbell', 'Code', 'Palette', 'Music',
  'Coffee', 'Lightbulb', 'Heart', 'Brain', 'Zap', 'Flame',
];

const colorOptions = [
  '#00ff41', '#00d9ff', '#c900ff', '#ff0040', '#ffd700', '#ff6600',
];

export default function AddHabitButton() {
  const { addHabit } = useLifeOSStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Target',
    color: '#00ff41',
    target: 1,
    unit: 'times',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.target > 0) {
      addHabit(formData.name, formData.icon, formData.color, formData.target, formData.unit);
      setFormData({
        name: '',
        icon: 'Target',
        color: '#00ff41',
        target: 1,
        unit: 'times',
      });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full border-2 border-cyber-neon bg-cyber-black hover:bg-cyber-neon/10 flex items-center justify-center transition-all group"
      >
        <Plus className="w-5 h-5 text-cyber-neon" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-panel border border-cyber-neon rounded-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">{'>'} NEW PROTOCOL</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-cyber-gray rounded transition-all"
          >
            <X className="w-5 h-5 text-cyber-text-muted hover:text-cyber-neon" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div>
            <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">Protocol Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Read Books"
              className="w-full px-4 py-2 bg-cyber-gray border border-cyber-gray-light focus:border-cyber-neon rounded text-white outline-none"
              required
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((iconName) => {
                const IconComponent = (LucideIcons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-3 rounded border transition-all ${
                      formData.icon === iconName
                        ? 'border-cyber-neon bg-cyber-neon/10'
                        : 'border-cyber-gray-light hover:border-cyber-neon/50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-cyber-text-muted" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">Color</label>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-full border transition-all ${
                    formData.color === color
                      ? 'border-cyber-neon scale-110'
                      : 'border-cyber-gray-light hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Target & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">Daily Target</label>
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
              <label className="block text-xs text-cyber-text-dim uppercase tracking-wider mb-2">Unit</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all uppercase tracking-wider text-sm"
          >
            + CREATE PROTOCOL
          </button>
        </form>
      </div>
    </div>
  );
}
