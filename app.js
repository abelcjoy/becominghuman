
// ==========================================
// 1. CORE UI FUNCTIONS (Must load first)
// ==========================================

// Global state
let globalPosts = [];

// Navigation: Entry -> Selection -> About/Privacy/etc
window.showScreen = function (screenId) {
    const screens = [
        'main-discovery-feed', 'entry-screen', 'selection-screen', 'about-screen',
        'privacy-screen', 'terms-screen', 'utility-screen'
    ];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === screenId) ? (id.includes('feed') ? 'block' : 'flex') : 'none';
    });

    // Auto-scroll to top on screen change
    window.scrollTo(0, 0);
};

// Toggle the Manifest/Vision section
window.toggleManifest = function () {
    const el = document.getElementById('protocol-manifest');
    const btn = document.getElementById('manifest-toggle-btn');
    if (el) {
        const isHidden = el.style.display === 'none';
        el.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? 'CLICK TO HIDE' : 'READ OUR VISION';
    }
};

// Navigation: Selection -> Protocol Detail
window.openProtocol = function (category) {
    // 1. Get Elements
    const mainFeed = document.getElementById('main-discovery-feed');
    const notifyPrompt = document.getElementById('notification-prompt');
    const notifyText = document.getElementById('notification-text');
    const notifyBtn = document.getElementById('enable-alerts');

    // 2. Navigation
    if (mainFeed) showScreen('main-discovery-feed');

    // 3. Render
    renderFeed(category);

    // 5. Setup Notification Box
    if (notifyPrompt) {
        notifyPrompt.style.display = 'block';

        let isActive = false;
        if (window.Notification && Notification.permission === 'granted') isActive = true;

        if (isActive) {
            if (notifyText) notifyText.textContent = 'Post Notifications are Active.';
            if (notifyBtn) {
                notifyBtn.textContent = 'NOTIFICATIONS ON';
                notifyBtn.style.opacity = '0.5';
                notifyBtn.disabled = true;
            }
        } else {
            if (notifyText) notifyText.textContent = 'Updated Daily with 5 New Posts.';
            if (notifyBtn) {
                notifyBtn.textContent = 'ENABLE POST NOTIFICATIONS';
                notifyBtn.style.opacity = '1';
                notifyBtn.disabled = false;
            }
        }
    }

    // 6. Clear red badge if possible
    if ('clearAppBadge' in navigator) {
        try { navigator.clearAppBadge(); } catch (e) { }
    }
};

