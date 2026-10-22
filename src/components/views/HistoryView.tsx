import React, { useState } from 'react';
import {
  History,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Droplets,
  Moon,
  Smile,
  CheckCircle2,
  UtensilsCrossed,
  Heart,
} from 'lucide-react';
import { DailyRecord } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { formatDatePretty } from '../../services/storage';

interface HistoryViewProps {
  records: Record<string, DailyRecord>;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ records }) => {
  const [filter, setFilter] = useState<'7' | '30' | 'all'>('7');
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const sortedDates = Object.keys(records).sort().reverse();
  const filteredDates =
    filter === '7'
      ? sortedDates.slice(0, 7)
      : filter === '30'
      ? sortedDates.slice(0, 30)
      : sortedDates;

  const toggleExpand = (d: string) => {
    setExpandedDate(expandedDate === d ? null : d);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-rose-100/90 via-pink-100/60 to-purple-50/70 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <History className="w-3.5 h-3.5" />
              <span>Full Historical Record</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Past Days
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Your real wellness journey permanently saved and never deleted on daily reset.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 p-1 rounded-2xl border border-pink-200 dark:border-pink-900 text-xs font-semibold">
            <button
              onClick={() => setFilter('7')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === '7'
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-pink-200 hover:text-pink-600'
              }`}
            >
              Past 7 Days
            </button>
            <button
              onClick={() => setFilter('30')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === '30'
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-pink-200 hover:text-pink-600'
              }`}
            >
              Past 30 Days
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-pink-200 hover:text-pink-600'
              }`}
            >
              All Records
            </button>
          </div>
        </div>
      </div>

      {/* 2. Historical Records List */}
      <div className="space-y-3">
        {filteredDates.length === 0 ? (
          <div className="glass-card rounded-3xl p-10 text-center bg-white/70 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950">
            <span className="text-3xl">🌸</span>
            <h4 className="font-serif font-bold text-gray-700 dark:text-pink-200 mt-2">
              Your personal history begins today ♡
            </h4>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Every day you check in and log, your entries will be safely preserved here forever.
            </p>
          </div>
        ) : (
          filteredDates.map((dateStr) => {
            const rec = records[dateStr];
            const isExpanded = expandedDate === dateStr;
            const completedTasks = rec.tasks.filter((t) => t.completed).length;

            return (
              <div
                key={dateStr}
                className={`glass-card rounded-3xl border overflow-hidden shadow-soft transition-all ${
                  rec.isExample
                    ? 'border-pink-200/80 border-dashed bg-gradient-to-r from-pink-50/50 to-purple-50/40 dark:bg-pink-950/20'
                    : 'border-pink-100 dark:border-pink-950 bg-white/80 dark:bg-gray-900/70'
                }`}
              >
                <div
                  onClick={() => toggleExpand(dateStr)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-pink-50/40 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white font-serif font-bold flex items-center justify-center text-sm shadow-sm">
                      {rec.wellnessScore}%
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
                          {formatDatePretty(dateStr)}
                        </h3>
                        {rec.isExample ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold">
                            ✨ Tutorial Demo Day
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                            💗 Personal Record
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-pink-300/80 mt-0.5">
                        <span>💧 {rec.waterGlasses} glasses</span>
                        <span>•</span>
                        <span>✓ {completedTasks}/{rec.tasks.length} tasks</span>
                        <span>•</span>
                        <span className="capitalize">
                          Mood: {rec.moods.length > 0 ? rec.moods[0].mood : 'Calm'}
                        </span>
                        {rec.periodFlow !== 'none' && (
                          <>
                            <span>•</span>
                            <span className="text-rose-500 font-semibold capitalize">
                              🌹 {rec.periodFlow} flow
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="text-gray-400 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-pink-100 dark:border-pink-950 bg-pink-50/30 dark:bg-gray-900/40 space-y-4 text-xs">
                    {/* Meals */}
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-pink-200 block mb-1.5 flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-pink-500" />
                        Meals Logged ({rec.meals.length}):
                      </span>
                      {rec.meals.length === 0 ? (
                        <p className="text-gray-400 italic">No meals logged on this date.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {rec.meals.map((m) => (
                            <div
                              key={m.id}
                              className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900"
                            >
                              <p className="font-semibold capitalize text-pink-700 dark:text-pink-300">
                                {m.mealType}: {m.foodName}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{m.feelingAfter}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sleep & Energy */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900">
                        <span className="text-gray-400 block text-[10px]">Sleep</span>
                        <span className="font-semibold text-purple-600">
                          {rec.sleep
                            ? `${Math.floor(rec.sleep.durationMinutes / 60)}h ${rec.sleep.durationMinutes % 60}m (${rec.sleep.quality})`
                            : 'Not recorded'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900">
                        <span className="text-gray-400 block text-[10px]">Daily Energy</span>
                        <span className="font-semibold text-amber-600">
                          {rec.energyLevel} / 10
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900">
                        <span className="text-gray-400 block text-[10px]">Self-Care Done</span>
                        <span className="font-semibold text-pink-600">
                          {rec.selfCare.filter((s) => s.completed).length} items
                        </span>
                      </div>
                    </div>

                    {rec.notes && (
                      <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">
                          Daily Reflection Note
                        </span>
                        <p className="italic text-gray-700 dark:text-pink-200 mt-1">
                          "{rec.notes}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
