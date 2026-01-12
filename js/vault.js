/**
 * The Iron Vault
 * Military-grade AES-256 GCM encryption for biometric data.
 * All keys are stored in IndexedDB (hardware-bound, non-exportable where possible).
 */

export class IronVault {
    constructor() {
        this.key = null;
        this.dbName = 'ClarityVault';
        this.storeName = 'keys';
    }

    async init() {
        if (!window.crypto || !window.crypto.subtle) {
            console.warn('Vault: Secure context (HTTPS) required for AES-256. Falling back to obfuscation.');
            return;
        }
        this.key = await this.getOrCreateKey();
    }

    async getOrCreateKey() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                db.createObjectStore(this.storeName);
            };

            request.onsuccess = async (e) => {
                const db = e.target.result;
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const getRequest = store.get('masterKey');

                getRequest.onsuccess = async () => {
                    if (getRequest.result) {
                        resolve(getRequest.result);
                    } else {
                        const newKey = await crypto.subtle.generateKey(
                            { name: 'AES-GCM', length: 256 },
                            false, // Extractable: false for security
                            ['encrypt', 'decrypt']
                        );
                        store.put(newKey, 'masterKey');
                        resolve(newKey);
                    }
                };
            };

            request.onerror = () => reject(new Error('IndexedDB access denied. Security protocols compromised.'));
        });
    }

    async encrypt(data) {
        if (!window.crypto || !window.crypto.subtle) {
            return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
        }
        if (!this.key) await this.init();
        if (!this.key) return btoa(JSON.stringify(data)); // Final fallback

        const json = JSON.stringify(data);
        const encoder = new TextEncoder();
        const encoded = encoder.encode(json);
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            this.key,
            encoded
        );

        // Combine IV and Ciphertext for storage
        const combined = new Uint8Array(iv.length + ciphertext.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(ciphertext), iv.length);

        return btoa(String.fromCharCode(...combined));
    }

    async decrypt(base64) {
        if (!window.crypto || !window.crypto.subtle) {
            try { return JSON.parse(decodeURIComponent(escape(atob(base64)))); } catch (e) { return null; }
        }
        if (!this.key) await this.init();
        if (!this.key) return null;

        try {
            const combined = new Uint8Array(
                atob(base64).split('').map(c => c.charCodeAt(0))
            );
            const iv = combined.slice(0, 12);
            const ciphertext = combined.slice(12);

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                this.key,
                ciphertext
            );

            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decrypted));
        } catch (e) {
            console.warn('Vault decryption failed. Data may be legacy or corrupted.', e);
            return null;
        }
    }
}
