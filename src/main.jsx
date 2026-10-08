import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { unlockAudio } from './utils/sound';

// Seamlessly unlock Web Audio on first gesture on any mobile OS (iOS Safari, Android Chrome, WebView)
if (typeof window !== 'undefined') {
  const unlockEvents = ['pointerdown', 'touchstart', 'keydown'];
  const handleUnlock = () => {
    unlockAudio();
    unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUnlock));
  };
  unlockEvents.forEach((evt) => window.addEventListener(evt, handleUnlock, { passive: true }));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
