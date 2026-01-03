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

export interface GameState {
  habits: Habit[];
  logs: HabitLog[];
  antiScrollLogs: AntiScrollLog[];
  settings: Settings;
  totalXP: number;
  playerLevel: number;
}
