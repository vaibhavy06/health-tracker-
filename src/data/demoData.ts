import {
  UserProfile,
  DailyRecord,
  JournalEntry,
  HealthMetricEntry,
  Achievement,
  WellnessInsight,
  DailyTask,
  MessageTone,
  MealEntry,
  SleepEntry,
  MoodEntry,
  ExerciseEntry,
  SelfCareEntry,
  SymptomEntry,
} from '../types';

export const defaultRoutineTemplates: Omit<DailyTask, 'id' | 'completed'>[] = [
  // Morning 🌸
  { title: 'Wake up gently & stretch in bed', category: 'self_care', icon: '☀️', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: 'Drink a glass of warm water', category: 'hydration', icon: '💧', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: 'Brush teeth & refresh skin', category: 'self_care', icon: '✨', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: 'Morning skincare & sunscreen', category: 'self_care', icon: '🧴', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: 'Enjoy a nourishing breakfast', category: 'food', icon: '🥐', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: 'Take vitamins / daily supplements', category: 'health', icon: '💊', routineTime: 'morning', routineName: 'Morning 🌸' },
  { title: '10-minute gentle stretch or walk', category: 'movement', icon: '🧘‍♀️', routineTime: 'morning', routineName: 'Morning 🌸' },

  // Evening 🌙
  { title: 'Wholesome dinner with warm veggies', category: 'food', icon: '🍲', routineTime: 'evening', routineName: 'Evening 🌙' },
  { title: 'Evening skincare & dental care', category: 'self_care', icon: '🧴', routineTime: 'evening', routineName: 'Evening 🌙' },
  { title: 'Write in private journal', category: 'journal', icon: '📖', routineTime: 'evening', routineName: 'Evening 🌙' },
  { title: 'Relax & dim screens', category: 'self_care', icon: '🕯️', routineTime: 'evening', routineName: 'Evening 🌙' },
  { title: 'Prepare for tomorrow with calm mind', category: 'self_care', icon: '🎀', routineTime: 'evening', routineName: 'Evening 🌙' },
  { title: 'Lights out for deep restorative sleep', category: 'sleep', icon: '🌙', routineTime: 'evening', routineName: 'Evening 🌙' },
];

export const defaultTaskTemplates = defaultRoutineTemplates;

export const defaultProfile: UserProfile = {
  id: 'user_dhruvi_01',
  displayName: 'Dhruvi',
  avatarIcon: '🌸',
  theme: 'soft-pink',
  darkMode: false,
  demoMode: true, // starts with tutorial/example mode so Dhruvi can explore or click "Start Fresh ♡"
  pinLock: null,
  birthday: '2002-05-18',
  pronouns: 'she/her',
  timezone: 'Asia/Kolkata (GMT+5:30)',
  units: 'metric',
  messageTone: 'sweet',
  showMessages: true,
  personalReminder: 'You do not have to be productive every single day. Taking gentle care of your heart and body is more than enough ♡',
  reminderAuthor: 'With love',
  waterGoalGlasses: 8,
  sleepGoalHours: 8,
  movementGoalMinutes: 30,
  journalGoalMinutes: 10,
  selfCareGoalCount: 1,
  cycleLength: 28,
  periodDuration: 5,
  lastPeriodStart: '', // Blank by default so Dhruvi starts fresh!
  dashboardWidgets: ['mood', 'water', 'sleep', 'period', 'food', 'self_care', 'journal', 'exercise'],
  pinnedWidgets: ['water', 'period', 'mood'],
  trackersEnabled: {
    mood: true,
    water: true,
    sleep: true,
    period: true,
    food: true,
    exercise: true,
    selfCare: true,
    journal: true,
    weight: false, // hidden by default per user prompt!
    temperature: false, // hidden by default per user prompt!
    steps: false,
    heartRate: false,
  },
  createdDate: new Date().toISOString(),
};

