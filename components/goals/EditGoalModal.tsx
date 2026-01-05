'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useLifeOSStore } from '@/lib/store';
import { Goal, SubGoal } from '@/lib/types';
import { format } from 'date-fns';

interface EditGoalModalProps {
  goal?: Goal;
  onClose: () => void;
}

export default function EditGoalModal({ goal, onClose }: EditGoalModalProps) {
  const { addGoal, updateGoal, addSubGoal, deleteSubGoal } = useLifeOSStore();
  
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [startDate, setStartDate] = useState(
    goal?.startDate || format(new Date(), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState(
    goal?.endDate || format(new Date(), 'yyyy-MM-dd')
  );
  const [reward, setReward] = useState(goal?.reward || '');
  const [newSubGoalTitle, setNewSubGoalTitle] = useState('');
  const [subGoals, setSubGoals] = useState<SubGoal[]>(goal?.subGoals || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (goal) {
      // Update existing goal
      updateGoal(goal.id, {
        title,
        description,
        startDate,
        endDate,
        reward,
      });
    } else {
      // Create new goal
      addGoal(title, description, startDate, endDate, reward);
    }

    onClose();
  };

  const handleAddSubGoal = () => {
    if (!newSubGoalTitle.trim()) return;

    if (goal) {
      // Add to existing goal
      addSubGoal(goal.id, newSubGoalTitle);
    } else {
      // Add to local state for new goal (will be saved on submit)
      const newSubGoal: SubGoal = {
        id: `temp_${Date.now()}`,
        title: newSubGoalTitle,
        completed: false,
        completedAt: null,
      };
      setSubGoals([...subGoals, newSubGoal]);
    }
    
    setNewSubGoalTitle('');
  };

  const handleDeleteSubGoal = (subGoalId: string) => {
    if (goal) {
      deleteSubGoal(goal.id, subGoalId);
    } else {
      setSubGoals(subGoals.filter(sg => sg.id !== subGoalId));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-panel border border-cyber-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-cyber-panel border-b border-cyber-gray p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-cyber-text tracking-wider">
            {'>'} {goal ? 'EDIT GOAL' : 'NEW GOAL'}
          </h2>
          <button
            onClick={onClose}
            className="text-cyber-text-dim hover:text-cyber-neon transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
              GOAL TITLE *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none"
              placeholder="e.g., Launch my startup"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none resize-none"
              placeholder="Describe your goal..."
              rows={3}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                START DATE *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                END DATE *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Reward */}
          <div>
            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
              REWARD (OPTIONAL)
            </label>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="w-full bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none"
              placeholder="e.g., Weekend trip to the mountains"
            />
          </div>

          {/* Sub-goals */}
          <div>
            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
              SUB-GOALS (OPTIONAL)
            </label>
            
            {/* Add sub-goal input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSubGoalTitle}
                onChange={(e) => setNewSubGoalTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubGoal())}
                className="flex-1 bg-cyber-black border border-cyber-gray rounded px-4 py-2 text-cyber-text focus:border-cyber-neon focus:outline-none"
                placeholder="Add a sub-goal..."
              />
              <button
                type="button"
                onClick={handleAddSubGoal}
                className="px-4 py-2 bg-cyber-gray border border-cyber-gray rounded hover:border-cyber-neon transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-goals list */}
            {(goal?.subGoals || subGoals).length > 0 && (
              <div className="space-y-2">
                {(goal?.subGoals || subGoals).map((sg) => (
                  <div
                    key={sg.id}
                    className="flex items-center justify-between bg-cyber-black border border-cyber-gray rounded px-4 py-2"
                  >
                    <span className="text-cyber-text text-sm">{sg.title}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubGoal(sg.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-cyber-gray rounded text-cyber-text-muted hover:text-cyber-text hover:border-cyber-neon transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyber-neon text-cyber-black rounded font-medium hover:bg-cyber-neon/80 transition-colors"
            >
              {goal ? 'UPDATE GOAL' : 'CREATE GOAL'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
