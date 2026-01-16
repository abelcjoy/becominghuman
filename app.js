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

// Global posts array to share between public and admin views
let globalPosts = [];

// Real-time Database Listener
function subscribeToFeed() {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        globalPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderFeed();
        // If admin panel is open, update it too
        if (document.getElementById('admin-panel').style.display === 'flex') {
            renderAdminList();
        }
    });
}

// ... (Existing Service Worker & Notification Logic) ...

window.openProtocol = (category) => {
    selector.style.display = 'none';
    detailView.style.display = 'flex';
    renderFeed(category);

    // Manage Notification Prompt Visibility & Text
    const notifyText = document.getElementById('notification-text');
    if (notifyPrompt) {
        if (Notification.permission === 'granted') {
            notifyPrompt.style.display = 'none';
        } else {
            notifyPrompt.style.display = 'block';
            // Simplified, custom text based on category
            if (category === 'P.M.O. Recovery') {
                notifyText.textContent = 'Get PMO recovery advice and tips whenever they are posted.';
            } else if (category === 'Reflections') {
                notifyText.textContent = 'Get new reflections like these as soon as they are posted.';
            } else {
                notifyText.textContent = 'Get alerts whenever new updates are posted.';
            }
        }
    }

    // Clear App Badge when feed is viewed
    if ('clearAppBadge' in navigator) {
        navigator.clearAppBadge().catch((error) => {
            console.error('Error clearing badge:', error);
        });
    }
};

// Secret Calculator & Admin Logic
const calcOverlay = document.getElementById('calculator-overlay');
const adminPanel = document.getElementById('admin-panel');
const calcScreen = document.getElementById('calc-screen');
const saveBtn = document.getElementById('save-advice');

let currentInput = '';
const SECRET_ANSWER = 370.9219;

window.openSecretCalc = () => {
    calcOverlay.style.display = 'flex';
};

window.closeSecretCalc = () => {
    calcOverlay.style.display = 'none';
    clearCalc();
};

window.press = (val) => {
    currentInput += val;
    calcScreen.textContent = currentInput;
};

window.clearCalc = () => {
    currentInput = '';
    calcScreen.textContent = '0';
};

window.compute = () => {
    try {
        const res = eval(currentInput);
        if (res === SECRET_ANSWER) {
            adminPanel.style.display = 'flex';
            calcOverlay.style.display = 'none';
            renderAdminList();
            return;
        }
        currentInput = res.toString();
        calcScreen.textContent = currentInput;
    } catch {
        calcScreen.textContent = 'ERROR';
        currentInput = '';
    }
};

