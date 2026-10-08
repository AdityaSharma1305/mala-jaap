import React, { useEffect } from 'react';

export function JaapButton({ onIncrement, disabled = false }) {
  // Support Spacebar and Enter keys for chanting
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is currently typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!disabled) {
          onIncrement();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onIncrement, disabled]);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-2 pb-6 px-4">
      <button
        onClick={onIncrement}
        disabled={disabled}
        aria-label="जप करें (काउंट +1)"
        className="group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-150 active:scale-95 shadow-soft-touch border-2 border-saffron-500/20 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-canvas)] hover:border-saffron-500/40 select-none tap-bounce focus:outline-none"
      >
        {/* Subtle Inner Ring */}
        <div className="absolute inset-2.5 rounded-full border border-[var(--border-line)] pointer-events-none opacity-60" />

        {/* Sacred Bead Indicator Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 mb-1 opacity-70 group-hover:scale-125 transition-transform" />

        {/* Central 'जप' Action Text */}
        <span className="text-3xl sm:text-4xl font-devanagari font-semibold text-saffron-700 dark:text-saffron-400 tracking-wider">
          जप
        </span>

        {/* Quiet Subtext */}
        <span className="text-[10px] font-devanagari text-[var(--text-muted)] mt-1 tracking-wider opacity-70">
          स्पर्श करें
        </span>
      </button>

      {/* Helpful subtle desktop keyboard shortcut hint */}
      <span className="text-[11px] font-sans text-[var(--text-muted)] mt-3 opacity-60 hidden sm:block">
        (स्पेसबार या एंटर दबाकर भी जप कर सकते हैं)
      </span>
    </div>
  );
}
