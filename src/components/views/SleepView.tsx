import React, { useState } from 'react';
import { Moon, Sparkles, Clock, Sun, Bed, Zap, Heart, Check } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DailyRecord, SleepEntry } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { TryItExampleCard } from '../common/TryItExampleCard';
import { tryItExamples } from '../../data/demoData';

interface SleepViewProps {
  todayRecord: DailyRecord;
  records: Record<string, DailyRecord>;
  onUpdateRecord: (updated: DailyRecord) => void;
}

export const SleepView: React.FC<SleepViewProps> = ({
  todayRecord,
  records,
  onUpdateRecord,
}) => {
  const [showDemoExample, setShowDemoExample] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const initialSleep = todayRecord.sleep || tryItExamples.sleep;

  const [bedtime, setBedtime] = useState(initialSleep.bedtime);
  const [wakeTime, setWakeTime] = useState(initialSleep.wakeTime);
  const [quality, setQuality] = useState<SleepEntry['quality']>(initialSleep.quality);
  const [nightAwakenings, setNightAwakenings] = useState(initialSleep.nightAwakenings);
  const [morningEnergy, setMorningEnergy] = useState(initialSleep.morningEnergy);
  const [sleepNotes, setSleepNotes] = useState(initialSleep.notes || '');

  const calculateDuration = (bed: string, wake: string): number => {
    const [bH, bM] = bed.split(':').map(Number);
    const [wH, wM] = wake.split(':').map(Number);
    let startMinutes = bH * 60 + bM;
    let endMinutes = wH * 60 + wM;
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // crossed midnight
    }
    return endMinutes - startMinutes;
  };

  const durationMinutes = calculateDuration(bedtime, wakeTime);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  const handleSaveSleep = () => {
    const updated: SleepEntry = {
      bedtime,
      wakeTime,
      durationMinutes,
      quality,
      nightAwakenings,
      morningEnergy,
      notes: sleepNotes.trim() || undefined,
      isExample: false, // Dhruvi's real personal sleep log!
    };
    onUpdateRecord({ ...todayRecord, sleep: updated });
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handlePreloadDemo = () => {
    setBedtime(tryItExamples.sleep.bedtime);
    setWakeTime(tryItExamples.sleep.wakeTime);
    setQuality(tryItExamples.sleep.quality);
    setNightAwakenings(tryItExamples.sleep.nightAwakenings);
    setMorningEnergy(tryItExamples.sleep.morningEnergy);
    setSleepNotes(tryItExamples.sleep.notes || '');
  };

  // Only show real historical days in chart (do not fabricate fake history)
  const realDates = Object.keys(records)
    .filter((d) => records[d].sleep && !records[d].sleep?.isExample)
    .sort()
    .slice(-7);

  const weeklyData = realDates.map((dateStr) => {
    const r = records[dateStr];
    const d = new Date(dateStr);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const durHours = r?.sleep ? (r.sleep.durationMinutes / 60).toFixed(1) : '0';
    return {
      day: dayName,
      hours: parseFloat(durHours as string),
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-purple-100/90 via-pink-100/60 to-rose-50/70 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-purple-200/70 dark:border-purple-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-purple-950 text-xs font-semibold text-purple-600 dark:text-purple-300 border border-purple-200">
              <Moon className="w-3.5 h-3.5" />
              <span>Sweet Dreams & Deep Restoration</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Dhruvi's Sleep & Rest
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-purple-200/80">
              Your body heals, balances hormones, and replenishes serenity while you sleep.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Try It Demo when no sleep logged yet */}
      {showDemoExample && (!todayRecord.sleep || todayRecord.sleep.isExample) && (
        <TryItExampleCard
          title="Try It Demo: Sleep Log"
          exampleText="8h 15m (10:30 PM to 06:45 AM) — Restful sleep, morning energy 8/10"
          subtitle="This is an interactive demonstration. Record what time you went to bed and woke up today!"
          details={[
            { label: 'Quality', value: 'Restful 🌙' },
            { label: 'Awakenings', value: '0' },
            { label: 'Morning Energy', value: '8 / 10' },
          ]}
          onEditExample={handlePreloadDemo}
          onReplaceWithMine={() => {
            setBedtime('23:00');
            setWakeTime('07:00');
          }}
          onRemoveExample={() => setShowDemoExample(false)}
          replaceButtonLabel="Log My Real Sleep"
        />
      )}

      {/* 3. Sleep Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-purple-100 dark:border-purple-950 shadow-soft text-center flex flex-col items-center justify-center">
          <span className="text-3xl">🌙</span>
          <div className="font-serif text-3xl font-bold text-gray-800 dark:text-pink-100 mt-2">
            {hours}h {minutes}m
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 capitalize">
              {quality} Quality
            </span>
            {todayRecord.sleep?.isExample ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold">
                ✨ Example
              </span>
            ) : todayRecord.sleep ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                💗 My Record
              </span>
            ) : null}
          </div>
          <span className="text-[11px] text-gray-400 mt-2">
            Bedtime {bedtime} · Woke at {wakeTime}
          </span>
          <p className="text-[10px] text-pink-500/80 mt-2 italic">
            "No worries, tonight is another fresh night of rest ♡"
          </p>
        </div>

        {/* Real Sleep Chart or Educational placeholder */}
        <div className="md:col-span-2 glass-card rounded-3xl p-5 bg-white/80 dark:bg-gray-900/70 border border-purple-100 dark:border-purple-950 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-xs font-bold text-gray-700 dark:text-pink-200 uppercase tracking-wider">
              {weeklyData.length > 0 ? 'Your Sleep Trend (Hours)' : 'Sleep Consistency Chart'}
            </h3>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
              Goal: 8.0 hrs
            </span>
          </div>

          {weeklyData.length > 0 ? (
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid #e9d5ff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.hours >= 7.5 ? '#c084fc' : '#f472b6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4">
              <span className="text-2xl mb-1">✨</span>
              <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                Your real sleep chart will blossom here
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                As you log your restful nights over time, this graph will map your personal sleep consistency and morning energy trends!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Sleep Entry Form */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-purple-100 dark:border-purple-950 shadow-soft space-y-4">
        <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-2">
          <span>🌙</span> Log Last Night's Sleep
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-purple-200 mb-1">
              Bedtime
            </label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-purple-200 mb-1">
              Wake Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-purple-200 mb-1">
              Sleep Quality
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value as SleepEntry['quality'])}
              className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
            >
              <option value="restful">Restful & Deep ✨</option>
              <option value="fair">Fair / Normal</option>
              <option value="light">Light & Waking</option>
              <option value="restless">Restless</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-purple-200 mb-1">
              Morning Energy Level: {morningEnergy} / 10
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={morningEnergy}
              onChange={(e) => setMorningEnergy(parseInt(e.target.value))}
              className="w-full h-2 bg-purple-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 mt-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-purple-200 mb-1">
            Notes / Dreams (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Listened to soft rain sounds, slept without waking..."
            value={sleepNotes}
            onChange={(e) => setSleepNotes(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/30 dark:bg-gray-800 text-gray-800 dark:text-pink-100"
          />
        </div>

        <button
          onClick={handleSaveSleep}
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-xs shadow-soft transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save as My Sleep Record ♡</span>
        </button>

        {showSavedToast && (
          <p className="text-xs text-center font-bold text-emerald-600 animate-fadeIn">
            Sleep record saved for today ♡
          </p>
        )}
      </div>
    </div>
  );
};
