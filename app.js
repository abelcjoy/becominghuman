
// --- Global Declarations ---
let globalPosts = [];
let db = null;
let messaging = null;

// Firebase Init
try {
    const firebaseConfig = {
        apiKey: "AIzaSyCiJbxoviq2H7AkxrVIXmxwPLNeIwWJOXM",
        authDomain: "cfh-protocol.firebaseapp.com",
        projectId: "cfh-protocol",
        storageBucket: "cfh-protocol.firebasestorage.app",
        messagingSenderId: "576464528755",
        appId: "1:576464528755:web:6aba2a06731c3dbb68d106"
    };
    firebase.initializeApp(firebaseConfig);
    messaging = firebase.messaging();
    db = firebase.firestore();
    console.log("Firebase initialized.");
} catch (e) {
    console.error("Firebase Init Error:", e);
    alert("Database connection failed. Please reload.");
}

// --- Navigation Logic (Global) ---
const screens = [
    'entry-screen', 'selection-screen', 'about-screen',
    'privacy-screen', 'terms-screen', 'utility-screen'
];

window.showScreen = (screenId) => {
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === screenId) ? 'flex' : 'none';
    });
};

// --- Protocol Navigation (Global) ---
window.openProtocol = (category) => {
    const selector = document.getElementById('protocol-selector');
    const detailView = document.getElementById('protocol-detail');
    const notifyPrompt = document.getElementById('notification-prompt');
    const notifyText = document.getElementById('notification-text');
    const notifyBtn = document.getElementById('enable-alerts');

    // Switch Views
    if (selector) selector.style.display = 'none';
    if (detailView) detailView.style.display = 'flex';

    // Render Data
    renderFeed(category);

    // Update Notifications UI
    if (notifyPrompt) {
        notifyPrompt.style.display = 'block';

        let isActive = false;
        if (Notification && Notification.permission === 'granted') isActive = true;

        if (isActive) {
            if (notifyText) notifyText.textContent = 'Live Alerts are Active.';
            if (notifyBtn) {
                notifyBtn.textContent = 'ALERTS ON';
                notifyBtn.style.opacity = '0.5';
                notifyBtn.disabled = true;
            }
        } else {
            // Category specific text
            if (notifyText) {
                if (category === 'P.M.O. Recovery') {
                    notifyText.textContent = 'Get daily recovery advice.';
                } else {
                    notifyText.textContent = 'Get alerts for new updates.';
                }
            }
            if (notifyBtn) {
                notifyBtn.textContent = 'ENABLE LIVE ALERTS';
                notifyBtn.style.opacity = '1';
                notifyBtn.disabled = false;
            }
        }
    }

    // Clear Badge
    if ('clearAppBadge' in navigator) navigator.clearAppBadge().catch(() => { });
};

// --- Feed Rendering (Global) ---
window.renderFeed = (filterCategory = null) => {
    const feed = document.getElementById('advice-feed');
    if (!feed) return;
    feed.innerHTML = '';

    let hasContent = false;

    if (globalPosts.length === 0) {
        feed.innerHTML = `<div style="text-align:center; color:#888; margin-top:2rem; font-size:0.8rem;">
            LOADING PROTOCOL DATA...<br><span style="font-size:0.6rem; opacity:0.5;">(If this persists, please reload)</span>
         </div>`;
        // If still empty after 2s, show No Content
        setTimeout(() => {
            if (globalPosts.length === 0) {
                feed.innerHTML = `<div style="text-align:center; color:#888; margin-top:2rem; font-size:0.8rem;">NO CONTENT AVAILABLE.<br>PLEASE CHECK BACK LATER.</div>`;
            }
        }, 4000);
        return;
    }

    globalPosts.forEach((item, index) => {
        if (!filterCategory || item.category === filterCategory) {
            hasContent = true;
            const card = document.createElement('div');
            card.className = 'advice-card';

            const isLong = item.text.length > 250;
            const displayText = isLong ? item.text.substring(0, 250) + '...' : item.text;

            card.innerHTML = `
                <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em;">${item.date || ''}</div>
                <div class="advice-content" style="font-size:0.95rem; line-height:1.6; color: #000; font-weight: 400; overflow-wrap: break-word;">${displayText}</div>
                ${isLong ? `<button class="read-more-toggle" onclick="toggleReadMore(this, '${index}')">READ MORE</button>` : ''}
                ${item.link ? `<a href="${item.link}" target="_blank" class="link-preview">VIEW_EXTERNAL_RESOURCE</a>` : ''}
            `;
            feed.appendChild(card);
        }
    });

    if (!hasContent) {
        feed.innerHTML = `<div style="text-align:center; color:#888; margin-top:2rem; font-size:0.8rem;">NO CONTENT FOUND FOR THIS CATEGORY.</div>`;
    }
};

window.toggleReadMore = (btn, index) => {
    const contentDiv = btn.previousElementSibling;
    const currentText = contentDiv.textContent;
    if (btn.textContent === 'READ MORE') {
        const item = globalPosts.find(p => p.text.includes(currentText.substring(0, 50)));
        if (item) {
            contentDiv.textContent = item.text;
            btn.textContent = 'READ LESS';
        }
    } else {
        const item = globalPosts.find(p => p.text === currentText);
        if (item) {
            contentDiv.textContent = item.text.substring(0, 250) + '...';
            btn.textContent = 'READ MORE';
        }
    }
};

