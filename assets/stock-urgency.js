/**
 * Stock Countdown & Urgency for Horizon Theme
 * Shows "Only X left!" messages to create urgency
 */

class StockUrgency {
    constructor() {
        this.lowStockThreshold = 10;
        this.init();
    }

    init() {
        this.addStockBadges();
    }

    addStockBadges() {
        // Find all product cards and product pages
        const products = document.querySelectorAll('[data-product-id]');

        products.forEach(product => {
            const stockData = product.getAttribute('data-inventory');
            if (!stockData) return;

            try {
                const inventory = parseInt(stockData);
                if (inventory > 0 && inventory <= this.lowStockThreshold) {
                    this.createStockBadge(product, inventory);
                }
            } catch (e) {
                console.error('Stock badge error:', e);
            }
        });

        // Also check for product page
        this.addProductPageStockBadge();
    }

    /**
     * @param {HTMLElement} product
     * @param {number} count
     */
    createStockBadge(product, count) {
        // Check if badge already exists
        if (product.querySelector('.stock-urgency-badge')) return;

        const badge = document.createElement('div');
        badge.className = 'stock-urgency-badge';

        const urgencyLevel = count <= 3 ? 'critical' : count <= 5 ? 'high' : 'medium';
        const bgColor = urgencyLevel === 'critical' ? '#dc3545' : urgencyLevel === 'high' ? '#fd7e14' : '#ffc107';

        badge.style.cssText = `
      background: ${bgColor};
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      display: inline-block;
      margin-top: 8px;
      animation: pulse-badge 2s infinite;
    `;

        badge.innerHTML = `🔥 Only ${count} left!`;

        // Add to product card
        const priceArea = product.querySelector('.product-card__price, .price, .card__information');
        if (priceArea) {
            priceArea.appendChild(badge);
        }
    }

    addProductPageStockBadge() {
        const inventoryEl = document.querySelector('[data-product-inventory]');
        if (!inventoryEl) return;

        const inventory = parseInt(inventoryEl.getAttribute('data-product-inventory') || '0');
        if (inventory > 0 && inventory <= this.lowStockThreshold) {
            const badge = document.createElement('div');
            badge.className = 'stock-urgency-banner';
            badge.style.cssText = `
        background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        margin: 16px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
      `;

            badge.innerHTML = `
        <span style="font-size: 20px;">⚠️</span>
        <span>Hurry! Only <strong>${inventory} ${inventory === 1 ? 'item' : 'items'}</strong> left in stock!</span>
      `;

            const productForm = document.querySelector('.product-form, .product-info');
            if (productForm) {
                productForm.insertBefore(badge, productForm.firstChild);
            }
        }
    }
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse-badge {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.85; transform: scale(1.05); }
  }
`;
document.head.appendChild(style);

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonStockUrgency = new StockUrgency();
    });
}
