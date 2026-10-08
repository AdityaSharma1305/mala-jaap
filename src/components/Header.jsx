import React from 'react';
import { Sun, Moon, History, Settings, Flame, Volume2, VolumeX, Eye } from 'lucide-react';

export function Header({
  theme,
  onCycleTheme,
  soundMode,
  onCycleSound,
  isDhyanMode,
  onToggleDhyanMode,
  onOpenHistory,
  onOpenSettings
}) {
  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />;
    if (theme === 'sandalwood') return <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-600" />;
    return <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-500" />;
  };

  const getThemeTitle = () => {
    if (theme === 'dark') return 'संध्या दीप (रात्रि)';
    if (theme === 'sandalwood') return 'चंदन (पारंपरिक)';
    return 'हस्तनिर्मित कागज़ (दिन)';
  };

  return (
    <header className="w-full max-w-md mx-auto px-4 pt-3 pb-1 flex items-center justify-between z-20">
      {/* Brand & Devotional Om */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-devanagari font-bold text-saffron-600 dark:text-saffron-400 select-none">
          🕉
        </span>
        <div className="flex flex-col">
          <h1 className="text-lg font-serif tracking-wide font-medium text-[var(--text-main)] leading-none">
            Mala Jaap
          </h1>
          <span className="text-[10px] font-devanagari text-[var(--text-muted)] tracking-wider mt-0.5">
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
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          {soundMode === 'off' ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 opacity-50" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-600 dark:text-saffron-400" />
          )}
        </button>

        {/* Theme Switcher */}
        <button
          onClick={onCycleTheme}
          aria-label={`रंग रूप बदलें (वर्तमान: ${getThemeTitle()})`}
          title={`रंग रूप: ${getThemeTitle()}`}
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          {getThemeIcon()}
        </button>

        {/* Dhyan / Focus Mode Toggle */}
        <button
          onClick={onToggleDhyanMode}
          aria-label="ध्यान मुद्रा (पूर्ण शांति)"
          title="ध्यान मुद्रा (चित्त एकाग्रता)"
          className={`p-2 rounded-full transition-colors tap-bounce ${
            isDhyanMode
              ? 'text-saffron-600 bg-saffron-50 dark:bg-saffron-950/60'
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
          }`}
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* History Button */}
        <button
          onClick={onOpenHistory}
          aria-label="जप इतिहास"
          title="जप इतिहास"
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          <History className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          aria-label="सेटिंग्स"
          title="सेटिंग्स"
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
}
