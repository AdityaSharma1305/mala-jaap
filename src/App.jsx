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
import { ChevronUp } from 'lucide-react';

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
    setTheme,
    setDailyGoal,
    clearAllData,
  } = useJaapCounter();

  // Drawer / Sheet visibility states
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  // Cycle themes: light -> sandalwood -> dark -> light
  const handleCycleTheme = () => {
    const sequence = ['light', 'sandalwood', 'dark'];
    const nextIndex = (sequence.indexOf(state.theme) + 1) % sequence.length;
    setTheme(sequence[nextIndex]);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between paper-texture overflow-x-hidden">
      {/* 1. Header */}
      <Header
        theme={state.theme}
        onCycleTheme={handleCycleTheme}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

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

        {/* Circular Mala Visualization */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
          <MalaVisualization
            currentBead={state.currentBead}
            malaSize={state.malaSize}
            completedMalas={state.completedMalas}
            totalJaap={state.totalJaap}
          />

          {/* Quiet Undo & Reset Controls */}
          <UndoResetControls
            onUndo={undo}
            canUndo={canUndo}
            onResetMala={resetCurrentMala}
            currentBead={state.currentBead}
          />
        </div>

        {/* Bottom Interaction Area (Ergonomic Thumb Reach) */}
        <div className="w-full flex flex-col items-center">
          {/* Main 'जप' Button */}
          <JaapButton
            onIncrement={incrementJaap}
            disabled={isCompletedModalOpen}
          />

          {/* Subtle Daily Progress Indicator Bar */}
          <button
            onClick={() => setIsProgressOpen(true)}
            aria-label="आज का दैनिक विवरण देखें"
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-devanagari text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-all tap-bounce mb-1"
          >
            <span>आज: {state.completedMalas} माला</span>
            <span className="opacity-50">•</span>
            <span>{state.totalJaap} जप</span>
            <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </main>

      {/* 3. Mala Completion Experience */}
      <CompletionModal
        isOpen={isCompletedModalOpen}
        malaSize={state.malaSize}
        completedMalas={state.completedMalas}
        selectedMantra={state.selectedMantra}
        onNextMala={startNextMala}
        onUndo={undo}
      />

      {/* 4. Drawers & Sheets */}
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
        theme={state.theme}
        onChangeTheme={setTheme}
        onClearAllData={clearAllData}
      />
    </div>
  );
}
