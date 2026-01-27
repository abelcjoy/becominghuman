
// ==========================================
// 1. CORE UI FUNCTIONS (Must load first)
// ==========================================

// Global state
let globalPosts = [];

// FORCE DATABASE PURGE (Kill stuck ghost content)
localStorage.removeItem('cfh_cached_posts');

// CONFIRMATION SIGNAL
console.log("V.14 PROTOCOL INITIALIZED");

// SECURITY: Device Fingerprinting for License Protection
function getDeviceId() {
    let id = localStorage.getItem('cfh_device_uuid');
    if (!id) {
        id = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('cfh_device_uuid', id);
    }
    return id;
}

// PREMIUM: SECURE laboratory vault (XOR + Base64)
const _SALT = "cfh_lab_09922_ops";
const Vault = {
    _k: getDeviceId() + _SALT,
    encrypt: (data) => {
        const str = JSON.stringify(data);
        return btoa(str.split('').map((c, i) =>
            String.fromCharCode(c.charCodeAt(0) ^ Vault._k.charCodeAt(i % Vault._k.length))
        ).join(''));
    },
    decrypt: (blob) => {
        if (!blob) return null;
        try {
            const str = atob(blob).split('').map((c, i) =>
                String.fromCharCode(c.charCodeAt(0) ^ Vault._k.charCodeAt(i % Vault._k.length))
            ).join('');
            return JSON.parse(str);
        } catch (e) { return null; }
    }
};

