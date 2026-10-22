import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Download,
  Upload,
  Lock,
  Moon,
  Sun,
  Shield,
  Trash2,
  Check,
  RefreshCw,
  Heart,
  Droplets,
  Eye,
  EyeOff,
  User,
  Clock,
  Compass,
} from 'lucide-react';
import { UserProfile, ThemeMode, MessageTone, TrackerToggles } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { messageTones } from '../../data/demoData';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onStartFresh: () => void;
  onExploreDemo: () => void;
  onOpenPinModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onExportData,
  onImportData,
  onResetData,
  onStartFresh,
  onExploreDemo,
  onOpenPinModal,
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [avatarIcon, setAvatarIcon] = useState(profile.avatarIcon || '🌸');
  const [birthday, setBirthday] = useState(profile.birthday || '2002-05-18');
  const [pronouns, setPronouns] = useState(profile.pronouns || 'she/her');
  const [timezone, setTimezone] = useState(profile.timezone || 'Asia/Kolkata (GMT+5:30)');
  const [units, setUnits] = useState<'metric' | 'imperial'>(profile.units || 'metric');

  // Goals
  const [waterGoal, setWaterGoal] = useState(profile.waterGoalGlasses || 8);
  const [sleepGoal, setSleepGoal] = useState(profile.sleepGoalHours || 8);
  const [movementGoal, setMovementGoal] = useState(profile.movementGoalMinutes || 30);
  const [journalGoal, setJournalGoal] = useState(profile.journalGoalMinutes || 10);
  const [selfCareGoal, setSelfCareGoal] = useState(profile.selfCareGoalCount || 1);
  const [cycleLength, setCycleLength] = useState(profile.cycleLength || 28);
  const [periodDuration, setPeriodDuration] = useState(profile.periodDuration || 5);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // 8 Selectable Themes per user requirements
  const themeOptions: { id: ThemeMode; name: string; emoji: string; desc: string }[] = [
    { id: 'soft-pink', name: 'Soft Pink', emoji: '🌸', desc: 'Blush & rose petal comfort' },
    { id: 'coquette', name: 'Coquette', emoji: '🎀', desc: 'Ruby bow & vintage lace' },
    { id: 'lavender', name: 'Lavender Dream', emoji: '🪻', desc: 'Lilac & amethyst mist' },
    { id: 'strawberry', name: 'Strawberry', emoji: '🍓', desc: 'Strawberry milk & sweet berry' },
    { id: 'cloudy', name: 'Cloudy Dream', emoji: '☁️', desc: 'Soft sky & airy breeze' },
    { id: 'garden', name: 'Garden', emoji: '🌷', desc: 'Botanical bloom & sage mint' },
    { id: 'butterfly', name: 'Butterfly', emoji: '🦋', desc: 'Periwinkle, iris & lavender' },
    { id: 'cozy-evening', name: 'Cozy Evening', emoji: '🕯️', desc: 'Warm amber & golden glow' },
  ];

  const avatarOptions = ['🌸', '🎀', '🍓', '🪻', '✨', '🍵', '🩰', '🕊️', '🍰', '🕯️', '🦋', '🌷'];

  const trackerItems: { key: keyof TrackerToggles; label: string; icon: string; desc: string }[] = [
    { key: 'mood', label: 'Heart & Mood', icon: '🌸', desc: 'Daily emotional reflections' },
    { key: 'water', label: 'Hydration', icon: '💧', desc: 'Glasses tracker & reminders' },
    { key: 'sleep', label: 'Sleep & Rest', icon: '🌙', desc: 'Bedtime & restorative hours' },
    { key: 'period', label: 'Menstrual Cycle', icon: '🌺', desc: 'Natural phase predictions & flow' },
    { key: 'food', label: 'Nourishment', icon: '🥐', desc: 'Joyful meal logging without guilt' },
    { key: 'exercise', label: 'Gentle Movement', icon: '🧘‍♀️', desc: 'Walking, yoga, and stretching' },
    { key: 'selfCare', label: 'Self-Care Rituals', icon: '🧴', desc: 'Skincare, pampering & rest' },
    { key: 'journal', label: 'Private Diary', icon: '📖', desc: 'Soulful reflections & prompts' },
    { key: 'weight', label: 'Weight Metric', icon: '⚖️', desc: 'Optional body weight log' },
    { key: 'temperature', label: 'Basal Temperature', icon: '🌡️', desc: 'Basal body temp for fertility' },
    { key: 'steps', label: 'Step Counter', icon: '🚶‍♀️', desc: 'Daily walking distance' },
    { key: 'heartRate', label: 'Resting Heart Rate', icon: '💓', desc: 'Heart rhythm metrics' },
  ];

  const handleToggleTracker = (key: keyof TrackerToggles) => {
    const current = profile.trackersEnabled || {
      mood: true,
      water: true,
      sleep: true,
      period: true,
      food: true,
      exercise: true,
      selfCare: true,
      journal: true,
      weight: false,
      temperature: false,
      steps: false,
      heartRate: false,
    };
    onUpdateProfile({
      trackersEnabled: {
        ...current,
        [key]: !current[key],
      },
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      displayName,
      avatarIcon,
      birthday,
      pronouns,
      timezone,
      units,
      waterGoalGlasses: waterGoal,
      sleepGoalHours: sleepGoal,
      movementGoalMinutes: movementGoal,
      journalGoalMinutes: journalGoal,
      selfCareGoalCount: selfCareGoal,
      cycleLength,
      periodDuration,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-purple-50/70 to-rose-50/70 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
            <Sliders className="w-3.5 h-3.5" />
            <span>Dhruvi's Private Preferences</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            Make It Truly Yours ♡
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
            Customize your identity, theme, track what you love, and hide what you don't.
          </p>
        </div>
      </div>

      {/* 2. Mode Switcher: Fresh vs Demo */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Data Mode Experience</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-pink-300/80">
              {profile.demoMode
                ? 'Currently in Example/Tutorial Mode: Sample records show how features work.'
                : 'Currently in Fresh/Real Mode: 100% real personal records.'}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              profile.demoMode
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}
          >
            {profile.demoMode ? '✨ Example Mode' : '💗 Real Personal Space'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={onStartFresh}
            className="p-4 rounded-2xl border-2 border-pink-300 dark:border-pink-800 bg-pink-50/60 dark:bg-pink-950/30 hover:bg-pink-100/70 transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0">
              <CuteBowIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-pink-800 dark:text-pink-200 block">
                Start Fresh ♡
              </span>
              <p className="text-[11px] text-gray-600 dark:text-pink-300/80 mt-0.5">
                Clears only demonstration records. Keeps your profile, PIN, goals, routines, and theme intact.
              </p>
            </div>
          </button>

          <button
            onClick={onExploreDemo}
            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/70 hover:bg-gray-50 transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-gray-800 dark:text-pink-200 block">
                Explore with Example Data
              </span>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Re-load interactive tutorial guides without overwriting your real records.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Profile Identity Form */}
      <form
        onSubmit={handleSaveProfile}
        className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-5"
      >
        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
          <User className="w-4 h-4 text-pink-500" />
          <span>Profile & Identity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Pronouns
            </label>
            <input
              type="text"
              placeholder="e.g. she/her"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Birthday
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Time Zone
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Preferred Units
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUnits('metric')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  units === 'metric'
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white dark:bg-gray-800 border-pink-200 text-gray-700 dark:text-pink-200'
                }`}
              >
                Metric (kg, ml, °C)
              </button>
              <button
                type="button"
                onClick={() => setUnits('imperial')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  units === 'imperial'
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white dark:bg-gray-800 border-pink-200 text-gray-700 dark:text-pink-200'
                }`}
              >
                Imperial (lbs, fl oz, °F)
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
            Sanctuary Avatar
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {avatarOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setAvatarIcon(emoji)}
                className={`text-lg p-2 rounded-xl transition-all ${
                  avatarIcon === emoji
                    ? 'bg-pink-300 dark:bg-pink-900 scale-110 shadow-sm'
                    : 'bg-pink-50/40 dark:bg-gray-800 hover:bg-pink-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Appearance: 8 Themes */}
        <div className="pt-3 border-t border-pink-100 dark:border-pink-900/40">
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-2">
            Aesthetic Themes (Updates entire application consistently)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {themeOptions.map((t) => {
              const isSelected = profile.theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateProfile({ theme: t.id })}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-pink-100/90 dark:bg-pink-950 border-pink-500 font-bold shadow-soft scale-[1.02]'
                      : 'bg-white/60 dark:bg-gray-800/50 border-pink-100 dark:border-pink-900 text-gray-700 dark:text-pink-200 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{t.emoji}</span>
                    {isSelected && <span className="text-pink-600 text-xs font-bold">✓ Active</span>}
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold block">{t.name}</span>
                    <span className="text-[10px] text-gray-400 block truncate">{t.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Custom Goals */}
        <div className="pt-3 border-t border-pink-100 dark:border-pink-900/40">
          <label className="block text-xs font-bold text-gray-800 dark:text-pink-100 mb-2">
            Personal Wellness Goals (Editable at any time ♡)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-pink-200 mb-1">
                💧 Water (glasses)
              </label>
              <input
                type="number"
                min={4}
                max={16}
                value={waterGoal}
                onChange={(e) => setWaterGoal(parseInt(e.target.value) || 8)}
                className="w-full text-xs p-2 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-center"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-pink-200 mb-1">
                🌙 Sleep (hours)
              </label>
              <input
                type="number"
                min={5}
                max={12}
                value={sleepGoal}
                onChange={(e) => setSleepGoal(parseInt(e.target.value) || 8)}
                className="w-full text-xs p-2 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-center"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-pink-200 mb-1">
                🚶 Movement (mins)
              </label>
              <input
                type="number"
                min={10}
                max={120}
                value={movementGoal}
                onChange={(e) => setMovementGoal(parseInt(e.target.value) || 30)}
                className="w-full text-xs p-2 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-center"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-pink-200 mb-1">
                📖 Journal (mins)
              </label>
              <input
                type="number"
                min={5}
                max={60}
                value={journalGoal}
                onChange={(e) => setJournalGoal(parseInt(e.target.value) || 10)}
                className="w-full text-xs p-2 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-center"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-pink-200 mb-1">
                🧘 Self-Care (per day)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={selfCareGoal}
                onChange={(e) => setSelfCareGoal(parseInt(e.target.value) || 1)}
                className="w-full text-xs p-2 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 text-center"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all"
        >
          Save Identity & Goals ♡
        </button>

        {savedSuccess && (
          <p className="text-xs text-center text-emerald-600 font-bold flex items-center justify-center gap-1">
            <Check className="w-4 h-4" />
            Preferences and goals saved beautifully!
          </p>
        )}
      </form>

      {/* 6. Custom Tracking Feature Toggles */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-pink-500" />
            <span>Custom Tracking (Enable / Disable Trackers)</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-pink-300/80">
            Never feel forced to track what you don't want. Turn trackers on or off to match what you actually care about.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          {trackerItems.map((item) => {
            const isEnabled = profile.trackersEnabled ? profile.trackersEnabled[item.key] : true;
            return (
              <div
                key={item.key}
                onClick={() => handleToggleTracker(item.key)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isEnabled
                    ? 'bg-pink-50/80 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 shadow-sm'
                    : 'bg-white/50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-gray-800 dark:text-pink-100 block truncate">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-400 block truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
                    isEnabled
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {isEnabled ? 'Enabled' : 'Hidden'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Security & Backup */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-4">
        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Privacy PIN & Backups</span>
        </h3>

        <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-xs text-gray-800 dark:text-pink-100 block">
              4-Digit Privacy PIN Lock
            </span>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {profile.pinLock
                ? 'Your private diary and health metrics are guarded with a PIN.'
                : 'Keep your sanctuary private with a 4-digit PIN lock.'}
            </p>
          </div>
          <button
            onClick={onOpenPinModal}
            className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-semibold shadow-sm hover:bg-pink-600 transition-colors shrink-0"
          >
            {profile.pinLock ? 'Manage PIN' : 'Set PIN Code'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={onExportData}
            className="p-4 rounded-2xl border border-pink-200 dark:border-pink-900 bg-white/80 dark:bg-gray-800 hover:bg-pink-50/60 transition-colors flex items-center gap-3 text-left"
          >
            <Download className="w-5 h-5 text-pink-500 shrink-0" />
            <div>
              <span className="text-xs font-bold text-gray-800 dark:text-pink-100 block">
                Export Wellness Backup
              </span>
              <span className="text-[10px] text-gray-400">Download all your records as JSON</span>
            </div>
          </button>

          <label className="p-4 rounded-2xl border border-pink-200 dark:border-pink-900 bg-white/80 dark:bg-gray-800 hover:bg-pink-50/60 transition-colors flex items-center gap-3 text-left cursor-pointer">
            <Upload className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <span className="text-xs font-bold text-gray-800 dark:text-pink-100 block">
                Restore from Backup
              </span>
              <span className="text-[10px] text-gray-400">Upload a saved JSON file</span>
            </div>
            <input type="file" accept=".json" onChange={onImportData} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};
