import React from 'react';
import { X, Calendar, Sparkles } from 'lucide-react';
import { formatDevotionalDate } from '../utils/storage';

export function HistorySheet({
  isOpen,
  onClose,
  history = {},
  lifetimeTotalJaap = 0,
  lifetimeMalas = 0
}) {
  if (!isOpen) return null;

  // Sort dates descending (newest first)
  const sortedDates = Object.keys(history).sort((a, b) => b.localeCompare(a));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[var(--bg-canvas)] border-t sm:border border-[var(--border-line)] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
        {/* Handle for mobile */}
        <div className="w-10 h-1 bg-[var(--border-line)] rounded-full mx-auto mb-4 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-line)] shrink-0">
          <div>
            <h3 className="text-lg font-devanagari font-semibold text-[var(--text-main)]">
              जप इतिहास
            </h3>
            <p className="text-xs font-devanagari text-[var(--text-muted)]">
              साधना का शांत विवरण
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lifetime Overview Badge */}
        <div className="my-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] flex items-center justify-around shrink-0">
          <div className="text-center">
            <span className="text-2xl font-editorial font-medium text-[var(--text-main)]">
              {lifetimeMalas}
            </span>
            <p className="text-xs font-devanagari text-[var(--text-muted)] mt-0.5">
              कुल मालाएं
            </p>
          </div>
          <div className="w-px h-8 bg-[var(--border-line)]" />
          <div className="text-center">
            <span className="text-2xl font-editorial font-medium text-saffron-700 dark:text-saffron-400">
              {lifetimeTotalJaap}
            </span>
            <p className="text-xs font-devanagari text-[var(--text-muted)] mt-0.5">
              कुल नाम जप
            </p>
          </div>
        </div>

        {/* List of Previous Days */}
        <div className="overflow-y-auto space-y-2 pr-1 flex-1">
          {sortedDates.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-devanagari">अभी कोई पिछला जप दर्ज नहीं है।</p>
              <p className="text-xs font-devanagari mt-1 opacity-70">
                साधना आरंभ करें, विवरण यहाँ सुरक्षित रहेगा।
              </p>
            </div>
          ) : (
            sortedDates.map((dateKey) => {
              const record = history[dateKey];
              const dateLabel = formatDevotionalDate(dateKey);

              return (
                <div
                  key={dateKey}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-line)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-devanagari font-medium text-[var(--text-main)]">
                      {dateLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-devanagari">
                    <span className="text-[var(--text-main)] font-semibold">
                      {record.malas} <span className="font-normal text-[var(--text-muted)]">माला</span>
                    </span>
                    <span className="text-saffron-700 dark:text-saffron-400 font-semibold">
                      {record.jaap} <span className="font-normal text-[var(--text-muted)]">जप</span>
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
