/**
 * Free Shipping Progress Bar
 * Shows how much more to spend for free shipping
 */

class ShippingProgressBar {
    constructor() {
        this.threshold = 5000; // $50 in cents
        this.init();
    }

    init() {
        this.addProgressBar();
        this.updateProgress();

        // Listen for cart updates
        document.addEventListener('cart:updated', () => this.updateProgress());
    }

    addProgressBar() {
        // Add to cart drawer if exists
        const cartDrawer = document.querySelector('.cart-drawer__header, .cart-notification__header');
        if (cartDrawer) {
            const progressDiv = this.createProgressBar();
            cartDrawer.after(progressDiv);
        }

        // Also add to cart page
        const cartPage = document.querySelector('.cart__header, .cart-items');
        if (cartPage) {
            const progressDiv = this.createProgressBar();
            cartPage.before(progressDiv);
        }
    }

    createProgressBar() {
        const div = document.createElement('div');
        div.className = 'shipping-progress';
        div.style.cssText = `
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    `;

        div.innerHTML = `
      <div class="shipping-progress__message" style="font-size: 13px; margin-bottom: 8px; text-align: center; font-weight: 600;">
        <span class="progress-text">Add <strong class="progress-amount">$50.00</strong> more for <strong>FREE SHIPPING!</strong> 🚚</span>
      </div>
      <div class="shipping-progress__bar" style="width: 100%; height: 8px; background: #e9ecef; border-radius: 10px; overflow: hidden;">
        <div class="shipping-progress__fill" style="height: 100%; background: linear-gradient(90deg, #28a745 0%, #20c997 100%); width: 0%; transition: width 0.5s; border-radius: 10px;"></div>
      </div>
    `;

        return div;
    }

    async updateProgress() {
        try {
            const response = await fetch('/cart.js');
            const cart = await response.json();

            const cartTotal = cart.total_price;
            const remaining = this.threshold - cartTotal;
            const percentage = Math.min((cartTotal / this.threshold) * 100, 100);

            // Update all progress bars
            const bars = document.querySelectorAll('.shipping-progress__fill');
            const texts = document.querySelectorAll('.progress-text');
            const amounts = document.querySelectorAll('.progress-amount');

            bars.forEach(bar => {
        /** @type {HTMLElement} */ (bar).style.width = percentage + '%';
            });

            if (remaining <= 0) {
                texts.forEach(text => {
                    text.innerHTML = '🎉 <strong>You qualify for FREE SHIPPING!</strong>';
                });
                amounts.forEach(amount => {
                    amount.textContent = '';
                });
            } else {
                const remainingFormatted = '$' + (remaining / 100).toFixed(2);
                amounts.forEach(amount => {
                    amount.textContent = remainingFormatted;
                });
            }
        } catch (error) {
            console.error('Shipping Progress Error:', error);
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonShippingProgress = new ShippingProgressBar();
    });
}
