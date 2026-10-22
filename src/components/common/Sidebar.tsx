import React from 'react';
import {
  Home,
  CheckCircle2,
  CalendarHeart,
  Calendar,
  UtensilsCrossed,
  Droplets,
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

import { TrackerToggles } from '../../types';

export type NavTab =
  | 'home'
  | 'today'
  | 'period'
  | 'calendar'
  | 'food'
  | 'water'
  | 'sleep'
  | 'mood'
  | 'symptoms'
  | 'exercise'
  | 'self_care'
  | 'journal'
  | 'insights'
  | 'history'
  | 'report'
  | 'achievements'
  | 'health'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  tasksCompleted: number;
  totalTasks: number;
  waterGlasses: number;
  waterGoal: number;
  trackersEnabled?: TrackerToggles;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  tasksCompleted,
  totalTasks,
  waterGlasses,
  waterGoal,
  trackersEnabled,
}) => {
  const primaryNav = [
    { id: 'home', label: 'Home Sanctuary', icon: Home, badge: null, visible: true },
    {
      id: 'today',
      label: "Today's Checklist",
      icon: CheckCircle2,
      badge: `${tasksCompleted}/${totalTasks}`,
      visible: true,
    },
    { id: 'period', label: 'Cycle & Period', icon: CalendarHeart, badge: 'Phase', visible: trackersEnabled ? trackersEnabled.period : true },
    { id: 'calendar', label: 'Monthly Calendar', icon: Calendar, badge: null, visible: true },
  ].filter((i) => i.visible);

  const dailyTrackingNav = [
    { id: 'food', label: 'Nourishment', icon: UtensilsCrossed, badge: null, visible: trackersEnabled ? trackersEnabled.food : true },
    {
      id: 'water',
      label: 'Hydration Tracker',
      icon: Droplets,
      badge: `${waterGlasses}/${waterGoal}`,
      visible: trackersEnabled ? trackersEnabled.water : true,
    },
    { id: 'sleep', label: 'Sleep & Rest', icon: Moon, badge: null, visible: trackersEnabled ? trackersEnabled.sleep : true },
    { id: 'mood', label: 'Mood & Emotions', icon: Smile, badge: null, visible: trackersEnabled ? trackersEnabled.mood : true },
    { id: 'symptoms', label: 'Symptom Log', icon: Stethoscope, badge: null, visible: true },
    { id: 'exercise', label: 'Gentle Movement', icon: Activity, badge: null, visible: trackersEnabled ? trackersEnabled.exercise : true },
    { id: 'self_care', label: 'Self-Care Routine', icon: HeartHandshake, badge: null, visible: trackersEnabled ? trackersEnabled.selfCare : true },
    { id: 'journal', label: 'Private Diary', icon: BookOpen, badge: null, visible: trackersEnabled ? trackersEnabled.journal : true },
  ].filter((i) => i.visible);

  const analyticsAndMoreNav = [
    { id: 'insights', label: 'Her Patterns ♡', icon: Sparkles, badge: 'AI', visible: true },
    { id: 'history', label: 'All Past Records', icon: History, badge: null, visible: true },
    { id: 'report', label: 'Monthly Report', icon: FileText, badge: null, visible: true },
    { id: 'achievements', label: 'Streaks & Badges', icon: Award, badge: null, visible: true },
    { id: 'health', label: 'Health Metrics', icon: Flame, badge: null, visible: trackersEnabled ? (trackersEnabled.weight || trackersEnabled.temperature || trackersEnabled.steps || trackersEnabled.heartRate) : false },
    { id: 'settings', label: 'Settings & Privacy', icon: Sliders, badge: null, visible: true },
  ].filter((i) => i.visible);

  const renderNavGroup = (title: string, items: typeof primaryNav) => (
    <div className="mb-5">
      <h2 className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-pink-300/60">
        {title}
      </h2>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as NavTab)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs md:text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-soft shadow-pink-300/40 font-semibold'
                  : 'text-gray-600 dark:text-pink-200/80 hover:bg-pink-50 dark:hover:bg-pink-950/40 hover:text-pink-600 dark:hover:text-pink-100'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-pink-400 dark:text-pink-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 glass-nav min-h-[calc(100vh-65px)] p-4 border-r border-pink-100 dark:border-pink-950/40 select-none">
      <div className="overflow-y-auto pr-1">
        {renderNavGroup('Daily Sanctuary', primaryNav)}
        {renderNavGroup('Mind & Body Tracking', dailyTrackingNav)}
        {renderNavGroup('Insights & Records', analyticsAndMoreNav)}
      </div>

      <div className="mt-auto pt-3 border-t border-pink-100 dark:border-pink-950/40">
        <div className="bg-pink-50/70 dark:bg-pink-950/30 rounded-2xl p-3 text-center border border-pink-100/60 dark:border-pink-900/30">
          <p className="text-xs font-handwritten text-pink-600 dark:text-pink-300 text-base leading-tight">
            "Every gentle step counts ♡"
          </p>
          <p className="text-[10px] text-gray-400 dark:text-pink-400/60 mt-1">
            Private & encrypted on device
          </p>
        </div>
      </div>
    </aside>
  );
};
