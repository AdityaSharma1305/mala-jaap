// Safe vibration wrapper for mobile haptics

export function triggerBeadHaptic(enabled = true) {
  if (!enabled || typeof window === 'undefined' || !navigator.vibrate) return;
  try {
    navigator.vibrate(15); // subtle 15ms tactile pulse
  } catch {
    // Graceful fallback if unsupported
  }
}

export function triggerCompletionHaptic(enabled = true) {
  if (!enabled || typeof window === 'undefined' || !navigator.vibrate) return;
  try {
    // Sacred rhythmic celebration vibration: unmistakable triple resonant pulse
    navigator.vibrate([80, 70, 120, 70, 180]);
  } catch {
    // Graceful fallback
  }
}
