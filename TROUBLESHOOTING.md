# Troubleshooting Guide - Clarity For Humans

## ❌ Common Issues & Solutions

### **Issue 1: Page loads but nothing happens / Country dropdown is empty**

**Cause**: You're opening the file directly (`file://` protocol) instead of using a web server.

**Solution**:
1. **Windows**: Double-click `start-server.bat`
2. **Python**: Run `python -m http.server 8000` in the project folder
3. **Node.js**: Run `npx http-server -p 8000` in the project folder
4. **VS Code**: Install Live Server extension, right-click `index.html`, select "Open with Live Server"

Then open `http://localhost:8000` in your browser.

---

### **Issue 2: "Cannot load module" or CORS errors in console**

**Cause**: Same as Issue 1 - ES Modules require a web server.

**Solution**: Use one of the server options above.

---

### **Issue 3: Simulator not showing up after initialization**

**Cause**: The simulator is hidden by default and only shows after you click "Initialize Sequence".

**Solution**:
1. Enter your date of birth
2. Select a country
3. Set sleep hours (default is 8)
4. Click "Initialize Sequence"
5. Scroll down to see the simulator

---

### **Issue 4: Actions are disabled / grayed out**

**Possible Causes**:
- **Jobs**: You're too young for that job (check minimum age)
- **Education**: You don't have enough pocket time
- **Health actions**: You don't have enough pocket time or energy

**Solution**: Work jobs to earn pocket time, or rest to recover energy.

---

### **Issue 5: Relationships are decreasing**

**Cause**: This is intentional! Relationships decay if not maintained.

**Solution**: Click "Nurture" button on relationships regularly (costs 2h pocket time).

---

### **Issue 6: Energy is at 0 and can't work**

**Cause**: You've exhausted your energy through work or exercise.

**Solution**: Click the "Rest" button (it's FREE and restores +30 energy).

---

### **Issue 7: Age is increasing too fast**

**Cause**: The simulator runs at 1 year per minute by default (for testing).

**Solution**: This is intentional for demonstration. To change it:
1. Open `js/simulator.js`
2. Find line 91: `const realSecondsPerSimYear = 60;`
3. Change 60 to a higher number (e.g., 600 = 1 year per 10 minutes)

---

### **Issue 8: Want to reset everything**

**Solution**:
1. Scroll to bottom of the page
2. Click "Reset Reality" button
3. This clears all data and reloads the page

---

### **Issue 9: Browser console shows errors**

**Common Errors**:

**"Failed to load module script"**
- You need to use a web server (see Issue 1)

**"Cannot read property 'state' of undefined"**
- The simulator hasn't initialized yet
- Make sure you clicked "Initialize Sequence"

**"localStorage is not defined"**
- Your browser has localStorage disabled
- Enable it in browser settings

---

### **Issue 10: Batch file doesn't work (Windows)**

**Possible Causes**:
- Python/Node.js not installed
- Python/Node.js not in PATH

**Solution**:
1. Install Python: https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"
2. OR install Node.js: https://nodejs.org/
3. Restart your terminal/command prompt
4. Try running the batch file again

---

### **Issue 11: Events not appearing**

**Cause**: Events are random (10% chance every 10 seconds).

**Solution**: Wait a bit, they'll appear. Check the "Life Events Log" section at the bottom of the simulator.

---

### **Issue 12: Achievements not unlocking**

**Possible Causes**:
- You haven't reached the milestone yet
- Achievement already unlocked (check event log)

**Milestones**:
- Age: 18, 21, 25, 30, 40, 50, 60, 70, 80
- Skills: Reach 100 in any skill

---

### **Issue 13: Can't see the simulator section**

**Cause**: The simulator section is below the countdown. You need to scroll down.

**Solution**: Scroll down after clicking "Initialize Sequence".

---

### **Issue 14: Pocket time is negative or weird**

**Cause**: You spent more than you had.

**Solution**: This shouldn't happen (actions are disabled when you don't have enough). If it does, click "Reset Reality" and report the bug.

---

### **Issue 15: Page is slow or laggy**

**Possible Causes**:
- Too many intervals running
- Browser performance issues

**Solution**:
1. Close other browser tabs
2. Refresh the page
3. Use a modern browser (Chrome, Firefox, Edge)

---

## 🔧 Developer Console

To check for errors:
1. Press `F12` in your browser
2. Click the "Console" tab
3. Look for red error messages
4. Copy the error and search for it in this guide

---

## 📞 Still Having Issues?

If none of these solutions work:

1. **Check the browser console** for specific error messages
2. **Try a different browser** (Chrome, Firefox, Edge)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Disable browser extensions** (especially ad blockers)
5. **Make sure you're using a web server** (not file://)

---

## ✅ How to Verify It's Working

You know it's working correctly when:
1. ✅ Country dropdown has options
2. ✅ After clicking "Initialize Sequence", you see the countdown
3. ✅ You can scroll down and see the simulator
4. ✅ The "Current Biological Age" number increases
5. ✅ You can click buttons and see changes
6. ✅ Events appear in the log
7. ✅ Stats change when you perform actions

---

## 🎯 Quick Test

After starting the server and opening the page:
1. Enter DOB: `1990-01-01`
2. Select Country: `United States`
3. Sleep: `8`
4. Click "Initialize Sequence"
5. Scroll down
6. Click "Rest" button (should work immediately)
7. Wait 1 minute (age should increase by 1 year)
8. Check if events appear in the log

If all of this works, everything is functioning correctly!

---

**Last Updated**: January 9, 2026