// Admin Feed Management
function saveAdvice() {
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

    // Save to Firestore (Real Database)
    db.collection('posts').add(advice)
        .then(() => {
            document.getElementById('advice-text').value = '';
            document.getElementById('advice-date').value = '';
            document.getElementById('advice-link').value = '';

            // Trigger Local Notification & Badge (For demo/admin)
            if ('setAppBadge' in navigator) {
                navigator.setAppBadge(1).catch((error) => console.error('Error setting badge:', error));
            }

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
        .catch((error) => {
            console.error("Error writing document: ", error);
            alert('Error publishing: ' + error.message);
        });
}

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

window.deleteAdvice = (id) => {
    if (confirm('Delete?')) {
        db.collection('posts').doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
};

// Public Feed Rendering
function renderFeed(filterCategory = null) {
    if (!feed) return;
    feed.innerHTML = '';

    globalPosts.forEach((item, index) => {
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

window.toggleReadMore = (btn, index) => {
    // Since globalPosts might change, we should ideally use ID, but index is okay for immediate view
    // Ideally we grab the full text from the DOM or the array if it hasn't changed.
    // For simplicity, we assume globalPosts[index] matches the rendered list if not filtered or sorted differently.
    // A safer way is to store the full text in a data attribute.

    // Let's re-find the item from globalPosts matching the rendered card's content or just use the array if the order is preserved.
    // Warning: if filtering is active, index in globalPosts != index in loop. 
    // FIX: The original code passed 'index' from the filtered loop. That index was the index in the *original* array? No, it was index in forEach.

    // Let's rely on the text content for toggle logic to be simple and robust:
    const contentDiv = btn.previousElementSibling;
    if (btn.textContent === 'READ MORE') {
        // Find the item by simple match or just expand.
        // Wait, we need the full text. 
        // Better approach: Store full text in a hidden attribute.
        const item = globalPosts.find(p => contentDiv.textContent.includes(p.text.substring(0, 50)));
        if (item) contentDiv.textContent = item.text;
        btn.textContent = 'READ LESS';
    } else {
        const item = globalPosts.find(p => p.text === contentDiv.textContent);
        if (item) contentDiv.textContent = item.text.substring(0, 250) + '...';
        btn.textContent = 'READ MORE';
    }
};

if (saveBtn) saveBtn.addEventListener('click', saveAdvice);

// Start Listening!
subscribeToFeed();
// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('CFH Protocol PWA Active');

            // Set up Firebase Messaging with Service Worker
            messaging.getToken({
                serviceWorkerRegistration: registration,
                vapidKey: 'BFMMPXGv8s1QUGI3Rl50DwiZnHteiJ5629LPX5tICWsOfXSJ6QiFpzsyljATAHDl2bRNpHdEtIhTptZ3f1QcYG8'
            }).then((currentToken) => {
                if (currentToken) {
                    console.log('Broadcast Token Received:', currentToken);
                    // In a real app, you'd save this to a database.
                    // For now, users are registered to receive broadcasts.
                }
            }).catch((err) => {
                console.log('Notification registration failed', err);
            });
        })
        .catch(err => console.log('PWA Failed', err));
}

// PWA Install Prompt Logic
let deferredPrompt;
const installBtn = document.getElementById('install-btn');
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

if (installBtn) {
    if (isIOS) installBtn.textContent = 'ADD TO HOME +';
    installBtn.addEventListener('click', (e) => {
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
            alert('Please wait a moment for the browser to enable the installation protocol, or use your browser\'s manual "Add to Home Screen" option.');
        }
    });
}

// Navigation Logic
const entryScreen = document.getElementById('entry-screen');
const selection = document.getElementById('selection-screen');
const backBtn = document.getElementById('back-home');
const selector = document.getElementById('protocol-selector');
const detailView = document.getElementById('protocol-detail');
const backToSelect = document.getElementById('back-to-selection');
const feed = document.getElementById('advice-feed');
const notifyPrompt = document.getElementById('notification-prompt');
const notifyBtn = document.getElementById('enable-alerts');

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

document.getElementById('enter-cfh').addEventListener('click', () => {
    showScreen('selection-screen');
    selector.style.display = 'flex';
    detailView.style.display = 'none';

    const isInstalled = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    if (installBtn && !isInstalled) installBtn.style.display = 'block';
});

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
                            console.log('User registered for Alerts:', token);
                            if (notifyPrompt) notifyPrompt.style.display = 'none';
                            alert('Live Alerts Activated.');
                        }
                    });
                });
            }
        });
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        showScreen('entry-screen');
        selector.style.display = 'flex';
        detailView.style.display = 'none';
    });
}

if (backToSelect) {
    backToSelect.addEventListener('click', () => {
        selector.style.display = 'flex';
        detailView.style.display = 'none';
    });
}

window.openProtocol = (category) => {
    selector.style.display = 'none';
    detailView.style.display = 'flex';
    renderFeed(category);

    // Manage Notification Prompt Visibility & Text
    const notifyText = document.getElementById('notification-text');
    if (notifyPrompt) {
        if (Notification.permission === 'granted') {
            notifyPrompt.style.display = 'none';
        } else {
            notifyPrompt.style.display = 'block';
            // Simplified, custom text based on category
            if (category === 'P.M.O. Recovery') {
                notifyText.textContent = 'Get PMO recovery advice and tips whenever they are posted.';
            } else if (category === 'Reflections') {
                notifyText.textContent = 'Get new reflections like these as soon as they are posted.';
            } else {
                notifyText.textContent = 'Get alerts whenever new updates are posted.';
            }
        }
    }

    // Clear App Badge when feed is viewed
    if ('clearAppBadge' in navigator) {
        navigator.clearAppBadge().catch((error) => {
            console.error('Error clearing badge:', error);
        });
    }
};

