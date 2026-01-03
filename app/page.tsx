'use client';

import { useEffect, useState } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { Habit } from '@/lib/types';
import HabitCard from '@/components/habits/HabitCard';
import HeatmapCalendar from '@/components/dashboard/HeatmapCalendar';
import SystemLevel from '@/components/dashboard/SystemLevel';
import AddHabitButton from '@/components/habits/AddHabitButton';
import EditHabitModal from '@/components/habits/EditHabitModal';
import FactoryResetButton from '@/components/dashboard/FactoryResetButton';

export default function Dashboard() {
  const { habits, logs, updateStreaks } = useLifeOSStore();
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    // Update streaks on mount
    updateStreaks();
  }, [updateStreaks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      {/* Left Panel - System Info & Heatmap */}
      <div className="lg:col-span-5 space-y-6">
        <SystemLevel habits={habits} logs={logs} />
        <HeatmapCalendar logs={logs} />
      </div>

      {/* Right Panel - Active Protocols */}
      <div className="lg:col-span-7">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-cyber-text-muted tracking-wider">
            {'>'} ACTIVE PROTOCOLS
          </h2>
          <AddHabitButton />
        </div>

        {habits.length === 0 ? (
          <div className="border border-cyber-gray bg-cyber-panel rounded p-12 text-center">
            <p className="text-cyber-text-dim text-sm mb-4">
              {'>'} NO PROTOCOLS DETECTED
            </p>
            <p className="text-cyber-text-dim text-xs">
              Initialize your first protocol to begin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                onEdit={setEditingHabit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Factory Reset Button - Bottom Right Corner */}
      <FactoryResetButton />

      {/* Edit Habit Modal */}
      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
        />
      )}
    </div>
  );
}
