# 🕉️ Mala Jaap (माला जप)
> **जप में मन, मन में नाम।**  
> *A tranquil, human-designed digital prayer space for naam-jap and meditation.*

---

## ✨ Design Philosophy
Mala Jaap is engineered to recreate the calm, simplicity, and reverence of traditional naam-jap while removing the need to physically carry a mala.

- **Devotion First, Technology Invisible**: The interface disappears while the prayer remains.
- **Pure Sacred Aesthetics**: Warm handmade paper textures, genuine Devanagari typography (`Noto Serif Devanagari`), and quiet editorial styling.
- **Zero Gamification**: No aggressive streaks, no leaderboards, no fireworks, no confetti.
- **Ergonomic One-Handed Interaction**: Large thumb-friendly **जप** target positioned at the lower third of the mobile screen.
- **Zero Latency Audio & Haptics**: Native Web Audio API synthesizer generates soft temple bell chimes and wooden bead clicks without loading external audio files.

---

## 🛠️ Features

- 📿 **Accurate Bead Logic**: Configurable 108 (पूर्ण माला), 54 (अर्ध माला), or 27 (सुमिरनी) beads.
- ⭕ **Subtle Circular SVG Mala**: Real-time trigonometric bead progression featuring the Sumeru (Meru Guru bead) at the apex.
- ↩️ **Atomic Multi-Level Undo**: Easily reverse accidental double-taps—even across mala boundaries, restoring count, bead, and daily records.
- 🙏 **Quiet Completion State**: Dignified *"एक माला पूर्ण हुई"* notice with seamless continuation to the next mala.
- 🕉️ **Sacred Mantras**: Default *श्री राम*, *ॐ नमः शिवाय*, *राधे राधे*, *श्री कृष्ण*, *हरे कृष्ण*, *ॐ हनुमते नमः*, *गायत्री मंत्र*, plus custom mantra addition.
- 🎨 **Devotional Themes**:
  - **हस्तनिर्मित कागज़ (Light Ivory)**: Warm paper texture for day practice.
  - **संध्या दीप (Temple Night Dark)**: Deep warm charcoal and flame kesariya.
  - **चंदन (Sandalwood)**: Traditional warm wooden tone.
- 📊 **Subtle History & Goal**: Chronological date-grouped log (*आज*, *कल*, etc.) and optional daily goal progress bar.
- ⚡ **Offline PWA**: Full offline functionality, home screen installable, instant load.

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Deployment (Vercel)
1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for mala-jaap MVP"
   git remote add origin https://github.com/<your-username>/mala-jaap.git
   git push -u origin main
   ```
2. Import repository in [Vercel](https://vercel.com):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploy!
