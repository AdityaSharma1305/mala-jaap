import React, { useState, useEffect } from 'react';
import { useJaapCounter } from './hooks/useJaapCounter';
import { Header } from './components/Header';
import { MantraSelector } from './components/MantraSelector';
import { MalaVisualization } from './components/MalaVisualization';
import { JaapButton } from './components/JaapButton';
import { UndoResetControls } from './components/UndoResetControls';
import { CompletionModal } from './components/CompletionModal';
import { DailyProgressSheet } from './components/DailyProgressSheet';
import { HistorySheet } from './components/HistorySheet';
import { SettingsSheet } from './components/SettingsSheet';
import { SacredDiyaGlow } from './components/SacredDiyaGlow';
import { Footer } from './components/Footer';
import { ChevronUp, EyeOff } from 'lucide-react';

export default function App() {
  const {
    state,
    isCompletedModalOpen,
    incrementJaap,
    startNextMala,
    undo,
    canUndo,
    resetCurrentMala,
    resetToday,
    setSelectedMantra,
    addCustomMantra,
    setMalaSize,
    setSoundMode,
    setVibrationEnabled,
    setDailyGoal,
    clearAllData,
  } = useJaapCounter();

  // Drawer / Sheet visibility states
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isDhyanMode, setIsDhyanMode] = useState(false);
  const [showDarshan, setShowDarshan] = useState(true);

  // Close open drawers on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsHistoryOpen(false);
        setIsSettingsOpen(false);
        setIsProgressOpen(false);
        if (isDhyanMode) setIsDhyanMode(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDhyanMode]);

  // Permanently enforce sacred Dark Theme (संध्या दीप) and mobile OS status bar color
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');

    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', '#171412');
    }
  }, []);

  // Quick sound cycling: off -> bell -> click -> off
  const handleCycleSound = () => {
    const soundSeq = ['off', 'bell', 'click'];
    const nextIdx = (soundSeq.indexOf(state.soundMode) + 1) % soundSeq.length;
    setSoundMode(soundSeq[nextIdx]);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between paper-texture overflow-x-hidden transition-colors duration-500 bg-[#171412] text-[#E8DFD5]">
      {/* Sacred Temple Ghee Lamps & Ambient Jyoti Glow */}
      <SacredDiyaGlow enabled={true} />

      {/* 1. Header (Hidden during Dhyan Mode for complete focus) */}
      {!isDhyanMode ? (
        <Header
          soundMode={state.soundMode}
          onCycleSound={handleCycleSound}
          isDhyanMode={isDhyanMode}
          onToggleDhyanMode={() => setIsDhyanMode(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      ) : (
        /* Minimal Dhyan mode exit bar */
        <div className="w-full max-w-md mx-auto px-4 pt-3 flex justify-between items-center z-20">
          <span className="text-xs font-devanagari text-amber-400 font-bold">
            🕉 ध्यान मुद्रा (एकाग्र चित्त)
          </span>
          <button
            onClick={() => setIsDhyanMode(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-amber-200/70 hover:text-amber-100 text-xs font-devanagari border border-white/10 tap-bounce"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>समाप्त करें</span>
          </button>
        </div>
      )}

      {/* 2. Devotional Sanctuary Center Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 flex flex-col items-center justify-between pb-2 z-10">
        {/* Mantra Area */}
        <div className="w-full">
          <MantraSelector
            selectedMantra={state.selectedMantra}
            customMantras={state.customMantras}
            onSelectMantra={setSelectedMantra}
            onAddCustomMantra={addCustomMantra}
          />
        </div>

        {/* Circular Mala Visualization with Deity Darshan */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
          <MalaVisualization
            currentBead={state.currentBead}
            malaSize={state.malaSize}
            completedMalas={state.completedMalas}
            totalJaap={state.totalJaap}
            selectedMantra={state.selectedMantra}
            showDarshan={showDarshan}
            onToggleDarshan={() => setShowDarshan(!showDarshan)}
          />

          {/* Quiet Undo & Reset Controls */}
          {!isDhyanMode && (
            <UndoResetControls
              onUndo={undo}
              canUndo={canUndo}
              onResetMala={resetCurrentMala}
              currentBead={state.currentBead}
            />
          )}
        </div>

        {/* Bottom Interaction Area (Ergonomic Thumb Reach) */}
        <div className="w-full flex flex-col items-center">
          {/* Main 'जप' Button */}
          <JaapButton
            onIncrement={incrementJaap}
            disabled={isCompletedModalOpen}
          />

          {/* Subtle Daily Progress Indicator Bar (Hidden during Dhyan mode) */}
          {!isDhyanMode && (
            <button
              onClick={() => setIsProgressOpen(true)}
              aria-label="आज का दैनिक विवरण देखें"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-devanagari text-amber-200/60 hover:text-amber-100 hover:bg-white/5 transition-all tap-bounce border border-white/10 shadow-sm"
            >
              <span>आज: {state.completedMalas} माला</span>
              <span className="opacity-40">•</span>
              <span>{state.totalJaap} जप</span>
              <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </main>

      {/* 3. Devotional Footer with Sanskrit Epigram, Aditya Sharma credit & PWA info */}
      {!isDhyanMode && <Footer />}

      {/* 4. Mala Completion Experience */}
      <CompletionModal
        isOpen={isCompletedModalOpen}
        malaSize={state.malaSize}
        completedMalas={state.completedMalas}
        selectedMantra={state.selectedMantra}
        onNextMala={startNextMala}
        onUndo={undo}
      />

      {/* 5. Drawers & Sheets */}
      <DailyProgressSheet
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        completedMalas={state.completedMalas}
        totalJaap={state.totalJaap}
        dailyGoal={state.dailyGoal}
        onUpdateGoal={setDailyGoal}
        onResetToday={resetToday}
      />

      <HistorySheet
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={state.history}
        lifetimeTotalJaap={state.lifetimeTotalJaap}
        lifetimeMalas={state.lifetimeMalas}
      />

      <SettingsSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        malaSize={state.malaSize}
        onChangeMalaSize={setMalaSize}
        soundMode={state.soundMode}
        onChangeSoundMode={setSoundMode}
        vibrationEnabled={state.vibrationEnabled}
        onToggleVibration={setVibrationEnabled}
        onClearAllData={clearAllData}
      />
    </div>
  );
}
