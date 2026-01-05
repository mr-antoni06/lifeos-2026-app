'use client';

import { useLifeOSStore } from '@/lib/store';
import AddGoalButton from '@/components/goals/AddGoalButton';
import GoalCard from '@/components/goals/GoalCard';
import CompletedGoalsArchive from '@/components/goals/CompletedGoalsArchive';
import { Target } from 'lucide-react';

export default function GoalsPage() {
  const { goals } = useLifeOSStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-cyber-text tracking-wider mb-2">
            {'>'} GOALS
          </h1>
          <p className="text-cyber-text-muted text-sm">
            Set and track your long-term objectives
          </p>
        </div>
        <AddGoalButton />
      </div>

      {/* Active Goals */}
      {goals.length === 0 ? (
        <div className="border border-cyber-gray bg-cyber-panel rounded-lg p-12 text-center">
          <Target className="w-16 h-16 text-cyber-text-dim mx-auto mb-4" />
          <p className="text-cyber-text-dim text-lg mb-2">
            {'>'} NO ACTIVE GOALS
          </p>
          <p className="text-cyber-text-dim text-sm">
            Create your first goal to start tracking your progress.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      {/* Completed Goals Archive */}
      <CompletedGoalsArchive />
    </div>
  );
}
