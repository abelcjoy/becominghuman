/**
 * Reality Ripple Effect
 * Creates a shockwave distortion on click, rippling through the DOM.
 */

export class RippleEffect {
    constructor() {
        // Add CSS
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.innerHTML = `
                .click-ripple {
                    position: fixed;
                    border-radius: 50%;
                    transform: scale(0);
                    pointer-events: none;
                    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
                    mix-blend-mode: overlay;
                    z-index: 9999;
                    animation: rippleExpand 0.6s ease-out forwards;
                }
                
                @keyframes rippleExpand {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.addEventListener('click', (e) => this.create(e));
    }

    create(e) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';

        const size = 100; // Base size

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - size / 2}px`;
        ripple.style.top = `${e.clientY - size / 2}px`;

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
    }
}
