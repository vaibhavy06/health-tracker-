import React from 'react';
import {
  FileText,
  Sparkles,
  Heart,
  Droplets,
  Moon,
  Activity,
  Award,
  Printer,
  Calendar,
} from 'lucide-react';
import { DailyRecord, UserProfile } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';

interface MonthlyReportViewProps {
  records: Record<string, DailyRecord>;
  profile: UserProfile;
}

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  records,
  profile,
}) => {
  const currentMonthName = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const recordList = Object.values(records);
  const daysTracked = recordList.length;

  const avgWellness =
    daysTracked > 0
      ? Math.round(
          recordList.reduce((sum, r) => sum + r.wellnessScore, 0) / daysTracked
        )
      : 84;

  const avgWater =
    daysTracked > 0
      ? (
          recordList.reduce((sum, r) => sum + r.waterGlasses, 0) / daysTracked
        ).toFixed(1)
      : '7.2';

  const totalSleepMinutes = recordList.reduce(
    (sum, r) => sum + (r.sleep?.durationMinutes || 460),
    0
  );
  const avgSleepMinutes = Math.round(totalSleepMinutes / (daysTracked || 1));
  const avgSleepHours = Math.floor(avgSleepMinutes / 60);
  const avgSleepMins = avgSleepMinutes % 60;

  const exerciseDays = recordList.filter((r) => r.exercises.length > 0).length;
  const selfCareDays = recordList.filter(
    (r) => r.selfCare.some((s) => s.completed)
  ).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-rose-100/70 to-purple-100/70 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <FileText className="w-3.5 h-3.5" />
              <span>Monthly Sanctuary Review</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              {currentMonthName} Wellness Report ♡
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Celebrating your progress, consistency, and gentle self-love.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-gray-800 border border-pink-200 dark:border-pink-900 text-pink-600 dark:text-pink-300 font-semibold text-xs shadow-soft hover:bg-pink-50 flex items-center gap-2 shrink-0 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save Report</span>
          </button>
        </div>
      </div>

      {/* 2. Beautiful Printable Certificate / Report Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 bg-white/95 dark:bg-gray-900/90 border-2 border-pink-200 dark:border-pink-900 shadow-soft-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-950">
          <div>
            <span className="font-serif text-xl font-bold text-gray-800 dark:text-pink-100">
              {profile.displayName}'s Month in Bloom
            </span>
            <p className="text-xs text-gray-400 mt-0.5">{currentMonthName}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400">
              Average Harmony
            </span>
            <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100">
              {avgWellness}%
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/40 text-center border border-pink-100">
            <Calendar className="w-5 h-5 mx-auto text-pink-500 mb-1" />
            <span className="text-xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {daysTracked}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Days Tracked</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 text-center border border-purple-100">
            <Moon className="w-5 h-5 mx-auto text-purple-500 mb-1" />
            <span className="text-xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {avgSleepHours}h {avgSleepMins}m
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Average Sleep</p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 text-center border border-sky-100">
            <Droplets className="w-5 h-5 mx-auto text-sky-500 mb-1" />
            <span className="text-xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {avgWater}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Glasses / Day</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 text-center border border-emerald-100">
            <Activity className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
            <span className="text-xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {exerciseDays}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Movement Days</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-gray-800/60 border border-pink-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-pink-600 tracking-wider">
              Best Consistent Habit
            </span>
            <h4 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
              Hydration & Self-Care Routine ♡
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              You completed your skincare and reached over 85% of your hydration targets this month.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-gray-800/60 border border-purple-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
              Gentle Opportunity
            </span>
            <h4 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
              Bedtime Wind-Down
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Giving yourself 20 minutes of screen-free cozy reading before bed will nurture even deeper sleep.
            </p>
          </div>
        </div>

        {/* Motivational Heartfelt Closing */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 dark:from-pink-950/40 dark:via-rose-950/30 dark:to-gray-900 border border-pink-200 text-center space-y-2">
          <Heart className="w-6 h-6 text-pink-500 mx-auto fill-pink-500" />
          <p className="font-handwritten text-2xl text-pink-800 dark:text-pink-200">
            "You are doing so wonderfully, {profile.displayName}."
          </p>
          <p className="text-xs text-gray-600 dark:text-pink-300/80 max-w-md mx-auto leading-relaxed">
            Wellness isn't about being perfect; it's about checking in with yourself with love every single day. Here is to another beautiful month together ♡
          </p>
        </div>
      </div>
    </div>
  );
};
