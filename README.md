# 🎮 Cyberpunk LifeOS

A gamified habit tracker and planner for high performers, featuring RPG-style leveling, streak tracking, and an innovative "Anti-Scroll" converter.

## 🚀 Features

### 1. **Gamified Habit Engine (RPG Style)**
- Create custom habits with personalized icons, colors, and daily targets
- Each habit has its own level and XP system
- Visual progress bars with neon glow effects
- Level-up animations with confetti celebrations
- Quick-log buttons (50%, 100%, 150%) and custom value input

### 2. **Analytics Dashboard**
- Interactive line and bar charts using Recharts
- Filter habits to view specific progress
- Timeframe selection (Week/Month/Year)
- Individual habit statistics and performance metrics

### 3. **Anti-Scroll Converter** 💎 (Unique Feature)
- Track time resisted from doomscrolling
- Convert potential wasted time into productive habits
- Before/After visual comparison cards
- Pie chart showing time distribution across productive activities
- Recent victories log

### 4. **Mission Planner (Calendar View)**
- Monthly calendar grid with task visualization
- Click any date to add tasks
- Color-coded task system with time scheduling
- Task completion tracking with checkboxes
- Responsive calendar interface

### 5. **Visual Gamification Elements**
- **Streaks**: Duolingo-style flame icons with loss aversion mechanics
- **GitHub-style Heatmap**: Year-long activity visualization with color intensity
- **Level Colors**: Dynamic colors based on habit level (Green → Cyan → Purple → Gold)
- **Neon Effects**: Cyberpunk-themed glow and pulse animations

## 🎨 Design System

- **Theme**: Hacker/Cyberpunk aesthetic
- **Colors**: 
  - Deep Black/Dark Gray background (#0a0a0a, #1a1a1a)
  - Neon Green accents (#00ff41)
  - Cyber Blue (#00d9ff)
  - Cyber Purple (#c900ff)
  - Cyber Red (#ff0040)
- **Typography**: Monospace fonts (Courier New)
- **Effects**: Scanlines, glitch text, neon borders, pulse animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Zustand with localStorage persistence
- **Date Handling**: date-fns
- **Animations**: canvas-confetti for level-ups

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cyberpunk-lifeos/
├── app/
│   ├── analytics/          # Analytics dashboard page
│   ├── anti-scroll/        # Anti-scroll converter page
│   ├── planner/            # Calendar planner page
│   ├── settings/           # Settings and data management
│   ├── globals.css         # Global styles with cyberpunk effects
│   ├── layout.tsx          # Root layout with sidebar
│   └── page.tsx            # Main dashboard
├── components/
│   ├── dashboard/
│   │   ├── HeatmapCalendar.tsx    # GitHub-style activity heatmap
│   │   ├── StatsOverview.tsx       # Stats card component
│   │   └── StreakCounter.tsx       # Streak tracking widget
│   ├── habits/
│   │   ├── AddHabitButton.tsx      # Modal for creating habits
│   │   └── HabitCard.tsx           # Habit card with leveling
│   └── layout/
│       ├── Header.tsx              # Top header with player stats
│       └── Sidebar.tsx             # Navigation sidebar
├── lib/
│   ├── store.ts            # Zustand store with all game logic
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── package.json
├── tailwind.config.js      # Custom cyberpunk theme
└── tsconfig.json
```

## 🎯 Key Components

### State Store (`lib/store.ts`)
- Manages habits, logs, anti-scroll logs, and settings
- Implements XP calculation and level-up logic
- Handles streak tracking and updates
- Persists data to localStorage

### Habit Card (`components/habits/HabitCard.tsx`)
- Displays habit info with level and XP progress bar
- Quick-log buttons for common progress amounts
- Custom input for precise logging
- Level-up animations with confetti
- Streak emoji indicators

### Heatmap Calendar (`components/dashboard/HeatmapCalendar.tsx`)
- Visualizes activity over 365 days
- Color intensity based on log count
- Hover tooltips with date and count info

### Analytics Page (`app/analytics/page.tsx`)
- Multi-habit comparison charts
- Switchable between line and bar charts
- Habit filtering system
- Timeframe selection (Week/Month/Year)

## 🎮 How to Use

1. **Create Your First Habit**
   - Click "New Habit" on the dashboard
   - Choose a name, icon, color, daily target, and unit
   - Click "CREATE_HABIT()"

2. **Log Progress**
   - Use quick buttons (50%, 100%, 150%) for fast logging
   - Or click "Log Custom" for precise values
   - Watch your XP bar fill and level up!

3. **Track Anti-Scroll Wins**
   - Navigate to Anti-Scroll page
   - Click "Log Resisted Temptation"
   - Enter time saved and the productive habit you chose instead
   - View your time distribution in the pie chart

4. **Plan Your Missions**
   - Go to Planner page
   - Click any date to add a task
   - Set time, color, and title
   - Check off tasks as you complete them

5. **Analyze Your Performance**
   - Visit Analytics page
   - Select habits to compare
   - Switch between timeframes and chart types
   - Review individual habit statistics

## 🔧 Customization

### Add New Habit Icons
Edit `components/habits/AddHabitButton.tsx`:
```typescript
const iconOptions = [
  'Target', 'BookOpen', 'Dumbbell', 'Code', 'Palette', 'Music',
  'YourNewIcon', // Add Lucide icon name here
];
```

### Modify XP Calculation
Edit `lib/store.ts`:
```typescript
const calculateXP = (value: number, target: number): number => {
  // Customize your XP formula here
  const baseXP = Math.floor((value / target) * 100);
  const bonus = value > target ? Math.floor((value - target) * 10) : 0;
  return baseXP + bonus;
};
```

### Change Color Palette
Edit `tailwind.config.js`:
```javascript
colors: {
  cyber: {
    neon: '#00ff41',  // Change to your preferred neon color
    // ...
  },
}
```

## 💾 Data Management

- **Export**: Settings page → Export Data (downloads JSON backup)
- **Reset**: Settings page → Danger Zone → Reset All Data
- **Persistence**: Automatic save to localStorage on every change

## 🚀 Deployment

### Deploy to Vercel
```bash
npm run build
# Deploy to Vercel via GitHub integration or CLI
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 Future Enhancements

- [ ] Social features (compete with friends)
- [ ] Achievement badges system
- [ ] Habit templates library
- [ ] Mobile app (React Native)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Pomodoro timer integration
- [ ] AI-powered habit suggestions

## 🤝 Contributing

This is a personal project template. Feel free to fork and customize for your needs!

## 📄 License

MIT License - Feel free to use this for your own productivity journey!

---

**Built with 💚 by a High Performer for High Performers**

> "Every level matters. Every streak counts. Every minute saved is a minute invested."
