/**
 * Quick View Module for Horizon Theme
 */

class QuickView {
    constructor() {
        this.modal = document.getElementById('QuickViewModal');
        this.content = document.getElementById('QuickViewContent');
        if (!this.modal || !this.content) return;

        // @ts-ignore - Bootstrap is loaded globally
        this.bsModal = new bootstrap.Modal(this.modal);
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (!e.target) return;
            const trigger = /** @type {HTMLElement} */ (e.target).closest('[data-quick-view]');
            if (trigger) {
                e.preventDefault();
                const handle = trigger.getAttribute('data-product-handle');
                if (handle) {
                    this.open(handle);
                }
            }
        });

        // Reset content on hide
        if (this.modal) {
            this.modal.addEventListener('hidden.bs.modal', () => {
                if (this.content) {
                    this.content.innerHTML = `
            <div class="col-12 p-80 text-center">
              <div class="spinner-border text-main-600" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>`;
                }
            });
        }
    }

    /**
     * @param {string} handle
     */
    async open(handle) {
        if (this.bsModal) {
            this.bsModal.show();
        }

        try {
            const response = await fetch(`/products/${handle}?view=quickview`);
            if (!response.ok) throw new Error('Product not found');

            const html = await response.text();
            if (this.content) {
                this.content.innerHTML = html;
                this.initModalForms();
            }
        } catch (error) {
            console.error('Quick View Error:', error);
            if (this.content) {
                this.content.innerHTML = `
          <div class="col-12 p-80 text-center">
            <div class="alert alert-danger mx-auto" style="max-width: 400px;">
              Sorry, could not load product details.
            </div>
          </div>`;
            }
        }
    }

    initModalForms() {
        if (!this.content) return;

        const form = /** @type {HTMLFormElement|null} */ (this.content.querySelector('form[action="/cart/add"]'));
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = /** @type {HTMLButtonElement|null} */ (form.querySelector('button[type="submit"]'));
                if (!submitBtn) return;

                const originalBtnText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-8"></span> Adding...';

                try {
                    const formData = new FormData(form);
                    const response = await fetch('/cart/add.js', {
                        method: 'POST',
                        body: formData,
                        headers: { 'X-Requested-With': 'XMLHttpRequest' }
                    });

                    if (response.ok) {
                        submitBtn.innerHTML = '<i class="ph ph-check me-8"></i> Added!';
                        submitBtn.classList.replace('btn-main-600', 'btn-success');

                        // Dispatch event for cart update if theme has a cart drawer
                        document.dispatchEvent(new CustomEvent('cart:updated'));

                        setTimeout(() => {
                            if (this.bsModal) {
                                this.bsModal.hide();
                            }
                        }, 1000);
                    } else {
                        throw new Error('Add to cart failed');
                    }
                } catch (error) {
                    console.error('Cart Error:', error);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        }
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.horizonQuickView = new QuickView();
    }
});
