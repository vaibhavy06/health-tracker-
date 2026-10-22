import React, { useState } from 'react';
import {
  Home,
  CheckCircle2,
  CalendarHeart,
  Droplets,
  Menu,
  X,
  Calendar,
  UtensilsCrossed,
  Moon,
  Smile,
  Activity,
  HeartHandshake,
  BookOpen,
  Sparkles,
  History,
  FileText,
  Award,
  Sliders,
  Flame,
  Stethoscope,
} from 'lucide-react';
import { NavTab } from './Sidebar';

import { TrackerToggles } from '../../types';

interface MobileNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  tasksCompleted: number;
  totalTasks: number;
  trackersEnabled?: TrackerToggles;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  tasksCompleted,
  totalTasks,
  trackersEnabled,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryMobileTabs: { id: NavTab; label: string; icon: React.FC<any> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'today', label: 'Today', icon: CheckCircle2 },
    { id: 'period', label: 'Cycle', icon: CalendarHeart },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  const allDrawerTabsRaw = [
    { id: 'home' as NavTab, label: 'Home Sanctuary', icon: Home as React.FC<any>, category: 'Core', visible: true },
    { id: 'today' as NavTab, label: "Today's Checklist", icon: CheckCircle2 as React.FC<any>, category: 'Core', visible: true },
    { id: 'period' as NavTab, label: 'Cycle & Period', icon: CalendarHeart as React.FC<any>, category: 'Core', visible: trackersEnabled ? trackersEnabled.period : true },
    { id: 'calendar' as NavTab, label: 'Monthly Calendar', icon: Calendar as React.FC<any>, category: 'Core', visible: true },
    { id: 'food' as NavTab, label: 'Nourishment', icon: UtensilsCrossed as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.food : true },
    { id: 'water' as NavTab, label: 'Hydration', icon: Droplets as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.water : true },
    { id: 'sleep' as NavTab, label: 'Sleep Tracker', icon: Moon as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.sleep : true },
    { id: 'mood' as NavTab, label: 'Mood & Emotions', icon: Smile as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.mood : true },
    { id: 'symptoms' as NavTab, label: 'Symptom Log', icon: Stethoscope as React.FC<any>, category: 'Daily Log', visible: true },
    { id: 'exercise' as NavTab, label: 'Gentle Movement', icon: Activity as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.exercise : true },
    { id: 'self_care' as NavTab, label: 'Self-Care Routine', icon: HeartHandshake as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.selfCare : true },
    { id: 'journal' as NavTab, label: 'Private Diary', icon: BookOpen as React.FC<any>, category: 'Daily Log', visible: trackersEnabled ? trackersEnabled.journal : true },
    { id: 'insights' as NavTab, label: 'Her Patterns ♡', icon: Sparkles as React.FC<any>, category: 'Insights', visible: true },
    { id: 'history' as NavTab, label: 'All History', icon: History as React.FC<any>, category: 'Insights', visible: true },
    { id: 'report' as NavTab, label: 'Monthly Report', icon: FileText as React.FC<any>, category: 'Insights', visible: true },
    { id: 'achievements' as NavTab, label: 'Streaks & Badges', icon: Award as React.FC<any>, category: 'Insights', visible: true },
    { id: 'health' as NavTab, label: 'Health Metrics', icon: Flame as React.FC<any>, category: 'Settings', visible: trackersEnabled ? (trackersEnabled.weight || trackersEnabled.temperature || trackersEnabled.steps || trackersEnabled.heartRate) : false },
    { id: 'settings' as NavTab, label: 'Settings & Privacy', icon: Sliders as React.FC<any>, category: 'Settings', visible: true },
  ];
  const allDrawerTabs = allDrawerTabsRaw.filter((t) => t.visible);

  return (
    <>
      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-t border-pink-100 dark:border-pink-950/50 px-2 py-2 flex items-center justify-around shadow-lg">
        {primaryMobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-pink-600 dark:text-pink-400 font-semibold scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-pink-500'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.id === 'today' && (
                  <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {tasksCompleted}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}

        {/* More Drawer Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            drawerOpen
              ? 'text-pink-600 font-semibold'
              : 'text-gray-500 dark:text-gray-400 hover:text-pink-500'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Full Screen Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 border-t border-pink-200 dark:border-pink-950 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-pink-950">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <span className="font-serif font-bold text-gray-800 dark:text-pink-100 text-lg">
                  Wellness Spaces
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full bg-pink-50 dark:bg-pink-950 text-gray-500 dark:text-pink-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pb-12">
              {allDrawerTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-medium text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-soft'
                        : 'bg-pink-50/60 dark:bg-pink-950/30 text-gray-700 dark:text-pink-100 hover:bg-pink-100/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