// Secret Calculator & Admin Logic
const calcOverlay = document.getElementById('calculator-overlay');
const adminPanel = document.getElementById('admin-panel');
const calcScreen = document.getElementById('calc-screen');
const saveBtn = document.getElementById('save-advice');

let currentInput = '';
const SECRET_ANSWER = 370.9219;

window.openSecretCalc = () => {
    calcOverlay.style.display = 'flex';
};

window.closeSecretCalc = () => {
    calcOverlay.style.display = 'none';
    clearCalc();
};

window.press = (val) => {
    currentInput += val;
    calcScreen.textContent = currentInput;
};

window.clearCalc = () => {
    currentInput = '';
    calcScreen.textContent = '0';
};

window.compute = () => {
    try {
        const res = eval(currentInput);
        if (res === SECRET_ANSWER) {
            adminPanel.style.display = 'flex';
            calcOverlay.style.display = 'none';
            renderAdminList();
            return;
        }
        currentInput = res.toString();
        calcScreen.textContent = currentInput;
    } catch {
        calcScreen.textContent = 'ERROR';
        currentInput = '';
    }
};

// Admin Feed Management
function saveAdvice() {
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

    let advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
    advices.unshift(advice);
    localStorage.setItem('cfh_advices', JSON.stringify(advices));

    document.getElementById('advice-text').value = '';
    document.getElementById('advice-date').value = '';
    document.getElementById('advice-link').value = '';
    renderAdminList();
    renderFeed();

    // Trigger Local Notification & Badge (For demo/admin)
    if ('setAppBadge' in navigator) {
        navigator.setAppBadge(1).catch((error) => {
            console.error('Error setting badge:', error);
        });
    }

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

    alert('Published.');
}

function renderAdminList() {
    const advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
    const adminFeed = document.getElementById('admin-posts-list');
    if (!adminFeed) return;
    adminFeed.innerHTML = '';

    advices.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding:1rem; border:1px solid #eee; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;';
        div.innerHTML = `
                <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;">[${item.category}] ${item.text.substring(0, 30)}...</div>
                <button onclick="deleteAdvice(${index})" style="background:#ff000011; border:1px solid #ff0000; color:#ff0000; padding:0.25rem 0.75rem; cursor:pointer; font-size:0.6rem; text-transform:uppercase;">DELETE</button>
            `;
        adminFeed.appendChild(div);
    });
}

window.deleteAdvice = (index) => {
    if (confirm('Delete?')) {
        let advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
        advices.splice(index, 1);
        localStorage.setItem('cfh_advices', JSON.stringify(advices));
        renderAdminList();
        renderFeed();
    }
};

// Public Feed Rendering
function renderFeed(filterCategory = null) {
    const advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
    if (!feed) return;
    feed.innerHTML = '';

    advices.forEach((item, index) => {
        if (!filterCategory || item.category === filterCategory) {
            const card = document.createElement('div');
            card.className = 'advice-card';
            const isLong = item.text.length > 250;
            const displayText = isLong ? item.text.substring(0, 250) + '...' : item.text;

            card.innerHTML = `
                    <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em;">${item.date || ''}</div>
                    <div class="advice-content" style="font-size:0.95rem; line-height:1.6; color: #000; font-weight: 400; overflow-wrap: break-word;">${displayText}</div>
                    ${isLong ? `<button class="read-more-toggle" onclick="toggleReadMore(this, ${index})">READ MORE</button>` : ''}
                    ${item.link ? `<a href="${item.link}" target="_blank" class="link-preview">VIEW_EXTERNAL_RESOURCE</a>` : ''}
                `;
            feed.appendChild(card);
        }
    });
}

window.toggleReadMore = (btn, index) => {
    const advices = JSON.parse(localStorage.getItem('cfh_advices') || '[]');
    const item = advices[index];
    const contentDiv = btn.previousElementSibling;
    if (btn.textContent === 'READ MORE') {
        contentDiv.textContent = item.text;
        btn.textContent = 'READ LESS';
    } else {
        contentDiv.textContent = item.text.substring(0, 250) + '...';
        btn.textContent = 'READ MORE';
    }
};

if (saveBtn) saveBtn.addEventListener('click', saveAdvice);
renderFeed();
});
