import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { unlockAudio } from './utils/sound';

// Unlock Web Audio context seamlessly on the first touch or tap
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', () => unlockAudio(), { once: true });
  window.addEventListener('keydown', () => unlockAudio(), { once: true });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
