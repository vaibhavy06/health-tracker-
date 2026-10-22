import React from 'react';
import { Sparkles, Heart, Trash2, ArrowRight, Check } from 'lucide-react';
import { CuteBowIcon } from './CuteIllustrations';

interface DemoModeBannerProps {
  demoMode: boolean;
  onStartFresh: () => void;
  onExploreDemo: () => void;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({
  demoMode,
  onStartFresh,
  onExploreDemo,
}) => {
  if (demoMode) {
    return (
      <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 border border-pink-300/60 dark:border-pink-900/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-fadeIn">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="w-7 h-7 rounded-xl bg-pink-100 dark:bg-pink-950/80 text-pink-600 flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="font-bold text-pink-700 dark:text-pink-300">
                ✨ Tutorial & Example Mode
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 font-semibold">
                Sample Data
              </span>
            </div>
            <p className="text-gray-600 dark:text-pink-200/80 text-[11px] mt-0.5">
              Entries are demonstration examples to show how your wellness space works. None of this is fake history.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onStartFresh}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-soft hover:shadow-soft-lg hover:from-pink-600 transition-all flex items-center gap-1.5"
            title="Clear sample entries and start fresh with real personal records"
          >
            <CuteBowIcon className="w-3.5 h-3.5" />
            <span>Start Fresh ♡</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 p-2.5 rounded-2xl bg-white/50 dark:bg-gray-900/40 border border-pink-100 dark:border-pink-950/40 backdrop-blur-sm flex items-center justify-between text-xs animate-fadeIn">
      <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-pink-200/80">
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-100 text-rose-500 text-[9px] font-bold">
          ♡
        </span>
        <span className="font-medium">
          <strong className="text-pink-600 dark:text-pink-300 font-semibold">My Sanctuary Mode:</strong> Your space is 100% real personal records.
        </span>
      </div>

      <button
        onClick={onExploreDemo}
        className="text-[11px] font-semibold text-pink-600 dark:text-pink-300 hover:text-pink-700 underline underline-offset-2 flex items-center gap-1"
      >
        <span>Explore with Example Data</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
