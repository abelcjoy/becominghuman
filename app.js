
// ==========================================
// 1. CORE UI FUNCTIONS (Must load first)
// ==========================================

// Global state
let globalPosts = [];

// Navigation: Entry -> Selection -> About/Privacy/etc
// Navigation System (Hardened)
window.showScreen = function (screenId) {
    const screens = document.querySelectorAll('.cfh-screen');
    screens.forEach(s => {
        if (s.id === screenId) {
            s.style.display = (s.id === 'main-discovery-feed') ? 'block' : 'flex';
        } else {
            s.style.display = 'none';
        }
    });

    // Auto-scroll to top on screen change
    window.scrollTo({ top: 0, behavior: 'instant' });
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
            if (notifyText) notifyText.textContent = "Hey you... you'll definitely forget about this page. That's for sure. Enable notifications so we can pull you back into clarity whenever we post.";
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

window.renderFeed = function (filterCategory = null, append = false) {
    const feed = document.getElementById('advice-feed');
    if (!feed) return;

    // Clear current content ONLY if not appending
    if (!append) feed.innerHTML = '';

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

    // Logic for Appending: Calculate start index
    // If not appending, start at 0. If appending, start at previous length.
    // For simplicity with this quick architecture, we will re-render intelligently or just render the chunk.
    // Actually, to keep it simple and robust:

    feed.innerHTML = ''; // Full Re-render is safest for index alignment with globalPosts

    // Fix: We want to re-render ALL relevant posts because "Post #Num" changes based on total count
    const totalCount = relevantPosts.length;

    relevantPosts.forEach((item, index) => {
        hasContent = true;
        const card = document.createElement('div');
        card.className = 'advice-card';

        const isLong = item.text.length > 250;
        const displayText = isLong ? item.text.substring(0, 250) + '...' : item.text;

        // Determine Tag Style (Strict Monochrome Laboratory Aesthetic)
        let bgColor = '#000000'; // Default Black
        let displayTag = item.category || 'Addiction Recovery';

        // Clean up legacy/internal names for display (Robust Check)
        const lowTag = (item.category || "").toLowerCase();
        const legacyTags = ['pmo', 'p.m.o', 'p_addiction', 'recovery protocol', 'biological calibration', 'philosophy of focus'];

        if (legacyTags.some(tag => lowTag.includes(tag))) {
            displayTag = 'Addiction Recovery';
        }

        if (displayTag === 'Addiction Recovery') bgColor = '#000000'; // Pure Black

        // Calculate Number (Newest is highest)
        const postNum = totalCount - index;

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 10px;">
                <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em; white-space: nowrap;">
                    POST #${postNum}
                </div>
                <div style="font-size:0.5rem; background:${bgColor}; color:#fff; padding:0.3rem 0.5rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; text-align: right; line-height: 1.2;">
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

// --- PWA Install Logic ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const promptDiv = document.getElementById('pwa-install-prompt');
    if (promptDiv) promptDiv.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', () => {
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
                const promptDiv = document.getElementById('pwa-install-prompt');
                if (promptDiv) promptDiv.style.display = 'none';
            }
        });
    }
});


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
            // FORCE LOAD ALL: Removing orderBy from DB side to bypass indexing limits
            db.collection('posts')
                .onSnapshot((snapshot) => {
                    // Fetch everything, then sort manually in JS to ensure no data is lost
                    let allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Manual Sort (Newest First)
                    allPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                    globalPosts = allPosts;

                    // Update cache for offline viewing
                    try {
                        localStorage.setItem('cfh_cached_posts', JSON.stringify(globalPosts));
                    } catch (e) { console.warn("Cache save failed", e); }

                    // Render the full feed
                    renderFeed();

                    // Update Admin Panel if open
                    if (document.getElementById('admin-panel').style.display === 'flex') {
                        renderAdminList();
                    }

                    // Show manifest toggle if posts exist
                    if (globalPosts.length > 0) {
                        const toggle = document.getElementById('manifest-toggle-container');
                        if (toggle) toggle.style.display = 'block';
                    }
                }, (error) => {
                    console.error("Firestore Error:", error);
                    const feed = document.getElementById('advice-feed');
                    if (globalPosts.length === 0 && feed) {
                        feed.innerHTML = '<div style="text-align:center; padding:2rem; color:red;">SERVER ERROR.<br>Please check your internet connection.</div>';
                    }
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
                const ua = navigator.userAgent || navigator.vendor || window.opera;
                const isInstagram = ua.indexOf('Instagram') > -1;
                const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);

                if (isInstagram || isFacebook) {
                    alert("⚠️ SYSTEM LIMITATION ⚠️\n\nYou are viewing this inside the Instagram/Facebook app.\n\nIn-app browsers block notifications and installs.\n\nTO FIX THIS:\n1. Tap the 3 dots (...) in the top right.\n2. Tap 'Open in External Browser' (or Chrome/Safari).\n\nThen you can enable notifications and install the laboratory icon.");
                } else {
                    alert("This browser does not support notifications. Please try using Chrome or Safari.");
                }
                return;
            }

            if (Notification.permission === 'denied') {
                const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
                if (isPWA) {
                    alert("⚠️ NOTIFICATIONS BLOCKED ⚠️\n\nYou are using the App version of CFH, where browser settings are hidden.\n\nTO FIX THIS:\n1. Open your Phone Settings.\n2. Go to 'Apps' -> 'CFH Protocol'.\n3. Tap 'Notifications' and set to 'Allowed'.\n\nOnce done, close and reopen the app.");
                } else {
                    alert("⚠️ ACCESS BLOCKED ⚠️\n\nYour browser is blocking notifications.\n\nTO FIX THIS:\n1. Click the Lock icon 🔒 (or Settings) in your address bar.\n2. Find 'Notifications' and set to 'Allow'.\n3. Reload the page.");
                }
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
    // Calculator Removed - Admin Access via Restore Protocol Only

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

            row.innerHTML = `<span style="font-size:0.75rem;"><b>#${postNum}</b>: ${p.text.substring(0, 30)}...</span> 
            <div>
                <button onclick="editPost('${p.id}')" style="color:blue; cursor:pointer; margin-right:5px;">EDIT</button>
                <button onclick="deletePost('${p.id}')" style="color:red; cursor:pointer;">DEL</button>
            </div>`;
            list.appendChild(row);
        });
    };

    // Inject Admin Link if Authorized
    if (localStorage.getItem('cfh_clearance_token') === 'admin_permit') {
        const updateControl = document.getElementById('system-update-control');
        if (updateControl) {
            const adminBtn = document.createElement('div');
            adminBtn.innerHTML = `<button onclick="document.getElementById('admin-panel').style.display='flex'; renderAdminList();" style="cursor:pointer; color:red; font-weight:700; background:none; border:2px solid red; padding:1rem; margin-top:2rem; width:100%; text-transform:uppercase; letter-spacing:0.1em;">
                [ OPEN POSTING TERMINAL ]
            </button>`;
            updateControl.appendChild(adminBtn);
        }
    }

    window.deletePost = (id) => {
        if (db && confirm('Delete?')) db.collection('posts').doc(id).delete();
    };

    // Global variable to track editing state
    let editingId = null;

    window.editPost = (id) => {
        const p = globalPosts.find(post => post.id === id);
        if (p) {
            document.getElementById('advice-text').value = p.text;
            document.getElementById('advice-category').value = p.category || 'Addiction Recovery';
            document.getElementById('advice-link').value = p.link || '';
            editingId = id;
            document.getElementById('save-advice').textContent = "UPDATE POST (OVERWRITE)";
            document.getElementById('has-edit-mode').textContent = "EDIT MODE ACTIVE"; // Optional UI feedback
        }
    };

    // Admin Save
    const saveBtn = document.getElementById('save-advice');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const txt = document.getElementById('advice-text').value;
            const cat = document.getElementById('advice-category').value;
            if (!txt) return;

            if (db) {
                if (editingId) {
                    // Update Mode
                    db.collection('posts').doc(editingId).update({
                        text: txt,
                        category: cat,
                        link: document.getElementById('advice-link').value
                    }).then(() => {
                        alert('Post Updated.');
                        resetEditor();
                    });
                } else {
                    // Create Mode
                    db.collection('posts').add({
                        text: txt,
                        category: cat,
                        link: document.getElementById('advice-link').value,
                        timestamp: new Date().getTime()
                    }).then(() => {
                        alert('Published.');
                        resetEditor();
                    });
                }
            }
        };
    }

    function resetEditor() {
        document.getElementById('advice-text').value = '';
        document.getElementById('advice-link').value = '';
        editingId = null;
        document.getElementById('save-advice').textContent = "POST TO LIVE FEED";
    }
});

