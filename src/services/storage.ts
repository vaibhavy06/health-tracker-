import {
  UserProfile,
  DailyRecord,
  JournalEntry,
  HealthMetricEntry,
  Achievement,
  WellnessInsight,
  DailyTask,
  CyclePhase,
  CycleInfo,
} from '../types';

import {
  defaultProfile,
  defaultRoutineTemplates,
  defaultAchievements,
  sampleInsights,
  tryItExamples,
} from '../data/demoData';

const STORAGE_KEY = 'dhruvi_sanctuary_v1';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDatePretty(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export interface StoredData {
  profile: UserProfile;
  records: Record<string, DailyRecord>; // keyed by YYYY-MM-DD
  journalEntries: JournalEntry[];
  healthMetrics: HealthMetricEntry[];
  achievements: Achievement[];
  insights: WellnessInsight[];
}

export function createNewDayRecord(dateStr: string, customTemplates?: DailyTask[]): DailyRecord {
  const templates = customTemplates && customTemplates.length > 0 ? customTemplates : defaultRoutineTemplates;
  const tasks: DailyTask[] = templates.map((t, idx) => ({
    id: `task_${dateStr}_${idx}_${Date.now()}`,
    title: t.title,
    category: t.category,
    icon: t.icon,
    routineTime: (t as any).routineTime || 'morning',
    routineName: (t as any).routineName || 'Morning 🌸',
    completed: false,
  }));

  return {
    date: dateStr,
    waterGlasses: 0,
    tasks,
    meals: [],
    moods: [],
    symptoms: [],
    exercises: [],
    selfCare: [],
    periodFlow: 'none',
    energyLevel: 7,
    wellnessScore: 0,
  };
}

export function generateInitialData(demoMode: boolean = true): StoredData {
  const todayStr = getTodayDateString();
  const profile: UserProfile = {
    ...defaultProfile,
    demoMode,
  };

  const records: Record<string, DailyRecord> = {};
  const baseRecord = createNewDayRecord(todayStr);

  if (demoMode) {
    // Populate ONLY today with clearly-marked educational tutorial samples
    // so Dhruvi immediately sees how each feature works without fake historical records!
    records[todayStr] = {
      ...baseRecord,
      waterGlasses: 0, // Clean 0 glasses for today
      meals: [
        {
          id: 'demo_meal_breakfast',
          mealType: 'breakfast',
          foodName: tryItExamples.food.foodName,
          portion: tryItExamples.food.portion,
          time: tryItExamples.food.time,
          hungerLevel: tryItExamples.food.hungerLevel,
          feelingAfter: tryItExamples.food.feelingAfter,
          tags: tryItExamples.food.tags,
          notes: tryItExamples.food.notes,
          isExample: true,
        },
      ],
      moods: [
        {
          id: 'demo_mood_calm',
          mood: tryItExamples.mood.mood,
          intensity: tryItExamples.mood.intensity,
          reason: tryItExamples.mood.reason,
          loggedAt: new Date().toISOString(),
          isExample: true,
        },
      ],
      sleep: {
        bedtime: tryItExamples.sleep.bedtime,
        wakeTime: tryItExamples.sleep.wakeTime,
        durationMinutes: tryItExamples.sleep.durationMinutes,
        quality: tryItExamples.sleep.quality,
        nightAwakenings: tryItExamples.sleep.nightAwakenings,
        morningEnergy: tryItExamples.sleep.morningEnergy,
        notes: tryItExamples.sleep.notes,
        isExample: true,
      },
      selfCare: [
        {
          id: 'demo_sc_skincare',
          activity: tryItExamples.selfCare.activity,
          category: tryItExamples.selfCare.category,
          completed: false,
          notes: tryItExamples.selfCare.notes,
          isExample: true,
        },
      ],
      exercises: [],
      symptoms: [],
      periodFlow: 'none',
      energyLevel: 8,
      wellnessScore: 40,
    };

    return {
      profile,
      records,
      journalEntries: [tryItExamples.journal],
      healthMetrics: [],
      achievements: defaultAchievements,
      insights: sampleInsights,
    };
  }

  // Fresh Mode: Pristine empty canvas!
  records[todayStr] = baseRecord;

  return {
    profile: {
      ...profile,
      demoMode: false,
    },
    records,
    journalEntries: [],
    healthMetrics: [],
    achievements: defaultAchievements,
    insights: sampleInsights,
  };
}

export function loadStore(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateInitialData(true);
      saveStore(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as StoredData;

    // Daily Reset Check: ensure today's record exists without overwriting existing!
    const todayStr = getTodayDateString();
    if (!parsed.records[todayStr]) {
      // Find latest routine templates from existing record if available
      const prevDates = Object.keys(parsed.records).sort().reverse();
      const lastTasks = prevDates.length > 0 ? parsed.records[prevDates[0]].tasks : undefined;

      parsed.records[todayStr] = createNewDayRecord(todayStr, lastTasks);
      saveStore(parsed);
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load store, resetting to clean fresh start', e);
    const initial = generateInitialData(true);
    saveStore(initial);
    return initial;
  }
}

export function saveStore(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

/**
 * Transitions from Demo Mode to Start Fresh Mode:
 * Removes all demo/example records while keeping Dhruvi's profile, settings, PIN, routines & goals!
 */
export function startFreshSanctuary(currentData: StoredData): StoredData {
  const todayStr = getTodayDateString();
  const currentToday = currentData.records[todayStr] || createNewDayRecord(todayStr);

  // Clean today's record of all items marked with isExample: true
  const freshToday: DailyRecord = {
    ...currentToday,
    waterGlasses: currentToday.isExample ? 0 : currentToday.waterGlasses,
    tasks: currentToday.tasks.map((t) => ({ ...t, completed: false, isExample: false })),
    meals: currentToday.meals.filter((m) => !m.isExample),
    moods: currentToday.moods.filter((m) => !m.isExample),
    sleep: currentToday.sleep?.isExample ? undefined : currentToday.sleep,
    exercises: currentToday.exercises.filter((e) => !e.isExample),
    selfCare: currentToday.selfCare.filter((s) => !s.isExample),
    symptoms: currentToday.symptoms.filter((s) => !s.isExample),
    isExample: false,
    wellnessScore: calculateWellnessScore({
      ...currentToday,
      meals: currentToday.meals.filter((m) => !m.isExample),
      moods: currentToday.moods.filter((m) => !m.isExample),
      sleep: currentToday.sleep?.isExample ? undefined : currentToday.sleep,
      exercises: currentToday.exercises.filter((e) => !e.isExample),
      selfCare: currentToday.selfCare.filter((s) => !s.isExample),
      symptoms: currentToday.symptoms.filter((s) => !s.isExample),
    }),
  };

  // Clean historical records of any example records
  const cleanRecords: Record<string, DailyRecord> = {};
  for (const [dateKey, rec] of Object.entries(currentData.records)) {
    if (dateKey === todayStr) {
      cleanRecords[dateKey] = freshToday;
    } else if (!rec.isExample) {
      cleanRecords[dateKey] = rec;
    }
  }
  if (!cleanRecords[todayStr]) {
    cleanRecords[todayStr] = freshToday;
  }

  const cleanJournal = currentData.journalEntries.filter((j) => !j.isExample);
  const cleanMetrics = currentData.healthMetrics.filter((m) => !m.isExample);

  const updated: StoredData = {
    ...currentData,
    profile: {
      ...currentData.profile,
      demoMode: false,
    },
    records: cleanRecords,
    journalEntries: cleanJournal,
    healthMetrics: cleanMetrics,
  };

  saveStore(updated);
  return updated;
}

/**
 * Loads tutorial demonstration cards so Dhruvi can explore feature examples again at any time.
 */
export function loadTutorialDemoData(currentData: StoredData): StoredData {
  const initialDemo = generateInitialData(true);
  const updated: StoredData = {
    ...currentData,
    profile: {
      ...currentData.profile,
      demoMode: true,
    },
    records: {
      ...currentData.records,
      ...initialDemo.records,
    },
    journalEntries: [
      tryItExamples.journal,
      ...currentData.journalEntries.filter((j) => j.id !== tryItExamples.journal.id),
    ],
  };
  saveStore(updated);
  return updated;
}

export function calculateWellnessScore(rec: DailyRecord): number {
  let score = 0;

  // Hydration (up to 25 pts)
  const waterPct = Math.min(rec.waterGlasses / 8, 1);
  score += Math.round(waterPct * 25);

  // Tasks (up to 25 pts)
  if (rec.tasks && rec.tasks.length > 0) {
    const completedTasks = rec.tasks.filter((t) => t.completed).length;
    const taskPct = completedTasks / rec.tasks.length;
    score += Math.round(taskPct * 25);
  }

  // Nourishment (up to 20 pts)
  const realMeals = rec.meals ? rec.meals.length : 0;
  if (realMeals >= 3) score += 20;
  else if (realMeals === 2) score += 15;
  else if (realMeals === 1) score += 8;

  // Sleep & Rest (up to 15 pts)
  if (rec.sleep) {
    if (rec.sleep.durationMinutes >= 420) score += 15;
    else score += 10;
  }

  // Movement & Self Care (up to 15 pts)
  const hasExercise = rec.exercises && rec.exercises.length > 0;
  const selfCareDone = rec.selfCare && rec.selfCare.filter((s) => s.completed).length > 0;
  if (hasExercise && selfCareDone) score += 15;
  else if (hasExercise || selfCareDone) score += 10;

  return Math.min(100, Math.max(0, score));
}

export type { CycleInfo };

export function calculateCycleInfo(
  lastPeriodStart: string,
  cycleLength: number = 28,
  periodDuration: number = 5
): CycleInfo {
  if (!lastPeriodStart) {
    return {
      cycleDay: 1,
      phase: 'follicular',
      phaseName: 'Follicular Phase',
      phaseEmoji: '🌱',
      phaseDescription: 'Your body is resting and building gentle fresh energy.',
      selfCareTip: 'Enjoy light movement, creative journaling, and warm nourishing foods.',
      daysUntilNextPeriod: cycleLength,
      nextPeriodDate: 'Tap "Started Period Today" to calibrate your cycle',
      ovulationWindow: false,
      fertileWindow: false,
    };
  }

  const start = new Date(lastPeriodStart);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleDay = (diffDays % cycleLength) + 1;

  let phase: CyclePhase = 'follicular';
  let phaseName = 'Follicular Phase';
  let phaseEmoji = '🌱';
  let phaseDescription = 'Rising estrogen promotes high creative energy, focus, and radiant skin.';
  let selfCareTip = 'Try energetic workouts, brainstorm new ideas, and drink plenty of water.';
  let ovulationWindow = false;
  let fertileWindow = false;

  if (cycleDay <= periodDuration) {
    phase = 'menstrual';
    phaseName = 'Menstrual Phase';
    phaseEmoji = '🌸';
    phaseDescription = 'Your inner winter. Rest, gentle reflection, and physical comfort are key.';
    selfCareTip = 'Keep warm, drink hot herbal tea, take cozy warm showers, and give yourself extra rest.';
  } else if (cycleDay >= 12 && cycleDay <= 16) {
    phase = 'ovulatory';
    phaseName = 'Ovulatory Phase';
    phaseEmoji = '✨';
    phaseDescription = 'Your inner summer. Confidence, communication, and natural glow peak right now.';
    selfCareTip = 'Connect with friends, tackle ambitious projects, and enjoy vibrant colorful foods.';
    ovulationWindow = cycleDay === 14;
    fertileWindow = true;
  } else if (cycleDay > 16) {
    phase = 'luteal';
    phaseName = 'Luteal Phase';
    phaseEmoji = '🍂';
    phaseDescription = 'Your inner autumn. Progesterone rises, inviting you to slow down and nest.';
    selfCareTip = 'Prioritize magnesium-rich snacks, gentle stretching, and soothing bedtime routines.';
  }

  const daysUntilNextPeriod = cycleLength - cycleDay + 1;
  const nextDateObj = new Date(now);
  nextDateObj.setDate(now.getDate() + daysUntilNextPeriod);
  const nextPeriodDate = nextDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return {
    cycleDay,
    phase,
    phaseName,
    phaseEmoji,
    phaseDescription,
    selfCareTip,
    daysUntilNextPeriod,
    nextPeriodDate,
    ovulationWindow,
    fertileWindow,
  };
}

// Calculate streaks dynamically from real data
export function calculateStreaks(
  records: Record<string, DailyRecord>,
  journalEntries: JournalEntry[] = []
): {
  dailyStreak: number;
  waterStreak: number;
  journalStreak: number;
} {
  const dates = Object.keys(records).sort().reverse();
  if (dates.length === 0) return { dailyStreak: 0, waterStreak: 0, journalStreak: 0 };

  let dailyStreak = 0;
  let waterStreak = 0;

  for (const d of dates) {
    const rec = records[d];
    if (!rec.isExample && rec.wellnessScore > 20) dailyStreak++;
    else if (!rec.isExample && rec.tasks.some((t) => t.completed)) dailyStreak++;
    else break;
  }

  for (const d of dates) {
    const rec = records[d];
    if (!rec.isExample && rec.waterGlasses >= 6) waterStreak++;
    else break;
  }

  const realJournalCount = journalEntries.filter((j) => !j.isExample).length;

  return {
    dailyStreak,
    waterStreak,
    journalStreak: realJournalCount,
  };
}