window.renderFeed = function (filterCategory = null) {
    const feed = document.getElementById('advice-feed');
    if (!feed) return;

    // Clear current content
    feed.innerHTML = '';

    // If no posts yet (or still loading), show message
    if (!globalPosts || globalPosts.length === 0) {
        feed.innerHTML = `
            <div style="text-align:center; padding:4rem 2rem; color:#ddd; font-size:0.7rem; letter-spacing:0.1em; font-weight:700;">
                INITIALIZING LABORATORY...
            </div>
        `;
        return;
    }

    let hasContent = false;

    // Safety check filter first to get total count
    const relevantPosts = globalPosts.filter(p => !filterCategory || p.category === filterCategory);
    const totalCount = relevantPosts.length;

    relevantPosts.forEach((item, index) => {
        hasContent = true;
        const card = document.createElement('div');
        card.className = 'advice-card';

        const isLong = item.text.length > 250;
        const displayText = isLong ? item.text.substring(0, 250) + '...' : item.text;

        // Determine Tag Style
        let bgColor = '#0066cc'; // Default Blue
        let displayTag = item.category || 'P_Addiction';

        if (displayTag === 'Health Advice') bgColor = '#cc0000'; // Red
        if (displayTag === 'Positive News') bgColor = '#cc9900'; // Darker Yellow for readability

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em;">
                    PROTOCOL POST #${postNum}
                </div>
                <div style="font-size:0.55rem; background:${bgColor}; color:#fff; padding:0.3rem 0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em;">
                    ${displayTag}
                </div>
            </div>
            <div class="advice-content" style="font-size:0.95rem; line-height:1.6; color:#000;">
                ${displayText}
            </div>
            ${isLong ? `<button class="read-more-toggle" onclick="toggleReadMore(this, '${item.id}')">READ MORE</button>` : ''}
            ${item.link ? `<div style="margin-top:1rem;"><a href="${item.link}" target="_blank" class="link-preview">OPEN RESOURCE</a></div>` : ''}
        `;
        feed.appendChild(card);
    });

    // Reveal manifest toggle once posts have loaded
    const toggleCont = document.getElementById('manifest-toggle-container');
    if (toggleCont) toggleCont.style.display = 'block';

    if (!hasContent) {
        feed.innerHTML = `
            <div style="text-align:center; padding:3rem 1rem; color:#888;">
                NO POSTS YET FOR THIS CATEGORY.<br>CHECK BACK SOON.
            </div>
        `;
    }
};

window.toggleReadMore = function (btn, id) {
    const item = globalPosts.find(p => p.id === id) || globalPosts.find(p => p.text.includes(btn.previousElementSibling.textContent.substring(0, 20)));
    const contentDiv = btn.previousElementSibling;

    if (btn.textContent === 'READ MORE' && item) {
        contentDiv.textContent = item.text;
        btn.textContent = 'READ LESS';
    } else if (item) {
        contentDiv.textContent = item.text.substring(0, 250) + '...';
        btn.textContent = 'READ MORE';
    }
};


// ==========================================
// 2. FIREBASE & APP INIT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Safe Elements Access ---
    const enterBtn = document.getElementById('enter-cfh');
    const notifyBtn = document.getElementById('enable-alerts');
    const backBtn = document.getElementById('back-home');
    const backSelectBtn = document.getElementById('back-to-selection');

    // --- 1. Attach Button Listeners (Immediate) ---
    if (enterBtn) {
        enterBtn.onclick = () => {
            // Reset state
            const selector = document.getElementById('protocol-selector');
            const detailView = document.getElementById('protocol-detail');
            if (selector) selector.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';
            showScreen('selection-screen');
        };
    }

    if (backBtn) backBtn.onclick = () => showScreen('main-discovery-feed');

    if (backSelectBtn) {
        backSelectBtn.onclick = () => {
            console.log("Back to Selection Clicked");
            const selector = document.getElementById('protocol-selector');
            const detailView = document.getElementById('protocol-detail');
            if (selector) selector.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';
        };
    }

    // --- 2. Initialize Firebase ---
    let db = null;
    let messaging = null;

    if (typeof firebase !== 'undefined') {
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
            db = firebase.firestore();
            messaging = firebase.messaging();
            console.log("Firebase connected.");

            // Start Listening for Data logic
            db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                globalPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Save to Cache for instant loading next time
                try {
                    localStorage.setItem('cfh_cached_posts', JSON.stringify(globalPosts));
                } catch (e) { console.warn("Cache save failed", e); }

                // Auto-render if we are on the main feed
                const mainFeed = document.getElementById('main-discovery-feed');
                if (mainFeed && mainFeed.style.display !== 'none') {
                    renderFeed(null); // Show all posts on the main feed
                }

                // Refresh Admin
                if (document.getElementById('admin-panel').style.display === 'flex') {
                    renderAdminList();
                }
            }, (error) => {
                console.error("Firestore Listen Error:", error);
                const feed = document.getElementById('advice-feed');
                if (feed) feed.innerHTML = '<div style="text-align:center; padding:2rem; color:red;">SERVER ERROR.<br>Please check your internet connection.</div>';
            });

            // PWA Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js');
            }

        } catch (e) {
            console.error("Firebase Init Failed:", e);
        }
    } else {
        console.error("Firebase SDK not loaded.");
        alert("System Error: Database scripts failed to load. Please check your adblocker or internet.");
    }

    // --- 3. Notification Logic ---
    if (notifyBtn) {
        console.log("Notification Logic: Button Found");
        notifyBtn.onclick = () => {
            console.log("Notification Logic: Clicked");
            if (!('Notification' in window)) {
                alert("This browser does not support desktop notification");
                return;
            }

            if (Notification.permission === 'denied') {
                alert("⚠️ ACCESS BLOCKED ⚠️\n\nYour browser is blocking notifications.\n\nTO FIX THIS:\n1. Click the Lock icon 🔒 (or Settings) in your address bar.\n2. Find 'Notifications' and set to 'Allow'.\n3. Reload the page.\n\nThe app cannot override this setting.");
                return;
            }

            if (!messaging) {
                console.error("Messaging not ready yet.");
                alert("Establishing secure connection... wait 2 seconds and click again.");
                return;
            }

            Notification.requestPermission().then(permission => {
                console.log("Permission:", permission);
                if (permission === 'granted') {
                    navigator.serviceWorker.ready.then(reg => {
                        console.log("SW Ready, getting token...");
                        messaging.getToken({
                            serviceWorkerRegistration: reg,
                            vapidKey: 'BFMMPXGv8s1QUGI3Rl50DwiZnHteiJ5629LPX5tICWsOfXSJ6QiFpzsyljATAHDl2bRNpHdEtIhTptZ3f1QcYG8'
                        }).then((token) => {
                            console.log("Token Received:", token);
                            alert("Post Notifications Enabled.");
                            const txt = document.getElementById('notification-text');
                            if (txt) txt.textContent = 'Post Notifications are Active.';
                            notifyBtn.textContent = 'NOTIFICATIONS ON';
                            notifyBtn.style.opacity = '0.5';
                            notifyBtn.disabled = true;
                        }).catch(err => {
                            console.error("Token Error:", err);
                            alert("Error subscribing to alerts: " + err.message);
                        });
                    });
                } else {
                    alert("Notifications were not granted.");
                }
            });
        };
    }

    // --- 4. Admin Panel Logic (Secret) ---
    const calcOverlay = document.getElementById('calculator-overlay');
    const adminPanel = document.getElementById('admin-panel');
    const calcScreen = document.getElementById('calc-screen');
    let currentInput = '';
    const SECRET_ANSWER = 370.9219;

    window.openSecretCalc = () => { if (calcOverlay) calcOverlay.style.display = 'flex'; };
    window.closeSecretCalc = () => { if (calcOverlay) calcOverlay.style.display = 'none'; currentInput = ''; if (calcScreen) calcScreen.textContent = '0'; };
    window.press = (v) => { currentInput += v; if (calcScreen) calcScreen.textContent = currentInput; };
    window.clearCalc = () => { currentInput = ''; if (calcScreen) calcScreen.textContent = '0'; };
    window.compute = () => {
        try {
            if (Math.abs(eval(currentInput) - SECRET_ANSWER) < 0.001) {
                if (adminPanel) adminPanel.style.display = 'flex';
                if (calcOverlay) calcOverlay.style.display = 'none';
                renderAdminList();
            } else {
                if (calcScreen) calcScreen.textContent = eval(currentInput);
            }
        } catch { if (calcScreen) calcScreen.textContent = 'ERR'; }
    };

    // Admin List
    // Admin List
    window.renderAdminList = () => {
        const list = document.getElementById('admin-posts-list');
        if (!list) return;
        list.innerHTML = '';

        let count = globalPosts.length;

        globalPosts.forEach((p, i) => {
            const row = document.createElement('div');
            row.style.borderBottom = '1px solid #eee';
            row.style.padding = '10px';
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            const postNum = count - i;

            row.innerHTML = `<span style="font-size:0.75rem;"><b>#${postNum}</b>: ${p.text.substring(0, 30)}...</span> <button onclick="deletePost('${p.id}')" style="color:red; cursor:pointer;">DEL</button>`;
            list.appendChild(row);
        });
    };

    window.deletePost = (id) => {
        if (db && confirm('Delete?')) db.collection('posts').doc(id).delete();
    };

    // Admin Save
    const saveBtn = document.getElementById('save-advice');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const txt = document.getElementById('advice-text').value;
            const cat = document.getElementById('advice-category').value;
            if (!txt) return;
            if (db) {
                db.collection('posts').add({
                    text: txt,
                    category: cat,
                    link: document.getElementById('advice-link').value,
                    timestamp: new Date().getTime()
                }).then(() => {
                    alert('Published.');
                    document.getElementById('advice-text').value = '';
                });
            }
        };
    }
});

// --- 5. Initial Load (Instant Execution - Outside listener) ---
(function () {
    try {
        const cached = localStorage.getItem('cfh_cached_posts');
        if (cached) {
            globalPosts = JSON.parse(cached);
            console.log("Instant Load: Loading from device memory...");
            renderFeed(null); // Show all posts
        }
    } catch (e) { console.warn("Cache items invalid", e); }

    // Show the feed immediately as soon as scripts parse
    showScreen('main-discovery-feed');
})();