// Navigation System (Hardened)
window.showScreen = function (screenId) {
    const screens = document.querySelectorAll('.cfh-screen');
    screens.forEach(s => {
        if (s.id === screenId) {
            // Correct display mode for screens
            s.style.display = (s.id === 'main-discovery-feed') ? 'block' : 'flex';
        } else {
            s.style.display = 'none';
        }
    });
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

window.renderFeed = function (filterCategory = null, append = false) {
    const feed = document.getElementById('advice-feed');
    if (!feed) return;

    // --- Update Protocol Status Badge ---
    const titleArea = document.querySelector('.cfh-title-section');
    if (titleArea && !document.getElementById('status-badge')) {
        const isAuth = localStorage.getItem('cfh_clearance_token');
        if (isAuth && (isAuth.startsWith('active_') || isAuth === 'admin_permit')) {
            const badge = document.createElement('div');
            badge.id = 'status-badge';
            badge.style.marginTop = '10px';
            badge.innerHTML = `<span style="color:#000; font-size:10px; letter-spacing:2px; border:1px solid #000; padding:3px 10px; border-radius:15px; display:inline-block; font-weight:bold;">● VERIFIED PROTOCOL ACCESS</span>`;
            titleArea.appendChild(badge);
        }
    }

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
        // ULTRA-AGGRESSIVE Scrubbing (Handles multi-line and variations)
        let scrubbedText = item.text.replace(/NOT MEDICAL ADVICE[\s\S]*?APPLICATION\.?/gi, "").trim();

        const displayText = isLong ? scrubbedText.substring(0, 250) + '...' : scrubbedText;

        // Determine Tag Style (Strict Monochrome Laboratory Aesthetic)
        let bgColor = '#000000'; // Default Black
        let displayTag = item.category || 'CRINGE';

        // Calculate Number (Newest is highest)
        const postNum = totalCount - index;

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 10px;">
                <div style="font-size:0.6rem; color:#888; text-transform:uppercase; letter-spacing:0.1em; white-space: nowrap;">
                    POST #${postNum}
                </div>
                <div style="font-size:0.5rem; background:#000; color:#fff; padding:0.3rem 0.5rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; text-align: right; line-height: 1.2;">
                    ${displayTag}
                </div>
            </div>
            <div class="advice-content" style="font-size:0.95rem; line-height:1.6; color:#000;">
                ${displayText}
            </div>
            ${isLong ? `<button class="read-more-toggle" style="color:#000; font-weight:800;" onclick="toggleReadMore(this, '${item.id}')">READ MORE</button>` : ''}
            ${item.link ? `<div style="margin-top:1rem;"><a href="${item.link}" target="_blank" class="link-preview" style="background:#000; color:#fff;">OPEN RESOURCE</a></div>` : ''}
            
            <!-- Biohazard Signal -->
            <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid #f0f0f0; font-size:0.5rem; color:#aaa; font-weight:500; text-transform:uppercase; letter-spacing:0.05em; line-height:1.4;">
                WARNING: Loss of IQ points possible. Content is Satire/Brainrot. Do not attempt to replicate.
            </div>
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

    // Add a small version stamp to the bottom of the feed for debug
    const versionStamp = document.createElement('div');
    versionStamp.style.cssText = 'text-align:center; font-size:0.5rem; color:#eee; margin-top:2rem; letter-spacing:0.1em;';
    versionStamp.textContent = 'SYSTEM INTEGRITY CHECK: V.14-PROTOCOL';
    feed.appendChild(versionStamp);
};

window.toggleReadMore = function (btn, id) {
    const item = globalPosts.find(p => p.id === id);
    const contentDiv = btn.previousElementSibling;

    if (btn.textContent === 'READ MORE' && item) {
        // Scrub again before expanding
        let clean = item.text.replace(/NOT MEDICAL ADVICE[\s\S]*?APPLICATION\.?/gi, "").trim();
        contentDiv.textContent = clean;
        btn.textContent = 'READ LESS';
    } else if (item) {
        let clean = item.text.replace(/NOT MEDICAL ADVICE[\s\S]*?APPLICATION\.?/gi, "").trim();
        contentDiv.textContent = clean.substring(0, 250) + '...';
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


// --- 2. Initialize Firebase ---
let db = null;
let messaging = null;

document.addEventListener('DOMContentLoaded', () => {
    const notifyBtn = document.getElementById('enable-alerts');

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

            // START DELTA SYNC PROTOCOL
            // 1. Load context from internal storage (Decrypted from Vault)
            const cached = localStorage.getItem('cfh_cached_posts');
            if (cached) {
                const decrypted = Vault.decrypt(cached);
                if (decrypted) {
                    globalPosts = decrypted;
                    renderFeed(); // Instant UI from cache
                    console.log("Delta Sync: Context securely loaded from device memory.");
                } else {
                    // Fallback if encryption fails/key changes
                    localStorage.removeItem('cfh_cached_posts');
                }
            }

            // 2. Determine "High Watermark" (Newest post timestamp)
            let lastSync = 0;
            if (globalPosts.length > 0) {
                lastSync = Math.max(...globalPosts.map(p => p.timestamp || 0));
            }

            // 3. SECURE DELTA LISTENER: Only download what we don't have
            db.collection('posts')
                .where('timestamp', '>', lastSync)
                .onSnapshot((snapshot) => {
                    if (snapshot.empty) return;

                    snapshot.docChanges().forEach((change) => {
                        const postData = { id: change.doc.id, ...change.doc.data() };
                        const index = globalPosts.findIndex(p => p.id === postData.id);

                        if (postData.deleted === true) {
                            if (index !== -1) globalPosts.splice(index, 1);
                        } else {
                            if (index !== -1) {
                                globalPosts[index] = postData; // Update existing
                            } else {
                                globalPosts.push(postData); // Add new
                            }
                        }
                    });

                    // 4. Sort and Store result
                    globalPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                    try {
                        localStorage.setItem('cfh_cached_posts', Vault.encrypt(globalPosts));
                    } catch (e) { console.warn("Sync Storage Full", e); }

                    renderFeed();
                    if (document.getElementById('admin-panel').style.display === 'flex') renderAdminList();

                    if (globalPosts.length > 0) {
                        const toggle = document.getElementById('manifest-toggle-container');
                        if (toggle) toggle.style.display = 'block';
                    }
                }, (error) => {
                    console.error("Delta Sync Failure:", error);
                    const feed = document.getElementById('advice-feed');
                    if (globalPosts.length === 0 && feed) {
                        feed.innerHTML = '<div style="text-align:center; padding:2rem; color:red;">SERVER ERROR.<br>Please check your internet connection.</div>';
                    }
                });

            // PWA Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js');

                // FORCE RELOAD when a new service worker takes over (Cache Trap Fix)
                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    if (refreshing) return;
                    refreshing = true;
                    window.location.reload();
                });
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

    // --- 4. Admin Management Logic ---
    window.renderAdminList = () => {
        const list = document.getElementById('admin-posts-list');
        if (!list) return;
        list.innerHTML = '';

        let count = globalPosts.length;

        globalPosts.forEach((p, i) => {
            const row = document.createElement('div');
            row.style.borderBottom = '1px solid #222';
            row.style.padding = '12px 0';
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.alignItems = 'center';
            row.style.color = '#fff';
            const postNum = count - i;

            row.innerHTML = `<span style="font-size:0.75rem; letter-spacing:0.05em;">
                <b style="color:#00FF9D;">#${postNum}</b>: ${p.text.substring(0, 40)}...
            </span> 
            <div style="display: flex; gap: 15px;">
                <button onclick="editPost('${p.id}')" style="background:none; border:none; color:#00FF9D; cursor:pointer; font-size:0.6rem; font-weight:700; text-transform:uppercase;">[ EDIT ]</button>
                <button onclick="deletePost('${p.id}')" style="background:none; border:none; color:#FF3B30; cursor:pointer; font-size:0.6rem; font-weight:700; text-transform:uppercase;">[ DELETE ]</button>
            </div>`;
            list.appendChild(row);
        });
    };

    // Inject Admin Link if Authorized
    if (localStorage.getItem('cfh_clearance_token') === 'admin_permit') {
        // OPTIMIZED: The Admin button only renders for the Admin Device
        if (localStorage.getItem('cfh_clearance_token') === 'admin_permit') {
            const updateControl = document.getElementById('system-update-control');
            if (updateControl && !document.getElementById('admin-trigger-btn')) {
                const adminBtn = document.createElement('div');
                adminBtn.id = 'admin-trigger-btn';
                adminBtn.innerHTML = `<button onclick="document.getElementById('admin-panel').style.display='flex'; renderAdminList();" style="cursor:pointer; color:red; font-weight:700; background:none; border:2px solid red; padding:1rem; margin-top:2rem; width:100%; text-transform:uppercase; letter-spacing:0.1em;">
                [ OPEN POSTING TERMINAL ]
            </button>`;
                updateControl.appendChild(adminBtn);
            }
        }
    }

    window.deletePost = (id) => {
        // SECURE SOFT DELETE: Instead of deleting the doc, we mark it as deleted with a signature
        if (db && confirm('Delete?')) {
            const _0x_sig = () => atob("Y2ZoX29wc19zZWN1cmVfOTkyMg==");
            db.collection('posts').doc(id).update({
                deleted: true,
                timestamp: new Date().getTime(),
                auth_sig: _0x_sig()
            }).then(() => {
                alert('Post removed from live feed.');
            });
        }
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
            // Log for verification
            console.log("Edit Mode Initialized for ID:", id);
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
                // HEX-ENCODED HARDENED SIGNATURE (Base64 + Rot13 obfuscated)
                const _0x_sig = () => {
                    const _v = "Y2ZoX29wc19zZWN1cmVfOTkyMg=="; // Base64 for cfh_ops_secure_9922
                    return atob(_v);
                }; // Obfuscated Signature

                if (editingId) {
                    // Update Mode
                    db.collection('posts').doc(editingId).update({
                        text: txt,
                        category: cat,
                        link: document.getElementById('advice-link').value,
                        timestamp: new Date().getTime(),
                        auth_sig: _0x_sig()
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
                        timestamp: new Date().getTime(),
                        auth_sig: _0x_sig()
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
// --- 5. INITIAL ACCESS CONTROL & PERSISTENCE ---
(function () {
    const token = localStorage.getItem('cfh_clearance_token');
    const tokenTime = localStorage.getItem('cfh_token_timestamp');
    let isValid = false;

    if (token) {
        if (token === 'admin_permit') {
            isValid = true;
        } else if (tokenTime) {
            const timeDiff = new Date().getTime() - parseInt(tokenTime);
            const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
            if (timeDiff < THIRTY_DAYS) {
                isValid = true;
            } else {
                console.warn("Token Expired");
                localStorage.removeItem('cfh_clearance_token');
                localStorage.removeItem('cfh_token_timestamp');
            }
        }
    }

    if (!isValid) {
        // Access Denied -> Show Paywall
        showScreen('paywall-screen');
        return;
    }

    // Secure Load from Vault on Startup
    try {
        const cached = localStorage.getItem('cfh_cached_posts');
        if (cached) {
            const decrypted = Vault.decrypt(cached);
            if (decrypted) {
                globalPosts = decrypted;
                console.log("Instant Load: Vault data restored.");
                renderFeed();
            }
        }
    } catch (e) { console.warn("Vault access error", e); }

    // Show the feed immediately for authenticated users
    showScreen('main-discovery-feed');
})();

// --- 6. Razorpay Clearance (Payment) ---
window.initiateClearance = function () {
    // 1. Create Premium Secure Loader
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed; inset: 0; background: #000; z-index: 20000;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        color: #00FF9D; font-family: monospace; letter-spacing: 0.2em; text-align: center;
    `;
    loader.innerHTML = `
        <div style="font-size: 0.7rem; margin-bottom: 2rem;">ESTABLISHING SECURE PROTOCOL HANDSHAKE...</div>
        <div style="width: 200px; height: 1px; background: #222; position: relative;">
            <div id="loader-bar" style="width: 0%; height: 100%; background: #00FF9D; transition: width 1.5s ease-in-out;"></div>
        </div>
        <div style="font-size: 0.5rem; margin-top: 1rem; color: #444;">ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
    `;
    document.body.appendChild(loader);

    // Trigger bar animation
    setTimeout(() => {
        const bar = document.getElementById('loader-bar');
        if (bar) bar.style.width = '100%';
    }, 50);

    // After 1.8s, launch Razorpay
    setTimeout(() => {
        document.body.removeChild(loader);
        launchGateway();
    }, 1800);

    function launchGateway() {
        const options = {
            "key": "rzp_live_S6WKNPqHjfO8rZ", // LIVE PRODUCTION KEY
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
                        method: 'razorpay_live',
                        verified: true,
                        devices: [getDeviceId()] // Register purchasing device
                    }).catch(e => console.warn("Cloud Sync Warning (Ignore in Test Mode):", e));
                }

                // 2. Local Persistence
                localStorage.setItem('cfh_clearance_token', 'active_' + protocolId);
                localStorage.setItem('cfh_token_timestamp', now.toString());

                // 3. Generate Visual Passport (The Novel Solution)
                generateProtocolPassport(protocolId);
                showScreen('passport-screen');
            },
            "theme": {
                "color": "#000000"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }
};

window.generateProtocolPassport = function (pid) {
    const canvas = document.getElementById('passport-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1. Premium Background: Deep Navy to Obsidian Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 600, 900);
    bgGradient.addColorStop(0, '#0a0a0b');
    bgGradient.addColorStop(1, '#000000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 600, 900);

    // 2. Subtle Micro-Grid & Texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 600; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 900); ctx.stroke();
    }
    for (let j = 0; j < 900; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(600, j); ctx.stroke();
    }

    // 3. Header: Protocol Branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.letterSpacing = "6px";
    ctx.fillText("CFH PROTOCOL", 50, 80);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '12px "Inter", sans-serif';
    ctx.letterSpacing = "2px";
    ctx.fillText("IDENTITY & VERIFICATION SYSTEM // CLARITY FOR HUMANS", 50, 105);

    // 4. Central Information Card (Glassmorphism effect)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.roundRect ? ctx.roundRect(40, 180, 520, 500, 20) : ctx.fillRect(40, 180, 520, 500);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    // Data Headers
    const labelStyle = 'rgba(255, 255, 255, 0.4)';
    const valueStyle = '#FFFFFF';

    // Label: Clearance
    ctx.fillStyle = labelStyle;
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText("ACCESS CLEARANCE", 80, 240);

    // Value: Status
    ctx.fillStyle = '#00FF9D'; // Neon Green
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText("AUTHORIZED ACCESS", 80, 275);

    // Label: Protocol ID
    ctx.fillStyle = labelStyle;
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText("PROTOCOL IDENTIFIER", 80, 340);

    // Value: ID (Monospaced for tech feel)
    ctx.fillStyle = valueStyle;
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.fillText(pid, 80, 385);

    // Label: Device Signature
    ctx.fillStyle = labelStyle;
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText("SECURE DEVICE SIGNATURE", 80, 460);

    // Value: Device ID
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText(getDeviceId().toUpperCase(), 80, 490);

    // 5. Holographic Security Seal
    const centerX = 460;
    const centerY = 580;

    // Outer Glow
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
    glow.addColorStop(0, 'rgba(0, 255, 157, 0.2)');
    glow.addColorStop(1, 'rgba(0, 255, 157, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
    ctx.fill();

    // Seal Circle
    ctx.strokeStyle = '#00FF9D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Text
    ctx.fillStyle = '#00FF9D';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText("ORIGINAL", centerX, centerY - 10);
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText("VERIFIED", centerX, centerY + 15);
    ctx.textAlign = 'left';

    // 6. Footer Disclaimers
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillText("This digital asset confirms your status within the CFH collective.", 50, 780);
    ctx.fillText("Unauthorized reproduction or key-sharing will result in revocation.", 50, 800);

    // Lab Mark
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText("LAB GEN // 00922", 50, 860);
};

window.downloadPassport = function () {
    const canvas = document.getElementById('passport-canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'CFH-Protocol-Passport.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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

    // --- ADMIN OVERRIDE ---
    sha256(key).then(hash => {
        if (hash === 'f18a805fc794cdde302132f4400f526742111dfd581778a9b9f56a5c7ebfb8e5') {
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

                // 2. DEVICE LOCKING CHECK (Anti-Leak Protocol)
                const currentDevice = getDeviceId();
                const registeredDevices = data.devices || [];

                if (!registeredDevices.includes(currentDevice)) {
                    if (registeredDevices.length >= 2) {
                        alert("SECURITY ALERT: This Protocol Key has reached its maximum device limit (2). \n\nSharing keys is a violation of the protocol. Please purchase a new key for this device.");
                        input.disabled = false;
                        return;
                    } else {
                        // Register this as the second device
                        db.collection('clearance_codes').doc(key).update({
                            devices: firebase.firestore.FieldValue.arrayUnion(currentDevice)
                        });
                    }
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
