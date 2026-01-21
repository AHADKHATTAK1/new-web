/**
 * Compare Module for Horizon Theme (Local Storage)
 */

class ProductCompare {
    constructor() {
        this.storageKey = 'horizon_compare';
        this.items = this.load();
        this.maxItems = 4;
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
        if (this.items.length >= this.maxItems) {
            alert(`You can only compare up to ${this.maxItems} products.`);
            return false;
        }
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
            const btn = /** @type {HTMLElement} */ (e.target).closest('[data-compare-add]');
            if (btn) {
                e.preventDefault();
                const handle = btn.getAttribute('data-product-handle');
                if (handle) {
                    this.toggle(handle);
                }
            }
        });

        document.addEventListener('DOMContentLoaded', () => this.updateUI());
        window.addEventListener('load', () => this.updateUI());
    }

    updateUI() {
        document.querySelectorAll('[data-compare-add]').forEach(btn => {
            const handle = btn.getAttribute('data-product-handle');
            if (!handle) return;

            if (this.items.includes(handle)) {
                btn.classList.add('active');
                btn.classList.replace('text-main-600', 'text-white');
                btn.classList.replace('bg-white', 'bg-main-600');
            } else {
                btn.classList.remove('active');
                btn.classList.replace('text-white', 'text-main-600');
                btn.classList.replace('bg-main-600', 'bg-white');
            }
        });

        document.querySelectorAll('[data-compare-count]').forEach(el => {
            el.textContent = this.items.length.toString();
        });
    }
}

// Initialize
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.horizonCompare = new ProductCompare();
}
