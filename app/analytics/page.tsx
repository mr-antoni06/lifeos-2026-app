'use client';

import { useState, useMemo } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { TrendingUp, Calendar, Filter } from 'lucide-react';

type Timeframe = 'week' | 'month' | 'year';

export default function AnalyticsPage() {
  const { habits, logs } = useLifeOSStore();
  const [timeframe, setTimeframe] = useState<Timeframe>('week');
  const [selectedHabits, setSelectedHabits] = useState<string[]>(habits.map((h) => h.id));
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Calculate date range
  const dateRange = useMemo(() => {
    const now = new Date();
    switch (timeframe) {
      case 'week':
        return {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
        };
      case 'month':
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
      case 'year':
        return {
          start: new Date(now.getFullYear(), 0, 1),
          end: new Date(now.getFullYear(), 11, 31),
        };
    }
  }, [timeframe]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const days = eachDayOfInterval(dateRange);
    
    return days.map((day) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayData: any = {
        date: format(day, timeframe === 'week' ? 'EEE' : 'MMM d'),
        fullDate: dateStr,
      };

      selectedHabits.forEach((habitId) => {
        const habit = habits.find((h) => h.id === habitId);
        if (habit) {
          const dayLogs = logs.filter((l) => l.habitId === habitId && l.date === dateStr);
          const totalValue = dayLogs.reduce((sum, log) => sum + log.value, 0);
          dayData[habit.name] = totalValue;
        }
      });

      return dayData;
    });
  }, [dateRange, selectedHabits, habits, logs, timeframe]);

  // Toggle habit selection
  const toggleHabit = (habitId: string) => {
    setSelectedHabits((prev) =>
      prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId]
    );
  };

  // Select all / deselect all
  const toggleAll = () => {
    if (selectedHabits.length === habits.length) {
      setSelectedHabits([]);
    } else {
      setSelectedHabits(habits.map((h) => h.id));
    }
  };

  // Calculate total stats
  const totalLogs = logs.filter((l) => {
    const logDate = parseISO(l.date);
    return logDate >= dateRange.start && logDate <= dateRange.end;
  }).length;

  const totalXP = logs
    .filter((l) => {
      const logDate = parseISO(l.date);
      return logDate >= dateRange.start && logDate <= dateRange.end;
    })
    .reduce((sum, log) => sum + log.xpGained, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-2 border-cyber-neon bg-cyber-dark p-6 rounded-lg shadow-neon">
        <h1 className="text-4xl font-bold mb-2 text-cyber-neon glitch" data-text="ANALYTICS CORE">
          ANALYTICS CORE
        </h1>
        <p className="text-cyber-neon/70 text-sm">
          {'>'} ANALYZING PERFORMANCE METRICS | TIMEFRAME: {timeframe.toUpperCase()}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyber-neon" />
            <p className="text-sm text-cyber-neon/50">Total Logs</p>
          </div>
          <p className="text-3xl font-bold text-cyber-neon">{totalLogs}</p>
        </div>
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyber-blue" />
            <p className="text-sm text-cyber-neon/50">XP Gained</p>
          </div>
          <p className="text-3xl font-bold text-cyber-blue">{totalXP.toLocaleString()}</p>
        </div>
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-cyber-purple" />
            <p className="text-sm text-cyber-neon/50">Active Habits</p>
          </div>
          <p className="text-3xl font-bold text-cyber-purple">{selectedHabits.length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Timeframe Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                timeframe === 'week'
                  ? 'bg-cyber-neon text-cyber-black'
                  : 'bg-cyber-gray text-cyber-neon hover:bg-cyber-neon/20'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                timeframe === 'month'
                  ? 'bg-cyber-neon text-cyber-black'
                  : 'bg-cyber-gray text-cyber-neon hover:bg-cyber-neon/20'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                timeframe === 'year'
                  ? 'bg-cyber-neon text-cyber-black'
                  : 'bg-cyber-gray text-cyber-neon hover:bg-cyber-neon/20'
              }`}
            >
              Year
            </button>
          </div>

          {/* Chart Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                chartType === 'line'
                  ? 'bg-cyber-blue text-cyber-black'
                  : 'bg-cyber-gray text-cyber-neon hover:bg-cyber-blue/20'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                chartType === 'bar'
                  ? 'bg-cyber-blue text-cyber-black'
                  : 'bg-cyber-gray text-cyber-neon hover:bg-cyber-blue/20'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>
      </div>

      {/* Habit Filter */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-cyber-neon" />
          <h3 className="text-lg font-bold text-cyber-neon">Filter Habits</h3>
          <button
            onClick={toggleAll}
            className="ml-auto px-3 py-1 bg-cyber-gray hover:bg-cyber-neon/20 rounded text-sm text-cyber-neon transition-all"
          >
            {selectedHabits.length === habits.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {habits.map((habit) => {
            const isSelected = selectedHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                  isSelected
                    ? 'border-cyber-neon bg-cyber-neon/20 text-cyber-neon'
                    : 'border-cyber-gray bg-cyber-gray/20 text-cyber-neon/50 hover:border-cyber-neon/50'
                }`}
                style={isSelected ? { borderColor: habit.color, color: habit.color } : {}}
              >
                {habit.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyber-neon mb-4">
          {'>'} PROGRESS_CHART.render()
        </h3>

        {selectedHabits.length === 0 ? (
          <div className="h-96 flex items-center justify-center text-cyber-neon/30">
            Select at least one habit to view analytics
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="date" stroke="#00ff41" style={{ fontSize: '12px' }} />
                <YAxis stroke="#00ff41" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #00ff41',
                    borderRadius: '8px',
                    color: '#00ff41',
                  }}
                />
                <Legend
                  wrapperStyle={{ color: '#00ff41' }}
                  iconType="line"
                />
                {selectedHabits.map((habitId) => {
                  const habit = habits.find((h) => h.id === habitId);
                  return habit ? (
                    <Line
                      key={habitId}
                      type="monotone"
                      dataKey={habit.name}
                      stroke={habit.color}
                      strokeWidth={2}
                      dot={{ fill: habit.color, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ) : null;
                })}
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="date" stroke="#00ff41" style={{ fontSize: '12px' }} />
                <YAxis stroke="#00ff41" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #00ff41',
                    borderRadius: '8px',
                    color: '#00ff41',
                  }}
                />
                <Legend wrapperStyle={{ color: '#00ff41' }} />
                {selectedHabits.map((habitId) => {
                  const habit = habits.find((h) => h.id === habitId);
                  return habit ? (
                    <Bar key={habitId} dataKey={habit.name} fill={habit.color} />
                  ) : null;
                })}
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* Individual Habit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => {
          const habitLogs = logs.filter((l) => {
            const logDate = parseISO(l.date);
            return l.habitId === habit.id && logDate >= dateRange.start && logDate <= dateRange.end;
          });

          const totalValue = habitLogs.reduce((sum, log) => sum + log.value, 0);
          const avgValue = habitLogs.length > 0 ? (totalValue / habitLogs.length).toFixed(1) : 0;
          const totalXPForHabit = habitLogs.reduce((sum, log) => sum + log.xpGained, 0);

          return (
            <div
              key={habit.id}
              className="bg-cyber-dark border-2 rounded-lg p-4"
              style={{ borderColor: habit.color + '40' }}
            >
              <h4 className="font-bold text-lg mb-3" style={{ color: habit.color }}>
                {habit.name}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cyber-neon/50">Total Logs:</span>
                  <span className="text-cyber-neon font-semibold">{habitLogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-neon/50">Total {habit.unit}:</span>
                  <span className="text-cyber-neon font-semibold">{totalValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-neon/50">Avg per Log:</span>
                  <span className="text-cyber-neon font-semibold">{avgValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-neon/50">XP Gained:</span>
                  <span className="text-cyber-neon font-semibold">{totalXPForHabit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
