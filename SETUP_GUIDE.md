# 🚀 Cyberpunk LifeOS - Quick Setup Guide

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Tailwind CSS
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)
- date-fns (date utilities)
- canvas-confetti (animations)

## Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## Step 3: First-Time Setup

1. **Create Your First Habit**
   - Click the "New Habit" button on the dashboard
   - Example: "Read Books" with target "30 pages/day"
   - Choose a cool icon and neon color
   - Hit "CREATE_HABIT()"

2. **Test the Leveling System**
   - Click "100%" to log your target
   - Watch the XP bar fill up
   - Keep logging to trigger a level-up with confetti! 🎉

3. **Explore the Pages**
   - **Dashboard**: Overview with heatmap and streaks
   - **Analytics**: Charts and performance metrics
   - **Anti-Scroll**: Track time saved from scrolling
   - **Planner**: Calendar view for task management
   - **Settings**: Customize and manage your data

## 🎯 Key Features to Try

### 1. Leveling System
- Each habit levels up independently
- XP formula: `(progress/target) × 100 + bonus for exceeding`
- Level-up requirements increase exponentially

### 2. Streak Tracking
- Complete habits daily to maintain streaks
- Flame emoji changes based on streak length:
  - 💀 No streak
  - 🔥 1-6 days
  - ⚡ 7-29 days
  - 💎 30-99 days
  - 👑 100+ days

### 3. Anti-Scroll Converter
- Log when you resist scrolling
- Choose which productive habit you did instead
- View time distribution in a pie chart

### 4. Analytics
- Filter specific habits to compare
- Switch between Line and Bar charts
- View Week/Month/Year timeframes

## 🎨 Customization Tips

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  cyber: {
    neon: '#00ff41',      // Main accent
    blue: '#00d9ff',      // Secondary
    purple: '#c900ff',    // Tertiary
    red: '#ff0040',       // Danger
  },
}
```

### Add More Habit Icons
Edit `components/habits/AddHabitButton.tsx`:
```typescript
const iconOptions = [
  'Target', 'BookOpen', 'Dumbbell', 'Code',
  'Camera', 'Mic', 'Gamepad', // Add more!
];
```

### Adjust XP Multiplier
Go to Settings → XP Multiplier slider (1x - 3x)

## 📊 Data Storage

- All data is stored in **browser's localStorage**
- Data persists between sessions
- Use Settings → Export Data to create backups
- No backend required!

## 🐛 Troubleshooting

### Issue: White screen on first load
**Solution**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Charts not rendering
**Solution**: Make sure you have at least one habit and one log entry

### Issue: Confetti not working
**Solution**: Check browser console for errors, ensure canvas-confetti is installed

### Issue: Data not persisting
**Solution**: Check if localStorage is enabled in your browser

## 🚀 Production Build

When ready to deploy:

```bash
npm run build
npm start
```

Or deploy to Vercel:
1. Push to GitHub
2. Import to Vercel
3. Deploy (it's automatic!)

## 📱 Mobile Responsiveness

The app is fully responsive:
- Sidebar collapses on mobile (future enhancement)
- Cards stack vertically on small screens
- Charts adapt to screen width

## 🎮 Pro Tips

1. **Set realistic targets** - Start small and increase gradually
2. **Log daily** - Keep those streaks alive!
3. **Use quick buttons** - 50%, 100%, 150% for fast logging
4. **Export regularly** - Back up your progress
5. **Explore analytics** - Identify patterns in your habits

## 🔥 Challenge Yourself

- **Week 1**: Create 3 habits, maintain 7-day streak
- **Week 2**: Level up at least one habit to Level 5
- **Week 3**: Save 10 hours using Anti-Scroll feature
- **Month 1**: Achieve 30-day streak on your top habit

---

**Ready to level up your life? Let's go! 🚀**

> "The journey of a thousand miles begins with a single XP." - Ancient Cyberpunk Proverb
