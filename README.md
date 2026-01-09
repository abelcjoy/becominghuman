# Clarity For Humans - Life Simulator

## 🎯 Overview

**Clarity For Humans** is a philosophical life simulator and death calculator that helps you understand the finite nature of time and make intentional decisions about how you spend your conscious hours.

## 🚀 Quick Start

**IMPORTANT**: This application uses ES Modules and must be served from a web server (not opened directly as a file).

### Option 1: Using the Batch File (Windows)
```bash
# Double-click start-server.bat
# Then open http://localhost:8000 in your browser
```

### Option 2: Using Python
```bash
cd cfh
python -m http.server 8000
# Open http://localhost:8000
```

### Option 3: Using Node.js
```bash
cd cfh
npx http-server -p 8000
# Open http://localhost:8000
```

### Option 4: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## ✨ Features

### 1. **Death Calculator (Core)**
- Calculates your remaining conscious time based on:
  - Date of birth
  - Country (using WHO life expectancy data)
  - Daily sleep hours (subtracts unconscious time)
- Real-time countdown showing:
  - Years, Days, Hours, Minutes, Seconds, Milliseconds remaining
  - Biological Capital (Attention Equity)
  - Daily Burn Rate
  - Live Recapture Session timer

### 2. **Life Simulator - The Chronos Protocol**
A comprehensive life simulation engine that models:

#### **Core Stats**
- Health
- Happiness
- Intelligence
- Charisma
- Wealth
- Energy

#### **Relationships** (Decay over time if not maintained)
- Family
- Friends
- Romantic
- Professional

#### **Skills** (0-100 mastery levels)
- Coding
- Writing
- Fitness
- Cooking
- Music
- Art
- Business
- Meditation

#### **Life Phases**
- Childhood (0-13)
- Adolescence (13-18)
- Young Adult (18-30)
- Adult (30-50)
- Middle Age (50-65)
- Senior (65+)

### 3. **Actions & Mechanics**

#### **Labor Market** (Trade biological time for pocket time)
- Dishwasher (14+): 8h life → 4h pocket
- Lawn Mower (12+): 4h life → 2.5h pocket
- Dog Walker (10+): 2h life → 1.5h pocket
- Grocery Bagger (16+): 6h life → 3.5h pocket

#### **The Academy** (Trade pocket time for equity multiplier)
- Self-Study Path: 5h → +5% equity
- Deep Tech Course: 20h → +25% equity
- Terminal Training: 50h → +60% equity

#### **Health & Wellness**
- Exercise: -1h → +10 Health, +3 Fitness
- Meditate: -0.5h → +8 Happiness, +10 Energy
- Rest: FREE → +30 Energy, +5 Health

#### **Legacy & Creation**
- Create Art: -5h → +10 Legacy Impact
- Write: -5h → +10 Legacy Impact
- Build Software: -5h → +10 Legacy Impact
- Compose Music: -5h → +10 Legacy Impact

#### **Relationships**
- Nurture any relationship: -2h → +10 relationship level

### 4. **Random Life Events**
The simulator triggers random events based on your current life phase:
- Positive events (new friends, promotions, achievements)
- Negative events (health scares, heartbreak, failures)
- Milestone events (birthdays, phase transitions)

### 5. **Achievements System**
Unlock achievements for:
- Reaching age milestones (18, 21, 25, 30, 40, 50, 60, 70, 80)
- Mastering skills (reaching 100 in any skill)
- Special life events

### 6. **Crisis Mode - "Crave Override"**
A 15-minute guided breathing exercise featuring:
- Physiological sigh protocol
- Visual breathing circle animation
- Crisis containment timer
- Helps manage cravings and anxiety

### 7. **Daily Reflections**
19 rotating neuroscience-based protocols including:
- Dopamine Baseline Restoration
- Parasympathetic Override
- Circadian Precision
- And more...

### 8. **The Protocol Modal**
Science-based addiction management protocols:
- Baseline Dopamine Restoration
- Parasympathetic Override (Vagus Nerve)
- Circadian Precision
- Specific modules for:
  - Digital Compulsion
  - High-Arousal Loops
  - Chemical Reward
  - Substance Baseline

## 🎮 How to Play

1. **Initial Setup**
   - Enter your date of birth
   - Select your country
   - Set your daily sleep hours
   - Click "Initialize Sequence"

2. **Understanding the Dashboard**
   - Your conscious time remaining counts down in real-time
   - The life progress bar shows your remaining time
   - Biological Capital shows your attention equity value

3. **Playing the Simulator**
   - Age increases automatically (1 minute real time = 1 year sim time)
   - Work jobs to earn pocket time (but lose biological time)
   - Spend pocket time on education to increase your equity multiplier
   - Train skills, nurture relationships, create legacy
   - Manage your energy and health
   - React to random life events

4. **Strategy Tips**
   - Balance work and education early
   - Don't neglect relationships (they decay over time)
   - Invest in skills that compound
   - Create legacy items for lasting impact
   - Rest when energy is low
   - Watch for random events and adapt

## 🧠 Philosophy

This tool is inspired by **Memento Mori** - the Stoic practice of remembering death to live more intentionally. By visualizing the finite nature of your conscious hours, you can:

- Prioritize what truly matters
- Reduce time wasted on low-value activities
- Make intentional decisions about relationships, career, and personal growth
- Understand the compound effects of daily choices

## 🔧 Technical Details

### Files Structure
```
cfh/
├── index.html          # Main HTML structure
├── styles.css          # Premium dark theme styling
├── js/
│   ├── app.js         # Main application logic
│   ├── simulator.js   # Life simulator engine
│   ├── data.js        # Life expectancy data
│   └── reflections.js # Daily reflection content
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── favicon.svg       # Icon
```

### Technologies
- Vanilla JavaScript (ES6+)
- Tailwind CSS (CDN)
- Local Storage for persistence
- Service Worker for offline support

### Data Persistence
- All simulator state is saved to localStorage
- Automatically loads previous session
- Can reset with "Reset Reality" button

## 🎨 Design Philosophy

- **Terminal Aesthetics**: Monospace fonts, minimal colors, high contrast
- **Cinematic Transitions**: Smooth animations and blur effects
- **Living UI**: Subtle pulse animations and dynamic elements
- **Premium Feel**: Glassmorphism, gradients, micro-animations

## 📊 Metrics Tracked

- Biological Age (simulated)
- Pocket Time (earned through work)
- Equity Multiplier (from education)
- 6 Core Stats
- 4 Relationship levels
- 8 Skill levels
- Career experience and salary
- Legacy impact score
- Achievements unlocked
- Life events history

## 🚀 Future Enhancements

Potential additions:
- [ ] Decision trees with lasting consequences
- [ ] Regret system for missed opportunities
- [ ] More complex career paths
- [ ] Family simulation (marriage, children)
- [ ] Financial investment system
- [ ] Health conditions and treatments
- [ ] Social media impact simulation
- [ ] Addiction recovery tracking
- [ ] Goal setting and tracking
- [ ] Data visualization charts

## 🙏 Credits

Created as a **#BecomingHuman** original project.

Inspired by:
- Stoic philosophy (Marcus Aurelius, Seneca)
- Neuroscience research (Andrew Huberman)
- Life expectancy data from WHO

## 📝 License

Personal project - use responsibly and intentionally.

---

**Remember**: This is not motivation. This is biological maintenance. You have less time than you think. Use it wisely.
