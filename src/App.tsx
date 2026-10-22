import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  DailyRecord,
  JournalEntry,
  HealthMetricEntry,
  Achievement,
  WellnessInsight,
} from './types';
import {
  loadStore,
  saveStore,
  getTodayDateString,
  formatDatePretty,
  calculateCycleInfo,
  calculateWellnessScore,
  calculateStreaks,
} from './services/storage';
import { Header } from './components/common/Header';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { PinLockModal } from './components/common/PinLockModal';
import { HealthSafetyModal } from './components/common/HealthSafetyModal';
import { HomeView } from './components/views/HomeView';
import { TodayView } from './components/views/TodayView';
import { PeriodView } from './components/views/PeriodView';
import { CalendarView } from './components/views/CalendarView';
import { FoodView } from './components/views/FoodView';
import { WaterView } from './components/views/WaterView';
import { SleepView } from './components/views/SleepView';
import { MoodView } from './components/views/MoodView';
import { SymptomsView } from './components/views/SymptomsView';
import { ExerciseView } from './components/views/ExerciseView';
import { SelfCareView } from './components/views/SelfCareView';
import { JournalView } from './components/views/JournalView';
import { InsightsView } from './components/views/InsightsView';
import { HistoryView } from './components/views/HistoryView';
import { MonthlyReportView } from './components/views/MonthlyReportView';
import { AchievementsView } from './components/views/AchievementsView';
import { HealthMetricsView } from './components/views/HealthMetricsView';
import { SettingsView } from './components/views/SettingsView';
import { Lock, Heart } from 'lucide-react';
import { CuteBowIcon } from './components/common/CuteIllustrations';

