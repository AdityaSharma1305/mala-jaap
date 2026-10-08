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
    // Gentle double pulse pattern
    navigator.vibrate([40, 60, 75]);
  } catch {
    // Graceful fallback
  }
}