// Curated tone messages specifically personalized for Dhruvi
export const messageTones: Record<MessageTone, { title: string; quotes: string[] }> = {
  sweet: {
    title: 'Sweet & Loving',
    quotes: [
      'Take a little care of yourself today, Dhruvi ♡',
      'You are doing wonderfully, even in quiet ways ♡',
      'Your peace of mind is worth protecting every day, Dhruvi ♡',
      'Soft reminder: taking care of your heart is your highest priority.',
    ],
  },
  cute: {
    title: 'Cute & Playful',
    quotes: [
      'Water check, pretty girl 💧🎀',
      'Look at you blooming so gracefully today! 🌸✨',
      'Don’t forget to eat something yummy and sweet today 🍓🍰',
      'Sending you a little pocket of sunshine and hugs ♡',
    ],
  },
  calm: {
    title: 'Calm & Grounded',
    quotes: [
      'Slow down. You don’t have to do everything today.',
      'Inhale peace, exhale hurry. You are right where you belong.',
      'Quiet moments of rest are just as productive as action.',
      'Let your shoulders drop and unclench your jaw. Breathe softly.',
    ],
  },
  motivational: {
    title: 'Gentle Motivation',
    quotes: [
      'Small habits become beautiful changes.',
      'Every loving choice you make today honors future you, Dhruvi.',
      'Show up for yourself with gentle grace and courage.',
      'Progress is a garden; give yourself time to bloom.',
    ],
  },
  cozy: {
    title: 'Warm & Cozy',
    quotes: [
      'Wrap yourself in gentle warmth and take a deep breath 🕯️',
      'Soft blankets, a warm cup of tea, and kindness toward yourself.',
      'Let today be unhurried and full of little comforting moments.',
      'Dim the lights, sip slowly, and let your heart rest.',
    ],
  },
  minimal: {
    title: 'Minimal & Serene',
    quotes: [
      'A fresh day, a fresh little chapter.',
      'Gentle presence.',
      'One mindful breath at a time.',
      'Simplicity brings peace.',
    ],
  },
};

// Interactive "Try It" Demo Templates for empty sections
export const tryItExamples = {
  food: {
    mealType: 'breakfast' as const,
    foodName: 'Oatmeal bowl with blueberries, chia & almond butter',
    portion: 'Comfortable',
    time: '08:45',
    hungerLevel: 3,
    feelingAfter: 'Light, nourished and energized ♡',
    tags: ['fruits', 'fiber', 'warm'],
    notes: 'Example meal: click "Replace with My Meal" to customize with your breakfast!',
    isExample: true,
  } as MealEntry,
  mood: {
    id: 'demo_mood_1',
    mood: 'calm' as const,
    intensity: 8,
    reason: 'Morning balcony breeze with warm vanilla tea ♡',
    loggedAt: new Date().toISOString(),
    isExample: true,
  } as MoodEntry,
  sleep: {
    bedtime: '22:30',
    wakeTime: '06:45',
    durationMinutes: 495, // 8h 15m
    quality: 'restful' as const,
    nightAwakenings: 0,
    morningEnergy: 8,
    notes: 'Example sleep: woke up feeling peaceful and well-rested.',
    isExample: true,
  } as SleepEntry,
  exercise: {
    id: 'demo_ex_1',
    activityType: 'yoga' as const,
    durationMinutes: 20,
    intensity: 'gentle' as const,
    feelingAfter: 'Centered, stretched, and mind at ease ♡',
    notes: 'Example movement: gentle morning flow.',
    isExample: true,
  } as ExerciseEntry,
  selfCare: {
    id: 'demo_sc_1',
    activity: 'Botanical rose face mist & gentle jade rolling',
    category: 'skincare' as const,
    completed: true,
    notes: 'Example pampering ritual.',
    isExample: true,
  } as SelfCareEntry,
  journal: {
    id: 'demo_journal_1',
    date: new Date().toISOString().slice(0, 10),
    title: 'A gentle morning & fresh lavender breeze',
    content: 'Brewed hot matcha in my favorite pastel mug. Sitting by the window watching the quiet clouds. It feels so nice to have this private sanctuary space to breathe and honor my body ♡',
    moods: ['calm', 'happy'],
    tags: ['peace', 'tea', 'gratitude'],
    isFavorite: true,
    promptUsed: 'What is bringing peace to your heart today?',
    createdAt: new Date().toISOString(),
    isExample: true,
  } as JournalEntry,
  symptom: {
    id: 'demo_sym_1',
    name: 'Mild lower back tension',
    category: 'physical' as const,
    severity: 3,
    notes: 'Example symptom: logged to observe patterns over time.',
    isExample: true,
  } as SymptomEntry,
};

