// THE CONSTRUCT ENGINE (V1.1 - SECURE)
// Manual Feed + Master Key Only Access

// SECURITY CONFIG
const MASTER_KEY_HASH = "cfhfromanaconda-#cfhmaster12#";
const RAZORPAY_KEY = "rzp_live_S8s3wbkdIc9lXi"; // LIVE KEY ACTIVE

const firebaseConfig = {
    apiKey: "AIzaSyD-Your-Key-Here",
    projectId: "becoming-human-999",
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Secure Link Establishing...");

    // 1. CHECK LOCAL LICENSE
    const license = localStorage.getItem('cfh_license_type');

    if (license === 'ADMIN' || license === 'STUDENT') {
        unlockGate(license);
    } else {
        lockGate();
    }

    // 2. INIT FIREBASE
    if (!firebase.apps.length) {
        try {
            firebase.initializeApp({
                // Placeholder - User must maintain this config
                apiKey: "PASTE_YOUR_API_KEY",
                projectId: "cfh-demo"
            });
        } catch (e) { console.log(e); }
    }
});

// GATEKEEPING LOGIC
function lockGate() {
    document.getElementById('main-terminal').style.display = 'none';
    document.getElementById('paywall-overlay').style.display = 'flex';
}

function unlockGate(type) {
    document.getElementById('paywall-overlay').style.display = 'none';
    document.getElementById('main-terminal').style.display = 'flex';

    if (type === 'ADMIN') {
        enableAdminTools();
    }

    loadFeed();
}

function enableAdminTools() {
    // Enable CTRL+M
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'm') {
            document.getElementById('admin-terminal').style.display = 'block';
        }
    });
    // Visual Cue
    document.querySelector('body').style.border = "1px solid #00FF41";
}

// ACCESS RESTORATION (Key Entry)
function verifyMasterKey() {
    const input = document.getElementById('master-key-input').value;

    if (input === MASTER_KEY_HASH) {
        localStorage.setItem('cfh_license_type', 'ADMIN');
        unlockGate('ADMIN');
        alert("WELCOME, OPERATOR.");
    } else {
        alert("ACCESS DENIED.");
    }
}

// RAZORPAY INTEGRATION
function startPayment() {
    var options = {
        "key": RAZORPAY_KEY,
        "amount": 9900,
        "currency": "INR",
        "name": "The Construct",
        "description": "Linguistic Access License",
        "image": "https://clarityforhumans.com/assets/icon.png",
        "handler": function (response) {
            // Success
            localStorage.setItem('cfh_license_type', 'STUDENT');
            unlockGate('STUDENT');
        },
        "theme": { "color": "#00FF41" }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

// FEED LOGIC
function loadFeed() {
    const feed = document.getElementById('feed-container');
    const db = firebase.firestore();

    db.collection('construct_feed')
        .orderBy('timestamp', 'desc')
        .limit(30)
        .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                feed.innerHTML = `<div style="text-align:center; padding:2rem; color:#005500;">[ NO DATA FOUND ]</div>`;
                return;
            }

            feed.innerHTML = "";

            snapshot.forEach(doc => {
                const data = doc.data();
                const card = document.createElement('div');
                card.className = 'data-card';

                const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : "##-##-####";

                card.innerHTML = `
                <div class="card-header">
                    <span>SECTOR: ${data.category}</span>
                    <span>// ${date}</span>
                </div>
                <div class="card-content">${formatContent(data.content)}</div>
              `;
                feed.appendChild(card);
            });
        });
}

function formatContent(text) {
    return text.replace(/\n/g, "<br>");
}

// ADMIN UPLOAD
function uploadData() {
    const category = document.getElementById('post-category').value;
    const content = document.getElementById('post-content').value;
    const status = document.getElementById('upload-status');

    if (!content) { alert("EMPTY."); return; }

    status.innerText = "TRANSMITTING...";

    const db = firebase.firestore();
    db.collection('construct_feed').add({
        category: category,
        content: content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        status.innerText = "UPLOAD SUCCESSFUL.";
        document.getElementById('post-content').value = "";
        setTimeout(() => { document.getElementById('admin-terminal').style.display = 'none'; }, 1000);
    });
}
