import React, { useState } from 'react';
import { ChevronDown, Plus, Check, X, Sparkles } from 'lucide-react';

export const MANTRAS_META = [
  {
    name: 'श्री राम',
    sentiment: 'मर्यादा पुरुषोत्तम • कृपा और शांति',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Sacred Bow & Arrow */}
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <path d="M12 4v16" strokeLinecap="round" />
        <path d="M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'ॐ नमः शिवाय',
    sentiment: 'सत्यं शिवं सुन्दरम् • कल्याण और वैराग्य',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Trishul symbol */}
        <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
        <path d="M7 6c0 5 5 7 5 7s5-2 5-7" strokeLinecap="round" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <path d="M9 16c1.5 1 4.5 1 6 0" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'राधे राधे',
    sentiment: 'श्री जी की करुणा • अनन्य प्रेम और भक्ति',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Morpankh (Peacock feather eye) */}
        <path d="M12 2C8 6 6 12 12 22" strokeLinecap="round" />
        <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="8" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'श्री कृष्ण',
    sentiment: 'आनंदकंद सच्चिदानंद • भगवद् कृपा',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Sacred Bansuri flute */}
        <line x1="4" y1="18" x2="20" y2="6" strokeLinecap="round" strokeWidth="2" />
        <circle cx="9" cy="14" r="0.8" fill="currentColor" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
        <circle cx="15" cy="10" r="0.8" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'हरे कृष्ण',
    sentiment: 'महामंत्र • संकीर्तन और भवतारक',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Sacred Lotus */}
        <path d="M12 3c-2 4-2 8 0 11 2-3 2-7 0-11z" fill="currentColor" fillOpacity="0.2" />
        <path d="M6 10c2 4 4 6 6 4-2-2-4-4-6-4z" />
        <path d="M18 10c-2 4-4 6-6 4 2-2 4-4 6-4z" />
        <path d="M4 17c5 3 11 3 16 0" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'ॐ हनुमते नमः',
    sentiment: 'संकट मोचन • असीम बल, बुद्धि और निष्ठा',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Sacred Gada */}
        <line x1="12" y1="8" x2="12" y2="22" strokeLinecap="round" strokeWidth="2" />
        <circle cx="12" cy="6" r="4" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'गायत्री मंत्र',
    sentiment: 'सद्बुद्धि, आत्मतेज और दिव्य प्रकाश',
    glyph: (
      <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {/* Radiant Sun */}
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
        <line x1="12" y1="2" x2="12" y2="5" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="22" strokeLinecap="round" />
        <line x1="2" y1="12" x2="5" y2="12" strokeLinecap="round" />
        <line x1="19" y1="12" x2="22" y2="12" strokeLinecap="round" />
      </svg>
    )
  }
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

  const activeMeta = MANTRAS_META.find(m => m.name === selectedMantra) || {
    name: selectedMantra,
    sentiment: 'निजी इष्ट मंत्र साधना',
    glyph: <Sparkles className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomMantra(customInput.trim());
    setCustomInput('');
    setIsAddingCustom(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Current Active Mantra Header in Main Screen */}
      <div className="flex flex-col items-center justify-center my-2 sm:my-3 text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--border-line)]/50 transition-all tap-bounce border border-[var(--border-line)] shadow-sm"
          aria-label="मंत्र बदलें"
        >
          {/* Subtle Devotional Icon */}
          <span className="opacity-90 transition-transform group-hover:scale-110">
            {activeMeta.glyph}
          </span>

          <span className="text-xl sm:text-2xl font-devanagari font-semibold text-[var(--text-main)] tracking-wide">
            {selectedMantra}
          </span>

          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-transform duration-200" />
        </button>

        {/* Quiet Devotional Sentiment (भाव) */}
        <span className="text-[11px] font-devanagari text-[var(--text-muted)] mt-1 tracking-wider opacity-80">
          {activeMeta.sentiment}
        </span>
      </div>

      {/* Mantra Selection Sheet / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[3px] transition-opacity">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border border-[var(--border-line)] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            {/* Sheet Handle for Mobile */}
            <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)]">
              <div>
                <h3 className="text-lg font-devanagari font-semibold text-[var(--text-main)]">
                  इष्ट मंत्र चयन
                </h3>
                <p className="text-xs font-devanagari text-[var(--text-muted)] mt-0.5">
                  अपनी दैनिक साधना का मंत्र चुनें
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Mantras with Devotional Meta */}
            <div className="mt-4 space-y-2">
              {MANTRAS_META.map((meta) => {
                const isSelected = meta.name === selectedMantra;
                return (
                  <button
                    key={meta.name}
                    onClick={() => {
                      onSelectMantra(meta.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all font-devanagari tap-bounce ${
                      isSelected
                        ? 'bg-saffron-50 dark:bg-saffron-950/50 text-saffron-800 dark:text-saffron-200 border-2 border-saffron-400 dark:border-saffron-800 shadow-sm'
                        : 'bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-saffron-300 border border-[var(--border-line)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--bg-canvas)] flex items-center justify-center border border-[var(--border-line)] shrink-0 shadow-inner">
                        {meta.glyph}
                      </div>
                      <div>
                        <div className="text-base font-semibold leading-snug">
                          {meta.name}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                          {meta.sentiment}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-saffron-600 flex items-center justify-center text-white shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Custom Added Mantras */}
              {customMantras.map((mantra) => {
                const isSelected = mantra === selectedMantra;
                return (
                  <button
                    key={mantra}
                    onClick={() => {
                      onSelectMantra(mantra);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all font-devanagari ${
                      isSelected
                        ? 'bg-saffron-50 dark:bg-saffron-950/50 text-saffron-800 dark:text-saffron-200 border-2 border-saffron-400 dark:border-saffron-800'
                        : 'bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-line)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--bg-canvas)] flex items-center justify-center border border-[var(--border-line)] shrink-0">
                        <Sparkles className="w-4 h-4 text-saffron-500" />
                      </div>
                      <div>
                        <div className="text-base font-semibold">{mantra}</div>
                        <div className="text-[11px] text-[var(--text-muted)]">निजी मंत्र</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-saffron-600 flex items-center justify-center text-white">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-main)] font-devanagari placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-saffron-500/40"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!customInput.trim()}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-saffron-600 hover:bg-saffron-700 disabled:opacity-50 text-white font-devanagari text-sm font-medium transition-colors"
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
