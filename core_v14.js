// FIREBASE FEED ENGINE (Manual Curation Mode)
// Restoration of Cloud Connectivity

document.addEventListener('DOMContentLoaded', () => {
    console.log("Feed Engine Loaded.");

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Load Latest Post
    loadLatestLesson();

    // REVEAL INTERFACE
    document.getElementById('main-discovery-feed').style.display = 'block';
});

function loadLatestLesson() {
    const db = firebase.firestore();

    // Fetch the single most recent post
    db.collection('advice-feed')
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // EMPTY STATE (Simulating "Waiting for Signal")
                document.getElementById('lesson-content').innerText = "WAITING FOR SIGNAL...";
                document.getElementById('lesson-meta').innerText = "[ No Data Stream ]";
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                renderCard(data);
            });
        })
        .catch((error) => {
            console.error("Error loading lesson:", error);
            document.getElementById('lesson-content').innerText = "CONNECTION FAILURE";
        });
}

function renderCard(data) {
    // Inject Data into the existing "Learning Deck" UI
    document.getElementById('lesson-content').innerText = data.text;
    document.getElementById('lesson-meta').innerText = `[${data.category || 'SYSTEM'}]`;

    // Update Paywall Level based on manually set 'risk' or 'level' if you add that later
    document.getElementById('level-indicator').innerText = "LIVE";
}

function nextLevel() {
    // In Manual Mode, "Next" creates a reload or fetch next (Future Feature)
    // For now, it just reloads to check for updates
    const card = document.getElementById('lesson-card');
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
        card.style.transform = "scale(1)";
        location.reload();
    }, 100);
}

// Payment/Unlock Helper (retained from old code)
function initiateClearance() {
    // Dummy Success for now (or integrate Razorpay here)
    // alert("Redirecting to Secure Gateway...");

    // SIMULATED SUCCESS:
    localStorage.setItem('cfh_clearance_token', 'ACCESS_GRANTED_V21');
    document.getElementById('paywall-screen').style.display = 'none';
    alert("ACCESS GRANTED. The Continuum is open.");
}
