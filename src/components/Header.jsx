import React from 'react';
import { Sun, Moon, History, Settings, Flame } from 'lucide-react';

export function Header({ theme, onCycleTheme, onOpenHistory, onOpenSettings }) {
  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-5 h-5 text-amber-300" />;
    if (theme === 'sandalwood') return <Flame className="w-5 h-5 text-saffron-600" />;
    return <Sun className="w-5 h-5 text-saffron-500" />;
  };

  const getThemeTitle = () => {
    if (theme === 'dark') return 'संध्या दीप (रात्रि)';
    if (theme === 'sandalwood') return 'चंदन (पारंपरिक)';
    return 'हस्तनिर्मित कागज़ (दिन)';
  };

  return (
    <header className="w-full max-w-md mx-auto px-5 pt-4 pb-2 flex items-center justify-between z-20">
      {/* Brand & Devotional Om */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-devanagari font-semibold text-saffron-600 dark:text-saffron-400 select-none">
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
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme Switcher */}
        <button
          onClick={onCycleTheme}
          aria-label={`रंग रूप बदलें (वर्तमान: ${getThemeTitle()})`}
          title={`रंग रूप बदलें: ${getThemeTitle()}`}
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          {getThemeIcon()}
        </button>

        {/* History Button */}
        <button
          onClick={onOpenHistory}
          aria-label="जप इतिहास"
          title="जप इतिहास"
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          <History className="w-5 h-5" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          aria-label="सेटिंग्स"
          title="सेटिंग्स"
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] tap-bounce transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
