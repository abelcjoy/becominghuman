document.addEventListener('DOMContentLoaded', () => {
    console.log('Momentum Recovery Platform Initialized');

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    }

    const enterBtn = document.getElementById('enter-btn');
    const mainGate = document.getElementById('main-gate');
    const selection = document.getElementById('selection-screen');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            mainGate.classList.add('hidden');
            selection.style.display = 'flex';
        });
    }

    // Load Stats
    function updateStats() {
        const minutes = localStorage.getItem('recovery_minutes') || 0;
        const sessions = localStorage.getItem('recovery_sessions') || 0;
        checkMilestones(minutes, sessions);
    }

    function checkMilestones(mins, sess) {
        if (mins >= 10 && !localStorage.getItem('m_10min')) {
            showToast("🌱 Achievement: First 10 Minutes Reclaimed!");
            localStorage.setItem('m_10min', 'true');
        }
        if (sess >= 5 && !localStorage.getItem('m_5sess')) {
            showToast("🏆 Achievement: 5 Sessions Completed!");
            localStorage.setItem('m_5sess', 'true');
        }
    }

    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast glass';
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    updateStats();

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll reveal effect for cards
    const cards = document.querySelectorAll('.game-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
});
