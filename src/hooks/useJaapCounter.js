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

      // Keep undo stack within reasonable bounds (50 actions)
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

        const updatedHistory = {
          ...prev.history,
          [today]: {
            malas: newCompletedMalas,
            jaap: newTotalJaap,
          },
        };

        // Feedback
        playJaapSound(prev.soundMode);
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

  // Continue to Next Mala after completion (saves snapshot to undo stack)
  const startNextMala = useCallback(() => {
    setState((prev) => {
      undoStackRef.current.push({
        currentBead: prev.currentBead,
        completedMalas: prev.completedMalas,
        totalJaap: prev.totalJaap,
        lifetimeTotalJaap: prev.lifetimeTotalJaap,
        lifetimeMalas: prev.lifetimeMalas,
        history: { ...prev.history },
        isCompletedModalOpen: true,
      });
      return {
        ...prev,
        currentBead: 0,
      };
    });
    setIsCompletedModalOpen(false);
  }, []);

  // Undo Latest Action (with boundary and completion handling)
  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return false;

    const previousSnapshot = undoStackRef.current.pop();
    if (previousSnapshot) {
      setIsCompletedModalOpen(previousSnapshot.isCompletedModalOpen || false);
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
        isCompletedModalOpen: false,
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

  // Settings Updaters with sanitization
  const setSelectedMantra = useCallback((mantra) => {
    if (!mantra) return;
    setState((prev) => ({ ...prev, selectedMantra: String(mantra).slice(0, 60) }));
  }, []);

  const addCustomMantra = useCallback((mantra) => {
    if (!mantra || typeof mantra !== 'string') return;
    // Sanitize: strip script/html tags, trim and bound length to 50 chars
    const clean = mantra.replace(/[<>{}]/g, '').trim().slice(0, 50);
    if (!clean) return;

    setState((prev) => {
      if (prev.customMantras.includes(clean)) {
        return { ...prev, selectedMantra: clean };
      }
      // Bound max custom mantras to 20
      const updated = [...prev.customMantras, clean].slice(-20);
      return {
        ...prev,
        customMantras: updated,
        selectedMantra: clean,
      };
    });
  }, []);

  const setMalaSize = useCallback((size) => {
    const validSizes = [108, 54, 27];
    const targetSize = validSizes.includes(size) ? size : 108;
    setState((prev) => ({
      ...prev,
      malaSize: targetSize,
      currentBead: Math.min(prev.currentBead, targetSize - 1),
    }));
  }, []);

  const setSoundMode = useCallback((mode) => {
    const validModes = ['off', 'bell', 'click'];
    setState((prev) => ({
      ...prev,
      soundMode: validModes.includes(mode) ? mode : 'off',
    }));
  }, []);

  const setVibrationEnabled = useCallback((enabled) => {
    setState((prev) => ({ ...prev, vibrationEnabled: Boolean(enabled) }));
  }, []);

  const setTheme = useCallback((theme) => {
    const validThemes = ['light', 'dark', 'sandalwood'];
    setState((prev) => ({
      ...prev,
      theme: validThemes.includes(theme) ? theme : 'light',
    }));
  }, []);

  const setDailyGoal = useCallback((goal) => {
    const parsed = goal ? Math.max(1, Math.min(108, parseInt(goal, 10))) : null;
    setState((prev) => ({ ...prev, dailyGoal: isNaN(parsed) ? null : parsed }));
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
