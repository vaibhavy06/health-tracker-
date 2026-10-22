import React, { useState } from 'react';
import { Smile, Sparkles, Heart, MessageSquare, Plus, Check, Trash2, Edit2 } from 'lucide-react';
import { DailyRecord, MoodEntry, MoodType } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface MoodViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const MoodView: React.FC<MoodViewProps> = ({ todayRecord, onUpdateRecord }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('calm');
  const [intensity, setIntensity] = useState(8);
  const [reason, setReason] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showDemoExample, setShowDemoExample] = useState(true);

  const moodsList: { id: MoodType; label: string; emoji: string; color: string }[] = [
    { id: 'great', label: 'Great', emoji: '😊', color: 'bg-emerald-100 text-emerald-700' },
    { id: 'happy', label: 'Happy', emoji: '🙂', color: 'bg-amber-100 text-amber-700' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'bg-sky-100 text-sky-700' },
    { id: 'loved', label: 'Loved', emoji: '🥰', color: 'bg-rose-100 text-rose-700' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
    { id: 'sad', label: 'Sad', emoji: '😔', color: 'bg-blue-100 text-blue-700' },
    { id: 'stressed', label: 'Stressed', emoji: '😣', color: 'bg-orange-100 text-orange-700' },
    { id: 'irritated', label: 'Irritated', emoji: '😡', color: 'bg-red-100 text-red-700' },
    { id: 'emotional', label: 'Emotional', emoji: '😭', color: 'bg-purple-100 text-purple-700' },
    { id: 'exhausted', label: 'Exhausted', emoji: '😴', color: 'bg-indigo-100 text-indigo-700' },
  ];

  const handleAddMoodEntry = (e: React.FormEvent) => {
    e.preventDefault();

    const newMood: MoodEntry = {
      id: `mood_${Date.now()}`,
      mood: selectedMood,
      intensity,
      reason: reason.trim() || undefined,
      loggedAt: new Date().toISOString(),
      isExample: false, // Dhruvi's real personal record!
    };

    onUpdateRecord({
      ...todayRecord,
      moods: [newMood, ...todayRecord.moods.filter((m) => !m.isExample)],
    });

    setReason('');
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleRemoveMood = (id: string) => {
    onUpdateRecord({
      ...todayRecord,
      moods: todayRecord.moods.filter((m) => m.id !== id),
    });
  };

  const handlePreloadExample = () => {
    setSelectedMood(tryItExamples.mood.mood);
    setIntensity(tryItExamples.mood.intensity);
    setReason(tryItExamples.mood.reason || '');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-amber-100/90 via-pink-100/70 to-rose-100/70 dark:from-amber-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
            <Heart className="w-3.5 h-3.5" />
            <span>Heart & Feelings</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            How are you feeling today, Dhruvi?
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
            Every emotion you experience is valid and welcomed here with gentle warmth.
          </p>
        </div>
      </div>

      {/* 2. Try It Demo when empty */}
      {showDemoExample && todayRecord.moods.length === 0 && (
        <TryItExampleCard
          title="Try It Demo: Heart & Mood Check-In"
          exampleText="Calm (8/10) — Morning balcony breeze with warm vanilla tea ♡"
          subtitle="This is an interactive example showing how mood reflections appear. Log how your heart feels right now!"
          details={[
            { label: 'Emotion', value: 'Calm 😌' },
            { label: 'Intensity', value: '8 / 10' },
          ]}
          onEditExample={handlePreloadExample}
          onReplaceWithMine={() => {
            setSelectedMood('happy');
            setIntensity(8);
            setReason('');
          }}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Log My Real Mood"
        />
      )}

      {/* 3. Mood Selection Grid */}
      <form
        onSubmit={handleAddMoodEntry}
        className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-5"
      >
        <div>
          <label className="block font-serif text-sm font-bold text-gray-800 dark:text-pink-100 mb-3">
            Choose What Resonates Right Now ♡
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {moodsList.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 group ${
                    isSelected
                      ? 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white border-pink-500 shadow-soft font-bold scale-[1.03]'
                      : 'bg-pink-50/40 dark:bg-gray-800/50 border-pink-100 dark:border-pink-900 text-gray-700 dark:text-pink-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">
                    {m.emoji}
                  </span>
                  <span className="text-xs">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emotion Intensity Slider */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-pink-200">
              Intensity:
            </label>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-300">
              {intensity} / 10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-pink-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Reflection Note */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1.5">
            What made today feel this way? (Optional reflection)
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Quiet morning reading, comforting meal, warm hug, taking time for myself..."
            className="w-full text-xs md:text-sm p-3 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Today's Mood Entry ♡</span>
        </button>

        {showSavedToast && (
          <p className="text-xs text-center font-bold text-emerald-600 animate-fadeIn">
            Mood saved gently to your heart journal ♡
          </p>
        )}
      </form>

      {/* 4. Today's Logged Moods */}
      {todayRecord.moods.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-serif text-sm font-bold text-gray-800 dark:text-pink-100 px-1">
            Logged Today
          </h3>
          <div className="space-y-2">
            {todayRecord.moods.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 shadow-sm ${
                  entry.isExample
                    ? 'bg-pink-50/50 border-pink-200 border-dashed dark:bg-pink-950/20'
                    : 'bg-white/80 dark:bg-gray-800/80 border-pink-100 dark:border-pink-900/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {moodsList.find((m) => m.id === entry.mood)?.emoji || '🌸'}
                    </span>
                    <span className="font-serif font-bold text-sm text-gray-800 dark:text-pink-100 capitalize">
                      {entry.mood}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 font-semibold">
                      {entry.intensity}/10 intensity
                    </span>
                    {entry.isExample ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold">
                        ✨ Example
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        💗 My Record
                      </span>
                    )}
                  </div>
                  {entry.reason && (
                    <p className="text-xs text-gray-600 dark:text-pink-200/80 mt-1 italic">
                      "{entry.reason}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveMood(entry.id)}
                  className="p-1.5 text-gray-300 hover:text-rose-500 transition-colors"
                  title="Remove mood"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
