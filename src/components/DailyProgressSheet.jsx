import React, { useState } from 'react';
import { X, Target, RotateCcw } from 'lucide-react';

export function DailyProgressSheet({
  isOpen,
  onClose,
  completedMalas = 0,
  totalJaap = 0,
  dailyGoal = 5,
  onUpdateGoal,
  onResetToday
}) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal || 5);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const progressPercent = dailyGoal ? Math.min(100, Math.round((completedMalas / dailyGoal) * 100)) : null;

  const handleSaveGoal = (e) => {
    e.preventDefault();
    const val = parseInt(goalInput, 10);
    if (!isNaN(val) && val > 0) {
      onUpdateGoal(val);
    } else {
      onUpdateGoal(null);
    }
    setIsEditingGoal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border border-[var(--border-line)] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)]">
          <div>
            <h3 className="text-lg font-devanagari font-semibold text-[var(--text-main)]">
              आज का जप
            </h3>
            <p className="text-xs font-devanagari text-[var(--text-muted)]">
              दैनिक साधना विवरण
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Today's Counts Cards */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] text-center">
            <span className="text-3xl font-editorial font-medium text-[var(--text-main)]">
              {completedMalas}
            </span>
            <p className="text-xs font-devanagari text-[var(--text-muted)] mt-1">
              पूर्ण माला
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] text-center">
            <span className="text-3xl font-editorial font-medium text-saffron-700 dark:text-saffron-400">
              {totalJaap}
            </span>
            <p className="text-xs font-devanagari text-[var(--text-muted)] mt-1">
              कुल नाम जप
            </p>
          </div>
        </div>

        {/* Daily Goal Section */}
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
              <span className="text-sm font-devanagari font-medium text-[var(--text-main)]">
                दैनिक लक्ष्य
              </span>
            </div>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-xs font-devanagari text-saffron-600 hover:underline"
            >
              {isEditingGoal ? 'रद्द करें' : dailyGoal ? 'बदलें' : 'लक्ष्य तय करें'}
            </button>
          </div>

          {isEditingGoal ? (
            <form onSubmit={handleSaveGoal} className="flex gap-2 pt-1">
              <input
                type="number"
                min="1"
                max="108"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="माला संख्या (उदा. 5)"
                className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-canvas)] text-sm font-editorial text-[var(--text-main)] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-saffron-600 text-white font-devanagari text-xs font-medium"
              >
                सहेजें
              </button>
            </form>
          ) : dailyGoal ? (
            <div>
              <div className="flex justify-between text-xs font-devanagari text-[var(--text-muted)] mb-1.5">
                <span>{completedMalas} / {dailyGoal} माला</span>
                <span>{progressPercent}%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[var(--bg-canvas)] overflow-hidden border border-[var(--border-line)]">
                <div
                  className="h-full bg-saffron-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs font-devanagari text-[var(--text-muted)]">
              कोई लक्ष्य निर्धारित नहीं है।
            </p>
          )}
        </div>

        {/* Reset Today Option */}
        <div className="mt-6 pt-4 border-t border-[var(--border-line)]">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-devanagari text-[var(--text-muted)] hover:text-red-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>आज का जप रीसेट करें</span>
          </button>
        </div>

        {/* Reset Today Confirmation */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-[var(--bg-canvas)] border border-[var(--border-line)] rounded-2xl p-6 max-w-xs w-full shadow-xl">
              <h4 className="text-base font-devanagari font-semibold text-[var(--text-main)] text-center">
                आज का जप रीसेट करें?
              </h4>
              <p className="text-xs font-devanagari text-[var(--text-muted)] text-center mt-2">
                आज की पूर्ण माला और कुल जप शून्य हो जाएंगे।
              </p>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => {
                    onResetToday();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 text-white font-devanagari text-xs font-medium"
                >
                  हाँ, रीसेट करें
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-line)] text-[var(--text-muted)] font-devanagari text-xs"
                >
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
