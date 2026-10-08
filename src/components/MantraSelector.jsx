import React, { useState } from 'react';
import { ChevronDown, Plus, Check, X, Sparkles } from 'lucide-react';
import { getDeityInfo } from './DeityDarshan';

export const MANTRAS_LIST = [
  'श्री राम',
  'ॐ नमः शिवाय',
  'राधे राधे',
  'श्री कृष्ण',
  'हरे कृष्ण',
  'ॐ हनुमते नमः',
  'गायत्री मंत्र'
];

export function MantraSelector({
  selectedMantra,
  customMantras = [],
  onSelectMantra,
  onAddCustomMantra
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const activeDeity = getDeityInfo(selectedMantra);

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomMantra(customInput.trim());
    setCustomInput('');
    setIsAddingCustom(false);
    setIsOpen(false);
  };

  const allMantras = [...MANTRAS_LIST, ...customMantras];

  return (
    <>
      {/* Current Active Mantra Header in Main Screen */}
      <div className="flex flex-col items-center justify-center my-1.5 sm:my-2.5 text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--border-line)]/50 transition-all tap-bounce border-2 border-[var(--accent-gold)]/40 shadow-sm"
          aria-label="मंत्र बदलें"
        >
          {/* Circular Deity Thumbnail */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400 shrink-0 shadow-sm">
            <img
              src={activeDeity.image}
              alt={activeDeity.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col items-start text-left">
            <span className="text-xl sm:text-2xl font-devanagari font-bold text-[var(--text-main)] tracking-wide leading-tight">
              {selectedMantra}
            </span>
            <span className="text-[10px] font-devanagari text-saffron-700 dark:text-saffron-400 font-medium">
              {activeDeity.name}
            </span>
          </div>

          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-transform duration-200 ml-1" />
        </button>

        {/* Sacred Devotional Shloka / Tagline */}
        <span className="text-[11px] font-devanagari text-[var(--text-muted)] mt-1 tracking-wider opacity-85 px-4 line-clamp-1 italic">
          “{activeDeity.tagline}”
        </span>
      </div>

      {/* Mantra Selection Sheet / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-[4px] transition-opacity">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border-2 border-[var(--accent-gold)]/40 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl z-10 max-h-[88vh] overflow-y-auto">
            {/* Sheet Handle for Mobile */}
            <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)]">
              <div>
                <h3 className="text-lg font-devanagari font-bold text-[var(--text-main)] flex items-center gap-2">
                  <span>🕉</span>
                  <span>इष्ट देव एवं मंत्र चयन</span>
                </h3>
                <p className="text-xs font-devanagari text-[var(--text-muted)] mt-0.5">
                  जिस रूप में आपकी निष्ठा हो, वही मंत्र चुनें
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Mantras with Full Color Deity Portraits */}
            <div className="mt-4 space-y-2.5">
              {allMantras.map((mantra) => {
                const isSelected = mantra === selectedMantra;
                const deity = getDeityInfo(mantra);

                return (
                  <button
                    key={mantra}
                    onClick={() => {
                      onSelectMantra(mantra);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all font-devanagari tap-bounce ${
                      isSelected
                        ? 'bg-amber-500/10 border-2 border-amber-500 shadow-md'
                        : 'bg-[var(--bg-surface)] hover:border-amber-300 border border-[var(--border-line)]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Deity Portrait Image Thumbnail */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/80 shrink-0 shadow-sm">
                        <img
                          src={deity.image}
                          alt={deity.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <div className="text-base font-bold text-[var(--text-main)] leading-snug">
                          {mantra}
                        </div>
                        <div className="text-xs text-saffron-700 dark:text-saffron-400 font-medium">
                          {deity.name}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1 italic">
                          {deity.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-saffron-600 flex items-center justify-center text-white shrink-0 shadow-sm ml-2">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Mantra Section */}
            <div className="mt-5 pt-4 border-t border-[var(--border-line)]">
              {!isAddingCustom ? (
                <button
                  onClick={() => setIsAddingCustom(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-[var(--border-line)] text-sm font-devanagari text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>अन्य / निजी मंत्र जोड़ें</span>
                </button>
              ) : (
                <form onSubmit={handleAddCustom} className="space-y-3">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="अपना मंत्र यहाँ लिखें..."
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)] font-devanagari placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!customInput.trim()}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-saffron-600 hover:bg-saffron-700 disabled:opacity-50 text-white font-devanagari text-sm font-semibold transition-colors"
                    >
                      जोड़ें और चुनें
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCustom(false)}
                      className="py-2.5 px-4 rounded-xl border border-[var(--border-line)] text-[var(--text-muted)] text-sm hover:bg-[var(--bg-surface)] font-devanagari"
                    >
                      रद्द करें
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
