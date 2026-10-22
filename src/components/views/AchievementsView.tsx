import React from 'react';
import { Award, Flame, Sparkles, Heart, CheckCircle2, Shield } from 'lucide-react';
import { Achievement } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';

interface AchievementsViewProps {
  achievements: Achievement[];
  streaks: {
    dailyStreak: number;
    waterStreak: number;
    journalStreak: number;
  };
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  streaks,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-amber-100/90 via-pink-100/70 to-rose-100/70 dark:from-amber-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-amber-200/70 dark:border-amber-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-amber-950 text-xs font-semibold text-amber-600 dark:text-amber-300 border border-amber-200">
            <Award className="w-3.5 h-3.5" />
            <span>Gentle Milestones & Blossoms</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            Achievements & Streaks
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-amber-200/80">
            Encouraging consistency without any pressure. You are blossoming every day.
          </p>
        </div>
      </div>

      {/* 2. Forgiving Streaks Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft text-center">
          <div className="w-10 h-10 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center mb-2">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-500 dark:text-pink-300/80 uppercase">
            Daily Sanctuary
          </span>
          <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100 my-0.5">
            {streaks.dailyStreak} Days
          </div>
          <p className="text-[10px] text-pink-500 font-medium">Loving presence</p>
        </div>

        <div className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft text-center">
          <div className="w-10 h-10 mx-auto rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-500 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-500 dark:text-pink-300/80 uppercase">
            Hydration Glow
          </span>
          <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100 my-0.5">
            {streaks.waterStreak} Days
          </div>
          <p className="text-[10px] text-sky-500 font-medium">Radiant cells</p>
        </div>

        <div className="glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft text-center">
          <div className="w-10 h-10 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-500 flex items-center justify-center mb-2">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-gray-500 dark:text-pink-300/80 uppercase">
            Mindful Diary
          </span>
          <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100 my-0.5">
            {streaks.journalStreak} Days
          </div>
          <p className="text-[10px] text-purple-500 font-medium">Heart connected</p>
        </div>
      </div>

      {/* 3. Forgiving Grace Banner */}
      <div className="p-4 rounded-3xl bg-pink-50/80 dark:bg-pink-950/30 border border-pink-200/80 dark:border-pink-900/50 flex items-center gap-3">
        <span className="text-2xl">🌸</span>
        <div className="text-xs text-pink-900 dark:text-pink-200">
          <p className="font-bold">It is always okay to take a pause ♡</p>
          <p className="text-gray-600 dark:text-pink-300/80 mt-0.5">
            Missed a day? No guilt. Your new chapter starts today, right here, with open arms.
          </p>
        </div>
      </div>

      {/* 4. Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
            Sanctuary Badges ({unlockedCount} / {achievements.length} Unlocked)
          </h3>
          <span className="text-xs text-pink-500 font-semibold">Keep blooming</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = !!ach.unlockedAt;
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-3xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'glass-card bg-white/90 dark:bg-gray-900/80 border-pink-200 dark:border-pink-900 shadow-soft'
                    : 'bg-white/40 dark:bg-gray-900/30 border-pink-100/50 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-pink-300 to-rose-200 shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 grayscale'
                  }`}
                >
                  {ach.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-bold text-gray-800 dark:text-pink-100">
                      {ach.title}
                    </h4>
                    {isUnlocked ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 font-bold">
                        Unlocked ✓
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Locked</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-pink-300/80 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                  <p className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold mt-2">
                    {ach.progressText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
