import React, { useMemo } from 'react';
import { getDeityInfo } from './DeityDarshan';
import { toDevanagariNumerals } from '../utils/devanagari';

export function MalaVisualization({
  currentBead = 0,
  malaSize = 108,
  completedMalas = 0,
  totalJaap = 0,
  selectedMantra = 'श्री राम',
  showDevanagariNumbers = false,
  showDarshan = true,
}) {
  const size = 350;
  const center = size / 2;
  const radius = 138;

  const deity = getDeityInfo(selectedMantra);

  // Generate bead coordinates mathematically
  const beads = useMemo(() => {
    const list = [];
    for (let i = 0; i < malaSize; i++) {
      // 12 o'clock is -Math.PI / 2
      const angle = (i / malaSize) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      const isMilestone = (i + 1) % 27 === 0;
      list.push({ index: i, x, y, isMilestone });
    }
    return list;
  }, [malaSize, center, radius]);

  const baseBeadRadius = malaSize === 108 ? 3.2 : malaSize === 54 ? 4.6 : 6.0;

  return (
    <div className="relative flex flex-col items-center justify-center my-1 select-none max-w-full">
      <div className="relative w-[290px] h-[290px] min-[390px]:w-[340px] min-[390px]:h-[340px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
        {/* Divine Background Glow for Active Deity */}
        <div
          className={`absolute inset-4 rounded-full bg-gradient-to-tr ${deity.bgAura} blur-2xl pointer-events-none transition-all duration-700`}
        />

        {/* Central Deity Darshan Image (Inside the Mala Ring) */}
        {showDarshan && (
          <div className="absolute w-[190px] h-[190px] min-[390px]:w-[225px] min-[390px]:h-[225px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden border-2 border-[var(--accent-gold)] shadow-2xl z-0 transition-transform duration-300">
            {/* Deity Portrait */}
            <img
              src={deity.image}
              alt={deity.name}
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] transition-opacity duration-500"
            />
            
            {/* Subtle Gradient Vignette to blend image and numbers */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Sacred Gold Frame Rim Overlay */}
            <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-gold)]/60 pointer-events-none" />
          </div>
        )}

        {/* Sacred SVG Mala Ring */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible z-10 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            {/* Realistic Rudraksha Shading Gradients */}
            <radialGradient id="pendingBeadGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7"/>
              <stop offset="45%" stopColor="var(--border-line)"/>
              <stop offset="100%" stopColor="var(--bg-surface)"/>
            </radialGradient>

            <radialGradient id="completedBeadGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFE082"/>
              <stop offset="30%" stopColor="#E67E22"/>
              <stop offset="85%" stopColor="#B3541E"/>
              <stop offset="100%" stopColor="#6E2D05"/>
            </radialGradient>

            <radialGradient id="activeBeadGrad" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="20%" stopColor="#FFF176"/>
              <stop offset="60%" stopColor="#F59E0B"/>
              <stop offset="100%" stopColor="#B45309"/>
            </radialGradient>

            <radialGradient id="meruBeadGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF59D"/>
              <stop offset="35%" stopColor="#F59E0B"/>
              <stop offset="80%" stopColor="#B45309"/>
              <stop offset="100%" stopColor="#78350F"/>
            </radialGradient>

            {/* Drop Shadow for Beads */}
            <filter id="softBeadShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="0.9" floodOpacity="0.35"/>
            </filter>

            {/* Glowing filter for Active Bead */}
            <filter id="activeGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.0" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Golden Thread Passing Through Beads */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Sumeru / Meru Master Guru Bead at 12 o'clock */}
          <g transform={`translate(${center}, ${center - radius - 14})`}>
            {/* Sacred Silk Tassel Cords */}
            <path
              d="M-5 -14 L0 -5 L5 -14"
              stroke="#D97724"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="-16"
              x2="0"
              y2="-4"
              stroke="#D97724"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            
            {/* Golden Cap Top */}
            <ellipse
              cx="0"
              cy="2"
              rx="4.8"
              ry="2.0"
              fill="#D4AF37"
            />

            {/* Meru Guru Bead Main Sphere */}
            <circle
              cx="0"
              cy="9"
              r={baseBeadRadius + 3.6}
              fill="url(#meruBeadGrad)"
              stroke="#D4AF37"
              strokeWidth="1.4"
              filter="url(#softBeadShadow)"
            />

            {/* Golden Cap Bottom */}
            <ellipse
              cx="0"
              cy="15"
              rx="4.0"
              ry="1.6"
              fill="#D4AF37"
            />
          </g>

          {/* 108 Sacred Beads */}
          {beads.map((bead) => {
            const isCompleted = bead.index < currentBead;
            const isCurrent = bead.index === currentBead;
            const isMilestone = bead.isMilestone;

            let filter = isCurrent ? 'url(#activeGlow)' : undefined;

            if (isCompleted) {
              fill = 'url(#completedBeadGrad)';
              r = baseBeadRadius + 0.5;
            } else if (isCurrent) {
              fill = 'url(#activeBeadGrad)';
              stroke = '#FFFFFF';
              strokeWidth = 1.4;
              r = baseBeadRadius + 2.5;
            }

            return (
              <g key={bead.index}>
                {/* Milestone spacer bead highlight */}
                {isMilestone && !isCurrent && (
                  <circle
                    cx={bead.x}
                    cy={bead.y}
                    r={r + 1.4}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.0"
                    opacity="0.8"
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

        {/* Floating Sacred Devotional Counter Plaque */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 sm:pb-8 text-center pointer-events-none z-20">
          <div className="bg-black/65 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border border-amber-400/50 shadow-xl flex flex-col items-center">
            {/* Current Bead Count & Denominator */}
            <div className="flex items-baseline gap-1.5 leading-none">
              <span
                className="text-3xl sm:text-4xl font-editorial font-bold text-amber-100 tracking-tight drop-shadow-md"
                aria-live="polite"
              >
                {showDevanagariNumbers ? toDevanagariNumerals(currentBead) : currentBead}
              </span>
              <span className="text-sm sm:text-base font-editorial text-amber-300/80">
                / {showDevanagariNumbers ? toDevanagariNumerals(malaSize) : malaSize}
              </span>
            </div>

            {/* Completed Mala & Total Jaap in Hindi */}
            <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[11px] font-devanagari text-amber-200/90 font-medium">
              <span>{showDevanagariNumbers ? toDevanagariNumerals(completedMalas) : completedMalas} माला</span>
              <span className="opacity-40">•</span>
              <span>{showDevanagariNumbers ? toDevanagariNumerals(totalJaap) : totalJaap} जप</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
