import React, { useEffect, useState, useRef } from 'react';

export function JaapButton({ onIncrement, disabled = false }) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);

  // Support Spacebar and Enter keys cleanly without capturing other buttons
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If typing in input or textarea, ignore
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // If another button is focused, let that button's default action run
      if (e.target.tagName === 'BUTTON' && e.target !== buttonRef.current) return;

      if (e.code === 'Space' || (e.code === 'Enter' && e.target === buttonRef.current)) {
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
    <div className="w-full flex flex-col items-center justify-center pt-2 pb-2 px-4 select-none">
      <button
        id="main-jaap-button"
        data-testid="main-jaap-button"
        ref={buttonRef}
        onClick={onIncrement}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        disabled={disabled}
        aria-label="जप करें (गिनती +1)"
        className={`group relative w-48 h-48 min-[380px]:w-52 min-[380px]:h-52 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-150 border-2 border-amber-500/40 bg-gradient-to-b from-[#2a1c12] via-[#1c120c] to-[#120a06] hover:border-amber-400/70 focus:outline-none shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.18)] ${
          isPressed
            ? 'scale-[0.96] ring-4 ring-amber-500/40 brightness-110 shadow-inner'
            : 'scale-100 hover:scale-[1.02]'
        }`}
      >
        {/* Soft Ambient Radiance Aura behind the button */}
        <div className="absolute -inset-3 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

        {/* Outer Sacred Gold Filigree Ring */}
        <div className="absolute -inset-1.5 rounded-full border border-amber-400/30 opacity-70 pointer-events-none" />

        {/* Middle Concentric Brass Ring */}
        <div className="absolute inset-2.5 rounded-full border border-white/10 pointer-events-none" />

        {/* Inner Dotted Meditation Guide */}
        <div className="absolute inset-5 rounded-full border border-dashed border-amber-500/20 pointer-events-none" />

        {/* Sacred Top Glyph Mark */}
        <div className="text-sm min-[380px]:text-base font-devanagari text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] mb-0.5 group-hover:scale-110 transition-transform">
          🕉
        </div>

        {/* Central 'जप' Action Text - Extra Large & Legible */}
        <span className="text-4xl min-[380px]:text-5xl sm:text-[54px] font-devanagari font-extrabold text-amber-100 tracking-wider drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
          जप
        </span>

        {/* Clear Tactile Subtext */}
        <span className="text-[11px] min-[380px]:text-xs font-devanagari text-amber-200/70 mt-1 tracking-widest uppercase">
          स्पर्श करें
        </span>
      </button>

      {/* Subtle Hint */}
      <div className="flex items-center gap-2 mt-2 opacity-60">
        <span className="text-[11px] font-devanagari text-amber-200/50">
          स्क्रीन स्पर्श या स्पेसबार दबाएं
        </span>
      </div>
    </div>
  );
}
