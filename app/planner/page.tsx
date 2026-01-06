'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Archive, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { useLifeOSStore } from '@/lib/store';

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '',
    color: '#00ff41',
  });

  // Get tasks and actions from store
  const plannerTasks = useLifeOSStore((state) => state.plannerTasks);
  const completedPlannerTasks = useLifeOSStore((state) => state.completedPlannerTasks);
  const addPlannerTask = useLifeOSStore((state) => state.addPlannerTask);
  const deletePlannerTask = useLifeOSStore((state) => state.deletePlannerTask);
  const togglePlannerTask = useLifeOSStore((state) => state.togglePlannerTask);
  const completePlannerTask = useLifeOSStore((state) => state.completePlannerTask);
  const deleteCompletedPlannerTask = useLifeOSStore((state) => state.deleteCompletedPlannerTask);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleAddTask = () => {
    if (newTask.title && selectedDate) {
      addPlannerTask(
        newTask.title,
        format(selectedDate, 'yyyy-MM-dd'),
        newTask.time || undefined,
        newTask.color
      );
      setNewTask({ title: '', time: '', color: '#00ff41' });
      setIsAddingTask(false);
      setSelectedDate(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deletePlannerTask(taskId);
  };

  const handleToggleTask = (taskId: string) => {
    const task = plannerTasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      // When marking as complete, archive it
      completePlannerTask(taskId);
    } else if (task && task.completed) {
      // If somehow already completed, just toggle
      togglePlannerTask(taskId);
    }
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return plannerTasks.filter((t) => t.date === dateStr);
  };

  const colorOptions = ['#00ff41', '#00d9ff', '#c900ff', '#ff0040', '#ffd700', '#ff6600'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-2 border-cyber-neon bg-cyber-dark p-6 rounded-lg shadow-neon">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-cyber-neon glitch" data-text="MISSION PLANNER">
              MISSION PLANNER
            </h1>
            <p className="text-cyber-neon/70 text-sm">
              {'>'} ORGANIZING OPERATIONS | TIMEFRAME: {format(currentDate, 'MMMM yyyy').toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="flex items-center gap-2 px-4 py-2 bg-cyber-gray hover:bg-cyber-neon/20 border-2 border-cyber-neon/50 hover:border-cyber-neon rounded-lg transition-all"
          >
            <Archive className="w-5 h-5 text-cyber-neon" />
            <span className="text-cyber-neon font-semibold">
              {showArchive ? 'HIDE' : 'SHOW'} ARCHIVE ({completedPlannerTasks.length})
            </span>
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-cyber-gray rounded transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-cyber-neon" />
          </button>

          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-cyber-neon" />
            <h2 className="text-2xl font-bold text-cyber-neon">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-cyber-gray rounded transition-all"
          >
            <ChevronRight className="w-6 h-6 text-cyber-neon" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Weekday Headers */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-bold text-cyber-neon/70 py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedDate(day);
                  setIsAddingTask(true);
                }}
                className={`
                  min-h-24 p-2 rounded-lg border-2 transition-all text-left relative
                  ${isCurrentMonth ? 'border-cyber-gray hover:border-cyber-neon' : 'border-cyber-gray/30'}
                  ${isTodayDate ? 'border-cyber-neon bg-cyber-neon/10' : 'bg-cyber-black'}
                `}
              >
                <div
                  className={`text-sm font-semibold mb-1 ${
                    isCurrentMonth ? 'text-cyber-neon' : 'text-cyber-neon/30'
                  }`}
                >
                  {format(day, 'd')}
                </div>

                {/* Task indicators */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="text-xs px-1 py-0.5 rounded truncate"
                      style={{
                        backgroundColor: task.color + '20',
                        color: task.color,
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.time && `${task.time} `}
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-cyber-neon/50">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddingTask && selectedDate && (
        <div className="fixed inset-0 bg-cyber-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-cyber-dark border-2 border-cyber-neon rounded-lg p-6 max-w-md w-full shadow-neon">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-cyber-neon">
                {'>'} ADD_TASK({format(selectedDate, 'MMM d')})
              </h3>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setSelectedDate(null);
                  setNewTask({ title: '', time: '', color: '#00ff41' });
                }}
                className="p-2 hover:bg-cyber-gray rounded transition-all"
              >
                <X className="w-6 h-6 text-cyber-neon" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cyber-neon/70 mb-2">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Team Meeting"
                  className="w-full px-4 py-2 bg-cyber-black border border-cyber-neon/30 focus:border-cyber-neon rounded text-cyber-neon outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-cyber-neon/70 mb-2">Time (Optional)</label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  className="w-full px-4 py-2 bg-cyber-black border border-cyber-neon/30 focus:border-cyber-neon rounded text-cyber-neon outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-cyber-neon/70 mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewTask({ ...newTask, color })}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        newTask.color === color
                          ? 'border-cyber-neon scale-110'
                          : 'border-cyber-gray hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddTask}
                disabled={!newTask.title}
                className="w-full px-4 py-3 bg-cyber-neon text-cyber-black hover:bg-cyber-neon-bright font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {'>'} CREATE_TASK()
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Task List */}
      <div className="bg-cyber-dark border-2 border-cyber-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-cyber-neon mb-4">
          {'>'} ACTIVE_TASKS.list()
        </h3>

        {plannerTasks.length === 0 ? (
          <div className="text-center py-8 text-cyber-neon/30">
            No tasks scheduled. Click on a date to add one.
          </div>
        ) : (
          <div className="space-y-2">
            {[...plannerTasks]
              .sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date);
                if (dateCompare !== 0) return dateCompare;
                return (a.time || '').localeCompare(b.time || '');
              })
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:border-opacity-100"
                  style={{
                    borderColor: task.color + '40',
                    backgroundColor: task.completed ? '#1a1a1a' : '#0a0a0a',
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="w-5 h-5 rounded border-2 cursor-pointer"
                      style={{ accentColor: task.color }}
                    />
                    <div>
                      <p
                        className={`font-semibold ${
                          task.completed ? 'line-through text-cyber-neon/50' : ''
                        }`}
                        style={{ color: task.completed ? undefined : task.color }}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-cyber-neon/50">
                        {format(new Date(task.date), 'MMM d, yyyy')}
                        {task.time && ` at ${task.time}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 hover:bg-cyber-red/20 rounded transition-all"
                  >
                    <X className="w-4 h-4 text-cyber-red" />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Completed Tasks Archive */}
      {showArchive && (
        <div className="bg-cyber-dark border-2 border-cyber-neon rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyber-neon mb-4">
            {'>'} COMPLETED_ARCHIVE.list()
          </h3>

          {completedPlannerTasks.length === 0 ? (
            <div className="text-center py-8 text-cyber-neon/30">
              No completed tasks yet.
            </div>
          ) : (
            <div className="space-y-2">
              {[...completedPlannerTasks]
                .sort((a, b) => {
                  // Sort by completion date (most recent first)
                  return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
                })
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 transition-all"
                    style={{
                      borderColor: task.color + '40',
                      backgroundColor: '#0a0a0a',
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: task.color, backgroundColor: task.color }}>
                        <span className="text-cyber-black text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold line-through" style={{ color: task.color + '80' }}>
                          {task.title}
                        </p>
                        <p className="text-sm text-cyber-neon/50">
                          Scheduled: {format(new Date(task.date), 'MMM d, yyyy')}
                          {task.time && ` at ${task.time}`}
                        </p>
                        <p className="text-xs text-cyber-neon/40">
                          Completed: {format(new Date(task.completedAt), 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCompletedPlannerTask(task.id)}
                      className="p-2 hover:bg-cyber-red/20 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-cyber-red" />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
