import React from 'react';
import { History, Settings, Volume2, VolumeX, Eye } from 'lucide-react';

export function Header({
  soundMode,
  onCycleSound,
  isDhyanMode,
  onToggleDhyanMode,
  onOpenHistory,
  onOpenSettings
}) {
  return (
    <header className="w-full max-w-md mx-auto px-4 pt-3 pb-1 safe-top flex items-center justify-between z-20">
      {/* Brand & Devotional Om */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-devanagari font-bold text-amber-400 select-none drop-shadow-sm">
          🕉
        </span>
        <div className="flex flex-col">
          <h1 className="text-lg font-serif tracking-wide font-medium text-amber-100 leading-none">
            Mala Jaap
          </h1>
          <span className="text-[10px] font-devanagari text-amber-200/60 tracking-wider mt-0.5">
            जप में मन, मन में नाम
          </span>
        </div>
      </div>

      {/* Quick Action Icons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Quick Sound Toggle */}
        <button
          onClick={onCycleSound}
          aria-label={`ध्वनि बदलें (वर्तमान: ${soundMode})`}
          title={`ध्वनि: ${soundMode === 'bell' ? 'सौम्य घंटी' : soundMode === 'click' ? 'काष्ठ क्लिक' : 'शांत (बंद)'}`}
          className="p-2 rounded-full text-amber-200/60 hover:text-amber-100 hover:bg-white/5 tap-bounce transition-colors"
        >
          {soundMode === 'off' ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 opacity-40" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          )}
        </button>

        {/* Dhyan / Focus Mode Toggle */}
        <button
          onClick={onToggleDhyanMode}
          aria-label="ध्यान मुद्रा (पूर्ण शांति)"
          title="ध्यान मुद्रा (चित्त एकाग्रता)"
          className={`p-2 rounded-full transition-colors tap-bounce ${
            isDhyanMode
              ? 'text-amber-400 bg-amber-500/20'
              : 'text-amber-200/60 hover:text-amber-100 hover:bg-white/5'
          }`}
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* History Button */}
        <button
          onClick={onOpenHistory}
          aria-label="जप इतिहास"
          title="जप इतिहास"
          className="p-2 rounded-full text-amber-200/60 hover:text-amber-100 hover:bg-white/5 tap-bounce transition-colors"
        >
          <History className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          aria-label="सेटिंग्स"
          title="सेटिंग्स"
          className="p-2 rounded-full text-amber-200/60 hover:text-amber-100 hover:bg-white/5 tap-bounce transition-colors"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
}
