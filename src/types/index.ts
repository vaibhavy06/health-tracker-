export type ThemeMode =
  | 'soft-pink'
  | 'coquette'
  | 'lavender'
  | 'strawberry'
  | 'cloudy'
  | 'garden'
  | 'butterfly'
  | 'cozy-evening';

export type MessageTone = 'sweet' | 'cute' | 'calm' | 'motivational' | 'cozy' | 'minimal';

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy';

export interface TrackerToggles {
  mood: boolean;
  water: boolean;
  sleep: boolean;
  period: boolean;
  food: boolean;
  exercise: boolean;
  selfCare: boolean;
  journal: boolean;
  weight: boolean;
  temperature: boolean;
  steps: boolean;
  heartRate: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatarIcon: string;
  theme: ThemeMode;
  darkMode: boolean;
  demoMode: boolean; // true = tutorial/example mode, false = start fresh personal mode
  pinLock: string | null; // Optional 4-digit privacy PIN
  birthday?: string;
  pronouns?: string;
  timezone: string;
  units: 'metric' | 'imperial';
  messageTone: MessageTone;
  showMessages: boolean;
  personalReminder: string;
  reminderAuthor: string;
  waterGoalGlasses: number; // e.g. 8 glasses (250ml each = 2000ml)
  sleepGoalHours: number; // e.g. 8 hours
  movementGoalMinutes: number; // e.g. 30 mins
  journalGoalMinutes: number; // e.g. 10 mins
  cycleLength: number; // default 28 days
  periodDuration: number; // default 5 days
  lastPeriodStart: string; // YYYY-MM-DD
  selfCareGoalCount?: number; // e.g. 1 activity/day
  dashboardWidgets: string[]; // customizable order of widgets
  pinnedWidgets?: string[];
  trackersEnabled: TrackerToggles;
  createdDate: string;
}

export type RoutineTime = 'morning' | 'afternoon' | 'evening' | 'custom';

export interface DailyTask {
  id: string;
  title: string;
  category: 'hydration' | 'food' | 'movement' | 'self_care' | 'sleep' | 'journal' | 'health' | 'custom';
  routineTime: RoutineTime;
  routineName?: string;
  completed: boolean;
  timeCompleted?: string;
  icon?: string;
  isExample?: boolean;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealEntry {
  id: string;
  mealType: MealType;
  foodName: string;
  portion: string;
  time: string;
  hungerLevel: number; // 1 to 5
  feelingAfter: string;
  tags: string[]; // e.g. ['fruits', 'protein', 'warm', 'veggies']
  notes?: string;
  isExample?: boolean;
}

export interface SleepEntry {
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  durationMinutes: number;
  quality: 'restful' | 'fair' | 'light' | 'restless';
  nightAwakenings: number;
  morningEnergy: number; // 1 to 10
  notes?: string;
  isExample?: boolean;
}

export type MoodType =
  | 'great'
  | 'happy'
  | 'calm'
  | 'loved'
  | 'okay'
  | 'sad'
  | 'stressed'
  | 'irritated'
  | 'anxious'
  | 'emotional'
  | 'exhausted';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number; // 1 to 10
  reason?: string;
  loggedAt: string;
  isExample?: boolean;
}

export interface SymptomEntry {
  id: string;
  name: string;
  category: 'physical' | 'emotional';
  severity: number; // 1 to 10
  notes?: string;
  isExample?: boolean;
}

export interface ExerciseEntry {
  id: string;
  activityType: 'walking' | 'yoga' | 'stretching' | 'pilates' | 'gym' | 'cycling' | 'running' | 'dance' | 'home_workout' | 'other';
  durationMinutes: number;
  intensity: 'gentle' | 'moderate' | 'energizing';
  feelingAfter: string;
  notes?: string;
  isExample?: boolean;
}

export interface SelfCareEntry {
  id: string;
  activity: string;
  category: 'skincare' | 'body' | 'mind' | 'cozy' | 'rest';
  completed: boolean;
  notes?: string;
  isExample?: boolean;
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  moods: MoodType[];
  tags: string[];
  isFavorite: boolean;
  promptUsed?: string;
  createdAt: string;
  isExample?: boolean;
}

export interface HealthMetricEntry {
  id: string;
  date: string;
  weight?: number; // kg
  steps?: number;
  restingHeartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  temperature?: number; // Celsius
  notes?: string;
  isExample?: boolean;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  waterGlasses: number; // out of waterGoalGlasses
  tasks: DailyTask[];
  meals: MealEntry[];
  sleep?: SleepEntry;
  moods: MoodEntry[];
  symptoms: SymptomEntry[];
  exercises: ExerciseEntry[];
  selfCare: SelfCareEntry[];
  periodFlow: FlowLevel;
  energyLevel: number; // 1 to 10
  wellnessScore: number; // 0 to 100 calculated
  notes?: string;
  isExample?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'consistency' | 'hydration' | 'mind' | 'sleep' | 'nourishment' | 'period';
  unlockedAt: string | null; // null if locked
  progressText: string;
  isExample?: boolean;
}

export interface WellnessInsight {
  id: string;
  type: 'sleep_mood' | 'hydration_energy' | 'movement_mood' | 'cycle_energy' | 'self_care_streak';
  title: string;
  description: string;
  trend: 'up' | 'down' | 'steady' | 'positive';
  confidence: number; // 0 to 100
  supportingMetric: string;
  isExample?: boolean;
}

export interface CycleInfo {
  cycleDay: number;
  phase: CyclePhase;
  phaseName: string;
  phaseEmoji: string;
  phaseDescription: string;
  selfCareTip: string;
  daysUntilNextPeriod: number;
  nextPeriodDate: string;
  ovulationWindow: boolean;
  fertileWindow: boolean;
}