export const App: React.FC = () => {
  const [storeData, setStoreData] = useState(() => loadStore());
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isAppUnlocked, setIsAppUnlocked] = useState(true);
  const [pinUnlockInput, setPinUnlockInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const { profile, records, journalEntries, healthMetrics, achievements, insights } = storeData;
  const todayStr = getTodayDateString();
  const todayRecord = records[todayStr] || records[Object.keys(records)[0]];

  // Theme & Dark mode effects
  useEffect(() => {
    const root = document.documentElement;
    // remove previous theme classes
    root.classList.remove(
      'theme-coquette',
      'theme-lavender',
      'theme-strawberry',
      'theme-cloudy',
      'theme-garden'
    );
    if (profile.theme !== 'soft-pink') {
      root.classList.add(`theme-${profile.theme}`);
    }

    if (profile.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [profile.theme, profile.darkMode]);

  // Lock check on app mount
  useEffect(() => {
    if (profile.pinLock) {
      setIsAppUnlocked(false);
    }
  }, [profile.pinLock]);

  const handleUpdateRecord = (updated: DailyRecord) => {
    const recalculatedScore = calculateWellnessScore(updated);
    const finalized = { ...updated, wellnessScore: recalculatedScore };
    const newRecords = { ...records, [updated.date]: finalized };
    const nextStore = { ...storeData, records: newRecords };
    setStoreData(nextStore);
    saveStore(nextStore);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    const nextProfile = { ...profile, ...updates };
    const nextStore = { ...storeData, profile: nextProfile };
    setStoreData(nextStore);
    saveStore(nextStore);
  };

  const handleSaveJournalEntry = (entry: JournalEntry) => {
    const nextEntries = [entry, ...journalEntries];
    const nextStore = { ...storeData, journalEntries: nextEntries };
    setStoreData(nextStore);
    saveStore(nextStore);
  };

  const handleDeleteJournalEntry = (id: string) => {
    const nextEntries = journalEntries.filter((e) => e.id !== id);
    const nextStore = { ...storeData, journalEntries: nextEntries };
    setStoreData(nextStore);
    saveStore(nextStore);
  };

  const handleSaveMetric = (metric: HealthMetricEntry) => {
    const nextMetrics = [...healthMetrics, metric];
    const nextStore = { ...storeData, healthMetrics: nextMetrics };
    setStoreData(nextStore);
    saveStore(nextStore);
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(storeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.displayName.toLowerCase()}-sanctuary-backup-${todayStr}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.records) {
          setStoreData(parsed);
          saveStore(parsed);
          alert('Sanctuary data successfully restored ♡');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Could not parse backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Reset sanctuary to clean sample demo data? Your current logs will be refreshed.')) {
      localStorage.removeItem('dhruvi_sanctuary_v1');
      const fresh = loadStore();
      setStoreData(fresh);
      saveStore(fresh);
    }
  };

  const handleStartFresh = () => {
    handleUpdateProfile({ demoMode: false });
  };

  const handleExploreDemo = () => {
    handleUpdateProfile({ demoMode: true });
  };

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinUnlockInput === profile.pinLock) {
      setIsAppUnlocked(true);
      setPinError(false);
      setPinUnlockInput('');
    } else {
      setPinError(true);
    }
  };

  const cycleInfo = calculateCycleInfo(
    profile.lastPeriodStart,
    profile.cycleLength,
    profile.periodDuration
  );

  const streaks = calculateStreaks(records);
  const tasksCompleted = todayRecord?.tasks.filter((t) => t.completed).length || 0;
  const totalTasks = todayRecord?.tasks.length || 0;

  // PIN Unlock Screen if locked
  if (!isAppUnlocked && profile.pinLock) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 dark:from-pink-950 dark:via-gray-900 dark:to-purple-950">
        <div className="glass-card rounded-3xl p-8 max-w-sm w-full text-center border border-pink-200 dark:border-pink-900 shadow-2xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center shadow-soft">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center gap-1.5">
            {profile.displayName}'s Sanctuary
            <CuteBowIcon className="w-5 h-5 text-pink-500" />
          </h2>
          <p className="text-xs text-gray-500 dark:text-pink-300/80">
            Enter your 4-digit PIN to open your private digital journal.
          </p>

          <form onSubmit={handleUnlockPin} className="space-y-3 pt-2">
            <input
              type="password"
              maxLength={4}
              autoFocus
              value={pinUnlockInput}
              onChange={(e) => {
                setPinUnlockInput(e.target.value.replace(/\D/g, ''));
                setPinError(false);
              }}
              placeholder="● ● ● ●"
              className="w-full text-center text-2xl tracking-widest px-4 py-3 rounded-2xl border border-pink-300 dark:border-pink-800 bg-white/80 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold"
            />
            {pinError && (
              <p className="text-xs text-rose-500 font-semibold">
                Incorrect PIN. Please try again ♡
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all"
            >
              Unlock My Sanctuary ♡
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Top Header */}
      <Header
        profile={profile}
        cycleInfo={cycleInfo}
        wellnessScore={todayRecord?.wellnessScore || 85}
        todayFormatted={formatDatePretty(todayStr)}
        onUpdateProfile={handleUpdateProfile}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          tasksCompleted={tasksCompleted}
          totalTasks={totalTasks}
          waterGlasses={todayRecord?.waterGlasses || 0}
          waterGoal={profile.waterGoalGlasses || 8}
        />

        {/* Center Content Space */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeView
              profile={profile}
              todayRecord={todayRecord}
              cycleInfo={cycleInfo}
              todayFormatted={formatDatePretty(todayStr)}
              onNavigate={setCurrentTab}
              onUpdateRecord={handleUpdateRecord}
              onUpdateProfile={handleUpdateProfile}
              onStartFresh={handleStartFresh}
              onExploreDemo={handleExploreDemo}
            />
          )}

          {currentTab === 'today' && (
            <TodayView
              todayRecord={todayRecord}
              onUpdateRecord={handleUpdateRecord}
              todayFormatted={formatDatePretty(todayStr)}
            />
          )}

          {currentTab === 'period' && (
            <PeriodView
              profile={profile}
              todayRecord={todayRecord}
              cycleInfo={cycleInfo}
              onUpdateRecord={handleUpdateRecord}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView
              profile={profile}
              records={records}
              cycleInfo={cycleInfo}
              onSelectDate={(d) => {}}
            />
          )}

          {currentTab === 'food' && (
            <FoodView todayRecord={todayRecord} onUpdateRecord={handleUpdateRecord} />
          )}

          {currentTab === 'water' && (
            <WaterView
              profile={profile}
              todayRecord={todayRecord}
              onUpdateRecord={handleUpdateRecord}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentTab === 'sleep' && (
            <SleepView
              todayRecord={todayRecord}
              records={records}
              onUpdateRecord={handleUpdateRecord}
            />
          )}

          {currentTab === 'mood' && (
            <MoodView todayRecord={todayRecord} onUpdateRecord={handleUpdateRecord} />
          )}

          {currentTab === 'symptoms' && (
            <SymptomsView todayRecord={todayRecord} onUpdateRecord={handleUpdateRecord} />
          )}

          {currentTab === 'exercise' && (
            <ExerciseView todayRecord={todayRecord} onUpdateRecord={handleUpdateRecord} />
          )}

          {currentTab === 'self_care' && (
            <SelfCareView todayRecord={todayRecord} onUpdateRecord={handleUpdateRecord} />
          )}

          {currentTab === 'journal' && (
            <JournalView
              entries={journalEntries}
              onSaveEntry={handleSaveJournalEntry}
              onDeleteEntry={handleDeleteJournalEntry}
            />
          )}

          {currentTab === 'insights' && (
            <InsightsView insights={insights} profile={profile} cycleInfo={cycleInfo} />
          )}

          {currentTab === 'history' && <HistoryView records={records} />}

          {currentTab === 'report' && (
            <MonthlyReportView records={records} profile={profile} />
          )}

          {currentTab === 'achievements' && (
            <AchievementsView achievements={achievements} streaks={streaks} />
          )}

          {currentTab === 'health' && (
            <HealthMetricsView metrics={healthMetrics} onSaveMetric={handleSaveMetric} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onExportData={handleExportData}
              onImportData={handleImportData}
              onResetData={handleResetData}
              onStartFresh={handleStartFresh}
              onExploreDemo={handleExploreDemo}
              onOpenPinModal={() => setIsPinModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        tasksCompleted={tasksCompleted}
        totalTasks={totalTasks}
      />

      {/* PIN Lock Management Modal */}
      <PinLockModal
        isOpen={isPinModalOpen}
        currentPin={profile.pinLock}
        onClose={() => setIsPinModalOpen(false)}
        onSetPin={(pin) => handleUpdateProfile({ pinLock: pin })}
      />

      {/* Health & Safety Modal */}
      <HealthSafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />
    </div>
  );
};

export default App;
