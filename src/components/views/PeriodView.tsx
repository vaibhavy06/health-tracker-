import React, { useState } from 'react';
import {
  CalendarHeart,
  Sparkles,
  Droplet,
  Heart,
  Calendar,
  AlertCircle,
  Check,
  ChevronRight,
  Info,
  CalendarRange,
} from 'lucide-react';
import { DailyRecord, UserProfile, CycleInfo, FlowLevel } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { getTodayDateString } from '../../services/storage';

interface PeriodViewProps {
  profile: UserProfile;
  todayRecord: DailyRecord;
  cycleInfo: CycleInfo;
  onUpdateRecord: (updated: DailyRecord) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const PeriodView: React.FC<PeriodViewProps> = ({
  profile,
  todayRecord,
  cycleInfo,
  onUpdateRecord,
  onUpdateProfile,
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    todayRecord.symptoms.map((s) => s.name)
  );
  const [customPeriodDate, setCustomPeriodDate] = useState(profile.lastPeriodStart || '');

  const flowLevels: { id: FlowLevel; label: string; icon: string; color: string }[] = [
    { id: 'none', label: 'No Flow', icon: '✨', color: 'bg-gray-100 text-gray-600' },
    { id: 'spotting', label: 'Spotting', icon: '💧', color: 'bg-pink-100 text-pink-600' },
    { id: 'light', label: 'Light', icon: '🌸', color: 'bg-rose-100 text-rose-600' },
    { id: 'medium', label: 'Medium', icon: '🌺', color: 'bg-rose-200 text-rose-700' },
    { id: 'heavy', label: 'Heavy', icon: '🌹', color: 'bg-rose-300 text-rose-900' },
  ];

  const commonSymptoms = [
    'Cramps',
    'Headache',
    'Backache',
    'Bloating',
    'Acne',
    'Fatigue',
    'Breast tenderness',
    'Nausea',
    'Food cravings',
    'Emotional sensitivity',
    'Restless sleep',
    'Lower back tension',
  ];

  const handleSelectFlow = (flow: FlowLevel) => {
    onUpdateRecord({ ...todayRecord, periodFlow: flow });
  };

  const handleToggleSymptom = (symptomName: string) => {
    let updatedNames: string[];
    if (selectedSymptoms.includes(symptomName)) {
      updatedNames = selectedSymptoms.filter((s) => s !== symptomName);
    } else {
      updatedNames = [...selectedSymptoms, symptomName];
    }
    setSelectedSymptoms(updatedNames);

    const updatedEntries = updatedNames.map((name) => ({
      id: `sym_${Date.now()}_${name}`,
      name,
      category: 'physical' as const,
      severity: 5,
      isExample: false,
    }));
    onUpdateRecord({ ...todayRecord, symptoms: updatedEntries });
  };

  const handleMarkPeriodToday = () => {
    const todayStr = getTodayDateString();
    onUpdateProfile({ lastPeriodStart: todayStr });
    onUpdateRecord({ ...todayRecord, periodFlow: 'medium' });
  };

  const handleSetCustomPeriodStart = () => {
    if (customPeriodDate) {
      onUpdateProfile({ lastPeriodStart: customPeriodDate });
    }
  };

  // 28-day circle circumference and position calculation
  const totalDays = profile.cycleLength || 28;
  const cycleDay = cycleInfo.cycleDay;
  const progressRatio = Math.min(cycleDay / totalDays, 1);
  const strokeDashoffset = 565 - 565 * progressRatio;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-rose-100/60 to-purple-100/70 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cycle Rhythm & Harmony</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Menstrual Cycle
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Honoring every phase of your feminine natural rhythm.
            </p>
          </div>

          <button
            onClick={handleMarkPeriodToday}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Droplet className="w-4 h-4 fill-white" />
            <span>Started Period Today ♡</span>
          </button>
        </div>
      </div>

      {/* 2. Setup Cycle Start Card (if blank or calibrating) */}
      {!profile.lastPeriodStart && (
        <div className="p-5 rounded-3xl glass-card bg-gradient-to-r from-pink-50/90 to-purple-50/70 dark:bg-gray-900/80 border border-pink-200 dark:border-pink-900/60 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-sm font-bold text-pink-800 dark:text-pink-200 flex items-center gap-1.5 justify-center sm:justify-start">
              <CalendarRange className="w-4 h-4 text-pink-500" />
              <span>Calibrate Your Natural Cycle Rhythm</span>
            </h3>
            <p className="text-xs text-gray-600 dark:text-pink-200/70">
              Enter the date your last period began to see your current phase, or tap "Started Period Today" when it begins!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              type="date"
              value={customPeriodDate}
              onChange={(e) => setCustomPeriodDate(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-pink-300 dark:border-pink-800 bg-white dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
            <button
              onClick={handleSetCustomPeriodStart}
              className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Set Date
            </button>
          </div>
        </div>
      )}

      {/* 3. Circular Cycle Visualization Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center my-4">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="currentColor"
              strokeWidth="14"
              className="text-pink-100/80 dark:text-pink-950/60"
              fill="transparent"
            />
            {/* Progress Stroke */}
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="url(#cycleGrad)"
              strokeWidth="14"
              strokeDasharray={565}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              fill="transparent"
            />
            <defs>
              <linearGradient id="cycleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Info Inside Ring */}
          <div className="absolute text-center space-y-1">
            <span className="text-3xl">{cycleInfo.phaseEmoji}</span>
            <div className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-pink-100">
              Day {cycleInfo.cycleDay}
            </div>
            <p className="text-xs font-bold text-pink-600 dark:text-pink-300 uppercase tracking-wider">
              {cycleInfo.phaseName}
            </p>
            <p className="text-[11px] text-gray-400">
              {cycleInfo.nextPeriodDate}
            </p>
          </div>
        </div>

        {/* Phase Explanations & Gentle Self-Care Note */}
        <div className="w-full max-w-xl p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-center space-y-2 mt-2">
          <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-pink-200">
            "{cycleInfo.phaseDescription}"
          </p>
          <div className="text-[11px] font-semibold text-pink-600 dark:text-pink-300 flex items-center justify-center gap-1.5 pt-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gentle Self-Care Tip: {cycleInfo.selfCareTip}</span>
          </div>
        </div>

        {/* 4 Phases Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-6">
          <div
            className={`p-3 rounded-2xl border text-center transition-all ${
              cycleInfo.phase === 'menstrual'
                ? 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-300 text-rose-800 dark:text-rose-200 font-bold'
                : 'bg-white/60 dark:bg-gray-800/40 border-pink-100 dark:border-pink-950 text-gray-500'
            }`}
          >
            <span className="text-base">🌸</span>
            <p className="text-xs font-semibold mt-1">Menstrual</p>
            <p className="text-[10px] text-gray-400">Days 1 - 5</p>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center transition-all ${
              cycleInfo.phase === 'follicular'
                ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-200 font-bold'
                : 'bg-white/60 dark:bg-gray-800/40 border-pink-100 dark:border-pink-950 text-gray-500'
            }`}
          >
            <span className="text-base">🌱</span>
            <p className="text-xs font-semibold mt-1">Follicular</p>
            <p className="text-[10px] text-gray-400">Days 6 - 11</p>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center transition-all ${
              cycleInfo.phase === 'ovulatory'
                ? 'bg-amber-100/70 dark:bg-amber-950/60 border-amber-300 text-amber-800 dark:text-amber-200 font-bold'
                : 'bg-white/60 dark:bg-gray-800/40 border-pink-100 dark:border-pink-950 text-gray-500'
            }`}
          >
            <span className="text-base">✨</span>
            <p className="text-xs font-semibold mt-1">Ovulatory</p>
            <p className="text-[10px] text-gray-400">Days 12 - 16</p>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center transition-all ${
              cycleInfo.phase === 'luteal'
                ? 'bg-purple-100/70 dark:bg-purple-950/60 border-purple-300 text-purple-800 dark:text-purple-200 font-bold'
                : 'bg-white/60 dark:bg-gray-800/40 border-pink-100 dark:border-pink-950 text-gray-500'
            }`}
          >
            <span className="text-base">🍂</span>
            <p className="text-xs font-semibold mt-1">Luteal</p>
            <p className="text-[10px] text-gray-400">Days 17 - 28</p>
          </div>
        </div>
      </div>

      {/* 4. Log Today's Flow Level */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="w-5 h-5 text-rose-500" />
          <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
            Today's Flow Level
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {flowLevels.map((lvl) => {
            const isSelected = todayRecord.periodFlow === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => handleSelectFlow(lvl.id)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-soft font-bold scale-[1.02]'
                    : 'bg-pink-50/40 dark:bg-gray-800/50 border-pink-100 dark:border-pink-900 text-gray-700 dark:text-pink-200 hover:border-pink-300'
                }`}
              >
                <span className="text-lg">{lvl.icon}</span>
                <span className="text-xs">{lvl.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Common Symptoms Checklist */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
              Log Today's Body Symptoms
            </h3>
          </div>
          <span className="text-xs text-gray-400">
            {selectedSymptoms.length} logged today
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((sym) => {
            const isSelected = selectedSymptoms.includes(sym);
            return (
              <button
                key={sym}
                onClick={() => handleToggleSymptom(sym)}
                className={`px-3 py-2 rounded-2xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500 shadow-soft font-semibold'
                    : 'bg-pink-50/50 dark:bg-gray-800/60 border-pink-100 dark:border-pink-900 text-gray-700 dark:text-pink-200 hover:bg-pink-100/60'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span>🌸</span>}
                <span>{sym}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Health & Diagnostic Disclaimer */}
      <div className="p-4 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="font-bold">A Caring Note on Natural Predictions</p>
          <p className="mt-0.5">
            Menstrual cycle calculations are based on your personal cycle rhythm. They are designed for self-care awareness and lifestyle planning. Please consult your healthcare provider for clinical or reproductive guidance.
          </p>
        </div>
      </div>
    </div>
  );
};
