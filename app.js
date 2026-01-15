document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('CFH Protocol PWA Active'))
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

    // Navigation
    const enterBtn = document.getElementById('enter-cfh');
    const entryScreen = document.getElementById('entry-screen');
    const selection = document.getElementById('selection-screen');
    const backBtn = document.getElementById('back-home');
    const selector = document.getElementById('protocol-selector');
    const detailView = document.getElementById('protocol-detail');
    const backToSelect = document.getElementById('back-to-selection');
    const feed = document.getElementById('advice-feed');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            entryScreen.classList.add('hidden');
            selection.style.display = 'flex';
            const isInstalled = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
            if (installBtn && !isInstalled) installBtn.style.display = 'block';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            entryScreen.classList.remove('hidden');
            selection.style.display = 'none';
            selector.classList.remove('hidden');
            detailView.classList.add('hidden');
        });
    }

    if (backToSelect) {
        backToSelect.addEventListener('click', () => {
            selector.classList.remove('hidden');
            detailView.classList.add('hidden');
        });
    }

    window.openProtocol = (category) => {
        selector.classList.add('hidden');
        detailView.classList.remove('hidden');
        renderFeed(category);
    };

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

    renderFeed();
});
