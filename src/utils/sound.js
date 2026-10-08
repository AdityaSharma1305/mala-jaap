// Premium Web Audio API Sound Synthesizer
// Completely zero external audio assets, works 100% offline with zero latency

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

/**
 * Plays a rich, resonant temple bell chime (मंदिर की कांस्य घंटी)
 * Crafted using authentic multi-harmonic bronze frequencies:
 * Fundamental ~1046.5 Hz (C6), minor third ~1244.5 Hz (D#6), fifth ~1567.9 Hz (G6), octave ~2093 Hz (C7)
 */
export function playBellSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Master gain for soft, respectful volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.22, now);
    masterGain.connect(ctx.destination);

    // Multi-harmonic frequencies of a sacred temple gong / bell
    const harmonics = [
      { freq: 1046.5, gain: 0.16, decay: 1.8 }, // Fundamental C6
      { freq: 1244.5, gain: 0.08, decay: 1.2 }, // Minor overtone
      { freq: 1568.0, gain: 0.09, decay: 1.4 }, // Perfect 5th
      { freq: 2093.0, gain: 0.06, decay: 0.9 }, // Octave C7
      { freq: 3136.0, gain: 0.03, decay: 0.5 }, // High shimmer
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      g.gain.setValueAtTime(gain, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(g);
      g.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.debug('Audio play prevented:', err);
  }
}

/**
 * Plays a soft singing bowl resonant hum on mala completion
 */
export function playSingingBowlChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now); // 528 Hz - sacred miracle Solfeggio frequency

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  } catch (err) {
    console.debug('Singing bowl audio prevented:', err);
  }
}

/**
 * Plays a subtle, tactile wooden rudraksha click (काष्ठ रुद्राक्ष ध्वनि)
 * Mimics organic wood beads knocking together
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Body knock oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.038);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.042);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (err) {
    console.debug('Audio click prevented:', err);
  }
}

/**
 * Dispatches sound according to selected mode
 */
export function playJaapSound(mode) {
  if (mode === 'bell') {
    playBellSound();
  } else if (mode === 'click') {
    playClickSound();
  }
}
