import React, { useState } from 'react';
import { X, Volume2, VolumeX, Smartphone, Palette, CircleDot, AlertTriangle } from 'lucide-react';
import { playBellSound, playClickSound } from '../utils/sound';

export function SettingsSheet({
  isOpen,
  onClose,
  malaSize = 108,
  onChangeMalaSize,
  soundMode = 'off',
  onChangeSoundMode,
  vibrationEnabled = true,
  onToggleVibration,
  theme = 'light',
  onChangeTheme,
  onClearAllData,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const testSound = (mode) => {
    if (mode === 'bell') playBellSound();
    if (mode === 'click') playClickSound();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border border-[var(--border-line)] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto space-y-6">
        {/* Handle for mobile */}
        <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-2 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)]">
          <div>
            <h3 className="text-lg font-devanagari font-semibold text-[var(--text-main)]">
              सेटिंग्स (प्राथमिकताएं)
            </h3>
            <p className="text-xs font-devanagari text-[var(--text-muted)]">
              अपनी साधना के अनुसार अनुकूलित करें
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mala Size */}
        <div className="space-y-2">
          <label className="text-xs font-devanagari font-medium text-[var(--text-muted)] flex items-center gap-1.5">
            <CircleDot className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
            <span>माला का आकार (मनके)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[108, 54, 27].map((size) => (
              <button
                key={size}
                onClick={() => onChangeMalaSize(size)}
                className={`py-2.5 px-3 rounded-xl text-center border font-editorial transition-all tap-bounce ${
                  malaSize === size
                    ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/40 text-saffron-700 dark:text-saffron-300 font-semibold shadow-sm'
                    : 'border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-saffron-300'
                }`}
              >
                <div className="text-lg">{size}</div>
                <div className="text-[10px] font-devanagari text-[var(--text-muted)]">
                  {size === 108 ? 'पूर्ण माला' : size === 54 ? 'अर्ध माला' : 'सुमिरनी'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sound Settings */}
        <div className="space-y-2">
          <label className="text-xs font-devanagari font-medium text-[var(--text-muted)] flex items-center gap-1.5">
            {soundMode === 'off' ? (
              <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />
            ) : (
              <Volume2 className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
            )}
            <span>ध्वनि (Audio Feedback)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'off', label: 'बंद (Off)', sub: 'शांत' },
              { id: 'bell', label: 'सौम्य घंटी', sub: 'Temple Bell' },
              { id: 'click', label: 'काष्ठ क्लिक', sub: 'Wood Knock' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeSoundMode(item.id);
                  testSound(item.id);
                }}
                className={`py-2 px-2 rounded-xl text-center border font-devanagari text-xs transition-all tap-bounce ${
                  soundMode === item.id
                    ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/40 text-saffron-700 dark:text-saffron-300 font-semibold shadow-sm'
                    : 'border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)]'
                }`}
              >
                <div>{item.label}</div>
                <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Vibration Haptic Setting */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)]">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
            <div>
              <div className="text-sm font-devanagari font-medium text-[var(--text-main)]">
                कंपन (Vibration)
              </div>
              <div className="text-[10px] font-devanagari text-[var(--text-muted)]">
                प्रत्येक जप पर सूक्ष्म स्पर्श अनुभव
              </div>
            </div>
          </div>
          <button
            onClick={() => onToggleVibration(!vibrationEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              vibrationEnabled ? 'bg-saffron-600' : 'bg-[var(--border-line)]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Theme Setting */}
        <div className="space-y-2">
          <label className="text-xs font-devanagari font-medium text-[var(--text-muted)] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
            <span>रंग रूप (Theme)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'हस्तनिर्मित कागज़', sub: 'Warm Ivory' },
              { id: 'dark', label: 'संध्या दीप', sub: 'Temple Night' },
              { id: 'sandalwood', label: 'चंदन', sub: 'Sandalwood' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onChangeTheme(t.id)}
                className={`py-2 px-2 rounded-xl text-center border font-devanagari text-xs transition-all tap-bounce ${
                  theme === t.id
                    ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/40 text-saffron-700 dark:text-saffron-300 font-semibold shadow-sm'
                    : 'border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)]'
                }`}
              >
                <div>{t.label}</div>
                <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{t.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Data Section */}
        <div className="pt-4 border-t border-[var(--border-line)]">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-devanagari text-red-600 dark:text-red-400 hover:underline"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>सभी डेटा और इतिहास मिटाएं</span>
          </button>
        </div>

        {/* Clear Data Confirmation Dialog */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-[var(--bg-canvas)] border border-[var(--border-line)] rounded-2xl p-6 max-w-xs w-full shadow-2xl">
              <h4 className="text-base font-devanagari font-semibold text-[var(--text-main)] text-center">
                सभी डेटा मिटाएं?
              </h4>
              <p className="text-xs font-devanagari text-[var(--text-muted)] text-center mt-2">
                आपकी संपूर्ण साधना का इतिहास, सेटिंग्स और कस्टम मंत्र हटा दिए जाएंगे।
              </p>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => {
                    onClearAllData();
                    setShowClearConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 text-white font-devanagari text-xs font-medium"
                >
                  हाँ, सब मिटाएं
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-line)] text-[var(--text-muted)] font-devanagari text-xs"
                >
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
