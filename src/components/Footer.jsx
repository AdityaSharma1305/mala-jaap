import React, { useState, useEffect } from 'react';
import { ShieldCheck, WifiOff, Download, Sparkles } from 'lucide-react';

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <footer className="w-full max-w-md mx-auto px-4 pt-3 pb-6 safe-bottom text-center z-10 select-none">
      <div className="border-t border-[var(--border-line)] pt-3 pb-1 flex flex-col items-center gap-2">
        {/* Sacred Sanskrit Epigram */}
        <p className="text-xs font-devanagari text-saffron-800 dark:text-saffron-300 font-medium italic opacity-90">
          “मननात् त्रायते इति मन्त्रः”
        </p>

        {/* Creator Name & Dedication */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-line)] shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] font-devanagari text-[var(--text-main)] font-semibold">
            संकल्पना एवं निर्माण: <span className="text-saffron-700 dark:text-saffron-400 font-bold">आदित्य शर्मा (Aditya Sharma)</span>
          </span>
        </div>

        {/* Devotional Micro Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px] font-devanagari text-[var(--text-muted)] opacity-80 mt-0.5">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>100% On-Device (निजी)</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <WifiOff className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>ऑफ़लाइन सक्षम (PWA)</span>
          </span>
          <span>•</span>
          <span>कोई विज्ञापन नहीं</span>
        </div>

        {/* PWA Install Button if available */}
        {deferredPrompt && !isInstalled && (
          <button
            onClick={handleInstallClick}
            className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-saffron-50 dark:bg-saffron-950/60 border border-saffron-300 dark:border-saffron-800 text-[11px] font-devanagari font-semibold text-saffron-800 dark:text-saffron-300 hover:bg-saffron-100 transition-all tap-bounce shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>फ़ोन पर ऐप इंस्टॉल करें</span>
          </button>
        )}

        {/* Dedicated Devotional Tagline */}
        <div className="text-[10px] font-devanagari text-[var(--text-muted)]/75 mt-0.5">
          Mala Jaap • जप में मन, मन में नाम • समस्त साधकों के लिए सप्रेम समर्पित
        </div>
      </div>
    </footer>
  );
}
