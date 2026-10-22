import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Droplet,
  Heart,
  Smile,
  X,
} from 'lucide-react';
import { DailyRecord, UserProfile, CycleInfo } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { formatDatePretty } from '../../services/storage';

interface CalendarViewProps {
  profile: UserProfile;
  records: Record<string, DailyRecord>;
  cycleInfo: CycleInfo;
  onSelectDate: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  profile,
  records,
  cycleInfo,
  onSelectDate,
}) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDayRecord, setSelectedDayRecord] = useState<DailyRecord | null>(null);

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Helper to format date string YYYY-MM-DD
  const getDateStr = (dayNum: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const renderDays = () => {
    const days = [];
    // Empty prefix cells
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-16 md:h-20 rounded-2xl bg-transparent" />
      );
    }

    const todayDate = new Date();
    const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = getDateStr(day);
      const record = records[dateStr];
      const isToday = isCurrentMonth && todayDate.getDate() === day;

      const hasPeriod = record && record.periodFlow && record.periodFlow !== 'none';
      const hasSymptoms = record && record.symptoms && record.symptoms.length > 0;
      const hasMood = record && record.moods && record.moods.length > 0;

      days.push(
        <div
          key={dateStr}
          onClick={() => {
            if (record) {
              setSelectedDayRecord(record);
            }
          }}
          className={`h-16 md:h-20 p-1.5 md:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
            isToday
              ? 'bg-pink-100/70 dark:bg-pink-950/70 border-pink-400 dark:border-pink-600 shadow-sm'
              : record
              ? 'bg-white/80 dark:bg-gray-800/80 border-pink-100 dark:border-pink-900/40 hover:border-pink-300 dark:hover:border-pink-700'
              : 'bg-white/40 dark:bg-gray-900/30 border-transparent text-gray-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs md:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                isToday
                  ? 'bg-pink-500 text-white font-bold'
                  : 'text-gray-700 dark:text-pink-200'
              }`}
            >
              {day}
            </span>
            {hasPeriod && (
              <span className="text-[10px] px-1 rounded-full bg-rose-200 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold flex items-center gap-0.5">
                <Droplet className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 mt-auto">
            {hasMood && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Mood logged" />
            )}
            {hasSymptoms && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" title="Symptoms logged" />
            )}
            {record?.waterGlasses && record.waterGlasses >= 6 && (
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="Hydrated" />
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header & Month Navigator */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-rose-50/70 to-purple-50/70 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Cycle & Wellness Calendar
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80 mt-1">
              Color-coded overview of your cycles, moods, and hydration patterns.
            </p>
          </div>

          {/* Month Switcher Controls */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-2xl border border-pink-200 dark:border-pink-900 shadow-sm">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-xl text-gray-500 hover:text-pink-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 px-2 min-w-[120px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-xl text-gray-500 hover:text-pink-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Calendar Grid */}
      <div className="glass-card rounded-3xl p-4 md:p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2 font-serif font-semibold text-xs text-pink-600 dark:text-pink-400">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {renderDays()}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-pink-100 dark:border-pink-950 text-xs text-gray-600 dark:text-pink-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span>Period Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span>Mood Logged</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400" />
            <span>Hydration Met</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-pink-500" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* 3. Selected Day Drawer / Modal */}
      {selectedDayRecord && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 dark:border-pink-950 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDayRecord(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌸</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100">
                  {formatDatePretty(selectedDayRecord.date)}
                </h3>
                <p className="text-xs text-pink-600 dark:text-pink-300 font-semibold">
                  Wellness Score: {selectedDayRecord.wellnessScore}%
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-700 dark:text-pink-200 mt-4">
              <div className="p-3 rounded-2xl bg-pink-50/60 dark:bg-pink-950/40 border border-pink-100">
                <span className="font-semibold block text-pink-700 dark:text-pink-300">
                  💧 Hydration
                </span>
                <p>{selectedDayRecord.waterGlasses} glasses drank</p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100">
                <span className="font-semibold block text-purple-700 dark:text-purple-300">
                  🌙 Sleep & Rest
                </span>
                <p>
                  {selectedDayRecord.sleep
                    ? `${Math.floor(selectedDayRecord.sleep.durationMinutes / 60)}h ${selectedDayRecord.sleep.durationMinutes % 60}m (${selectedDayRecord.sleep.quality})`
                    : 'Not logged'}
                </p>
              </div>

              {selectedDayRecord.periodFlow !== 'none' && (
                <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100">
                  <span className="font-semibold block text-rose-700 dark:text-rose-300">
                    🌹 Period Flow
                  </span>
                  <p className="capitalize">{selectedDayRecord.periodFlow} flow</p>
                </div>
              )}

              {selectedDayRecord.meals && selectedDayRecord.meals.length > 0 && (
                <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100">
                  <span className="font-semibold block text-amber-700 dark:text-amber-300">
                    🥐 Nourishing Meals ({selectedDayRecord.meals.length})
                  </span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {selectedDayRecord.meals.map((m) => (
                      <li key={m.id} className="truncate">
                        {m.foodName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDayRecord.notes && (
                <div className="p-3 rounded-2xl bg-pink-50/40 dark:bg-gray-800/50 border border-pink-100">
                  <span className="font-semibold block text-gray-500">Notes</span>
                  <p className="italic mt-0.5">"{selectedDayRecord.notes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
