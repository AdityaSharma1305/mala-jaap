import React, { useState } from 'react';
import { ChevronDown, Plus, Check, X } from 'lucide-react';

export const PRESET_MANTRAS = [
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

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomMantra(customInput.trim());
    setCustomInput('');
    setIsAddingCustom(false);
    setIsOpen(false);
  };

  const allMantras = [...PRESET_MANTRAS, ...customMantras];

  return (
    <>
      {/* Current Active Mantra in Main Screen */}
      <div className="flex flex-col items-center justify-center my-3 sm:my-5">
        <button
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--border-line)]/50 transition-all tap-bounce border border-[var(--border-line)] shadow-sm"
          aria-label="मंत्र बदलें"
        >
          <span className="text-xl sm:text-2xl font-devanagari font-medium text-[var(--text-main)] tracking-wide">
            {selectedMantra}
          </span>
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-transform duration-200" />
        </button>
      </div>

      {/* Mantra Selection Sheet / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border border-[var(--border-line)] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            {/* Sheet Handle for Mobile */}
            <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)]">
              <div>
                <h3 className="text-lg font-devanagari font-semibold text-[var(--text-main)]">
                  मंत्र चयन
                </h3>
                <p className="text-xs font-devanagari text-[var(--text-muted)]">
                  अपने इष्ट मंत्र का चयन करें
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Mantras */}
            <div className="mt-4 space-y-1.5">
              {allMantras.map((mantra) => {
                const isSelected = mantra === selectedMantra;
                return (
                  <button
                    key={mantra}
                    onClick={() => {
                      onSelectMantra(mantra);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors font-devanagari text-base ${
                      isSelected
                        ? 'bg-saffron-50 dark:bg-saffron-950/40 text-saffron-700 dark:text-saffron-300 font-semibold border border-saffron-200 dark:border-saffron-900/60'
                        : 'text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
                    }`}
                  >
                    <span>{mantra}</span>
                    {isSelected && <Check className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Mantra Section */}
            <div className="mt-5 pt-4 border-t border-[var(--border-line)]">
              {!isAddingCustom ? (
                <button
                  onClick={() => setIsAddingCustom(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[var(--border-line)] text-sm font-devanagari text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)] font-devanagari placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-1 focus:ring-saffron-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!customInput.trim()}
                      className="flex-1 py-2 px-4 rounded-xl bg-saffron-600 hover:bg-saffron-700 disabled:opacity-50 text-white font-devanagari text-sm font-medium transition-colors"
                    >
                      जोड़ें और चुनें
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCustom(false)}
                      className="py-2 px-3 rounded-xl border border-[var(--border-line)] text-[var(--text-muted)] text-sm hover:bg-[var(--bg-surface)]"
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
