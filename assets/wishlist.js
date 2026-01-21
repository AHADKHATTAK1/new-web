/**
 * Wishlist Module for Horizon Theme (Local Storage)
 */

class Wishlist {
    constructor() {
        this.storageKey = 'horizon_wishlist';
        this.items = this.load();
        this.init();
    }

    load() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        this.updateUI();
    }

    /**
     * @param {string} handle
     * @returns {boolean}
     */
    add(handle) {
        if (!this.items.includes(handle)) {
            this.items.push(handle);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * @param {string} handle
     * @returns {boolean}
     */
    remove(handle) {
        const index = this.items.indexOf(handle);
        if (index > -1) {
            this.items.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    /**
     * @param {string} handle
     */
    toggle(handle) {
        if (this.items.includes(handle)) {
            this.remove(handle);
        } else {
            this.add(handle);
        }
    }

    init() {
        document.addEventListener('click', (e) => {
            if (!e.target) return;
            const btn = /** @type {HTMLElement} */ (e.target).closest('[data-wishlist-add]');
            if (btn) {
                e.preventDefault();
                const handle = btn.getAttribute('data-product-handle');
                if (handle) {
                    this.toggle(handle);
                }
            }
        });

        // Initial UI update
        document.addEventListener('DOMContentLoaded', () => this.updateUI());
        window.addEventListener('load', () => this.updateUI());
    }

    updateUI() {
        // Update all buttons
        document.querySelectorAll('[data-wishlist-add]').forEach(btn => {
            const handle = btn.getAttribute('data-product-handle');
            if (!handle) return;

            const icon = btn.querySelector('i');
            if (this.items.includes(handle)) {
                btn.classList.add('active');
                btn.classList.replace('text-main-600', 'text-white');
                btn.classList.replace('bg-white', 'bg-main-600');
                if (icon) icon.classList.replace('ph-heart', 'ph-fill');
            } else {
                btn.classList.remove('active');
                btn.classList.replace('text-white', 'text-main-600');
                btn.classList.replace('bg-main-600', 'bg-white');
                if (icon) icon.classList.replace('ph-fill', 'ph-heart');
            }
        });

        // Update wishlist counts if any
        document.querySelectorAll('[data-wishlist-count]').forEach(el => {
            el.textContent = this.items.length.toString();
        });
    }
}

// Initialize
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.horizonWishlist = new Wishlist();
}
