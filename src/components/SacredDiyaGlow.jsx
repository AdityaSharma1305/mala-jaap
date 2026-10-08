import React from 'react';

export function SacredDiyaGlow({ enabled = true }) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top subtle golden temple light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-96 rounded-full bg-gradient-to-b from-amber-500/10 via-amber-500/3 to-transparent blur-3xl" />

      {/* Center sanctuary warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-600/[0.06] dark:bg-amber-500/[0.08] blur-3xl" />

      {/* Left Temple Ghee Lamp (दीपक) */}
      <div className="absolute bottom-4 left-4 sm:left-12 opacity-80 flex flex-col items-center">
        {/* Flame with gentle breathing flicker */}
        <div className="relative w-3.5 h-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 blur-[1px] animate-pulse" />
          <div className="absolute inset-1 rounded-full bg-yellow-100 blur-[0.5px]" />
          <div className="absolute -inset-2 rounded-full bg-amber-500/20 blur-md" />
        </div>
        {/* Brass Diya Bowl SVG */}
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="text-amber-600">
          <path d="M2 3C6 11 22 11 26 3C20 6 8 6 2 3Z" fill="#D4AF37" stroke="#B45309" strokeWidth="1" />
          <path d="M10 11H18V13H10V11Z" fill="#B45309" />
        </svg>
      </div>

      {/* Right Temple Ghee Lamp (दीपक) */}
      <div className="absolute bottom-4 right-4 sm:right-12 opacity-80 flex flex-col items-center">
        {/* Flame */}
        <div className="relative w-3.5 h-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 blur-[1px] animate-pulse delay-75" />
          <div className="absolute inset-1 rounded-full bg-yellow-100 blur-[0.5px]" />
          <div className="absolute -inset-2 rounded-full bg-amber-500/20 blur-md" />
        </div>
        {/* Brass Diya Bowl SVG */}
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="text-amber-600">
          <path d="M2 3C6 11 22 11 26 3C20 6 8 6 2 3Z" fill="#D4AF37" stroke="#B45309" strokeWidth="1" />
          <path d="M10 11H18V13H10V11Z" fill="#B45309" />
        </svg>
      </div>
    </div>
  );
}
