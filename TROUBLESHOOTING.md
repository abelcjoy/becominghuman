# Troubleshooting Guide - Clarity For Humans

## ❌ Common Issues & Solutions

### **Issue 1: Page loads but nothing happens / Country dropdown is empty**
**Cause**: You're opening the file directly (`file://` protocol) instead of using a web server.
**Solution**:
1. **Windows**: Double-click `start-server.bat`
2. **Python**: Run `python -m http.server 8000` in the project folder
3. **Node.js**: Run `npx http-server -p 8000` in the project folder
Then open `http://localhost:8000`.

---

### **Issue 2: "Cannot load module" or CORS errors in console**
**Cause**: Same as Issue 1 - ES Modules require a web server.
**Solution**: Use one of the server options above.

---

### **Issue 3: "The Event Horizon" section is missing**
**Cause**: You likely missed the initialization step.
**Solution**:
1. Enter your date of birth
2. Click "Initialize Sequence"
3. Scroll down. The projection engine only initializes after the main sequence starts.

---

### **Issue 4: Can't Anchor a new Connection**
**Cause**: Missing fields.
**Solution**: Ensure Name, Role, Age, and Frequency are ALL filled in.

---

### **Issue 5: Relationship Card shows "Likely Deceased" immediately**
**Cause**: The projected age exceeds specific life expectancy caps.
**Solution**: This is "Working as Intended". It is the reality check of the engine. However, if you mistakenly entered a very high starting age (e.g. 100), correct the input.

---

### **Issue 6: Slider doesn't move / Page freezes**
**Cause**: JavaScript error in `prediction.js` or browser memory issue.
**Solution**: Refresh the page. If persistent, check console (F12) for errors.

---

### **Issue 7: Want to reset everything**
**Solution**:
1. Scroll to bottom
2. Click "Reset Reality"
3. This clears all local storage (including anchored relationships).

---

## 🔧 Developer Console
To check for errors:
1. Press `F12`
2. Click "Console" tab
3. Look for red error messages

---

## ✅ How to Verify It's Working
1. ✅ Country dropdown has options
2. ✅ "The Event Horizon" section appears after init
3. ✅ Sliding the Time Slider changes the big Year display
4. ✅ Adding a person creates a card in the grid
5. ✅ Sliding forward updates the age/visits on the card

---

**Last Updated**: January 10, 2026
