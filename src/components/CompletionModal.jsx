import React, { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { playSingingBowlChime } from '../utils/sound';
import { getDeityInfo } from './DeityDarshan';

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

  const deity = getDeityInfo(selectedMantra);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-sm bg-[var(--bg-canvas)] border-2 border-[var(--accent-gold)] rounded-3xl p-6 text-center shadow-2xl space-y-4 overflow-hidden">
        {/* Divine Golden Rays Aura */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />

        {/* Sacred Deity Darshan Frame */}
        <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-3 border-[var(--accent-gold)] shadow-xl">
          <img
            src={deity.image}
            alt={deity.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 rounded-full border-2 border-amber-300/60 pointer-events-none" />
        </div>

        {/* Devotional Completion Header */}
        <div className="space-y-1">
          <div className="text-xs font-devanagari text-saffron-600 dark:text-saffron-400 font-bold tracking-widest uppercase">
            🙏 पूर्णता का पुण्य पर्व
          </div>
          <h2 className="text-2xl font-devanagari font-bold text-[var(--text-main)]">
            एक माला पूर्ण हुई
          </h2>
          <p className="text-base font-devanagari text-saffron-800 dark:text-saffron-300 font-semibold">
            {selectedMantra} • {deity.name}
          </p>
          <p className="text-xs font-devanagari text-[var(--text-muted)]">
            {malaSize} नाम जप श्रद्धापूर्वक संपन्न
          </p>
        </div>

        {/* Sacred Traditional Shloka */}
        <div className="py-2.5 px-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] text-center space-y-1">
          <p className="text-xs font-devanagari text-saffron-900 dark:text-saffron-200 font-medium italic leading-relaxed">
            “{deity.tagline}”
          </p>
          <span className="text-[11px] font-devanagari text-[var(--text-muted)] block mt-1">
            आज कुल साधना: <strong className="text-[var(--text-main)] font-bold">{completedMalas} माला</strong>
          </span>
        </div>

        {/* Action Button: अगली माला */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={onNextMala}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-600 hover:from-saffron-700 hover:to-amber-700 active:scale-98 text-white font-devanagari text-base font-bold transition-all shadow-lg tap-bounce flex items-center justify-center gap-2"
          >
            <span>अगली माला आरंभ करें</span>
          </button>

          {/* Accidental tap undo option */}
          <button
            onClick={onUndo}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-devanagari text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>गलती से टैप हुआ? पूर्ववत करें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
