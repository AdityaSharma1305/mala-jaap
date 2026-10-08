import React from 'react';

export function SacredDiyaGlow({ enabled = true }) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Top subtle golden light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-amber-500/5 via-amber-500/2 to-transparent blur-3xl" />

      {/* Center sanctuary warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-600/[0.04] dark:bg-amber-500/[0.06] blur-2xl" />

      {/* Bottom sacred Diya lamp aura */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full bg-gradient-to-t from-saffron-500/10 via-amber-500/5 to-transparent blur-2xl" />
    </div>
  );
}
