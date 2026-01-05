'use client';

import { useState } from 'react';
import { Goal } from '@/lib/types';
import { useLifeOSStore } from '@/lib/store';
import { Calendar, Trophy, CheckCircle2, Circle, Edit2, Trash2, Check } from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';
import EditGoalModal from './EditGoalModal';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { deleteGoal, completeGoal, toggleSubGoal } = useLifeOSStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const startDate = parseISO(goal.startDate);
  const endDate = parseISO(goal.endDate);
  const today = new Date();
  
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const daysElapsed = Math.max(0, differenceInDays(today, startDate));
  const daysRemaining = Math.max(0, differenceInDays(endDate, today));
  const progress = totalDays > 0 ? Math.min(100, (daysElapsed / totalDays) * 100) : 0;

  const completedSubGoals = goal.subGoals.filter(sg => sg.completed).length;
  const totalSubGoals = goal.subGoals.length;
  const allSubGoalsCompleted = totalSubGoals > 0 && completedSubGoals === totalSubGoals;

  const handleComplete = () => {
    completeGoal(goal.id);
  };

  const handleDelete = () => {
    deleteGoal(goal.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-cyber-panel border border-cyber-gray rounded-lg p-6 hover:border-cyber-neon/50 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-cyber-text mb-1">{goal.title}</h3>
            {goal.description && (
              <p className="text-sm text-cyber-text-muted">{goal.description}</p>
            )}
          </div>
          
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-cyber-text-dim hover:text-cyber-neon transition-colors"
              title="Edit goal"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-cyber-text-dim hover:text-red-500 transition-colors"
              title="Delete goal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-cyber-text-muted">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
            </span>
          </div>
          {daysRemaining > 0 ? (
            <span className="text-cyber-neon">
              {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
            </span>
          ) : daysRemaining === 0 ? (
            <span className="text-cyber-neon">Due today!</span>
          ) : (
            <span className="text-red-500">Overdue</span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-cyber-text-dim mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
            <div
              className="h-full bg-cyber-neon transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Reward */}
        {goal.reward && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-cyber-black rounded border border-cyber-gray">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-cyber-text-muted">
              <span className="text-cyber-text-dim">Reward:</span> {goal.reward}
            </span>
          </div>
        )}

        {/* Sub-goals */}
        {goal.subGoals.length > 0 && (
          <div className="mb-4 space-y-2">
            <div className="text-xs text-cyber-text-dim mb-2">
              SUB-GOALS ({completedSubGoals}/{totalSubGoals})
            </div>
            {goal.subGoals.map((subGoal) => (
              <button
                key={subGoal.id}
                onClick={() => toggleSubGoal(goal.id, subGoal.id)}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-cyber-black transition-colors group"
              >
                {subGoal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-cyber-neon flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-cyber-gray group-hover:text-cyber-neon flex-shrink-0" />
                )}
                <span
                  className={`text-sm text-left ${
                    subGoal.completed
                      ? 'text-cyber-text-dim line-through'
                      : 'text-cyber-text'
                  }`}
                >
                  {subGoal.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={!allSubGoalsCompleted && totalSubGoals > 0}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
            allSubGoalsCompleted || totalSubGoals === 0
              ? 'bg-cyber-neon text-cyber-black hover:bg-cyber-neon/80 hover:scale-105'
              : 'bg-cyber-gray text-cyber-text-dim cursor-not-allowed'
          }`}
          title={
            totalSubGoals > 0 && !allSubGoalsCompleted
              ? 'Complete all sub-goals first'
              : 'Mark as completed'
          }
        >
          <Check className="w-5 h-5" />
          MARK AS COMPLETED
        </button>

        {totalSubGoals > 0 && !allSubGoalsCompleted && (
          <p className="text-xs text-cyber-text-dim text-center mt-2">
            Complete all sub-goals to mark this goal as done
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditGoalModal
          goal={goal}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-cyber-panel border border-cyber-gray rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-cyber-text mb-4">
              {'>'} CONFIRM DELETE
            </h3>
            <p className="text-cyber-text-muted mb-6">
              Are you sure you want to delete &quot;{goal.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-cyber-gray rounded text-cyber-text-muted hover:text-cyber-text hover:border-cyber-neon transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
