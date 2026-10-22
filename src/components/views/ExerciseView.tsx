import React, { useState } from 'react';
import { Activity, Plus, Trash2, Heart, Sparkles, Clock, Smile, Check } from 'lucide-react';
import { DailyRecord, ExerciseEntry } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface ExerciseViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  todayRecord,
  onUpdateRecord,
}) => {
  const [showDemoExample, setShowDemoExample] = useState(true);
  const [activityType, setActivityType] = useState<ExerciseEntry['activityType']>('yoga');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [intensity, setIntensity] = useState<ExerciseEntry['intensity']>('gentle');
  const [feelingAfter, setFeelingAfter] = useState('Relaxed, light & refreshed ♡');

  const activities: { id: ExerciseEntry['activityType']; label: string; icon: string }[] = [
    { id: 'walking', label: 'Brisk Walk', icon: '🚶‍♀️' },
    { id: 'yoga', label: 'Yoga & Flow', icon: '🧘‍♀️' },
    { id: 'stretching', label: 'Gentle Stretch', icon: '✨' },
    { id: 'pilates', label: 'Mat Pilates', icon: '🩰' },
    { id: 'gym', label: 'Strength Gym', icon: '🏋️‍♀️' },
    { id: 'dance', label: 'Joyful Dance', icon: '💃' },
    { id: 'cycling', label: 'Cycling', icon: '🚲' },
    { id: 'running', label: 'Light Jog', icon: '🏃‍♀️' },
    { id: 'home_workout', label: 'Home Workout', icon: '🏠' },
  ];

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: ExerciseEntry = {
      id: `ex_${Date.now()}`,
      activityType,
      durationMinutes,
      intensity,
      feelingAfter,
      isExample: false, // Dhruvi's real personal movement log!
    };

    onUpdateRecord({
      ...todayRecord,
      exercises: [...todayRecord.exercises, newEntry],
    });
  };

  const handleRemove = (id: string) => {
    onUpdateRecord({
      ...todayRecord,
      exercises: todayRecord.exercises.filter((e) => e.id !== id),
    });
  };

  const handlePreloadDemo = () => {
    setActivityType(tryItExamples.exercise.activityType);
    setDurationMinutes(tryItExamples.exercise.durationMinutes);
    setIntensity(tryItExamples.exercise.intensity);
    setFeelingAfter(tryItExamples.exercise.feelingAfter);
  };

  const totalMinutes = todayRecord.exercises.reduce((sum, e) => sum + e.durationMinutes, 0);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-emerald-100/90 via-pink-100/60 to-rose-50/70 dark:from-emerald-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-emerald-200/70 dark:border-emerald-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-emerald-950 text-xs font-semibold text-emerald-600 dark:text-emerald-300 border border-emerald-200">
            <Activity className="w-3.5 h-3.5" />
            <span>Gentle Joyful Movement</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            Movement That Feels Good, Dhruvi
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-emerald-200/80">
            Moving to celebrate what your body can do, never to punish it.
          </p>
        </div>
      </div>

      {/* 2. Try It Demo when empty */}
      {showDemoExample && todayRecord.exercises.length === 0 && (
        <TryItExampleCard
          title="Try It Demo: Gentle Movement"
          exampleText="20 minutes Yoga & Flow — Centered, stretched, and mind at ease ♡"
          subtitle="This is an interactive example showing how logged movement looks. Log your walk, stretch, or dance today!"
          details={[
            { label: 'Activity', value: 'Yoga 🧘‍♀️' },
            { label: 'Duration', value: '20 mins' },
            { label: 'Intensity', value: 'Gentle' },
          ]}
          onEditExample={handlePreloadDemo}
          onReplaceWithMine={() => {
            setActivityType('walking');
            setDurationMinutes(20);
          }}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Log My Real Movement"
        />
      )}

      {/* 3. Add Movement Form */}
      <form
        onSubmit={handleAddExercise}
        className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-2">
            Choose Gentle Activity:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {activities.map((act) => {
              const isSelected = activityType === act.id;
              return (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => setActivityType(act.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white border-emerald-500 shadow-soft font-bold'
                      : 'bg-pink-50/40 dark:bg-gray-800 border-pink-100 text-gray-700 dark:text-pink-200'
                  }`}
                >
                  <span className="text-xl">{act.icon}</span>
                  <span className="text-[11px] truncate w-full">{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              Duration: <span className="font-bold text-emerald-600">{durationMinutes} minutes</span>
            </label>
            <input
              type="range"
              min={5}
              max={90}
              step={5}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
              className="w-full h-2 bg-emerald-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-2"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
              Intensity Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['gentle', 'moderate', 'energizing'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setIntensity(lvl)}
                  className={`py-1.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                    intensity === lvl
                      ? 'bg-emerald-500 text-white border-emerald-500 font-bold'
                      : 'bg-emerald-50/40 dark:bg-gray-800 border-emerald-100 text-gray-600 dark:text-pink-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
            How did your body feel afterward?
          </label>
          <input
            type="text"
            value={feelingAfter}
            onChange={(e) => setFeelingAfter(e.target.value)}
            placeholder="e.g. Light, grounded, energizing glow..."
            className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 text-white font-semibold text-xs shadow-soft transition-all"
        >
          Save to My Movement Log ♡
        </button>
      </form>

      {/* 4. Logged Movements List */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
            Today's Movement ({totalMinutes} mins total)
          </h3>
          <span className="text-xs text-emerald-600 font-semibold">
            {todayRecord.exercises.length} sessions
          </span>
        </div>

        {todayRecord.exercises.length === 0 ? (
          <div className="text-center py-4 space-y-1">
            <p className="text-xs text-gray-400 italic">
              No movement logged yet today. Rest days are sacred too ♡
            </p>
            <p className="text-[11px] text-pink-500/80 italic">
              "No worries, tomorrow is another fresh start ♡"
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayRecord.exercises.map((ex) => (
              <div
                key={ex.id}
                className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-gray-800/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800 dark:text-pink-100 capitalize">
                      {ex.activityType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      {ex.durationMinutes} mins · {ex.intensity}
                    </span>
                    {ex.isExample ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold">
                        ✨ Example
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        💗 My Movement
                      </span>
                    )}
                  </div>
                  {ex.feelingAfter && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1 italic">
                      "{ex.feelingAfter}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleRemove(ex.id)}
                  className="text-gray-300 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
