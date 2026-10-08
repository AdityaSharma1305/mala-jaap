// Pure Web Audio API Sound Synthesizer
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

/**
 * Plays a calm, serene temple bell chime (सौम्य घंटी)
 * Crafted using natural bell harmonics (fundamental ~1046 Hz C6 + gentle harmonic ~2093 Hz C7)
 */
export function playBellSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Fundamental tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1046.5, now); // C6
    
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Over tone (subtle octave higher, giving bronze bell character)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2093.0, now); // C7
    
    gain2.gain.setValueAtTime(0.06, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.4);
    osc2.stop(now + 0.8);
  } catch (err) {
    console.debug('Audio play prevented or unavailable:', err);
  }
}

/**
 * Plays a subtle, tactile wooden rudraksha click (काष्ठ क्लिक)
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Quick wooden snap pitch drop
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

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
