import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, HabitLog, AntiScrollLog, Settings, GameState, Goal, SubGoal, CompletedGoal } from './types';
import { startOfDay, format, differenceInDays, parseISO } from 'date-fns';

// XP calculation: base XP = target value, bonus for exceeding target
const calculateXP = (value: number, target: number): number => {
  const baseXP = Math.floor((value / target) * 100);
  const bonus = value > target ? Math.floor((value - target) * 10) : 0;
  return baseXP + bonus;
};

// XP needed for next level (exponential growth)
const calculateXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

interface LifeOSStore extends GameState {
  // Habit actions
  addHabit: (name: string, icon: string, color: string, target: number, unit: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  
  // Log actions
  logProgress: (habitId: string, value: number) => { leveledUp: boolean; newLevel: number };
  deleteLog: (logId: string) => void;
  
  // Anti-scroll actions
  logAntiScroll: (timeResisted: number, habitId: string) => void;
  
  // Streak calculation
  updateStreaks: () => void;
  
  // Goal actions
  addGoal: (title: string, description: string, startDate: string, endDate: string, reward?: string) => void;
  updateGoal: (id: string, updates: Partial<Omit<Goal, 'id' | 'createdAt' | 'completed'>>) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  addSubGoal: (goalId: string, title: string) => void;
  updateSubGoal: (goalId: string, subGoalId: string, updates: Partial<SubGoal>) => void;
  deleteSubGoal: (goalId: string, subGoalId: string) => void;
  toggleSubGoal: (goalId: string, subGoalId: string) => void;
  deleteCompletedGoal: (id: string) => void;
  
  // Settings
  updateSettings: (updates: Partial<Settings>) => void;
  
  // Reset
  resetAll: () => void;
}

const defaultSettings: Settings = {
  theme: 'cyberpunk',
  xpMultiplier: 1,
  soundEnabled: true,
  dailyGoalTime: '00:00',
};

export const useLifeOSStore = create<LifeOSStore>()(
  persist(
    (set, get) => ({
      habits: [],
      logs: [],
      antiScrollLogs: [],
      goals: [],
      completedGoals: [],
      settings: defaultSettings,
      totalXP: 0,
      playerLevel: 1,

      addHabit: (name, icon, color, target, unit) => {
        const newHabit: Habit = {
          id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name,
          icon,
          color,
          target,
          unit,
          level: 1,
          xp: 0,
          xpToNextLevel: calculateXPForLevel(1),
          streak: 0,
          longestStreak: 0,
          createdAt: new Date().toISOString(),
          lastCompletedAt: null,
        };
        
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, ...updates } : h)),
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          logs: state.logs.filter((l) => l.habitId !== id),
          antiScrollLogs: state.antiScrollLogs.filter((l) => l.habitChosen !== id),
        }));
      },

      logProgress: (habitId, value) => {
        const state = get();
        const habit = state.habits.find((h) => h.id === habitId);
        
        if (!habit) {
          return { leveledUp: false, newLevel: 1 };
        }

        const xpGained = calculateXP(value, habit.target) * state.settings.xpMultiplier;
        const newXP = habit.xp + xpGained;
        let newLevel = habit.level;
        let xpToNextLevel = habit.xpToNextLevel;
        let leveledUp = false;

        // Check for level up
        let remainingXP = newXP;
        while (remainingXP >= xpToNextLevel) {
          remainingXP -= xpToNextLevel;
          newLevel++;
          leveledUp = true;
          xpToNextLevel = calculateXPForLevel(newLevel);
        }

        const newLog: HabitLog = {
          id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          habitId,
          value,
          date: format(new Date(), 'yyyy-MM-dd'),
          timestamp: Date.now(),
          xpGained,
        };

        const today = format(new Date(), 'yyyy-MM-dd');
        
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habitId
              ? {
                  ...h,
                  xp: remainingXP,
                  level: newLevel,
                  xpToNextLevel,
                  lastCompletedAt: today,
                }
              : h
          ),
          logs: [...state.logs, newLog],
          totalXP: state.totalXP + xpGained,
        }));

        // Update streaks after logging
        get().updateStreaks();

        return { leveledUp, newLevel };
      },

      deleteLog: (logId) => {
        set((state) => ({
          logs: state.logs.filter((l) => l.id !== logId),
        }));
      },

      logAntiScroll: (timeResisted, habitId) => {
        const newLog: AntiScrollLog = {
          id: `antiscroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          date: format(new Date(), 'yyyy-MM-dd'),
          timeResisted,
          habitChosen: habitId,
          timestamp: Date.now(),
        };

        set((state) => ({
          antiScrollLogs: [...state.antiScrollLogs, newLog],
        }));
      },

      updateStreaks: () => {
        const state = get();
        const today = startOfDay(new Date());

        set((prevState) => ({
          habits: prevState.habits.map((habit) => {
            if (!habit.lastCompletedAt) {
              return { ...habit, streak: 0 };
            }

            const lastCompleted = startOfDay(parseISO(habit.lastCompletedAt));
            const daysDiff = differenceInDays(today, lastCompleted);

            let newStreak = habit.streak;

            if (daysDiff === 0) {
              // Completed today - check if we need to increment
              const yesterday = startOfDay(new Date(today.getTime() - 86400000));
              const logs = state.logs.filter((l) => l.habitId === habit.id);
              const yesterdayLog = logs.find((l) => {
                const logDate = startOfDay(parseISO(l.date));
                return logDate.getTime() === yesterday.getTime();
              });
              
              if (yesterdayLog || habit.streak === 0) {
                newStreak = habit.streak > 0 ? habit.streak : 1;
              }
            } else if (daysDiff === 1) {
              // Last completed yesterday - maintain streak
              newStreak = habit.streak;
            } else {
              // Streak broken
              newStreak = 0;
            }

            const longestStreak = Math.max(habit.longestStreak, newStreak);

            return {
              ...habit,
              streak: newStreak,
              longestStreak,
            };
          }),
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      // Goal actions
      addGoal: (title, description, startDate, endDate, reward) => {
        const newGoal: Goal = {
          id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title,
          description,
          startDate,
          endDate,
          reward,
          subGoals: [],
          completed: false,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
      },

      completeGoal: (id) => {
        const state = get();
        const goal = state.goals.find((g) => g.id === id);
        
        if (!goal) return;

        const completedGoal: CompletedGoal = {
          ...goal,
          completed: true,
          completedAt: new Date().toISOString(),
        };

        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
          completedGoals: [...state.completedGoals, completedGoal],
        }));
      },

      addSubGoal: (goalId, title) => {
        const newSubGoal: SubGoal = {
          id: `subgoal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title,
          completed: false,
          completedAt: null,
        };

        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? { ...g, subGoals: [...g.subGoals, newSubGoal] }
              : g
          ),
        }));
      },

      updateSubGoal: (goalId, subGoalId, updates) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  subGoals: g.subGoals.map((sg) =>
                    sg.id === subGoalId ? { ...sg, ...updates } : sg
                  ),
                }
              : g
          ),
        }));
      },

      deleteSubGoal: (goalId, subGoalId) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? { ...g, subGoals: g.subGoals.filter((sg) => sg.id !== subGoalId) }
              : g
          ),
        }));
      },

      toggleSubGoal: (goalId, subGoalId) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  subGoals: g.subGoals.map((sg) =>
                    sg.id === subGoalId
                      ? {
                          ...sg,
                          completed: !sg.completed,
                          completedAt: !sg.completed ? new Date().toISOString() : null,
                        }
                      : sg
                  ),
                }
              : g
          ),
        }));
      },

      deleteCompletedGoal: (id) => {
        set((state) => ({
          completedGoals: state.completedGoals.filter((g) => g.id !== id),
        }));
      },

      resetAll: () => {
        set({
          habits: [],
          logs: [],
          antiScrollLogs: [],
          goals: [],
          completedGoals: [],
          settings: defaultSettings,
          totalXP: 0,
          playerLevel: 1,
        });
      },
    }),
    {
      name: 'lifeos-storage',
    }
  )
);
