import React, { useState } from 'react';
import { Stethoscope, Plus, Trash2, Heart, Sparkles, Check } from 'lucide-react';
import { DailyRecord, SymptomEntry } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';

interface SymptomsViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const SymptomsView: React.FC<SymptomsViewProps> = ({
  todayRecord,
  onUpdateRecord,
}) => {
  const [selectedName, setSelectedName] = useState('Cramps');
  const [category, setCategory] = useState<'physical' | 'emotional'>('physical');
  const [severity, setSeverity] = useState(4);
  const [notes, setNotes] = useState('');

  const physicalOptions = [
    'Cramps',
    'Headache',
    'Back pain',
    'Bloating',
    'Fatigue',
    'Nausea',
    'Acne',
    'Breast tenderness',
    'Joint stiffness',
  ];

  const emotionalOptions = [
    'Anxiety',
    'Irritability',
    'Sadness',
    'Low motivation',
    'Emotional sensitivity',
    'Mental fatigue',
    'Stress tension',
  ];

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();

    const newSymptom: SymptomEntry = {
      id: `sym_${Date.now()}`,
      name: selectedName,
      category,
      severity,
      notes: notes.trim() || undefined,
    };

    onUpdateRecord({
      ...todayRecord,
      symptoms: [...todayRecord.symptoms, newSymptom],
    });

    setNotes('');
  };

  const handleRemove = (id: string) => {
    onUpdateRecord({
      ...todayRecord,
      symptoms: todayRecord.symptoms.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-rose-100/90 via-pink-100/60 to-purple-50/70 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-rose-600 dark:text-rose-300 border border-rose-200">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Body & Soul Listening</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
            Gentle Symptom Log
            <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
            Listening to what your body needs without judgment.
          </p>
        </div>
      </div>

      {/* 2. Symptom Logger Card */}
      <form
        onSubmit={handleAddSymptom}
        className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft space-y-4"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setCategory('physical');
              setSelectedName(physicalOptions[0]);
            }}
            className={`flex-1 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              category === 'physical'
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-pink-50/50 dark:bg-gray-800 border-pink-100 text-gray-600 dark:text-pink-200'
            }`}
          >
            🌸 Physical Sensations
          </button>
          <button
            type="button"
            onClick={() => {
              setCategory('emotional');
              setSelectedName(emotionalOptions[0]);
            }}
            className={`flex-1 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              category === 'emotional'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-pink-50/50 dark:bg-gray-800 border-pink-100 text-gray-600 dark:text-pink-200'
            }`}
          >
            ✨ Emotional Sensations
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-2">
            Select Sensation:
          </label>
          <div className="flex flex-wrap gap-2">
            {(category === 'physical' ? physicalOptions : emotionalOptions).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedName(opt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  selectedName === opt
                    ? 'bg-pink-500 text-white border-pink-500 shadow-sm font-semibold'
                    : 'bg-pink-50/40 dark:bg-gray-800 border-pink-100 text-gray-700 dark:text-pink-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Slider */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-pink-200">
              Severity Level:
            </label>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-300">
              {severity} / 10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            className="w-full h-2 bg-pink-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>1 · Barely noticeable</span>
            <span>5 · Noticeable</span>
            <span>10 · Severe (Rest needed)</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
            Notes & Comforting remedies used:
          </label>
          <input
            type="text"
            placeholder="e.g. Applied warm heat pad, drank ginger peppermint tea..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/30 dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 text-white font-semibold text-xs shadow-soft transition-all"
        >
          Add to Sensation Log ♡
        </button>
      </form>

      {/* 3. Logged Symptoms List */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 mb-3">
          Logged Sensations Today ({todayRecord.symptoms.length})
        </h3>

        {todayRecord.symptoms.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-4">
            No physical or emotional symptoms logged today. Feeling comfortable ♡
          </p>
        ) : (
          <div className="space-y-2">
            {todayRecord.symptoms.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-2xl bg-pink-50/50 dark:bg-gray-800/60 border border-pink-100 dark:border-pink-900 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-gray-800 dark:text-pink-100">
                    {s.name}
                  </span>
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                    Severity {s.severity}/10
                  </span>
                  {s.notes && (
                    <p className="text-[11px] text-gray-500 italic mt-0.5">{s.notes}</p>
                  )}
                </div>

                <button
                  onClick={() => handleRemove(s.id)}
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
