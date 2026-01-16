// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiJbxoviq2H7AkxrVIXmxwPLNeIwWJOXM",
    authDomain: "cfh-protocol.firebaseapp.com",
    projectId: "cfh-protocol",
    storageBucket: "cfh-protocol.firebasestorage.app",
    messagingSenderId: "576464528755",
    appId: "1:576464528755:web:6aba2a06731c3dbb68d106"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const db = firebase.firestore();

// Global posts array
let globalPosts = [];

document.addEventListener('DOMContentLoaded', () => {

    // --- UI References ---
    const entryScreen = document.getElementById('entry-screen');
    const selection = document.getElementById('selection-screen');
    const backBtn = document.getElementById('back-home');
    const selector = document.getElementById('protocol-selector');
    const detailView = document.getElementById('protocol-detail');
    const backToSelect = document.getElementById('back-to-selection');
    const feed = document.getElementById('advice-feed');
    const notifyPrompt = document.getElementById('notification-prompt');
    const notifyBtn = document.getElementById('enable-alerts');
    const installBtn = document.getElementById('install-btn');

    // --- Real-time Database Listener ---
    function subscribeToFeed() {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            globalPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderFeed(); // Re-render public feed

            // If admin panel is open, update it
            if (document.getElementById('admin-panel').style.display === 'flex') {
                renderAdminList();
            }
        });
    }

    // --- Navigation Logic ---
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

    // Enter App
    const enterCfhBtn = document.getElementById('enter-cfh');
    if (enterCfhBtn) {
        enterCfhBtn.addEventListener('click', () => {
            showScreen('selection-screen');
            // Ensure selector is visible
            if (selector) selector.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';

            // Check Install Logic
            const isInstalled = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
            if (installBtn && !isInstalled) installBtn.style.display = 'block';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showScreen('entry-screen');
            if (detailView) detailView.style.display = 'none';
        });
    }

    if (backToSelect) {
        backToSelect.addEventListener('click', () => {
            if (selector) selector.style.display = 'flex';
            if (detailView) detailView.style.display = 'none';
        });
    }

    // --- Protocol & Notification Logic ---
    window.openProtocol = (category) => {
        if (selector) selector.style.display = 'none';
        if (detailView) detailView.style.display = 'flex';
        renderFeed(category);

        // Manage Notification Prompt
        const notifyText = document.getElementById('notification-text');
        if (notifyPrompt) {
            if (Notification.permission === 'granted') {
                notifyPrompt.style.display = 'none';
            } else {
                notifyPrompt.style.display = 'block';
                // Dynamic Text
                if (category === 'P.M.O. Recovery') {
                    if (notifyText) notifyText.textContent = 'Get PMO recovery advice and tips whenever they are posted.';
                } else {
                    if (notifyText) notifyText.textContent = 'Get alerts whenever new updates are posted.';
                }
            }
        }

        // Clear App Badge
        if ('clearAppBadge' in navigator) {
            navigator.clearAppBadge().catch(() => { });
        }
    };

    // --- Enable Notifications ---
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        messaging.getToken({
                            serviceWorkerRegistration: registration,
                            vapidKey: 'BFMMPXGv8s1QUGI3Rl50DwiZnHteiJ5629LPX5tICWsOfXSJ6QiFpzsyljATAHDl2bRNpHdEtIhTptZ3f1QcYG8'
                        }).then(token => {
                            if (token) {
                                console.log('User registered:', token);
                                if (notifyPrompt) notifyPrompt.style.display = 'none';
                                alert('Live Alerts Activated.');
                            }
                        });
                    });
                }
            });
        });
    }

    // --- Feed Rendering (Public) ---
    function renderFeed(filterCategory = null) {
        if (!feed) return;
        feed.innerHTML = '';

        globalPosts.forEach((item, index) => {
            // Filter logic
            if (!filterCategory || item.category === filterCategory) {
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
    }

    // Toggle Read More
    window.toggleReadMore = (btn, index) => {
        // Find item by fuzzy content match for robustness
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

    // --- Admin / Secret Calculator Logic ---
    const calcOverlay = document.getElementById('calculator-overlay');
    const adminPanel = document.getElementById('admin-panel');
    const calcScreen = document.getElementById('calc-screen');
    const saveBtn = document.getElementById('save-advice');

    let currentInput = '';
    const SECRET_ANSWER = 370.9219;

    window.openSecretCalc = () => { if (calcOverlay) calcOverlay.style.display = 'flex'; };
    window.closeSecretCalc = () => {
        if (calcOverlay) calcOverlay.style.display = 'none';
        currentInput = '';
        if (calcScreen) calcScreen.textContent = '0';
    };

    window.press = (val) => {
        currentInput += val;
        if (calcScreen) calcScreen.textContent = currentInput;
    };
    window.clearCalc = () => {
        currentInput = '';
        if (calcScreen) calcScreen.textContent = '0';
    };

    window.compute = () => {
        try {
            const res = eval(currentInput);
            if (res === SECRET_ANSWER) {
                if (adminPanel) adminPanel.style.display = 'flex';
                if (calcOverlay) calcOverlay.style.display = 'none';
                renderAdminList();
                return;
            }
            currentInput = res.toString();
            if (calcScreen) calcScreen.textContent = currentInput;
        } catch {
            if (calcScreen) calcScreen.textContent = 'ERROR';
            currentInput = '';
        }
    };

    // Admin Save Logic (Firestore)
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const text = document.getElementById('advice-text').value;
            const date = document.getElementById('advice-date').value;
            const link = document.getElementById('advice-link').value;
            const category = document.getElementById('advice-category').value;

            if (!text) return;

            const advice = {
                category,
                text,
                date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                link,
                timestamp: new Date().getTime()
            };

            // Write to Cloud
            db.collection('posts').add(advice)
                .then(() => {
                    document.getElementById('advice-text').value = '';
                    document.getElementById('advice-date').value = '';
                    document.getElementById('advice-link').value = '';

                    // Send Notification (PWA)
                    if (Notification.permission === 'granted') {
                        navigator.serviceWorker.ready.then(registration => {
                            registration.showNotification('CFH Protocol Update', {
                                body: `New post in ${category}: ${text.substring(0, 50)}...`,
                                icon: 'assets/icon.png',
                                badge: 'assets/icon.png',
                                tag: 'new-post'
                            });
                        });
                    }
                    alert('Published globally.');
                })
                .catch(err => alert('Error: ' + err.message));
        });
    }

    window.deleteAdvice = (id) => {
        if (confirm('Delete?')) {
            db.collection('posts').doc(id).delete().catch(console.error);
        }
    };

    function renderAdminList() {
        const adminFeed = document.getElementById('admin-posts-list');
        if (!adminFeed) return;
        adminFeed.innerHTML = '';

        globalPosts.forEach((item) => {
            const div = document.createElement('div');
            div.style.cssText = 'padding:1rem; border:1px solid #eee; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;';
            div.innerHTML = `
                <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;">[${item.category}] ${item.text.substring(0, 30)}...</div>
                <button onclick="deleteAdvice('${item.id}')" style="background:#ff000011; border:1px solid #ff0000; color:#ff0000; padding:0.25rem 0.75rem; cursor:pointer; font-size:0.6rem; text-transform:uppercase;">DELETE</button>
            `;
            adminFeed.appendChild(div);
        });
    }

    // --- PWA Initialization ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('CFH Protocol PWA Active');

            // Re-init token logic to ensure we always have it
            messaging.getToken({
                serviceWorkerRegistration: registration,
                vapidKey: 'BFMMPXGv8s1QUGI3Rl50DwiZnHteiJ5629LPX5tICWsOfXSJ6QiFpzsyljATAHDl2bRNpHdEtIhTptZ3f1QcYG8'
            }).catch(() => { });
        }).catch(err => console.log('PWA Failed', err));
    }

    // Install Prompt
    let deferredPrompt;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    if (installBtn) {
        if (isIOS) installBtn.textContent = 'ADD TO HOME +';
        installBtn.addEventListener('click', () => {
            if (isIOS) {
                alert('To install on iPhone: \n1. Tap the Share button at the bottom center. \n2. Scroll down and select "Add to Home Screen".');
                return;
            }
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') installBtn.style.display = 'none';
                    deferredPrompt = null;
                });
            } else {
                alert('Please check your browser menu to install.');
            }
        });
    }

    // Start
    subscribeToFeed();

});
