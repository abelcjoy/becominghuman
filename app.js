document.addEventListener('DOMContentLoaded', () => {
    console.log('Momentum Recovery Platform Initialized');

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    }

    // Load Stats
    function updateStats() {
        const minutes = localStorage.getItem('recovery_minutes') || 0;
        const sessions = localStorage.getItem('recovery_sessions') || 0;

        const minEl = document.getElementById('total-minutes');
        const sessEl = document.getElementById('total-sessions');

        if (minEl) minEl.textContent = minutes;
        if (sessEl) sessEl.textContent = sessions;
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
