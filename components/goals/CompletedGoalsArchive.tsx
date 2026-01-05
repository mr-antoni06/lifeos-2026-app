'use client';

import { useState } from 'react';
import { CompletedGoal } from '@/lib/types';
import { useLifeOSStore } from '@/lib/store';
import { Trophy, Calendar, CheckCircle, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function CompletedGoalsArchive() {
  const { completedGoals, deleteCompletedGoal } = useLifeOSStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());

  if (completedGoals.length === 0) return null;

  const toggleGoalExpand = (goalId: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedGoals(newExpanded);
  };

  return (
    <div className="bg-cyber-panel border border-cyber-neon/30 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-cyber-black/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <div className="text-left">
            <h2 className="text-lg font-bold text-cyber-text tracking-wider">
              {'>'} SUCCESS ARCHIVE
            </h2>
            <p className="text-sm text-cyber-text-muted">
              {completedGoals.length} goal{completedGoals.length !== 1 ? 's' : ''} completed
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-cyber-neon" />
        ) : (
          <ChevronDown className="w-5 h-5 text-cyber-neon" />
        )}
      </button>

      {/* Completed Goals List */}
      {isExpanded && (
        <div className="border-t border-cyber-neon/30 p-6 space-y-4">
          {completedGoals.map((goal) => {
            const isGoalExpanded = expandedGoals.has(goal.id);
            return (
              <div
                key={goal.id}
                className="bg-cyber-black border border-cyber-gray rounded-lg overflow-hidden"
              >
                {/* Goal Summary */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-cyber-neon flex-shrink-0" />
                        <h3 className="text-base font-bold text-cyber-text">
                          {goal.title}
                        </h3>
                      </div>
                      {goal.description && isGoalExpanded && (
                        <p className="text-sm text-cyber-text-muted ml-7">
                          {goal.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleGoalExpand(goal.id)}
                        className="p-2 text-cyber-text-dim hover:text-cyber-neon transition-colors"
                        title={isGoalExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isGoalExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteCompletedGoal(goal.id)}
                        className="p-2 text-cyber-text-dim hover:text-red-500 transition-colors"
                        title="Remove from archive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-cyber-text-dim ml-7">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Completed {format(parseISO(goal.completedAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {goal.subGoals.length > 0 && (
                      <span>
                        {goal.subGoals.length} sub-goal{goal.subGoals.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isGoalExpanded && (
                    <div className="mt-4 ml-7 space-y-3">
                      {/* Date Range */}
                      <div className="text-sm">
                        <span className="text-cyber-text-dim">Period: </span>
                        <span className="text-cyber-text-muted">
                          {format(parseISO(goal.startDate), 'MMM d')} - {format(parseISO(goal.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>

                      {/* Reward */}
                      {goal.reward && (
                        <div className="flex items-start gap-2 p-3 bg-cyber-panel rounded border border-cyber-gray">
                          <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <div className="text-cyber-text-dim mb-1">Reward Earned:</div>
                            <div className="text-cyber-text">{goal.reward}</div>
                          </div>
                        </div>
                      )}

                      {/* Sub-goals */}
                      {goal.subGoals.length > 0 && (
                        <div>
                          <div className="text-xs text-cyber-text-dim mb-2">
                            COMPLETED SUB-GOALS
                          </div>
                          <div className="space-y-1">
                            {goal.subGoals.map((subGoal) => (
                              <div
                                key={subGoal.id}
                                className="flex items-center gap-2 text-sm text-cyber-text-muted"
                              >
                                <CheckCircle className="w-4 h-4 text-cyber-neon/50 flex-shrink-0" />
                                <span className="line-through">{subGoal.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
