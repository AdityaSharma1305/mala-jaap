import { useState, useEffect, useCallback, useRef } from 'react';
import {
  loadStoredState,
  saveStoredState,
  getTodayKey,
  DEFAULT_STATE,
} from '../utils/storage';
import { playJaapSound, playBellSound } from '../utils/sound';
import { triggerBeadHaptic, triggerCompletionHaptic } from '../utils/haptics';

export function useJaapCounter() {
  const [state, setState] = useState(() => loadStoredState());
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const undoStackRef = useRef([]);

  // Sync state changes to localStorage
  useEffect(() => {
    saveStoredState(state);
  }, [state]);

  // Handle midnight date-rollover if the app remains open
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayKey();
      if (state.lastActiveDate !== today) {
        setState((prev) => ({
          ...prev,
          currentBead: 0,
          completedMalas: 0,
          totalJaap: 0,
          lastActiveDate: today,
        }));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [state.lastActiveDate]);

  // Core Increment Logic
  const incrementJaap = useCallback(() => {
    setState((prev) => {
      const nextBead = prev.currentBead + 1;
      const today = getTodayKey();

      // Push current snapshot to undo stack before mutating
      undoStackRef.current.push({
        currentBead: prev.currentBead,
        completedMalas: prev.completedMalas,
        totalJaap: prev.totalJaap,
        lifetimeTotalJaap: prev.lifetimeTotalJaap,
        lifetimeMalas: prev.lifetimeMalas,
        history: { ...prev.history },
        isCompletedModalOpen: false,
      });

      // Keep undo stack within reasonable bounds (e.g. 50 actions)
      if (undoStackRef.current.length > 50) {
        undoStackRef.current.shift();
      }

      // Check for Mala Completion
      if (nextBead >= prev.malaSize) {
        // Completion reached!
        const newCompletedMalas = prev.completedMalas + 1;
        const newTotalJaap = prev.totalJaap + 1;
        const newLifetimeJaap = prev.lifetimeTotalJaap + 1;
        const newLifetimeMalas = prev.lifetimeMalas + 1;

        const currentTodayHistory = prev.history[today] || { malas: 0, jaap: 0 };
        const updatedHistory = {
          ...prev.history,
          [today]: {
            malas: newCompletedMalas,
            jaap: newTotalJaap,
          },
        };

        // Feedback
        playJaapSound(prev.soundMode);
        // Play gentle bell if sound is enabled
        if (prev.soundMode !== 'off') {
          setTimeout(() => playBellSound(), 180);
        }
        triggerCompletionHaptic(prev.vibrationEnabled);
        setIsCompletedModalOpen(true);

        return {
          ...prev,
          currentBead: prev.malaSize, // Show 108 / 108 upon completion
          completedMalas: newCompletedMalas,
          totalJaap: newTotalJaap,
          lifetimeTotalJaap: newLifetimeJaap,
          lifetimeMalas: newLifetimeMalas,
          history: updatedHistory,
          lastActiveDate: today,
        };
      } else {
        // Regular increment
        const newTotalJaap = prev.totalJaap + 1;
        const newLifetimeJaap = prev.lifetimeTotalJaap + 1;

        const updatedHistory = {
          ...prev.history,
          [today]: {
            malas: prev.completedMalas,
            jaap: newTotalJaap,
          },
        };

        // Feedback
        playJaapSound(prev.soundMode);
        triggerBeadHaptic(prev.vibrationEnabled);

        return {
          ...prev,
          currentBead: nextBead,
          totalJaap: newTotalJaap,
          lifetimeTotalJaap: newLifetimeJaap,
          history: updatedHistory,
          lastActiveDate: today,
        };
      }
    });
  }, []);

  // Continue to Next Mala after completion
  const startNextMala = useCallback(() => {
    setIsCompletedModalOpen(false);
    setState((prev) => ({
      ...prev,
      currentBead: 0,
    }));
  }, []);

  // Undo Latest Action (with boundary and completion handling)
  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return false;

    const previousSnapshot = undoStackRef.current.pop();
    if (previousSnapshot) {
      setIsCompletedModalOpen(false);
      setState((prev) => ({
        ...prev,
        currentBead: previousSnapshot.currentBead,
        completedMalas: previousSnapshot.completedMalas,
        totalJaap: previousSnapshot.totalJaap,
        lifetimeTotalJaap: previousSnapshot.lifetimeTotalJaap,
        lifetimeMalas: previousSnapshot.lifetimeMalas,
        history: previousSnapshot.history,
      }));
      return true;
    }
    return false;
  }, []);

  // Reset Current Mala
  const resetCurrentMala = useCallback(() => {
    setState((prev) => {
      undoStackRef.current.push({
        currentBead: prev.currentBead,
        completedMalas: prev.completedMalas,
        totalJaap: prev.totalJaap,
        lifetimeTotalJaap: prev.lifetimeTotalJaap,
        lifetimeMalas: prev.lifetimeMalas,
        history: { ...prev.history },
      });
      return {
        ...prev,
        currentBead: 0,
      };
    });
    setIsCompletedModalOpen(false);
  }, []);

  // Reset Today's Session
  const resetToday = useCallback(() => {
    const today = getTodayKey();
    setState((prev) => {
      const updatedHistory = { ...prev.history };
      delete updatedHistory[today];
      return {
        ...prev,
        currentBead: 0,
        completedMalas: 0,
        totalJaap: 0,
        history: updatedHistory,
      };
    });
    undoStackRef.current = [];
    setIsCompletedModalOpen(false);
  }, []);

  // Settings Updaters
  const setSelectedMantra = useCallback((mantra) => {
    setState((prev) => ({ ...prev, selectedMantra: mantra }));
  }, []);

  const addCustomMantra = useCallback((mantra) => {
    if (!mantra || !mantra.trim()) return;
    const clean = mantra.trim();
    setState((prev) => {
      if (prev.customMantras.includes(clean)) {
        return { ...prev, selectedMantra: clean };
      }
      return {
        ...prev,
        customMantras: [...prev.customMantras, clean],
        selectedMantra: clean,
      };
    });
  }, []);

  const setMalaSize = useCallback((size) => {
    setState((prev) => ({
      ...prev,
      malaSize: size,
      currentBead: Math.min(prev.currentBead, size - 1),
    }));
  }, []);

  const setSoundMode = useCallback((mode) => {
    setState((prev) => ({ ...prev, soundMode: mode }));
  }, []);

  const setVibrationEnabled = useCallback((enabled) => {
    setState((prev) => ({ ...prev, vibrationEnabled: enabled }));
  }, []);

  const setTheme = useCallback((theme) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const setDailyGoal = useCallback((goal) => {
    setState((prev) => ({ ...prev, dailyGoal: goal }));
  }, []);

  const clearAllData = useCallback(() => {
    localStorage.clear();
    setState(DEFAULT_STATE);
    undoStackRef.current = [];
    setIsCompletedModalOpen(false);
  }, []);

  const canUndo = undoStackRef.current.length > 0;

  return {
    state,
    isCompletedModalOpen,
    setIsCompletedModalOpen,
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
  };
}
