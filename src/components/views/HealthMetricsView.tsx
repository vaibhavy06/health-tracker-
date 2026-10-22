import React, { useState } from 'react';
import { Flame, Plus, Heart, Sparkles, TrendingUp, Activity, Thermometer } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { HealthMetricEntry } from '../../types';
import { CuteBowIcon } from '../common/CuteIllustrations';
import { formatShortDate, getTodayDateString } from '../../services/storage';

interface HealthMetricsViewProps {
  metrics: HealthMetricEntry[];
  onSaveMetric: (entry: HealthMetricEntry) => void;
}

export const HealthMetricsView: React.FC<HealthMetricsViewProps> = ({
  metrics,
  onSaveMetric,
}) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'steps' | 'weight' | 'heartRate'>('steps');
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [steps, setSteps] = useState(7200);
  const [weight, setWeight] = useState(52.5);
  const [restingHeartRate, setRestingHeartRate] = useState(68);
  const [temperature, setTemperature] = useState(36.6);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: HealthMetricEntry = {
      id: `metric_${Date.now()}`,
      date: getTodayDateString(),
      steps,
      weight,
      restingHeartRate,
      temperature,
    };

    onSaveMetric(newEntry);
    setIsAdding(false);
  };

  const chartData = metrics.slice(-14).map((m) => ({
    date: formatShortDate(m.date),
    steps: m.steps || 0,
    weight: m.weight || 0,
    heartRate: m.restingHeartRate || 0,
  }));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="glass-card rounded-3xl p-6 bg-gradient-to-r from-rose-100/90 via-pink-100/60 to-purple-100/70 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-gray-900/40 border border-pink-200/70 dark:border-pink-900/40 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-pink-950 text-xs font-semibold text-rose-600 dark:text-rose-300 border border-rose-200">
              <Flame className="w-3.5 h-3.5" />
              <span>Personal Health Overview</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center sm:justify-start gap-2">
              Body & Vitality Vitals
              <CuteBowIcon className="w-5 h-5 text-pink-500 inline-block" />
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-pink-200/80">
              Completely optional metrics. Track only what brings you joy and awareness.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft flex items-center gap-2 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Today's Reading</span>
          </button>
        </div>
      </div>

      {/* 2. Add New Metric Form */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="glass-card rounded-3xl p-6 bg-white/90 dark:bg-gray-900/90 border border-pink-200 dark:border-pink-900 shadow-soft-lg space-y-4"
        >
          <h3 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100">
            Log Optional Vitals ♡
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Steps
              </label>
              <input
                type="number"
                value={steps}
                onChange={(e) => setSteps(parseInt(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Resting Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(parseInt(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Save Vitals
            </button>
          </div>
        </form>
      )}

      {/* 3. Metric Switcher Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveMetricTab('steps')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeMetricTab === 'steps'
              ? 'bg-pink-500 text-white shadow-soft'
              : 'glass-card bg-white/70 dark:bg-gray-800 text-gray-600 dark:text-pink-200'
          }`}
        >
          Daily Steps
        </button>
        <button
          onClick={() => setActiveMetricTab('weight')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeMetricTab === 'weight'
              ? 'bg-pink-500 text-white shadow-soft'
              : 'glass-card bg-white/70 dark:bg-gray-800 text-gray-600 dark:text-pink-200'
          }`}
        >
          Weight Trends
        </button>
        <button
          onClick={() => setActiveMetricTab('heartRate')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeMetricTab === 'heartRate'
              ? 'bg-pink-500 text-white shadow-soft'
              : 'glass-card bg-white/70 dark:bg-gray-800 text-gray-600 dark:text-pink-200'
          }`}
        >
          Resting Heart Rate
        </button>
      </div>

      {/* 4. Chart Display */}
      <div className="glass-card rounded-3xl p-6 bg-white/80 dark:bg-gray-900/70 border border-pink-100 dark:border-pink-950 shadow-soft">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fbcfe8" opacity={0.3} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '16px',
                  border: '1px solid #fbcfe8',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey={
                  activeMetricTab === 'steps'
                    ? 'steps'
                    : activeMetricTab === 'weight'
                    ? 'weight'
                    : 'heartRate'
                }
                stroke="#ee4f7c"
                strokeWidth={3}
                dot={{ fill: '#ee4f7c', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
