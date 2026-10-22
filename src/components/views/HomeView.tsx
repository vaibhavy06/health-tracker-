import React, { useState } from 'react';
import {
  Sparkles,
  Droplets,
  Moon,
  Smile,
  CheckCircle2,
  CalendarHeart,
  BookOpen,
  Edit3,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Pin,
  Heart,
  Activity,
  HeartHandshake,
  UtensilsCrossed,
} from 'lucide-react';
import { DailyRecord, UserProfile, CycleInfo, MessageTone } from '../../types';
import { CozyGirlIllustration, CuteBowIcon } from '../common/CuteIllustrations';
import { NavTab } from '../common/Sidebar';
import { DemoModeBanner } from '../common/DemoModeBanner';
import { messageTones } from '../../data/demoData';

interface HomeViewProps {
  profile: UserProfile;
  todayRecord: DailyRecord;
  cycleInfo: CycleInfo;
  todayFormatted: string;
  onNavigate: (tab: NavTab) => void;
  onUpdateRecord: (updated: DailyRecord) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onStartFresh: () => void;
  onExploreDemo: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  todayRecord,
  cycleInfo,
  todayFormatted,
  onNavigate,
  onUpdateRecord,
  onUpdateProfile,
  onStartFresh,
  onExploreDemo,
}) => {
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [quoteInput, setQuoteInput] = useState(profile.personalReminder);
  const [isCustomizingDashboard, setIsCustomizingDashboard] = useState(false);

  // Time-based warm greeting for Dhruvi
  const hour = new Date().getHours();
  let greetingTime = 'Good morning';
  if (hour >= 12 && hour < 17) greetingTime = 'Good afternoon';
  else if (hour >= 17) greetingTime = 'Good evening';

  const completedTasks = todayRecord.tasks.filter((t) => t.completed).length;
  const totalTasks = todayRecord.tasks.length;
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = todayRecord.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdateRecord({ ...todayRecord, tasks: updatedTasks });
  };

  const handleQuickAddWater = () => {
    const newGlasses = Math.min(todayRecord.waterGlasses + 1, 16);
    onUpdateRecord({ ...todayRecord, waterGlasses: newGlasses });
  };

  const handleSaveQuote = () => {
    onUpdateProfile({ personalReminder: quoteInput });
    setIsEditingQuote(false);
  };

  const handleSelectMessageTone = (tone: MessageTone) => {
    const quotes = messageTones[tone].quotes;
    const pickedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    onUpdateProfile({
      messageTone: tone,
      personalReminder: pickedQuote,
    });
    setQuoteInput(pickedQuote);
  };

  // Dashboard customization helpers
  const defaultWidgetsOrder = ['mood', 'water', 'sleep', 'period', 'food', 'self_care', 'journal', 'exercise'];
  const currentWidgets = profile.dashboardWidgets && profile.dashboardWidgets.length > 0
    ? profile.dashboardWidgets
    : defaultWidgetsOrder;

  const handleMoveWidget = (index: number, direction: 'up' | 'down') => {
    const next = [...currentWidgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onUpdateProfile({ dashboardWidgets: next });
  };

  const handleToggleWidget = (widgetKey: string) => {
    let next: string[];
    if (currentWidgets.includes(widgetKey)) {
      next = currentWidgets.filter((w) => w !== widgetKey);
    } else {
      next = [...currentWidgets, widgetKey];
    }
    onUpdateProfile({ dashboardWidgets: next });
  };

  const widgetDefinitions: Record<string, { title: string; icon: string; tab: NavTab }> = {
    mood: { title: 'Mood ♡', icon: '🌸', tab: 'mood' },
    water: { title: 'Water 💧', icon: '💧', tab: 'water' },
    sleep: { title: 'Sleep 🌙', icon: '🌙', tab: 'sleep' },
    period: { title: 'Period 🌸', icon: '🌺', tab: 'period' },
    food: { title: 'Food 🥗', icon: '🥐', tab: 'food' },
    self_care: { title: 'Self-care 🧘', icon: '🧴', tab: 'self_care' },
    journal: { title: 'Journal 📖', icon: '📖', tab: 'journal' },
    exercise: { title: 'Movement 🏃', icon: '🧘‍♀️', tab: 'exercise' },
  };

  // Render individual widget card based on key
  const renderDashboardWidget = (key: string) => {
    if (key === 'water') {
      const waterPct = Math.min((todayRecord.waterGlasses / profile.waterGoalGlasses) * 100, 100);
      return (
        <div
          key="water"
          onClick={() => onNavigate('water')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Hydration</span>
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-500 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {todayRecord.waterGlasses}
            </span>
            <span className="text-xs text-gray-400">/{profile.waterGoalGlasses} glasses</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${waterPct}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
              {todayRecord.waterGlasses >= profile.waterGoalGlasses
                ? 'Goal met with joy ♡'
                : todayRecord.waterGlasses === 0
                ? 'Fresh day · Take your first sip'
                : 'Keep sipping gently'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuickAddWater();
              }}
              className="px-2.5 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300 text-xs font-bold transition-colors"
            >
              +1 Glass
            </button>
          </div>
        </div>
      );
    }

    if (key === 'period') {
      return (
        <div
          key="period"
          onClick={() => onNavigate('period')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Cycle Rhythm</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-500 flex items-center justify-center">
              <CalendarHeart className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-pink-600 dark:text-pink-300">
              Day {cycleInfo.cycleDay}
            </span>
            <span className="text-xs text-gray-400">{cycleInfo.phaseEmoji}</span>
          </div>
          <p className="text-xs font-medium text-gray-700 dark:text-pink-200 mt-1 truncate">
            {cycleInfo.phaseName}
          </p>
          <p className="text-[11px] text-pink-500 dark:text-pink-400 mt-2">
            {profile.lastPeriodStart ? `Next: ${cycleInfo.nextPeriodDate}` : 'Tap to set cycle start ♡'}
          </p>
        </div>
      );
    }

    if (key === 'sleep') {
      const hasSleep = !!todayRecord.sleep;
      return (
        <div
          key="sleep"
          onClick={() => onNavigate('sleep')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Sleep & Rest</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {hasSleep
                ? `${Math.floor(todayRecord.sleep!.durationMinutes / 60)}h ${todayRecord.sleep!.durationMinutes % 60}m`
                : '--'}
            </span>
            {hasSleep && todayRecord.sleep?.isExample && (
              <span className="text-[10px] text-pink-500 font-semibold px-1 rounded bg-pink-50 dark:bg-pink-950">
                Example
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-purple-600 dark:text-purple-300 mt-1 capitalize">
            {hasSleep ? `${todayRecord.sleep?.quality || 'restful'} sleep` : 'Not logged yet today'}
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Goal: {profile.sleepGoalHours} hours · Click to reflect
          </p>
        </div>
      );
    }

    if (key === 'mood') {
      const currentMood = todayRecord.moods.length > 0 ? todayRecord.moods[0] : null;
      return (
        <div
          key="mood"
          onClick={() => onNavigate('mood')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Heart & Mood</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100 capitalize">
              {currentMood ? currentMood.mood : 'Check In'}
            </span>
            {currentMood?.isExample && (
              <span className="text-[10px] text-pink-500 font-semibold px-1 rounded bg-pink-50 dark:bg-pink-950">
                Example
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-pink-300/70 mt-1 truncate">
            {currentMood ? currentMood.reason || 'Gentle balance' : 'How does your heart feel, Dhruvi?'}
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2">
            Click to record your feeling ♡
          </p>
        </div>
      );
    }

    if (key === 'food') {
      const mealCount = todayRecord.meals.length;
      return (
        <div
          key="food"
          onClick={() => onNavigate('food')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Nourishment</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {mealCount}
            </span>
            <span className="text-xs text-gray-400">meals logged</span>
          </div>
          <p className="text-xs text-rose-600 dark:text-rose-300 mt-1 truncate">
            {mealCount > 0 ? todayRecord.meals[mealCount - 1].foodName : 'Honor your body with food'}
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Gentle mindful meals ♡
          </p>
        </div>
      );
    }

    if (key === 'self_care') {
      const selfCareCount = todayRecord.selfCare.filter((s) => s.completed).length;
      return (
        <div
          key="self_care"
          onClick={() => onNavigate('self_care')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Self-Care</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-500 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {selfCareCount}
            </span>
            <span className="text-xs text-gray-400">rituals done</span>
          </div>
          <p className="text-xs text-pink-600 dark:text-pink-300 mt-1 truncate">
            Pampering & peace of mind
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Skincare, tea & rest ♡
          </p>
        </div>
      );
    }

    if (key === 'journal') {
      return (
        <div
          key="journal"
          onClick={() => onNavigate('journal')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Private Diary</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              Reflect
            </span>
            <span className="text-lg">📖</span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-300 mt-1 truncate">
            Your sacred thought sanctuary
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Write today's thoughts ♡
          </p>
        </div>
      );
    }

    if (key === 'exercise') {
      const exerciseCount = todayRecord.exercises.length;
      return (
        <div
          key="exercise"
          onClick={() => onNavigate('exercise')}
          className="glass-card rounded-3xl p-4 bg-white/75 dark:bg-gray-900/60 border border-pink-100 dark:border-pink-950 hover:shadow-soft-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-pink-300/80">Movement</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-serif text-gray-800 dark:text-pink-100">
              {exerciseCount > 0 ? `${todayRecord.exercises[0].durationMinutes}m` : '0m'}
            </span>
            <span className="text-xs text-gray-400">/{profile.movementGoalMinutes || 30}m goal</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1 truncate">
            {exerciseCount > 0 ? todayRecord.exercises[0].activityType : 'Gentle walking or stretching'}
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            Listen to your body ♡
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. Demo Mode or Real Mode Banner */}
      <DemoModeBanner
        demoMode={profile.demoMode}
        onStartFresh={onStartFresh}
        onExploreDemo={onExploreDemo}
      />

      {/* 2. Hero Section Personalization */}
      <section className="relative overflow-hidden glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-pink-100/90 via-rose-50/70 to-purple-50/60 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="absolute top-4 right-8 text-pink-300 dark:text-pink-600/40 animate-pulse hidden sm:block">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-4 left-6 text-rose-300 dark:text-rose-600/40 animate-bounce hidden sm:block">
          <CuteBowIcon className="w-5 h-5" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-pink-950/70 border border-pink-200/70 dark:border-pink-900/50 text-xs font-semibold text-pink-600 dark:text-pink-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>{todayFormatted}</span>
              <span>•</span>
              <span>A fresh day, a fresh little chapter.</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 dark:text-pink-100 leading-tight">
              {greetingTime}, {profile.displayName} ♡
            </h2>

            <p className="text-sm md:text-base text-gray-600 dark:text-pink-200/80 font-normal">
              Your little wellness space ♡ Take gentle care of your body, mind, and heart today.
            </p>

            {/* Quick Summary Pill Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-gray-800/80 border border-pink-100 dark:border-pink-900/50 text-xs text-gray-700 dark:text-pink-200 flex items-center gap-1.5 shadow-sm">
                <span className="text-pink-500 font-bold">{todayRecord.wellnessScore}%</span> Daily Score
              </div>
              <div className="px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-gray-800/80 border border-pink-100 dark:border-pink-900/50 text-xs text-gray-700 dark:text-pink-200 flex items-center gap-1.5 shadow-sm">
                <span className="text-pink-500 font-bold">{completedTasks}/{totalTasks}</span> Routines
              </div>
              <div className="px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-gray-800/80 border border-pink-100 dark:border-pink-900/50 text-xs text-gray-700 dark:text-pink-200 flex items-center gap-1.5 shadow-sm">
                <span>💧</span> {todayRecord.waterGlasses}/{profile.waterGoalGlasses} Glasses
              </div>
            </div>
          </div>

          <div className="shrink-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-rose-200 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />
            <div className="relative animate-float-slow">
              <CozyGirlIllustration className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Personal Loving Reminder Card with Tone Selection */}
      {profile.showMessages !== false && (
        <section className="glass-card rounded-3xl p-5 bg-gradient-to-r from-rose-50/80 via-pink-50/60 to-amber-50/50 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-gray-900/40 border border-pink-200/50 dark:border-pink-900/30 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-300">
              <CuteBowIcon className="w-4 h-4 text-pink-500" />
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">
                A little reminder for you, {profile.displayName}…
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingQuote(!isEditingQuote)}
                className="text-xs text-gray-500 hover:text-pink-600 dark:hover:text-pink-300 transition-colors flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingQuote ? 'Close' : 'Choose Tone & Edit'}</span>
              </button>
            </div>
          </div>

          {isEditingQuote ? (
            <div className="mt-3 space-y-3">
              {/* Tone Buttons */}
              <div>
                <p className="text-[11px] font-semibold text-gray-600 dark:text-pink-300/80 mb-1.5">
                  Select Message Tone ♡
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(messageTones) as MessageTone[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleSelectMessageTone(t)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium capitalize border transition-all ${
                        profile.messageTone === t
                          ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                          : 'bg-white/80 dark:bg-gray-800 border-pink-200 text-gray-700 dark:text-pink-200'
                      }`}
                    >
                      {messageTones[t].title}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={quoteInput}
                onChange={(e) => setQuoteInput(e.target.value)}
                rows={2}
                className="w-full text-sm p-3 rounded-2xl border border-pink-200 dark:border-pink-900 bg-white dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSaveQuote}
                  className="px-4 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-semibold flex items-center gap-1 hover:bg-pink-600 transition-all shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Reminder
                </button>
                <button
                  onClick={() => onUpdateProfile({ showMessages: false })}
                  className="text-[11px] text-gray-400 hover:text-gray-600"
                >
                  Turn off reminders
                </button>
              </div>
            </div>
          ) : (
            <p className="font-handwritten text-xl md:text-2xl text-pink-800 dark:text-pink-200 mt-2 italic leading-relaxed">
              "{profile.personalReminder}"
            </p>
          )}
        </section>
      )}

      {/* 4. Custom Dashboard Header & Widgets */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100">
              My Dashboard
            </h3>
            <span className="text-xs text-gray-400 dark:text-pink-300/60 font-medium">
              (Dhruvi's personal view)
            </span>
          </div>

          <button
            onClick={() => setIsCustomizingDashboard(!isCustomizingDashboard)}
            className="text-xs font-semibold text-pink-600 dark:text-pink-300 hover:text-pink-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200/50"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isCustomizingDashboard ? 'Done Customizing' : 'Customize Dashboard 🎨'}</span>
          </button>
        </div>

        {/* Dashboard Customization Panel */}
        {isCustomizingDashboard && (
          <div className="p-4 rounded-3xl glass-card bg-pink-50/70 dark:bg-gray-900/90 border border-pink-200 dark:border-pink-900 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-pink-200/60 dark:border-pink-900/40 pb-2">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300">
                Arrange & Choose Widgets to Show
              </span>
              <span className="text-[11px] text-gray-500">
                Reorder or toggle any tracker
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {defaultWidgetsOrder.map((wKey, idx) => {
                const isEnabled = currentWidgets.includes(wKey);
                const item = widgetDefinitions[wKey];
                const currentIndex = currentWidgets.indexOf(wKey);
                return (
                  <div
                    key={wKey}
                    className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900/40 flex items-center justify-between shadow-sm text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item?.icon}</span>
                      <span className="font-medium text-gray-800 dark:text-pink-100">
                        {item?.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isEnabled && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleMoveWidget(currentIndex, 'up')}
                            disabled={currentIndex === 0}
                            className="p-1 rounded text-gray-400 hover:text-pink-600 disabled:opacity-30"
                            title="Move Earlier"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveWidget(currentIndex, 'down')}
                            disabled={currentIndex === currentWidgets.length - 1}
                            className="p-1 rounded text-gray-400 hover:text-pink-600 disabled:opacity-30"
                            title="Move Later"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handleToggleWidget(wKey)}
                        className={`p-1 rounded text-xs transition-colors ${
                          isEnabled
                            ? 'text-pink-600 dark:text-pink-300 hover:text-pink-700'
                            : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title={isEnabled ? 'Hide widget' : 'Show widget'}
                      >
                        {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dashboard Grid rendered in user's customized order */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currentWidgets.map((wKey) => renderDashboardWidget(wKey))}
        </div>
      </section>

      {/* 5. Today's Checklist Quick View (Morning & Evening) */}
      <section className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100">
                Today's Gentle Routines
              </h3>
              <p className="text-xs text-gray-500 dark:text-pink-300/70">
                {completedTasks} of {totalTasks} routines completed
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('today')}
            className="text-xs font-semibold text-pink-600 dark:text-pink-300 hover:text-pink-700 flex items-center gap-1 group"
          >
            <span>Full Checklist & Edit Routines</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {todayRecord.tasks.slice(0, 6).map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                task.completed
                  ? 'bg-pink-50/60 dark:bg-pink-950/30 border-pink-200/60 dark:border-pink-900/40 text-gray-500 dark:text-gray-400 line-through'
                  : 'bg-white/80 dark:bg-gray-800/80 border-pink-100 dark:border-pink-900/30 text-gray-700 dark:text-pink-100 hover:border-pink-300'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-base">{task.icon || '🌸'}</span>
                <span className="text-xs md:text-sm font-medium truncate">{task.title}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                  task.completed
                    ? 'bg-pink-500 border-pink-500 text-white'
                    : 'border-pink-300 dark:border-pink-700'
                }`}
              >
                {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Quick Nav Shortcuts */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('food')}
          className="p-4 rounded-3xl glass-card bg-gradient-to-br from-pink-50/70 to-rose-50/40 dark:from-pink-950/20 dark:to-gray-900 border border-pink-100 dark:border-pink-950 text-left hover:scale-[1.02] transition-transform shadow-sm"
        >
          <span className="text-2xl">🥐</span>
          <p className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 mt-2">
            Nourish
          </p>
          <p className="text-[11px] text-gray-500 dark:text-pink-300/70 mt-0.5">
            Log today's meals
          </p>
        </button>

        <button
          onClick={() => onNavigate('journal')}
          className="p-4 rounded-3xl glass-card bg-gradient-to-br from-purple-50/70 to-pink-50/40 dark:from-purple-950/20 dark:to-gray-900 border border-purple-100 dark:border-purple-950 text-left hover:scale-[1.02] transition-transform shadow-sm"
        >
          <span className="text-2xl">📖</span>
          <p className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 mt-2">
            Dear Diary
          </p>
          <p className="text-[11px] text-gray-500 dark:text-pink-300/70 mt-0.5">
            Reflect & write
          </p>
        </button>

        <button
          onClick={() => onNavigate('self_care')}
          className="p-4 rounded-3xl glass-card bg-gradient-to-br from-rose-50/70 to-amber-50/40 dark:from-rose-950/20 dark:to-gray-900 border border-rose-100 dark:border-rose-950 text-left hover:scale-[1.02] transition-transform shadow-sm"
        >
          <span className="text-2xl">🧴</span>
          <p className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 mt-2">
            Self-Care
          </p>
          <p className="text-[11px] text-gray-500 dark:text-pink-300/70 mt-0.5">
            Skincare & pampering
          </p>
        </button>

        <button
          onClick={() => onNavigate('insights')}
          className="p-4 rounded-3xl glass-card bg-gradient-to-br from-amber-50/70 to-rose-50/40 dark:from-amber-950/20 dark:to-gray-900 border border-amber-100 dark:border-amber-950 text-left hover:scale-[1.02] transition-transform shadow-sm"
        >
          <span className="text-2xl">✨</span>
          <p className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 mt-2">
            Her Patterns
          </p>
          <p className="text-[11px] text-gray-500 dark:text-pink-300/70 mt-0.5">
            Cycle & sleep trends
          </p>
        </button>
      </section>
    </div>
  );
};
