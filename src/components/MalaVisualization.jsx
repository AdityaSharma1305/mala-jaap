import React, { useMemo } from 'react';

// Devanagari numerals converter
export function toDevanagariNumerals(num) {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (d) => devanagariDigits[Number(d)]);
}

export function MalaVisualization({
  currentBead = 0,
  malaSize = 108,
  completedMalas = 0,
  totalJaap = 0,
  showDevanagariNumbers = false,
  mantraInsignia = null
}) {
  const size = 340;
  const center = size / 2;
  const radius = 132;

  // Generate bead coordinates mathematically
  const beads = useMemo(() => {
    const list = [];
    for (let i = 0; i < malaSize; i++) {
      // 12 o'clock is -Math.PI / 2
      const angle = (i / malaSize) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      const isMilestone = (i + 1) % 27 === 0; // Quarter milestones in traditional mala
      list.push({ index: i, x, y, isMilestone });
    }
    return list;
  }, [malaSize, center, radius]);

  // Radius sizing for beads
  const baseBeadRadius = malaSize === 108 ? 3.0 : malaSize === 54 ? 4.2 : 5.8;

  return (
    <div className="relative flex flex-col items-center justify-center my-1 select-none">
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
        {/* Sacred SVG Mala */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible transition-all duration-300"
          aria-hidden="true"
        >
          <defs>
            {/* Shading Gradients for Realistic Sacred Rudraksha Beads */}
            <radialGradient id="pendingBeadGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
              <stop offset="40%" stop-color="var(--border-line)"/>
              <stop offset="100%" stop-color="var(--bg-surface)"/>
            </radialGradient>

            <radialGradient id="completedBeadGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFC875"/>
              <stop offset="30%" stop-color="#D97724"/>
              <stop offset="85%" stop-color="#A54B0E"/>
              <stop offset="100%" stop-color="#6E2D05"/>
            </radialGradient>

            <radialGradient id="activeBeadGrad" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stop-color="#FFF9E6"/>
              <stop offset="25%" stop-color="#FFB338"/>
              <stop offset="70%" stop-color="#C85A17"/>
              <stop offset="100%" stop-color="#802E00"/>
            </radialGradient>

            <radialGradient id="meruBeadGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FFEAA7"/>
              <stop offset="35%" stop-color="#DE9644"/>
              <stop offset="80%" stop-color="#9C3E07"/>
              <stop offset="100%" stop-color="#5E2002"/>
            </radialGradient>

            {/* Sacred Ambient Ring Glow */}
            <radialGradient id="sanctuaryHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#C85A17" stop-opacity="0.08"/>
              <stop offset="70%" stop-color="#C5A059" stop-opacity="0.03"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>

            {/* Drop Shadow for Beads */}
            <filter id="softBeadShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodOpacity="0.25"/>
            </filter>

            {/* Glowing filter for Active Bead */}
            <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Meditative Ambient Halo in Center */}
          <circle
            cx={center}
            cy={center}
            r={radius - 8}
            fill="url(#sanctuaryHalo)"
          />

          {/* Sacred Thread Passing Through Beads (माला का पवित्र सूत्र) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="0.9"
            strokeOpacity="0.35"
          />

          {/* Sumeru / Meru Master Guru Bead at 12 o'clock */}
          <g transform={`translate(${center}, ${center - radius - 12})`}>
            {/* Sacred Saffron Silk Tassel Lines */}
            <path
              d="M-4 -12 L0 -4 L4 -12"
              stroke="var(--accent-saffron)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="-14"
              x2="0"
              y2="-3"
              stroke="var(--accent-saffron)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            
            {/* Meru Bead Golden Cap Top */}
            <ellipse
              cx="0"
              cy="2"
              rx="4.2"
              ry="1.8"
              fill="var(--accent-gold)"
            />

            {/* Meru Guru Bead Main Sphere */}
            <circle
              cx="0"
              cy="8"
              r={baseBeadRadius + 3.2}
              fill="url(#meruBeadGrad)"
              stroke="var(--accent-gold)"
              strokeWidth="1.2"
              filter="url(#softBeadShadow)"
            />

            {/* Meru Golden Cap Bottom */}
            <ellipse
              cx="0"
              cy="13.5"
              rx="3.5"
              ry="1.4"
              fill="var(--accent-gold)"
            />
          </g>

          {/* 108 Sacred Beads */}
          {beads.map((bead) => {
            const isCompleted = bead.index < currentBead;
            const isCurrent = bead.index === currentBead;
            const isMilestone = bead.isMilestone;

            let fill = 'url(#pendingBeadGrad)';
            let stroke = 'none';
            let strokeWidth = 0;
            let r = baseBeadRadius;
            let filter = 'url(#softBeadShadow)';

            if (isCompleted) {
              fill = 'url(#completedBeadGrad)';
              r = baseBeadRadius + 0.4;
            } else if (isCurrent) {
              fill = 'url(#activeBeadGrad)';
              stroke = 'var(--accent-gold)';
              strokeWidth = 1.4;
              r = baseBeadRadius + 2.0;
              filter = 'url(#activeGlow)';
            }

            return (
              <g key={bead.index}>
                {/* Milestone spacer bead highlight */}
                {isMilestone && !isCurrent && (
                  <circle
                    cx={bead.x}
                    cy={bead.y}
                    r={r + 1.2}
                    fill="none"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                )}

                {/* Bead Sphere */}
                <circle
                  cx={bead.x}
                  cy={bead.y}
                  r={r}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  filter={filter}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Sacred Counter Sanctum */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* Subtle Devotional Watermark in center */}
          <div className="text-xs font-devanagari text-saffron-600/30 dark:text-saffron-400/20 mb-1 select-none font-semibold tracking-widest">
            {showDevanagariNumbers ? toDevanagariNumerals(currentBead) : 'ॐ'}
          </div>

          {/* Current Bead Count */}
          <span
            className="text-6xl sm:text-7xl font-editorial font-medium tracking-tight text-[var(--text-main)] transition-all duration-150 drop-shadow-sm"
            aria-live="polite"
          >
            {showDevanagariNumbers ? toDevanagariNumerals(currentBead) : currentBead}
          </span>

          {/* Sacred Fine Gold Hairline Divider */}
          <div className="w-16 sm:w-20 my-1 sm:my-1.5 flex items-center justify-center gap-1 opacity-70">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent" />
            <div className="w-1 h-1 rounded-full bg-[var(--accent-gold)]" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent" />
          </div>

          {/* Total Denominator */}
          <span className="text-sm sm:text-base font-editorial text-[var(--text-muted)] tracking-wider">
            {showDevanagariNumbers ? toDevanagariNumerals(malaSize) : malaSize}
          </span>

          {/* Completed Mala & Jaap Pill */}
          <div className="mt-2.5 px-3 py-1 rounded-full bg-[var(--bg-surface)]/80 border border-[var(--border-line)] text-xs font-devanagari text-[var(--text-muted)] flex items-center gap-1.5 shadow-sm">
            <span className="font-semibold text-[var(--text-main)]">
              {showDevanagariNumbers ? toDevanagariNumerals(completedMalas) : completedMalas} माला
            </span>
            <span className="text-[10px] opacity-40">•</span>
            <span className="text-saffron-700 dark:text-saffron-400 font-medium">
              {showDevanagariNumbers ? toDevanagariNumerals(totalJaap) : totalJaap} जप
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