// --- Main Init Event ---
document.addEventListener('DOMContentLoaded', () => {

    // Subscribe to DB
    if (db) {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            globalPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Re-render if detail view is open
            const detailView = document.getElementById('protocol-detail');
            if (detailView && detailView.style.display === 'flex') {
                // Determine category from current state? Harder without state manamgent.
                // Just render all for now or P.M.O by default if user is there.
                // Safest to just keep current view static or try to refresh:
                renderFeed('P.M.O. Recovery'); // Since single category app now
            }
            if (document.getElementById('admin-panel').style.display === 'flex') {
                renderAdminList();
            }
        });
    }

    // Attach Listeners
    const enterCfhBtn = document.getElementById('enter-cfh');
    const installBtn = document.getElementById('install-btn');
    const backBtn = document.getElementById('back-home');
    const backToSelect = document.getElementById('back-to-selection');
    const notifyBtn = document.getElementById('enable-alerts');

    if (enterCfhBtn) {
        enterCfhBtn.addEventListener('click', () => {
            showScreen('selection-screen');
            const selector = document.getElementById('protocol-selector');
            const detailView = document.getElementById('protocol-detail');
            if (selector) selector.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';

            // Install UI
            const isInstalled = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
            if (installBtn && !isInstalled) installBtn.style.display = 'block';
        });
    }

    if (backBtn) backBtn.addEventListener('click', () => {
        showScreen('entry-screen');
        const detailView = document.getElementById('protocol-detail');
        if (detailView) detailView.style.display = 'none';
    });

    if (backToSelect) backToSelect.addEventListener('click', () => {
        const selector = document.getElementById('protocol-selector');
        const detailView = document.getElementById('protocol-detail');
        if (selector) selector.style.display = 'flex';
        if (detailView) detailView.style.display = 'none';
    });

    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        if (messaging) {
                            messaging.getToken({
                                serviceWorkerRegistration: registration,
                                vapidKey: 'BFMMPXGv8s1QUGI3Rl50DwiZnHteiJ5629LPX5tICWsOfXSJ6QiFpzsyljATAHDl2bRNpHdEtIhTptZ3f1QcYG8'
                            }).then(token => {
                                console.log('Token:', token);
                                alert('Live Alerts Activated.');
                                // Update UI
                                const notifyText = document.getElementById('notification-text');
                                const btn = document.getElementById('enable-alerts');
                                if (notifyText) notifyText.textContent = 'Live Alerts are Active.';
                                if (btn) {
                                    btn.textContent = 'ALERTS ON';
                                    btn.style.opacity = '0.5';
                                    btn.disabled = true;
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // Admin & Calc
    const calcOverlay = document.getElementById('calculator-overlay');
    const adminPanel = document.getElementById('admin-panel');
    const saveBtn = document.getElementById('save-advice');

    const SECRET_ANSWER = 370.9219;
    let currentInput = '';
    const calcScreen = document.getElementById('calc-screen');

    window.openSecretCalc = () => { if (calcOverlay) calcOverlay.style.display = 'flex'; };
    window.closeSecretCalc = () => {
        if (calcOverlay) calcOverlay.style.display = 'none';
        currentInput = '';
        if (calcScreen) calcScreen.textContent = '0';
    };
    window.press = (val) => { currentInput += val; if (calcScreen) calcScreen.textContent = currentInput; };
    window.clearCalc = () => { currentInput = ''; if (calcScreen) calcScreen.textContent = '0'; };
    window.compute = () => {
        try {
            if (Math.abs(eval(currentInput) - SECRET_ANSWER) < 0.0001) {
                if (adminPanel) adminPanel.style.display = 'flex';
                if (calcOverlay) calcOverlay.style.display = 'none';
                renderAdminList();
                return;
            }
            currentInput = eval(currentInput).toString();
            if (calcScreen) calcScreen.textContent = currentInput;
        } catch {
            if (calcScreen) calcScreen.textContent = 'ERR';
        }
    };

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const text = document.getElementById('advice-text').value;
            const category = document.getElementById('advice-category').value;
            if (!text) return;
            const advice = {
                category, text,
                date: document.getElementById('advice-date').value || new Date().toLocaleDateString('en-GB'),
                link: document.getElementById('advice-link').value,
                timestamp: new Date().getTime()
            };
            if (db) {
                db.collection('posts').add(advice).then(() => {
                    alert('Published.');
                    document.getElementById('advice-text').value = '';
                });
            }
        });
    }

    window.renderAdminList = () => {
        const adminFeed = document.getElementById('admin-posts-list');
        if (!adminFeed) return;
        adminFeed.innerHTML = '';
        globalPosts.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<button onclick="deleteAdvice('${item.id}')">DEL</button> ${item.text.substring(0, 20)}...`;
            adminFeed.appendChild(div);
        });
    };

    window.deleteAdvice = (id) => {
        if (db && confirm('Delete?')) db.collection('posts').doc(id).delete();
    };

    // PWA
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
});
