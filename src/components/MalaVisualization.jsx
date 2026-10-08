import React, { useMemo } from 'react';

export function MalaVisualization({
  currentBead = 0,
  malaSize = 108,
  completedMalas = 0,
  totalJaap = 0,
}) {
  const size = 320;
  const center = size / 2;
  const radius = 124;

  // Generate bead coordinates mathematically
  const beads = useMemo(() => {
    const list = [];
    for (let i = 0; i < malaSize; i++) {
      // Start from 12 o'clock (-PI/2) and rotate clockwise
      const angle = (i / malaSize) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      list.push({ index: i, x, y });
    }
    return list;
  }, [malaSize, center, radius]);

  // Bead radius sizing based on mala size so 108 beads look crisp, not cluttered
  const beadRadius = malaSize === 108 ? 2.6 : malaSize === 54 ? 3.8 : 5.0;

  return (
    <div className="relative flex flex-col items-center justify-center my-2 sm:my-4 select-none">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* SVG Mala Ring */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full transform transition-all duration-300"
          aria-hidden="true"
        >
          {/* Subtle guide track circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-line)"
            strokeWidth="0.8"
            strokeDasharray="2 6"
            opacity="0.6"
          />

          {/* Sumeru / Meru Master Bead at Top (12 o'clock) */}
          <g transform={`translate(${center}, ${center - radius - 10})`}>
            {/* Sacred knot tassel */}
            <line
              x1="0"
              y1="4"
              x2="0"
              y2="-6"
              stroke="var(--accent-saffron)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Meru Bead */}
            <circle
              cx="0"
              cy="7"
              r={beadRadius + 2}
              fill="var(--accent-saffron)"
              stroke="var(--bg-canvas)"
              strokeWidth="1"
            />
          </g>

          {/* Render individual beads */}
          {beads.map((bead) => {
            const isCompleted = bead.index < currentBead;
            const isCurrent = bead.index === currentBead;

            let fill = 'var(--border-line)';
            let stroke = 'transparent';
            let strokeWidth = 0;
            let r = beadRadius;

            if (isCompleted) {
              fill = 'var(--accent-saffron)';
              r = beadRadius + 0.3;
            } else if (isCurrent) {
              fill = 'var(--accent-gold)';
              stroke = 'var(--accent-saffron)';
              strokeWidth = 1.2;
              r = beadRadius + 1.2;
            }

            return (
              <circle
                key={bead.index}
                cx={bead.x}
                cy={bead.y}
                r={r}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                className="transition-colors duration-200"
              />
            );
          })}
        </svg>

        {/* Central Counter Display (Classic Sacred Layout) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* Current Bead Count */}
          <span
            className="text-5xl sm:text-6xl font-editorial font-normal tracking-tight text-[var(--text-main)] transition-all duration-150"
            aria-live="polite"
          >
            {currentBead}
          </span>

          {/* Quiet Divider */}
          <div className="w-16 sm:w-20 my-1 sm:my-1.5 border-t border-[var(--border-line)] opacity-80" />

          {/* Total Beads in Mala */}
          <span className="text-sm sm:text-base font-editorial text-[var(--text-muted)] tracking-wider">
            {malaSize}
          </span>

          {/* Subtle Completed Summary Below Denominator */}
          <div className="mt-3 text-xs sm:text-sm font-devanagari text-[var(--text-muted)] flex items-center gap-1.5 opacity-90">
            <span>{completedMalas} माला</span>
            <span className="text-[10px] opacity-60">•</span>
            <span>{totalJaap} जप</span>
          </div>
        </div>
      </div>
    </div>
  );
}
