import React from 'react';
import { RotateCcw } from 'lucide-react';

export function CompletionModal({
  isOpen,
  malaSize = 108,
  completedMalas = 1,
  selectedMantra = 'श्री राम',
  onNextMala,
  onUndo
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-sm bg-[var(--bg-canvas)] border border-[var(--border-line)] rounded-3xl p-8 text-center shadow-2xl space-y-6">
        {/* Sacred Blessing Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-saffron-50 dark:bg-saffron-950/50 flex items-center justify-center border border-saffron-200 dark:border-saffron-900/50">
          <span className="text-3xl select-none" role="img" aria-label="हाथ जोड़े">
            🙏
          </span>
        </div>

        {/* Devotional Completion Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-devanagari font-semibold text-[var(--text-main)]">
            एक माला पूर्ण हुई
          </h2>
          <p className="text-base font-devanagari text-saffron-700 dark:text-saffron-400 font-medium">
            {selectedMantra}
          </p>
          <p className="text-sm font-devanagari text-[var(--text-muted)]">
            {malaSize} नाम जप संपन्न
          </p>
        </div>

        {/* Subtle Today Progress */}
        <div className="py-2.5 px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-line)] text-xs font-devanagari text-[var(--text-muted)]">
          आज कुल <span className="font-semibold text-[var(--text-main)]">{completedMalas}</span> माला पूर्ण
        </div>

        {/* Action Button: अगली माला */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onNextMala}
            className="w-full py-3.5 px-6 rounded-2xl bg-saffron-600 hover:bg-saffron-700 active:scale-98 text-white font-devanagari text-base font-medium transition-all shadow-md tap-bounce"
          >
            अगली माला
          </button>

          {/* Accidental tap undo option */}
          <button
            onClick={onUndo}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-devanagari text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>गलती से टैप हुआ? पूर्ववत करें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
