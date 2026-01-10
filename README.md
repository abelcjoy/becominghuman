# Clarity For Humans - Life Projection Engine

## 🎯 Overview

**Clarity For Humans** is a philosophical tool that combines a **Death Calculator** with a **Time Machine** event horizon engine. It helps you visualize the finite nature of your relationships and time, forcing you to confront the reality of Actuarial Grief and make intentional decisions about how you spend your remaining conscious hours.

## 🚀 Quick Start

**IMPORTANT**: This application uses ES Modules and must be served from a web server.

### Option 1: Using the Batch File (Windows)
```bash
# Double-click start-server.bat
# Then open http://localhost:8000 in your browser
```

### Option 2: Using Node.js
```bash
cd cfh
npx http-server -p 8000
```

## ✨ Features

### 1. **Death Calculator ( The Foundation )**
- Calculates remaining conscious based on DOB, country, and sleep habits.
- **New**: Visual feedback animations when time ticks away.
- **New**: Life Progress Chart visualizing your timeline.

### 2. **The Time Machine (Projection Engine)**
- Slide into the future to see relationships age.
- Anchors parents, partners, and friends to visualize "visits remaining" (Actuarial Grief).
- **Update**: Mobile-optimized slider and responsive grid.

### 3. **Digital Atrophy Audit**
- Calculate total screen time wasted over a lifetime.
- Visualize years lost to scrolling vs. creating.

### 4. **Neurobiological Protocols**
- **Crisis Override**: 15-minute physiological sigh breathing tool.
- **PWA Support**: Installable app with offline support.
- **Sound Manager**: Subtle audio feedback (Click, Milestone, Tick).

### 5. **Data Sovereignty (New!)**
- **Save/Load System**: Export your life data to JSON.
- **Privacy First**: All data stored locally or in your exported file.
- **Keyboard Shortcuts**: Power user controls (Press `?` to view).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **SPACE** | Pause/Resume Countdown |
| **E** | Export Data |
| **I** | Import Data |
| **M** | Toggle Sound |
| **S** | Share Result |
| **C** | Enter Crisis Mode |
| **P** | Toggle Protocol |
| **R** | Reset Everything |
| **ESC** | Close Modals |

---

## 🔧 Technical Details

### Files Structure
```
cfh/
├── index.html          # Main Interface
├── styles.css          # Premium dark terminal styling
├── js/
│   ├── app.js          # Main application logic
│   ├── charts.js       # [NEW] Canvas visualization engine
│   ├── save.js         # [NEW] Export/Import manager
│   ├── sound.js        # [NEW] Web Audio API manager
│   ├── toast.js        # [NEW] Notification system
│   ├── pwa.js          # [NEW] Install prompt manager
│   ├── projection.js   # Time Machine engine
│   ├── keyboard.js     # Shortcut manager
│   └── ...
```

### New in v2.0
- **Progressive Web App (PWA)**: Installable on iOS/Android/Desktop.
- **Canvas Visualization**: Custom chart engine for battery-efficient rendering.
- **Unified Game Loop**: `requestAnimationFrame` for 60fps performance using <1% CPU.
- **Accessibility**: WCAG AA compliant with ARIA labels and focus states.

## 📊 Metrics Tracked

- **Conscious Time Remaining**: The master clock.
- **Attention Equity**: Your time converted to dollar value ($25/hr).
- **Life Timeline**: Visual progress bar of lived vs. expected time.
- **Relationship "Credits"**: Visits remaining with loved ones.

## 🙏 Credits

Created as a **#BecomingHuman** original project.

Inspired by:
- Stoic philosophy (Memento Mori)
- "The Tail End" (Tim Urban)
- Neuroscience research (Andrew Huberman)

## 📝 License

Personal project - use responsibly and intentionally.

---

**Remember**: This is not motivation. This is biological maintenance. You have less time than you think. Use it wisely.
