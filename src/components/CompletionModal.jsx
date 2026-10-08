import React, { useEffect } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { playSingingBowlChime } from '../utils/sound';

export function CompletionModal({
  isOpen,
  malaSize = 108,
  completedMalas = 1,
  selectedMantra = 'श्री राम',
  onNextMala,
  onUndo
}) {
  useEffect(() => {
    if (isOpen) {
      playSingingBowlChime();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-sm bg-[var(--bg-canvas)] border-2 border-[var(--accent-gold)]/40 rounded-3xl p-7 text-center shadow-2xl space-y-5">
        {/* Sacred Golden Diya Glow behind modal */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-saffron-500/10 blur-xl pointer-events-none" />

        {/* Sacred Pranam Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-saffron-50 dark:bg-saffron-950/60 flex items-center justify-center border-2 border-saffron-300 dark:border-saffron-700/60 shadow-inner">
          <span className="text-3xl select-none" role="img" aria-label="हाथ जोड़े">
            🙏
          </span>
        </div>

        {/* Devotional Completion Header */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-devanagari font-bold text-[var(--text-main)]">
            एक माला पूर्ण हुई
          </h2>
          <p className="text-lg font-devanagari text-saffron-700 dark:text-saffron-400 font-semibold">
            {selectedMantra}
          </p>
          <p className="text-xs font-devanagari text-[var(--text-muted)]">
            {malaSize} नाम जप श्रद्धापूर्वक संपन्न
          </p>
        </div>

        {/* Sacred Traditional Shloka */}
        <div className="py-3 px-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] text-center space-y-1">
          <p className="text-xs font-devanagari text-saffron-800 dark:text-saffron-300 font-medium italic leading-relaxed">
            “हरेर्नाम हरेर्नाम हरेर्नामैव केवलम्।”
          </p>
          <span className="text-[10px] font-devanagari text-[var(--text-muted)] block">
            आज कुल साधना: <strong className="text-[var(--text-main)]">{completedMalas} माला</strong>
          </span>
        </div>

        {/* Action Button: अगली माला */}
        <div className="space-y-3 pt-1">
          <button
            onClick={onNextMala}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-saffron-600 via-saffron-700 to-saffron-600 hover:from-saffron-700 hover:to-saffron-800 active:scale-98 text-white font-devanagari text-base font-semibold transition-all shadow-md tap-bounce flex items-center justify-center gap-2"
          >
            <span>अगली माला आरंभ करें</span>
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