// Achievements that unlock naturally as Dhruvi logs
export const defaultAchievements: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Blooming Day',
    description: 'Began your personal wellness sanctuary journey.',
    icon: '🌸',
    category: 'consistency',
    unlockedAt: null, // Starts locked until she checks in!
    progressText: 'Ready to bloom',
  },
  {
    id: 'hydration_hero',
    title: 'Hydration Angel',
    description: 'Drank 8 glasses of pure water in a single day.',
    icon: '💧',
    category: 'hydration',
    unlockedAt: null,
    progressText: '0 / 8 glasses logged today',
  },
  {
    id: 'sleep_queen',
    title: 'Sleep Royalty',
    description: 'Logged 7.5+ hours of restorative, peaceful sleep.',
    icon: '🌙',
    category: 'sleep',
    unlockedAt: null,
    progressText: 'Log your first restful night',
  },
  {
    id: 'journal_girl',
    title: 'Soulful Writer',
    description: 'Penned your thoughts in your private diary.',
    icon: '📖',
    category: 'mind',
    unlockedAt: null,
    progressText: 'Write your first journal entry',
  },
  {
    id: 'self_care_streak',
    title: 'Gentle Pampering',
    description: 'Completed your evening skincare & relaxation routine.',
    icon: '🧴',
    category: 'mind',
    unlockedAt: null,
    progressText: 'Complete your first self-care ritual',
  },
  {
    id: 'streak_7',
    title: '7-Day Wellness Journey',
    description: 'Checked in with yourself for 7 consecutive loving days.',
    icon: '💗',
    category: 'consistency',
    unlockedAt: null,
    progressText: '0 / 7 days checked in',
  },
  {
    id: 'nourishment_love',
    title: 'Mindful Nourishment',
    description: 'Logged balanced, colorful meals with joy and zero guilt.',
    icon: '🍓',
    category: 'nourishment',
    unlockedAt: null,
    progressText: 'Log your first mindful meal',
  },
  {
    id: 'cycle_harmony',
    title: 'Cycle Harmony',
    description: 'Listened closely to your body through your cycle phases.',
    icon: '✨',
    category: 'period',
    unlockedAt: null,
    progressText: 'Set your cycle start date',
  },
];

export const sampleInsights: WellnessInsight[] = [
  {
    id: 'insight_01',
    type: 'sleep_mood',
    title: 'Restful Sleep & Radiant Mood',
    description: 'Your logged patterns will show how restorative sleep elevates your morning energy and emotional calm.',
    trend: 'positive',
    confidence: 90,
    supportingMetric: 'Patterns appear after logging 3 days',
  },
  {
    id: 'insight_02',
    type: 'hydration_energy',
    title: 'Hydration & Afternoon Vitality',
    description: 'Sipping water steadily before 4 PM helps maintain vibrant afternoon focus without caffeine crashes.',
    trend: 'up',
    confidence: 92,
    supportingMetric: 'Target: 8 glasses daily',
  },
  {
    id: 'insight_03',
    type: 'movement_mood',
    title: 'Gentle Movement Harmony',
    description: 'Even 10-15 minutes of light stretching or a relaxed walk helps release muscle tension and calm the nervous system.',
    trend: 'steady',
    confidence: 95,
    supportingMetric: 'Gentle movement recommendation',
  },
];
