export interface Habit {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  color: string; // hex color for accent
  target: number; // daily target (e.g., 3 videos, 30 mins)
  unit: string; // "videos", "mins", "pages", etc.
  level: number;
  xp: number; // current XP in this level
  xpToNextLevel: number; // XP needed to level up
  streak: number; // current streak in days
  longestStreak: number;
  createdAt: string;
  lastCompletedAt: string | null;
}

export interface HabitLog {
  id: string;
  habitId: string;
  value: number; // actual progress (e.g., 5 videos completed)
  date: string; // ISO date string
  timestamp: number;
  xpGained: number;
}

export interface AntiScrollLog {
  id: string;
  date: string; // ISO date string
  timeResisted: number; // in minutes
  habitChosen: string; // habit ID that was done instead
  timestamp: number;
}

export interface Settings {
  theme: 'cyberpunk' | 'matrix' | 'neon';
  xpMultiplier: number; // for power-ups/bonuses
  soundEnabled: boolean;
  dailyGoalTime: string; // e.g., "09:00" for when day resets
}

export interface SubGoal {
  id: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  reward?: string; // optional reward for completion
  subGoals: SubGoal[];
  completed: boolean;
  createdAt: string;
}

export interface CompletedGoal extends Goal {
  completedAt: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  date: string; // ISO date string (yyyy-MM-dd)
  time?: string; // Time in HH:mm format
  color: string; // hex color
  completed: boolean;
  createdAt: string;
}

export interface CompletedPlannerTask extends PlannerTask {
  completedAt: string;
}

export interface GameState {
  habits: Habit[];
  logs: HabitLog[];
  antiScrollLogs: AntiScrollLog[];
  goals: Goal[];
  completedGoals: CompletedGoal[];
  plannerTasks: PlannerTask[];
  completedPlannerTasks: CompletedPlannerTask[];
  settings: Settings;
  totalXP: number;
  playerLevel: number;
}
