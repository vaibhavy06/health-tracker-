import React, { useState } from 'react';
import { Lock, KeyRound, X, Check, Trash2 } from 'lucide-react';
import { CuteBowIcon } from './CuteIllustrations';

interface PinLockModalProps {
  currentPin: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSetPin: (pin: string | null) => void;
}

export const PinLockModal: React.FC<PinLockModalProps> = ({
  currentPin,
  isOpen,
  onClose,
  onSetPin,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'enter' | 'create' | 'confirm'>('create');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (pinInput.length !== 4) {
      setError('Please enter a 4-digit PIN ♡');
      return;
    }
    if (pinInput !== confirmPin) {
      setError('PIN numbers do not match');
      return;
    }
    onSetPin(pinInput);
    onClose();
  };

  const handleRemove = () => {
    onSetPin(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-pink-100 dark:border-pink-950 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-pink-100 flex items-center justify-center gap-1.5">
            Private Sanctuary Lock
            <CuteBowIcon className="w-4 h-4 text-pink-500" />
          </h3>
          <p className="text-xs text-gray-500 dark:text-pink-300/80 mt-1">
            {currentPin
              ? 'Your wellness sanctuary is protected with a 4-digit PIN.'
              : 'Add a 4-digit PIN to keep your journal & cycle data completely private.'}
          </p>
        </div>

        {currentPin ? (
          <div className="space-y-4">
            <div className="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-2xl border border-pink-200 dark:border-pink-900 text-center">
              <span className="text-xs font-semibold text-pink-700 dark:text-pink-300">
                Status: Protected (● ● ● ●)
              </span>
            </div>
            <button
              onClick={handleRemove}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 border border-rose-200 dark:border-rose-900 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Remove Privacy PIN
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Enter 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="● ● ● ●"
                className="w-full text-center text-xl tracking-widest px-4 py-2.5 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-pink-200 mb-1">
                Confirm 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => {
                  setConfirmPin(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="● ● ● ●"
                className="w-full text-center text-xl tracking-widest px-4 py-2.5 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50/40 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {error && <p className="text-xs text-rose-500 text-center">{error}</p>}

            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-xs shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Privacy PIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