// --- 5. Initial Load (Instant Execution - Outside listener) ---
// --- 5. Initial Load (Instant Execution - Outside listener) ---
(function () {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    // SECURITY CHECK: Clearance Level & Expiration
    const clearance = localStorage.getItem('cfh_clearance_token');
    const tokenTime = localStorage.getItem('cfh_token_timestamp');

    let isValid = false;

    if (clearance) {
        if (tokenTime) {
            const timeDiff = new Date().getTime() - parseInt(tokenTime);
            if (timeDiff < THIRTY_DAYS) {
                isValid = true;
            } else {
                console.warn("Token Expired");
                localStorage.removeItem('cfh_clearance_token');
                localStorage.removeItem('cfh_token_timestamp');
            }
        } else {
            // Legacy/Test user fallback (Assume valid for now, or force re-verify)
            isValid = true;
        }
    }

    if (!isValid) {
        // Access Denied -> Show Paywall
        showScreen('paywall-screen');
        return;
    }

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

// --- 6. Razorpay Clearance (Payment) ---
window.initiateClearance = function () {
    const options = {
        "key": "rzp_test_S5j4hGie8mRk0G", // ACTIVE TEST KEY
        "amount": 4900, // Amount is in subunits (4900 = 49.00 INR)
        "currency": "INR",
        "name": "CFH Protocol",
        "description": "Clearance Level: Authorized",
        "image": "https://clarityforhumans.com/assets/icon.png",
        "handler": function (response) {
            // Success! Generate Permanent Protocol ID
            const protocolId = response.razorpay_payment_id;
            const now = new Date().getTime();

            // 1. Save to Cloud (Firestore) for permanent linkage
            if (typeof firebase !== 'undefined' && firebase.firestore()) {
                const db = firebase.firestore();
                db.collection('clearance_codes').doc(protocolId).set({
                    active: true,
                    timestamp: now,
                    method: 'razorpay_test',
                    verified: true
                }).catch(e => console.warn("Cloud Sync Warning (Ignore in Test Mode):", e));
            }

            alert("PAYMENT SUCCESSFUL.\n\nYOUR PROTOCOL KEY: " + protocolId + "\n\nSAVE THIS KEY. It is your only way to restore access if you clear your phone.");
            localStorage.setItem('cfh_clearance_token', 'active_' + protocolId);
            localStorage.setItem('cfh_token_timestamp', now.toString());
            location.reload();
        },
        "theme": {
            "color": "#000000"
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
};


// --- 7. Restore Access Logic ---
window.showRestoreInput = function () {
    document.getElementById('restore-section').style.display = 'block';
    // Hide the Pay button container if needed, but keeping it visible is fine
};

window.hideRestoreInput = function () {
    document.getElementById('restore-section').style.display = 'none';
};

window.verifyProtocolKey = function () {
    const input = document.getElementById('protocol-key-input');
    const key = input.value.trim();

    if (!key) { alert("Please enter a key."); return; }

    // --- ADMIN OVERRIDE (SECURE HASH CHECK) ---
    // Hashes input and compares to stored signature
    sha256(key).then(hash => {
        if (hash === 'ae04dd8028ee359a0f91a48d49449a51fc8b97437c0dc53fcb96facf25ead44d') {
            alert("COMMAND RECOGNIZED. WELCOME, ADMINISTRATOR.");
            localStorage.setItem('cfh_clearance_token', 'admin_permit');
            localStorage.setItem('cfh_token_timestamp', new Date().getTime().toString());
            location.reload();
        } else {
            // 1. If not admin, Proceed to Check Cloud for User Key
            checkCloudKey(key, input);
        }
    });
};

function checkCloudKey(key, input) {
    // 1. Check Cloud
    if (typeof firebase !== 'undefined' && firebase.firestore()) {
        const db = firebase.firestore();
        input.disabled = true;

        db.collection('clearance_codes').doc(key).get().then(doc => {
            if (doc.exists) {
                // Check Expiration (Server Side Logic Simulation)
                const data = doc.data();
                const now = new Date().getTime();
                const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

                if (data.timestamp && (now - data.timestamp > THIRTY_DAYS)) {
                    alert("ACCESS DENIED. This key has expired (30 Day Limit). Please renew membership.");
                    input.disabled = false;
                    return;
                }

                alert("PROTOCOL VERIFIED. RESTORING ACCESS...");
                localStorage.setItem('cfh_clearance_token', 'active_' + key);
                if (data.timestamp) localStorage.setItem('cfh_token_timestamp', data.timestamp.toString());
                location.reload();
            } else {
                alert("ACCESS DENIED. Invalid Protocol Key.");
                input.disabled = false;
            }
        }).catch(e => {
            console.error(e);
            // Fallback for Test Mode if Firestore rules block reading
            if (key.startsWith('pay_')) {
                alert("OFFLINE VERIFICATION SUCCESS (TEST MODE).\nRestoring Access...");
                localStorage.setItem('cfh_clearance_token', 'active_' + key);
                location.reload();
            } else {
                alert("System Error. Please check internet.");
                input.disabled = false;
            }
        });
    }
}

// Helper: SHA-256 Hash
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
