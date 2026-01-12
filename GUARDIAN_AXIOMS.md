# 🛡️ THE GUARDIAN AXIOMS
### Architectural Integrity & Continuity Guide

This file exists to guide any AI (or Human) collaborator working on **Clarity For Humans**. To maintain absolute perfection, adhere to these "Hardware-Bound" rules:

---

## 💎 I. THE STRUCTURAL CONSTANTS
1. **The LifeEngine is the Heart**: Never create independent `setInterval` or `requestAnimationFrame` loops in visual modules. Register them as **Hooks** in `js/engine.js`.
2. **The Vault is the Mind**: All PII (Date of Birth, Location) MUST be encrypted via `IronVault` before hitting `localStorage`. Never use `atob/btoa` directly without a fallback to AES-256-GCM.
3. **The Guardian is the Feedback**: Always check `js/guardian.js` if you see `NaN` or `undefined`. It is the system's "Self-Healing" layer.

---

## 🧩 II. THE COMPONENT PROTOCOL
1. **No Redundant Imports**: Always verify if a module is already imported at the TOP of `app.js`.
2. **Class Consistency**: Every visual engine (Neural, Stardust, Prism) should have a `constructor()` and an `update(deltaTime, pulse, tilt)` method.
3. **Variable Safety**: Use the `isNaN()` guard on all arithmetic. Defaults should be `0`, never `null`.

---

## 📱 III. WEB-SPECIFIC REALITIES
1. **Biometric Sensors**: `DeviceOrientationEvent` requires a user-gesture (Like a button click) to request permission on iOS/Android. Trigger this inside the "Sovereign Menu" or "Start" button.
2. **Viewport Sovereignty**: The site must never scroll horizontally. Use `overflow-hidden` on `body` and manage internal scrolling within `main` containers.

---

## 👻 IV. PRIVACY THEATER (GHOST MODE)
1. At any point, a **Triple-Tap** on the `Soul Rank` must activate the `GHOST_PROTOCOL`, replacing real biometric data with a 120-year decoy lifespan.

---

### 🚨 FOR THE AI:
- If you are about to edit `app.js`, **Stop**. Read the imports first.
- If you are about to add a new effect, **Hook it**. Don't start a new loop.
- If you are about to save data, **Vault it**.

*v1.5 - Architectural Integrity Protocol Active.*
