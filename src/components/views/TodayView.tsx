import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Heart,
  Droplets,
  UtensilsCrossed,
  Activity,
  HeartHandshake,
  BookOpen,
  Moon,
  Smile,
  Edit2,
  ArrowUp,
  ArrowDown,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyRecord, DailyTask, RoutineTime } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';

interface TodayViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
  todayFormatted: string;
}

export const TodayView: React.FC<TodayViewProps> = ({
  todayRecord,
  onUpdateRecord,
  todayFormatted,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // New/Edit task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<DailyTask['category']>('self_care');
  const [taskRoutineTime, setTaskRoutineTime] = useState<RoutineTime>('morning');
  const [taskRoutineName, setTaskRoutineName] = useState('Morning 🌸');
  const [taskIcon, setTaskIcon] = useState('🌸');

  const completedCount = todayRecord.tasks.filter((t) => t.completed).length;
  const totalCount = todayRecord.tasks.length;
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const routineSections = [
    { id: 'all', label: 'All Routines', icon: '✨' },
    { id: 'morning', label: 'Morning 🌸', icon: '☀️' },
    { id: 'evening', label: 'Evening 🌙', icon: '🌙' },
    { id: 'custom', label: 'Custom Rituals 💖', icon: '🎀' },
  ];

  const filteredTasks = activeFilter === 'all'
    ? todayRecord.tasks
    : todayRecord.tasks.filter((t) => {
        if (activeFilter === 'morning') return t.routineTime === 'morning';
        if (activeFilter === 'evening') return t.routineTime === 'evening';
        return t.routineTime === 'custom' || (!t.routineTime && activeFilter === 'all');
      });

  const handleToggleTask = (taskId: string) => {
    const updated = todayRecord.tasks.map((t) => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) {
          confetti({
            particleCount: 28,
            spread: 55,
            origin: { y: 0.7 },
            colors: ['#f472b6', '#fb7185', '#fda4af', '#fcd34d', '#c084fc'],
          });
        }
        return { ...t, completed: nextState };
      }
      return t;
    });

    onUpdateRecord({ ...todayRecord, tasks: updated });
  };

  const handleOpenAddForm = (defaultRoutine: RoutineTime = 'morning') => {
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskCategory(defaultRoutine === 'morning' ? 'self_care' : 'self_care');
    setTaskRoutineTime(defaultRoutine);
    setTaskRoutineName(defaultRoutine === 'morning' ? 'Morning 🌸' : defaultRoutine === 'evening' ? 'Evening 🌙' : 'Custom Ritual 💖');
    setTaskIcon(defaultRoutine === 'morning' ? '☀️' : defaultRoutine === 'evening' ? '🌙' : '🌸');
    setIsAddingTask(true);
  };

  const handleOpenEditForm = (task: DailyTask) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskCategory(task.category);
    setTaskRoutineTime(task.routineTime || 'morning');
    setTaskRoutineName(task.routineName || (task.routineTime === 'evening' ? 'Evening 🌙' : 'Morning 🌸'));
    setTaskIcon(task.icon || '🌸');
    setIsAddingTask(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    if (editingTaskId) {
      // Edit existing task (Rename, change category/routine)
      const updated = todayRecord.tasks.map((t) =>
        t.id === editingTaskId
          ? {
              ...t,
              title: taskTitle.trim(),
              category: taskCategory,
              routineTime: taskRoutineTime,
              routineName: taskRoutineName,
              icon: taskIcon,
            }
          : t
      );
      onUpdateRecord({ ...todayRecord, tasks: updated });
    } else {
      // Add new task
      const newTask: DailyTask = {
        id: `routine_${Date.now()}`,
        title: taskTitle.trim(),
        category: taskCategory,
        routineTime: taskRoutineTime,
        routineName: taskRoutineName,
        icon: taskIcon,
        completed: false,
        isExample: false,
      };
      onUpdateRecord({
        ...todayRecord,
        tasks: [...todayRecord.tasks, newTask],
      });
    }

    setTaskTitle('');
    setIsAddingTask(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdateRecord({
      ...todayRecord,
      tasks: todayRecord.tasks.filter((t) => t.id !== taskId),
    });
  };

  const handleMoveTask = (taskId: string, direction: 'up' | 'down') => {
    const list = [...todayRecord.tasks];
    const index = list.findIndex((t) => t.id === taskId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onUpdateRecord({ ...todayRecord, tasks: list });
  };

  const iconOptions = ['☀️', '💧', '✨', '🧴', '🥐', '💊', '🧘‍♀️', '🍲', '📖', '🕯️', '🎀', '🌙', '🍵', '🌸'];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-rose-50/70 to-pink-50/80 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{todayFormatted}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Daily Rituals
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              A fresh, clean page for today. Customize your morning and evening rituals as you bloom.
            </p>
          </div>

          {/* Circular Completion Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-pink-100 dark:text-pink-950"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-pink-500 transition-all duration-700 ease-out"
                strokeDasharray={251}
                strokeDashoffset={251 - (251 * completionPct) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100">
                {completionPct}%
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Routine Filter Chips */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {routineSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveFilter(sec.id)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                activeFilter === sec.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-soft font-bold'
                  : 'bg-white/70 dark:bg-gray-800/80 text-gray-600 dark:text-pink-200/80 hover:bg-pink-50 border border-pink-100 dark:border-pink-900/30'
              }`}
            >
              <span>{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleOpenAddForm(activeFilter === 'evening' ? 'evening' : 'morning')}
          className="px-3.5 py-1.5 rounded-2xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/60 text-pink-600 dark:text-pink-300 text-xs font-semibold hover:bg-pink-100 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task ♡</span>
        </button>
      </div>

      {/* 3. Add / Edit Task Drawer */}
      {isAddingTask && (
        <form
          onSubmit={handleSaveTask}
          className="p-5 rounded-3xl glass-card bg-pink-50/80 dark:bg-gray-900/90 border border-pink-200 dark:border-pink-900 space-y-3.5 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-pink-700 dark:text-pink-300 font-serif flex items-center gap-1.5">
              <span>🌸</span>
              <span>{editingTaskId ? 'Rename & Edit Routine Task' : 'Add a Loving Routine Task ♡'}</span>
            </h4>
            <button
              type="button"
              onClick={() => {
                setIsAddingTask(false);
                setEditingTaskId(null);
              }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-pink-300 mb-1">
                Task Description
              </label>
              <input
                type="text"
                placeholder="e.g. 10-minute stretch, warm chamomile tea, skincare..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                autoFocus
                required
                className="w-full px-3 py-2 rounded-xl text-xs border border-pink-200 dark:border-pink-900 bg-white dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-pink-300 mb-1">
                Routine Section
              </label>
              <select
                value={taskRoutineTime}
                onChange={(e) => {
                  const val = e.target.value as RoutineTime;
                  setTaskRoutineTime(val);
                  setTaskRoutineName(val === 'morning' ? 'Morning 🌸' : val === 'evening' ? 'Evening 🌙' : 'Custom Ritual 💖');
                }}
                className="w-full px-2.5 py-2 rounded-xl text-xs border border-pink-200 dark:border-pink-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-pink-200"
              >
                <option value="morning">Morning 🌸</option>
                <option value="evening">Evening 🌙</option>
                <option value="custom">Custom Ritual 💖</option>
              </select>
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-pink-300 mb-1">
              Select Cute Icon
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {iconOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setTaskIcon(emoji)}
                  className={`text-base p-1.5 rounded-xl transition-all ${
                    taskIcon === emoji
                      ? 'bg-pink-300 dark:bg-pink-900 scale-110 shadow-sm'
                      : 'bg-white/70 dark:bg-gray-800 hover:bg-pink-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all"
            >
              {editingTaskId ? 'Save Changes ♡' : 'Add to Routine ♡'}
            </button>
          </div>
        </form>
      )}

      {/* 4. Task List Grouped by Routine */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-400 dark:text-pink-300/60 uppercase tracking-wider">
            {filteredTasks.length} {activeFilter === 'all' ? 'total' : activeFilter} tasks
          </span>
          <span className="text-[11px] text-pink-500 font-medium">
            Click any task to check off with celebration ✨
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center bg-white/60 dark:bg-gray-900/40 border border-pink-100 dark:border-pink-950">
            <span className="text-3xl">🌸</span>
            <p className="font-serif font-bold text-gray-700 dark:text-pink-200 mt-2">
              No tasks in this routine yet ♡
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Click "+ Add Task" to customize your rituals.
            </p>
          </div>
        ) : (
          filteredTasks.map((task, idx) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                task.completed
                  ? 'bg-pink-50/50 dark:bg-pink-950/20 border-pink-200/50 dark:border-pink-900/30 text-gray-400 dark:text-gray-500'
                  : 'bg-white/80 dark:bg-gray-800/80 border-pink-100/80 dark:border-pink-900/30 text-gray-700 dark:text-pink-100 hover:border-pink-300 dark:hover:border-pink-800 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-lg shrink-0">{task.icon || '🌸'}</span>
                <div className="truncate">
                  <span
                    className={`text-xs md:text-sm font-medium truncate block ${
                      task.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-pink-400/80 dark:text-pink-400/60 mt-0.5">
                    <span className="font-semibold">{task.routineName || 'Morning 🌸'}</span>
                    <span>•</span>
                    <span className="capitalize">{task.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {/* Reorder Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveTask(task.id, 'up');
                  }}
                  disabled={idx === 0}
                  className="p-1 text-gray-300 hover:text-pink-600 disabled:opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Move earlier"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveTask(task.id, 'down');
                  }}
                  disabled={idx === filteredTasks.length - 1}
                  className="p-1 text-gray-300 hover:text-pink-600 disabled:opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Move later"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditForm(task);
                  }}
                  className="p-1.5 text-gray-300 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Rename / Edit task"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                  className="p-1.5 text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Completion Checkbox */}
                <div
                  className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-all ml-1 ${
                    task.completed
                      ? 'bg-pink-500 border-pink-500 text-white shadow-sm shadow-pink-300/50'
                      : 'border-pink-300 dark:border-pink-700 bg-white dark:bg-gray-900'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Today's Personal Notes */}
      <div className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <label className="block font-serif text-sm font-bold text-gray-800 dark:text-pink-100 mb-1.5">
          Notes for Today, Dhruvi ♡
        </label>
        <textarea
          rows={3}
          value={todayRecord.notes || ''}
          onChange={(e) => onUpdateRecord({ ...todayRecord, notes: e.target.value })}
          placeholder="Any quick thoughts, blessings, or reminders for today..."
          className="w-full text-xs md:text-sm p-3 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
    </div>
  );
};
