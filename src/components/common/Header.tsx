import React from 'react';
import { Sparkles, Moon, Sun, Lock, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile, CycleInfo } from '../../types';
import { CuteBowIcon } from './CuteIllustrations';

interface HeaderProps {
  profile: UserProfile;
  cycleInfo: CycleInfo;
  wellnessScore: number;
  todayFormatted: string;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onOpenPinModal: () => void;
  onOpenSafetyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  cycleInfo,
  wellnessScore,
  todayFormatted,
  onUpdateProfile,
  onOpenPinModal,
  onOpenSafetyModal,
}) => {
  const themes = [
    { id: 'soft-pink', name: 'Soft Pink', emoji: '🌸' },
    { id: 'coquette', name: 'Coquette', emoji: '🎀' },
    { id: 'lavender', name: 'Lavender Dream', emoji: '🪻' },
    { id: 'strawberry', name: 'Strawberry', emoji: '🍓' },
    { id: 'cloudy', name: 'Cloudy Dream', emoji: '☁️' },
    { id: 'garden', name: 'Garden', emoji: '🌷' },
    { id: 'butterfly', name: 'Butterfly', emoji: '🦋' },
    { id: 'cozy-evening', name: 'Cozy Evening', emoji: '🕯️' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full glass-card border-b border-pink-100 dark:border-pink-950/40 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Branding & Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-300 via-rose-300 to-pink-200 flex items-center justify-center text-xl shadow-soft shadow-pink-200/50">
            {profile.avatarIcon || '🌸'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-gray-800 dark:text-pink-100 flex items-center gap-1.5">
                {profile.displayName}'s Sanctuary
                <CuteBowIcon className="w-4 h-4 text-pink-500 inline-block animate-pulse-subtle" />
              </h1>
            </div>
            <p className="text-xs text-gray-500 dark:text-pink-300/80 font-medium">
              {todayFormatted}
            </p>
          </div>
        </div>

        {/* Center: Cycle Phase Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-pink-50/80 dark:bg-pink-950/40 px-4 py-1.5 rounded-full border border-pink-200/60 dark:border-pink-900/50">
          <span className="text-xs font-semibold text-pink-700 dark:text-pink-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            Cycle Day {cycleInfo.cycleDay} · {cycleInfo.phaseName} {cycleInfo.phaseEmoji}
          </span>
          <span className="text-pink-300 dark:text-pink-800">•</span>
          <span className="text-xs text-gray-500 dark:text-pink-300/70">
            Next period: {cycleInfo.nextPeriodDate}
          </span>
        </div>

        {/* Right: Wellness Badge, Theme Selector & Actions */}
        <div className="flex items-center gap-2">
          {/* Wellness Score Badge */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{wellnessScore}% Wellness</span>
          </div>

          {/* Theme Switcher Dropdown */}
          <div className="relative group">
            <button
              aria-label="Change Theme"
              className="p-2 rounded-xl text-gray-600 dark:text-pink-200 hover:bg-pink-100/70 dark:hover:bg-pink-900/40 transition-colors"
              title="Theme Style"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-gray-900 rounded-2xl shadow-soft-lg border border-pink-100 dark:border-pink-950 p-2 hidden group-hover:block transition-all z-50">
              <p className="text-[10px] font-bold text-gray-400 dark:text-pink-400/60 uppercase tracking-wider px-2 py-1">
                Visual Themes
              </p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdateProfile({ theme: t.id as any })}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                    profile.theme === t.id
                      ? 'bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-200'
                      : 'text-gray-700 dark:text-pink-100 hover:bg-pink-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{t.emoji}</span>
                    <span>{t.name}</span>
                  </span>
                  {profile.theme === t.id && <span className="text-pink-500">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => onUpdateProfile({ darkMode: !profile.darkMode })}
            className="p-2 rounded-xl text-gray-600 dark:text-pink-200 hover:bg-pink-100/70 dark:hover:bg-pink-900/40 transition-colors"
            title={profile.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {profile.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-pink-600" />}
          </button>

          {/* Health & Safety Disclaimer Button */}
          <button
            onClick={onOpenSafetyModal}
            className="p-2 rounded-xl text-gray-600 dark:text-pink-200 hover:bg-pink-100/70 dark:hover:bg-pink-900/40 transition-colors"
            title="Health & Safety Info"
            aria-label="Health safety info"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </button>

          {/* PIN Lock Privacy */}
          <button
            onClick={onOpenPinModal}
            className={`p-2 rounded-xl transition-colors ${
              profile.pinLock
                ? 'text-pink-600 bg-pink-100/80 dark:bg-pink-950/60'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-pink-200'
            }`}
            title={profile.pinLock ? 'Privacy PIN Enabled' : 'Set Privacy PIN'}
            aria-label="Privacy PIN lock"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
