import React, { useEffect, useState } from 'react';

export function JaapButton({ onIncrement, disabled = false }) {
  const [isPressed, setIsPressed] = useState(false);

  // Support Spacebar and Enter keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!disabled) {
          setIsPressed(true);
          onIncrement();
          setTimeout(() => setIsPressed(false), 120);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onIncrement, disabled]);

  const handlePointerDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-1 pb-4 px-4 select-none">
      <button
        onClick={onIncrement}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        disabled={disabled}
        aria-label="जप करें (काउंट +1)"
        className={`group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-150 shadow-soft-touch border-2 border-saffron-500/30 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-canvas)] hover:border-saffron-500/50 focus:outline-none ${
          isPressed ? 'scale-95 shadow-inner' : 'scale-100 hover:scale-[1.02]'
        }`}
      >
        {/* Outer Sacred Gold Aura Ring */}
        <div className="absolute -inset-1 rounded-full border border-[var(--accent-gold)] opacity-30 pointer-events-none" />

        {/* Inner Fine Concentric Ring */}
        <div className="absolute inset-2 rounded-full border border-[var(--border-line)] pointer-events-none opacity-80" />

        {/* Secondary Dotted Bead Guide */}
        <div className="absolute inset-4 rounded-full border border-dashed border-[var(--border-line)] pointer-events-none opacity-40" />

        {/* Sacred Top Glyph Mark */}
        <div className="text-[11px] font-devanagari text-saffron-600 dark:text-saffron-400 opacity-70 mb-0.5 group-hover:scale-110 transition-transform">
          ॐ
        </div>

        {/* Central 'जप' Action Text */}
        <span className="text-3xl sm:text-4xl font-devanagari font-bold text-saffron-800 dark:text-saffron-300 tracking-wider drop-shadow-sm">
          जप
        </span>

        {/* Quiet Subtext */}
        <span className="text-[10px] font-devanagari text-[var(--text-muted)] mt-1 tracking-wider opacity-70">
          स्पर्श करें
        </span>
      </button>

      {/* Subtle Hint */}
      <div className="flex items-center gap-2 mt-2.5 opacity-60">
        <span className="text-[11px] font-devanagari text-[var(--text-muted)]">
          स्क्रीन स्पर्श या स्पेसबार दबाएं
        </span>
      </div>
    </div>
  );
}
