export class LifeEngine {
    constructor(app) {
        this.app = app;
        this.hooks = [];
        this.lastTime = performance.now();
        this.isRunning = false;

        // Biometric State
        this.pulse = 0; // 0 to 1 heartbeat oscillation
        this.heartRate = 60; // BPM
        this.tilt = { x: 0, y: 0 }; // Kinetic orientation

        this.initSensors();
        this.start();
    }

    initSensors() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
            window.addEventListener('deviceorientation', (e) => this.handleOrientation(e));
        }
    }

    handleOrientation(e) {
        this.tilt.x = (e.gamma || 0) / 45;
        this.tilt.y = (e.beta || 0) / 45;
    }

    async requestSensorPermission() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const response = await DeviceOrientationEvent.requestPermission();
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', (e) => this.handleOrientation(e));
                    return true;
                }
            } catch (e) { console.error('Sensor access denied'); }
        }
        return false;
    }

    addHook(hook) {
        if (hook && typeof hook.update === 'function') {
            this.hooks.push(hook);
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop(performance.now());
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // --- Biological Heartbeat (Lubb-Dupp) ---
        const beatDuration = 60000 / this.heartRate;
        const cycle = (currentTime % beatDuration) / beatDuration;
        const lubb = Math.pow(Math.max(0, Math.sin(cycle * Math.PI * 2) - 0.7) * 3.33, 4);
        const dupp = Math.pow(Math.max(0, Math.sin((cycle - 0.15) * Math.PI * 2) - 0.8) * 5, 4) * 0.5;
        this.pulse = Math.max(lubb, dupp);

        // Notify Hooks
        this.hooks.forEach(hook => {
            hook.update(deltaTime, this.pulse, this.tilt);
        });

        requestAnimationFrame((time) => this.loop(time));
    }
}
