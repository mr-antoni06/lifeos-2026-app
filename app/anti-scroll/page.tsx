'use client';

import { useState, useMemo } from 'react';
import { useLifeOSStore } from '@/lib/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, Clock, TrendingUp, Plus, X } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import { format, startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

export default function AntiScrollPage() {
  const { habits, antiScrollLogs, logAntiScroll } = useLifeOSStore();
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [timeResisted, setTimeResisted] = useState('');
  const [selectedHabit, setSelectedHabit] = useState('');

  // Calculate this week's data
  const thisWeekRange = {
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  };

  const thisWeekLogs = useMemo(() => {
    return antiScrollLogs.filter((log) => {
      const logDate = parseISO(log.date);
      return isWithinInterval(logDate, thisWeekRange);
    });
  }, [antiScrollLogs, thisWeekRange]);

  // Calculate total time resisted
  const totalTimeResisted = useMemo(() => {
    return thisWeekLogs.reduce((sum, log) => sum + log.timeResisted, 0);
  }, [thisWeekLogs]);

  // Prepare pie chart data
  const pieData = useMemo(() => {
    const habitTimeMap: Record<string, number> = {};

    thisWeekLogs.forEach((log) => {
      const habit = habits.find((h) => h.id === log.habitChosen);
      if (habit) {
        habitTimeMap[habit.name] = (habitTimeMap[habit.name] || 0) + log.timeResisted;
      }
    });

    return Object.entries(habitTimeMap).map(([name, value]) => {
      const habit = habits.find((h) => h.name === name);
      return {
        name,
        value,
        color: habit?.color || '#00ff41',
      };
    });
  }, [thisWeekLogs, habits]);

  // Handle add log
  const handleAddLog = () => {
    const time = parseInt(timeResisted);
    if (time > 0 && selectedHabit) {
      logAntiScroll(time, selectedHabit);
      setTimeResisted('');
      setSelectedHabit('');
      setIsAddingLog(false);
    }
  };

  // Calculate average daily resistance
  const avgDailyResistance = (totalTimeResisted / 7).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-2 border-cyber-neon bg-cyber-dark p-6 rounded-lg shadow-neon">
        <h1 className="text-4xl font-bold mb-2 text-cyber-neon glitch" data-text="ANTI-SCROLL PROTOCOL">
          ANTI-SCROLL PROTOCOL
        </h1>
        <p className="text-cyber-neon/70 text-sm">
          {'>'} CONVERTING WASTED TIME INTO PRODUCTIVE POWER | STATUS: ACTIVE
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-cyber-neon" />
            <p className="text-sm text-cyber-neon/50">Time Saved (This Week)</p>
          </div>
          <p className="text-3xl font-bold text-cyber-neon">{formatDuration(totalTimeResisted)}</p>
        </div>
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-cyber-blue" />
            <p className="text-sm text-cyber-neon/50">Avg Daily</p>
          </div>
          <p className="text-3xl font-bold text-cyber-blue">{formatDuration(parseInt(avgDailyResistance))}</p>
        </div>
        <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyber-purple" />
            <p className="text-sm text-cyber-neon/50">Total Logs</p>
          </div>
          <p className="text-3xl font-bold text-cyber-purple">{thisWeekLogs.length}</p>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="bg-cyber-dark border-2 border-cyber-red rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyber-red/20 flex items-center justify-center">
              <span className="text-2xl">💀</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyber-red">BEFORE</h3>
              <p className="text-sm text-cyber-red/70">Potential Doomscrolling</p>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-5xl font-bold text-cyber-red mb-2">{formatDuration(totalTimeResisted)}</p>
            <p className="text-cyber-red/50">Wasted on endless scrolling</p>
          </div>
          <div className="border-t-2 border-cyber-red/30 pt-4">
            <p className="text-sm text-cyber-red/70 italic">
              "Just one more video..." - The cycle continues
            </p>
          </div>
        </div>

        {/* After */}
        <div className="bg-cyber-dark border-2 border-cyber-neon rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyber-neon/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyber-neon">AFTER</h3>
              <p className="text-sm text-cyber-neon/70">Productive Power Mode</p>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-5xl font-bold text-cyber-neon mb-2">{formatDuration(totalTimeResisted)}</p>
            <p className="text-cyber-neon/50">Invested in growth & skills</p>
          </div>
          <div className="border-t-2 border-cyber-neon/30 pt-4">
            <p className="text-sm text-cyber-neon/70 italic">
              "Every minute counts." - Building the future
            </p>
          </div>
        </div>
      </div>

      {/* Add New Log Button */}
      {!isAddingLog && (
        <button
          onClick={() => setIsAddingLog(true)}
          className="w-full px-6 py-4 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded-lg transition-all shadow-neon-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Log Resisted Temptation
        </button>
      )}

      {/* Add Log Form */}
      {isAddingLog && (
        <div className="bg-cyber-dark border-2 border-cyber-neon rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyber-neon">{'>'} LOG_RESISTANCE()</h3>
            <button onClick={() => setIsAddingLog(false)} className="p-2 hover:bg-cyber-gray rounded">
              <X className="w-5 h-5 text-cyber-neon" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-cyber-neon/70 mb-2">Time Resisted (minutes)</label>
              <input
                type="number"
                value={timeResisted}
                onChange={(e) => setTimeResisted(e.target.value)}
                placeholder="e.g., 30"
                className="w-full px-4 py-2 bg-cyber-black border border-cyber-neon/30 focus:border-cyber-neon rounded text-cyber-neon outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-cyber-neon/70 mb-2">What did you do instead?</label>
              <div className="grid grid-cols-2 gap-2">
                {habits.map((habit) => (
                  <button
                    key={habit.id}
                    onClick={() => setSelectedHabit(habit.id)}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      selectedHabit === habit.id
                        ? 'border-cyber-neon bg-cyber-neon/20 text-cyber-neon'
                        : 'border-cyber-gray bg-cyber-gray/20 text-cyber-neon/50 hover:border-cyber-neon/50'
                    }`}
                    style={selectedHabit === habit.id ? { borderColor: habit.color, color: habit.color } : {}}
                  >
                    {habit.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddLog}
              disabled={!timeResisted || !selectedHabit}
              className="w-full px-4 py-3 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>'} CONFIRM_LOG()
            </button>
          </div>
        </div>
      )}

      {/* Pie Chart */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyber-neon mb-4">
          {'>'} TIME_DISTRIBUTION.render()
        </h3>

        {pieData.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-cyber-neon/30">
            No data to display. Start logging your anti-scroll victories!
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #00ff41',
                  borderRadius: '8px',
                  color: '#00ff41',
                }}
                formatter={(value: number) => `${formatDuration(value)}`}
              />
              <Legend
                wrapperStyle={{ color: '#00ff41' }}
                formatter={(value) => <span style={{ color: '#00ff41' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent Logs */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyber-neon mb-4">
          {'>'} RECENT_VICTORIES.log
        </h3>

        {thisWeekLogs.length === 0 ? (
          <div className="text-center py-8 text-cyber-neon/30">
            No logs yet this week. Start tracking your wins!
          </div>
        ) : (
          <div className="space-y-2">
            {[...thisWeekLogs]
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 10)
              .map((log) => {
                const habit = habits.find((h) => h.id === log.habitChosen);
                return (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-cyber-gray/30 rounded-lg border border-cyber-gray hover:border-cyber-neon/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <p className="text-cyber-neon font-semibold">
                          {formatDuration(log.timeResisted)} resisted
                        </p>
                        <p className="text-sm text-cyber-neon/50">
                          Chose: <span style={{ color: habit?.color }}>{habit?.name || 'Unknown'}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-cyber-neon/30">{format(parseISO(log.date), 'MMM d')}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
