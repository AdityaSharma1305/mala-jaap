// LocalStorage persistence & date grouping for Mala Jaap

const STORAGE_KEY = 'mala_jaap_app_state_v1';

const HINDI_MONTHS = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

export function getTodayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getTodayKey(d);
}

export function formatDevotionalDate(dateKey) {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  if (dateKey === today) return 'आज';
  if (dateKey === yesterday) return 'कल';

  try {
    const [year, month, day] = dateKey.split('-').map(Number);
    const monthName = HINDI_MONTHS[month - 1] || '';
    return `${day} ${monthName}`;
  } catch {
    return dateKey;
  }
}

export const DEFAULT_STATE = {
  currentBead: 0,
  malaSize: 108,
  completedMalas: 0,
  totalJaap: 0,
  lifetimeTotalJaap: 0,
  lifetimeMalas: 0,
  selectedMantra: 'श्री राम',
  customMantras: [],
  soundMode: 'off',
  vibrationEnabled: true,
  theme: 'dark', // Pure serene dark theme
  dailyGoal: 5, // 5 malas default goal
  history: {},
  lastActiveDate: getTodayKey(),
};

export function loadStoredState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    const today = getTodayKey();

    // Check if day rolled over
    if (parsed.lastActiveDate !== today) {
      return {
        ...DEFAULT_STATE,
        ...parsed,
        theme: 'dark', // Enforce dark theme
        currentBead: 0,
        completedMalas: 0,
        totalJaap: 0,
        lastActiveDate: today,
      };
    }

    return {
      ...DEFAULT_STATE,
      ...parsed,
      theme: 'dark', // Enforce dark theme
    };
  } catch (err) {
    console.error('Failed to load Mala Jaap state from localStorage:', err);
    return DEFAULT_STATE;
  }
}

export function saveStoredState(state) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save Mala Jaap state:', err);
  }
}

export function clearStoredState() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear state:', err);
  }
}
