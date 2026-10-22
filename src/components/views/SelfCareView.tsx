import React, { useState } from 'react';
import { HeartHandshake, Sparkles, Check, Heart, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyRecord } from '../../types';
import { SkincareIllustration, CuteTeacupIllustration, CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface SelfCareViewProps {
  todayRecord: DailyRecord;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const SelfCareView: React.FC<SelfCareViewProps> = ({
  todayRecord,
  onUpdateRecord,
}) => {
  const [showDemoExample, setShowDemoExample] = useState(true);

  const defaultSelfCareItems = [
    { id: 'sc_skin', title: 'Skincare routine & gentle massage', icon: '🧴', category: 'skincare' },
    { id: 'sc_shower', title: 'Warm comforting shower or bath', icon: '🚿', category: 'body' },
    { id: 'sc_teeth', title: 'Floss & clean teeth mindfully', icon: '🪥', category: 'body' },
    { id: 'sc_hair', title: 'Brush & oil hair gently', icon: '💇‍♀️', category: 'body' },
    { id: 'sc_nails', title: 'Nail care & hydrating hand lotion', icon: '💅', category: 'body' },
    { id: 'sc_meditate', title: '10-minute quiet meditation / breathwork', icon: '🧘‍♀️', category: 'mind' },
    { id: 'sc_reading', title: 'Read chapters of an inspiring book', icon: '📖', category: 'mind' },
    { id: 'sc_journal', title: 'Write heartfelt thoughts in diary', icon: '📝', category: 'mind' },
    { id: 'sc_quiet', title: 'Silent phone downtime without screens', icon: '🌸', category: 'cozy' },
    { id: 'sc_music', title: 'Listen to soothing acoustic / lofi tunes', icon: '🎵', category: 'cozy' },
    { id: 'sc_tea', title: 'Steaming hot herbal chamomile tea', icon: '☕', category: 'cozy' },
    { id: 'sc_bed', title: 'Cozy blankets & early lights-out', icon: '😴', category: 'rest' },
  ];

  const completedMap = new Set(
    todayRecord.selfCare.filter((s) => s.completed).map((s) => s.activity)
  );

  const completedCount = defaultSelfCareItems.filter((item) =>
    completedMap.has(item.title)
  ).length;

  const totalCount = defaultSelfCareItems.length;
  const selfCareScore = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (title: string, category: string) => {
    let updated = [...todayRecord.selfCare];
    const existingIndex = updated.findIndex((s) => s.activity === title);

    if (existingIndex >= 0) {
      const willBeCompleted = !updated[existingIndex].completed;
      updated[existingIndex] = {
        ...updated[existingIndex],
        completed: willBeCompleted,
        isExample: false,
      };

      if (willBeCompleted) {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#f472b6', '#fb7185', '#e9d5ff'],
        });
      }
    } else {
      updated.push({
        id: `sc_${Date.now()}`,
        activity: title,
        category: category as any,
        completed: true,
        isExample: false,
      });
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#f472b6', '#fb7185', '#e9d5ff'],
      });
    }

    onUpdateRecord({ ...todayRecord, selfCare: updated });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-pink-100/90 via-rose-100/60 to-purple-100/70 dark:from-pink-950/40 dark:via-purple-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-pink-600 dark:text-pink-300 border border-pink-200">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Loving Self-Pampering</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Self-Care Rituals
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Filling your own cup first so you can radiate with peace and grace.
            </p>
          </div>

          {/* Self-Care Score Dial */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-4 shadow-soft border border-pink-200 dark:border-pink-900 text-center shrink-0 min-w-[150px]">
            <span className="text-[11px] font-bold text-pink-600 dark:text-pink-300 uppercase tracking-wider block">
              Self-Care Score
            </span>
            <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100 mt-1">
              {selfCareScore}%
            </div>
            <span className="text-[10px] text-gray-400">
              {completedCount} of {totalCount} pampering rituals
            </span>
          </div>
        </div>
      </div>

      {/* 2. Try It Demo when no rituals completed yet */}
      {showDemoExample && completedCount === 0 && (
        <TryItExampleCard
          title="Try It Demo: Self-Care Ritual"
          exampleText="Botanical rose face mist & gentle jade rolling — Skincare & relaxation"
          subtitle="This is an interactive demonstration. Tap any ritual below to treat yourself today!"
          details={[
            { label: 'Category', value: 'Skincare 🧴' },
            { label: 'Feeling', value: 'Pampered & calm ♡' },
          ]}
          onReplaceWithMine={() => handleToggle('Skincare routine & gentle massage', 'skincare')}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Check Off a Ritual"
        />
      )}

      {/* 3. Self-Care Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {defaultSelfCareItems.map((item) => {
          const isDone = completedMap.has(item.title);
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.title, item.category)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-pink-100/70 dark:bg-pink-950/60 border-pink-300 dark:border-pink-800 text-pink-800 dark:text-pink-200 shadow-sm'
                  : 'bg-white/80 dark:bg-gray-800/80 border-pink-100 dark:border-pink-900/40 text-gray-700 dark:text-pink-100 hover:border-pink-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <span className="text-xs font-semibold truncate">{item.title}</span>
              </div>

              <div
                className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
                  isDone
                    ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                    : 'border-pink-300 dark:border-pink-700'
                }`}
              >
                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
