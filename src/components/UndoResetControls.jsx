import React, { useState } from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';

export function UndoResetControls({
  onUndo,
  canUndo,
  onResetMala,
  currentBead
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="flex items-center justify-center gap-6 my-1">
      {/* Undo Button */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        aria-label="पिछला जप पूर्ववत करें (Undo)"
        title="पूर्ववत करें"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all tap-bounce ${
          canUndo
            ? 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
            : 'text-[var(--text-muted)]/30 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>पूर्ववत</span>
      </button>

      {/* Reset Current Mala Button */}
      <button
        onClick={() => {
          if (currentBead > 0) {
            setShowResetConfirm(true);
          }
        }}
        disabled={currentBead === 0}
        aria-label="वर्तमान माला रीसेट करें"
        title="वर्तमान माला रीसेट"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all tap-bounce ${
          currentBead > 0
            ? 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
            : 'text-[var(--text-muted)]/30 cursor-not-allowed'
        }`}
      >
        <RotateCw className="w-3.5 h-3.5" />
        <span>रीसेट</span>
      </button>

      {/* Confirmation Dialog for Resetting Current Mala */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-[var(--bg-canvas)] border border-[var(--border-line)] rounded-2xl p-6 max-w-xs w-full shadow-xl">
            <h4 className="text-base font-devanagari font-semibold text-[var(--text-main)] text-center">
              वर्तमान माला रीसेट करें?
            </h4>
            <p className="text-xs font-devanagari text-[var(--text-muted)] text-center mt-2 leading-relaxed">
              वर्तमान गिनती शून्य (0) हो जाएगी। पूर्व में पूर्ण की गई मालाएं सुरक्षित रहेंगी।
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => {
                  onResetMala();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-devanagari text-xs font-medium"
              >
                हाँ, रीसेट करें
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-line)] text-[var(--text-muted)] font-devanagari text-xs hover:bg-[var(--bg-surface)]"
              >
                रद्द करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
