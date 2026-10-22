import React from 'react';
import { Sparkles, Edit2, Plus, Trash2, Heart } from 'lucide-react';
import { CuteBowIcon } from './CuteIllustrations';

interface TryItExampleCardProps {
  title: string;
  subtitle?: string;
  exampleText: string;
  categoryLabel?: string;
  details?: { label: string; value: string }[];
  onEditExample?: () => void;
  onReplaceWithMine: () => void;
  onRemoveExample?: () => void;
  replaceButtonLabel?: string;
}

export const TryItExampleCard: React.FC<TryItExampleCardProps> = ({
  title,
  subtitle = 'This is an example entry. Replace it with your own.',
  exampleText,
  categoryLabel = '✨ Demonstration',
  details = [],
  onEditExample,
  onReplaceWithMine,
  onRemoveExample,
  replaceButtonLabel = 'Replace with My Entry',
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-5 border-2 border-dashed border-pink-300/80 dark:border-pink-800/60 bg-gradient-to-br from-pink-50/70 via-rose-50/40 to-purple-50/40 dark:from-pink-950/20 dark:via-rose-950/10 dark:to-gray-900/40 shadow-sm transition-all hover:border-pink-400">
      {/* Example Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/80 text-[11px] font-bold text-pink-700 dark:text-pink-300 border border-pink-200/60">
          <Sparkles className="w-3 h-3 text-pink-500" />
          <span>✨ Example / Try It</span>
        </div>

        {onRemoveExample && (
          <button
            type="button"
            onClick={onRemoveExample}
            className="text-[11px] text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
            title="Remove sample demonstration"
          >
            <Trash2 className="w-3 h-3" />
            <span>Remove Example</span>
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <h4 className="font-serif text-base font-bold text-gray-800 dark:text-pink-100 flex items-center gap-1.5">
          {title}
          <CuteBowIcon className="w-4 h-4 text-pink-400 inline-block" />
        </h4>
        <p className="text-xs text-pink-800/80 dark:text-pink-200/90 font-medium italic">
          "{exampleText}"
        </p>
        <p className="text-[11px] text-gray-500 dark:text-pink-300/70">
          {subtitle}
        </p>
      </div>

      {details.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-pink-200/50 dark:border-pink-900/30">
          {details.map((d, i) => (
            <div
              key={i}
              className="px-2.5 py-1 rounded-xl bg-white/70 dark:bg-gray-800/80 text-[11px] text-gray-700 dark:text-pink-200 border border-pink-100 dark:border-pink-900/40"
            >
              <span className="text-gray-400 dark:text-pink-400 mr-1">{d.label}:</span>
              <span className="font-semibold">{d.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button
          type="button"
          onClick={onReplaceWithMine}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-1.5"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>{replaceButtonLabel} ♡</span>
        </button>

        {onEditExample && (
          <button
            type="button"
            onClick={onEditExample}
            className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-pink-200 border border-pink-200 dark:border-pink-800 text-xs font-medium hover:bg-pink-50 transition-all flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Example</span>
          </button>
        )}
      </div>
    </div>
  );
};
