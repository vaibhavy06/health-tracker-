import React from 'react';
import { ShieldCheck, Heart, AlertCircle, X, PhoneCall } from 'lucide-react';
import { CuteBowIcon } from './CuteIllustrations';

interface HealthSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthSafetyModal: React.FC<HealthSafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 dark:border-pink-950 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100 flex items-center gap-1.5">
              Health & Safety Guide
              <CuteBowIcon className="w-4 h-4 text-pink-500" />
            </h3>
            <p className="text-xs text-gray-500 dark:text-pink-300/80">
              A caring note on your personal well-being
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-gray-600 dark:text-pink-200/90 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-pink-50/70 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900 flex items-start gap-3">
            <Heart className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-pink-900 dark:text-pink-200">
                A Loving Digital Wellness Space
              </p>
              <p className="mt-0.5">
                Dhruvi's Sanctuary is thoughtfully crafted for private self-care, daily habits, period organization, and mindful reflection. It does not replace medical advice or clinical evaluation.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                Cycle Estimates & Insights
              </p>
              <p className="mt-0.5">
                All menstrual cycle days, phases, and fertile windows are statistical estimates based on your logged history. Bodies naturally vary from month to month due to stress, sleep, travel, and nutrition.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200">
                When to Seek Professional Care
              </p>
              <p className="mt-0.5">
                If you experience unusually severe menstrual pain, sudden unexplained symptoms, irregular bleeding, or emotional distress, please consult a trusted doctor, gynecologist, or healthcare professional.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all"
          >
            I Understand ♡ Take Me Back
          </button>
        </div>
      </div>
    </div>
  );
};
