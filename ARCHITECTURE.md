# 🏗️ Cyberpunk LifeOS - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 App Router                                      │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   UI Layer      │  │  State Layer │  │  Data Layer  │  │
│  │  (Components)   │←→│   (Zustand)  │←→│ localStorage │  │
│  └─────────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Core Technologies

### Frontend Framework
- **Next.js 14** with App Router
  - Server Components for performance
  - Client Components for interactivity
  - File-based routing

### State Management
- **Zustand** with persistence middleware
  - Centralized store in `lib/store.ts`
  - Automatic localStorage sync
  - Minimal boilerplate

### Styling
- **Tailwind CSS** with custom theme
  - Cyberpunk color palette
  - Custom animations (pulse-neon, glitch, etc.)
  - Responsive utilities

### Data Visualization
- **Recharts** for analytics
  - Line and Bar charts
  - Pie charts for Anti-Scroll
  - Customized with cyberpunk colors

### Utilities
- **date-fns** for date manipulation
- **lucide-react** for icons
- **canvas-confetti** for celebrations

## Data Models

### Habit
```typescript
{
  id: string;           // Unique identifier
  name: string;         // "Read Books"
  icon: string;         // Lucide icon name
  color: string;        // Hex color
  target: number;       // Daily goal
  unit: string;         // "pages", "mins"
  level: number;        // Current level
  xp: number;          // Current XP
  xpToNextLevel: number;
  streak: number;       // Current streak
  longestStreak: number;
  createdAt: string;    // ISO date
  lastCompletedAt: string | null;
}
```

### HabitLog
```typescript
{
  id: string;
  habitId: string;      // Reference to habit
  value: number;        // Progress value
  date: string;         // "2026-01-03"
  timestamp: number;    // Unix timestamp
  xpGained: number;     // XP from this log
}
```

### AntiScrollLog
```typescript
{
  id: string;
  date: string;
  timeResisted: number; // Minutes
  habitChosen: string;  // Habit ID
  timestamp: number;
}
```

## State Management Flow

```
User Action → Component → Store Method → State Update → UI Re-render
                                  ↓
                          localStorage Sync
```

### Key Store Methods

1. **addHabit**: Creates new habit with initial level 1
2. **logProgress**: Logs progress, calculates XP, checks for level-up
3. **updateStreaks**: Recalculates all habit streaks
4. **logAntiScroll**: Adds anti-scroll entry

## Component Hierarchy

```
app/layout.tsx (Root Layout)
├── Sidebar (Navigation)
├── Header (Player Stats)
└── Page Content
    ├── app/page.tsx (Dashboard)
    │   ├── StatsOverview
    │   ├── HeatmapCalendar
    │   ├── StreakCounter
    │   └── HabitCard[]
    ├── app/analytics/page.tsx
    │   └── Recharts Components
    ├── app/anti-scroll/page.tsx
    │   └── PieChart
    ├── app/planner/page.tsx
    │   └── Calendar Grid
    └── app/settings/page.tsx
```

## Key Algorithms

### XP Calculation
```typescript
calculateXP(value, target) {
  baseXP = (value / target) × 100
  bonus = (value > target) ? (value - target) × 10 : 0
  return baseXP + bonus
}
```

### Level-Up Logic
```typescript
// Exponential growth: Level 1 needs 100 XP, Level 2 needs 150 XP, etc.
xpForLevel(level) = 100 × (1.5 ^ (level - 1))
```

### Streak Calculation
- Checks if habit was completed today
- If last completion was yesterday, maintains streak
- If gap > 1 day, resets to 0
- Updates longest streak if current exceeds it

## Performance Optimizations

1. **Memoization**: `useMemo` for expensive calculations (chart data, heatmap)
2. **Local State**: Component-level state for UI-only data
3. **Lazy Loading**: Pages load on-demand via Next.js routing
4. **Efficient Re-renders**: Zustand selector pattern (not implemented yet, but recommended for optimization)

## Security Considerations

- No backend = no server-side vulnerabilities
- Data stored locally = user privacy preserved
- No authentication needed for MVP
- Export/Import uses JSON (validate on import)

## Scalability Path

### Phase 1: Current (LocalStorage)
- Perfect for individual use
- No infrastructure costs
- Instant setup

### Phase 2: Cloud Sync (Future)
```
Add Firebase/Supabase
├── User Authentication
├── Cloud Storage
├── Real-time Sync
└── Multi-device Support
```

### Phase 3: Social Features (Future)
```
Add Social Layer
├── Friend System
├── Leaderboards
├── Shared Challenges
└── Achievement Badges
```

## File Structure Explained

```
├── app/                      # Next.js 14 app directory
│   ├── layout.tsx           # Root layout (sidebar + header)
│   ├── page.tsx             # Dashboard (/)
│   ├── globals.css          # Global styles + animations
│   ├── analytics/           # Analytics page (/analytics)
│   ├── anti-scroll/         # Anti-scroll page (/anti-scroll)
│   ├── planner/             # Calendar page (/planner)
│   └── settings/            # Settings page (/settings)
│
├── components/              # Reusable components
│   ├── dashboard/           # Dashboard-specific widgets
│   ├── habits/              # Habit-related components
│   └── layout/              # Layout components
│
├── lib/                     # Core logic
│   ├── store.ts            # Zustand store (brain of app)
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Helper functions
│
├── public/                  # Static assets (add images here)
│
└── config files             # Next.js, Tailwind, TS configs
```

## Custom Hooks (Future Enhancement)

```typescript
// Suggested custom hooks for better code organization
useHabits()           // Access habits with computed properties
useStreaks()          // Streak-specific logic
useAnalytics()        // Analytics data preparation
useLevelUp()          // Level-up detection and animation
```

## Testing Strategy (Recommended)

1. **Unit Tests**: Store methods (calculateXP, streak logic)
2. **Component Tests**: Habit card interactions
3. **E2E Tests**: Full user flows (create habit → log → level up)

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test in production mode locally
- [ ] Verify all pages load
- [ ] Check localStorage persistence
- [ ] Test on mobile viewport
- [ ] Verify charts render correctly
- [ ] Test level-up animation
- [ ] Export/import data functionality

---

**Built with a focus on simplicity, performance, and that sweet cyberpunk aesthetic! 🌃**
