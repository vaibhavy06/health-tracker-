import React, { useState } from 'react';
import { Droplets, Plus, Minus, Sparkles, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyRecord, UserProfile } from '../../types';
import { WaterDropIllustration, CuteBowIcon } from '../common/CuteIllustrations';

interface WaterViewProps {
  profile: UserProfile;
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const WaterView: React.FC<WaterViewProps> = ({
  profile,
  todayRecord,
  onUpdateRecord,
  onUpdateProfile,
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(profile.waterGoalGlasses || 8);

  const goal = profile.waterGoalGlasses || 8;
  const current = todayRecord.waterGlasses;
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  const mlTotal = current * 250;
  const mlGoal = goal * 250;
  const isGoalReached = current >= goal;

  const handleAddGlass = () => {
    const next = current + 1;
    onUpdateRecord({ ...todayRecord, waterGlasses: next });

    if (next === goal) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0284c7', '#f472b6', '#fbcfe8'],
      });
    }
  };

  const handleRemoveGlass = () => {
    if (current > 0) {
      onUpdateRecord({ ...todayRecord, waterGlasses: current - 1 });
    }
  };

  const handleSaveGoal = () => {
    onUpdateProfile({ waterGoalGlasses: Math.max(4, Math.min(16, goalInput)) });
    setIsEditingGoal(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-sky-100/90 via-cyan-50/70 to-pink-50/70 dark:from-sky-950/40 dark:via-cyan-950/20 dark:to-gray-900/40 border border-sky-200/70 dark:border-sky-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-sky-950 text-xs font-semibold text-sky-600 dark:text-sky-300 border border-sky-200">
              <Droplets className="w-3.5 h-3.5" />
              <span>Glow From Within</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Hydration Sanctuary
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-sky-200/80">
              Keeping your cells plump, mind clear, and natural radiance blooming.
            </p>
          </div>

          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/80 dark:bg-gray-800 text-sky-600 dark:text-sky-300 border border-sky-200 hover:bg-sky-50 transition-colors"
          >
            {isEditingGoal ? 'Cancel' : 'Change Goal'}
          </button>
        </div>

        {isEditingGoal && (
          <div className="mt-4 p-3 rounded-2xl bg-white/90 dark:bg-gray-800 border border-sky-200 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-gray-700 dark:text-sky-200">
              Daily Target (glasses):
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={4}
                max={16}
                value={goalInput}
                onChange={(e) => setGoalInput(parseInt(e.target.value) || 8)}
                className="w-16 text-center text-xs p-1.5 rounded-lg border border-sky-300 dark:bg-gray-700"
              />
              <button
                onClick={handleSaveGoal}
                className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-bold"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Water Visualizer Card */}
      <div className="glass-card rounded-3xl p-8 bg-white/80 dark:bg-gray-900/70 border border-sky-100 dark:border-sky-950 shadow-soft text-center flex flex-col items-center">
        {/* Animated Progress Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center my-3">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="78"
              stroke="currentColor"
              strokeWidth="14"
              className="text-sky-100 dark:text-sky-950"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="78"
              stroke="url(#waterGrad)"
              strokeWidth="14"
              strokeDasharray={490}
              strokeDashoffset={490 - (490 * percentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              fill="transparent"
            />
            <defs>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute text-center space-y-1">
            <span className="text-3xl animate-bounce">💧</span>
            <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100">
              {current} <span className="text-base text-gray-400 font-sans">/ {goal}</span>
            </div>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
              {mlTotal} ml / {mlGoal} ml
            </p>
          </div>
        </div>

        {/* Supportive Feedback */}
        {isGoalReached ? (
          <div className="mt-3 px-4 py-2 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Hydration goal reached for today, Dhruvi ♡ Your skin and body thank you!</span>
          </div>
        ) : (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500 dark:text-sky-300/80">
              {goal - current} more glasses to complete today's gentle target
            </p>
            <p className="text-[11px] text-pink-500/90 dark:text-pink-300/70 italic">
              "No worries, tomorrow is another fresh start ♡ Every little sip counts."
            </p>
          </div>
        )}

        {/* Increment / Decrement Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleRemoveGlass}
            disabled={current <= 0}
            className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-gray-800 text-sky-600 dark:text-sky-300 flex items-center justify-center border border-sky-200 hover:bg-sky-100 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
            title="Remove glass"
          >
            <Minus className="w-5 h-5" />
          </button>

          <button
            onClick={handleAddGlass}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Drink 1 Glass (+250ml)</span>
          </button>
        </div>

        {/* Interactive Visual Glass Rack */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-8 w-full max-w-lg">
          {Array.from({ length: goal }).map((_, index) => {
            const isFilled = index < current;
            return (
              <div
                key={index}
                onClick={() => {
                  if (index < current) {
                    onUpdateRecord({ ...todayRecord, waterGlasses: index });
                  } else {
                    onUpdateRecord({ ...todayRecord, waterGlasses: index + 1 });
                  }
                }}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isFilled
                    ? 'bg-sky-100/70 dark:bg-sky-950/80 border-sky-300 text-sky-600 shadow-sm'
                    : 'bg-white/60 dark:bg-gray-800/40 border-sky-100 dark:border-sky-950 text-gray-300 hover:border-sky-200'
                }`}
              >
                <WaterDropIllustration filled={isFilled} className="w-7 h-7" />
                <span className="text-[10px] font-bold mt-1 text-gray-500 dark:text-sky-300/60">
                  #{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
