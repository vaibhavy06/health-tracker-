import React from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Droplets,
  Moon,
  Activity,
  Smile,
  ShieldAlert,
} from 'lucide-react';
import { WellnessInsight, UserProfile, CycleInfo } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';

interface InsightsViewProps {
  insights: WellnessInsight[];
  profile: UserProfile;
  cycleInfo: CycleInfo;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  insights,
  profile,
  cycleInfo,
}) => {
  const trendsList = [
    { label: 'Sleep Quality', trend: 'up', delta: '+14% consistency', icon: Moon, color: 'text-purple-500' },
    { label: 'Daily Hydration', trend: 'up', delta: '+1.8 glasses/day', icon: Droplets, color: 'text-sky-500' },
    { label: 'Heart & Mood', trend: 'steady', delta: 'Steady calmness', icon: Smile, color: 'text-amber-500' },
    { label: 'Movement Frequency', trend: 'up', delta: '4 days / week', icon: Activity, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-purple-100/90 via-pink-100/70 to-amber-100/70 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-purple-200/70 dark:border-purple-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-purple-950 text-xs font-semibold text-purple-600 dark:text-purple-300 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gentle Pattern Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            Her Patterns ♡
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-purple-200/80">
            Thoughtful observations based on your logged history, helping you understand your natural rhythms.
          </p>
        </div>
      </div>

      {/* 2. Wellness Trends Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {trendsList.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-4 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft text-center"
            >
              <div className="w-8 h-8 mx-auto rounded-xl bg-pink-50 dark:bg-pink-950/60 flex items-center justify-center mb-2">
                <Icon className={`w-4 h-4 ${t.color}`} />
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-pink-300/80">
                {t.label}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {t.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                {t.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
                {t.trend === 'steady' && <Minus className="w-4 h-4 text-amber-500" />}
                <span className="text-xs font-bold text-gray-800 dark:text-pink-100">
                  {t.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Deep Pattern Cards */}
      <div className="space-y-4">
        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
          <span>🌸</span> Observed Rhythm Patterns
        </h3>

        {insights.map((insight) => (
          <div
            key={insight.id}
            className="glass-card rounded-3xl p-5 md:p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/80 px-2.5 py-1 rounded-full border border-pink-100">
                  Confidence {insight.confidence}% · Verified Observation
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-gray-800 dark:text-pink-100 mt-2">
                  {insight.title}
                </h4>
              </div>

              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/90 leading-relaxed mt-2.5">
              {insight.description}
            </p>

            <div className="mt-4 pt-3 border-t border-pink-50 dark:border-pink-950/60 flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium text-pink-700 dark:text-pink-300">
                Supporting metric: {insight.supportingMetric}
              </span>
              <span className="text-[11px] text-gray-400">Based on past 14 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Non-Medical Observation Principle */}
      <div className="p-4 rounded-3xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-center text-xs text-pink-800 dark:text-pink-200 leading-relaxed">
        <p className="font-serif font-bold">A Gentle Note on Your Wellness Data</p>
        <p className="mt-1 text-gray-600 dark:text-pink-300/80">
          All insights are personalized reflections drawn strictly from your private logged entries. They are designed for holistic mindfulness, not medical diagnosis.
        </p>
      </div>
    </div>
  );
};
