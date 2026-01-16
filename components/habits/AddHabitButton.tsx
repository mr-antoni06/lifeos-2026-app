'use client';

import { useState } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import GlassContainer from '@/components/ui/GlassContainer';
import { motion, AnimatePresence } from 'framer-motion';

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
      <MagneticButton
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full border-2 border-cyber-neon bg-cyber-black/50 hover:bg-cyber-neon/10 flex items-center justify-center transition-all group backdrop-blur-sm shadow-neon hover:shadow-neon-strong"
        magneticStrength={0.5}
      >
        <Plus className="w-5 h-5 text-cyber-neon group-hover:rotate-90 transition-transform duration-300" />
      </MagneticButton>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-cyber-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <GlassContainer glowColor="neon" className="p-6 max-w-md w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white text-neon-glow">{'>'} NEW PROTOCOL</h2>
              <MagneticButton
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-cyber-gray/50 rounded transition-all backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-cyber-text-muted hover:text-cyber-red transition-colors" />
              </MagneticButton>
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
            className="w-full px-4 py-3 bg-gradient-to-r from-cyber-neon to-cyber-neon-cyan text-cyber-black hover:shadow-neon-strong font-bold rounded transition-all uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-transform"
          >
            + CREATE PROTOCOL
          </button>
        </form>
          </GlassContainer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
