/**
 * Recently Viewed Products (Local Storage)
 */

class RecentlyViewed {
    constructor() {
        this.storageKey = 'horizon_recently_viewed';
        this.maxItems = 12;
        this.currentProduct = null;
        this.init();
    }

    init() {
        // Get current product handle from meta tag or URL
        const productMeta = document.querySelector('meta[property="og:type"]');
        if (productMeta && productMeta.getAttribute('content') === 'product') {
            const urlParts = window.location.pathname.split('/');
            const handle = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
            if (handle) {
                this.saveProduct(handle);
            }
        }
    }

    /**
     * @param {string} handle
     */
    saveProduct(handle) {
        let products = this.getProducts();

        // Remove if already exists
        products = products.filter((h) => h !== handle);

        // Add to beginning
        products.unshift(handle);

        // Limit to max items
        if (products.length > this.maxItems) {
            products = products.slice(0, this.maxItems);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    getProducts() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * @param {string} containerSelector
     * @param {number} limit
     */
    async render(containerSelector, limit = 4) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const products = this.getProducts().slice(0, limit);
        if (products.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner-border"></div></div>';

        try {
            const productData = await Promise.all(
                products.map((handle) =>
                    fetch(`/products/${handle}.js`)
                        .then((r) => r.json())
                        .catch(() => null)
                )
            );

            const validProducts = productData.filter(Boolean);

            if (validProducts.length === 0) {
                container.style.display = 'none';
                return;
            }

            container.innerHTML = `
        <div class="recently-viewed">
          <h3 style="margin-bottom:20px;">Recently Viewed</h3>
          <div class="grid grid--2-col grid--3-col-tablet grid--4-col-desktop">
            ${validProducts.map((p) => this.renderProductCard(p)).join('')}
          </div>
        </div>
      `;
        } catch (error) {
            console.error('Recently Viewed Error:', error);
            container.style.display = 'none';
        }
    }

    /**
     * @param {any} product
     */
    renderProductCard(product) {
        const price = product.price ? `$${(product.price / 100).toFixed(2)}` : '';
        const image = product.featured_image || '';

        return `
      <div class="product-card-mini" style="border:1px solid #eee;border-radius:8px;overflow:hidden;transition:transform 0.3s;">
        <a href="/products/${product.handle}" style="text-decoration:none;color:inherit;">
          <div style="aspect-ratio:1;overflow:hidden;background:#f5f5f5;">
            ${image ? `<img src="${image}" alt="${product.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">` : ''}
          </div>
          <div style="padding:12px;">
            <h4 style="margin:0 0 8px;font-size:14px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${product.title}</h4>
            <p style="margin:0;font-weight:600;color:#000;">${price}</p>
          </div>
        </a>
      </div>
    `;
    }
}

// Initialize
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.horizonRecentlyViewed = new RecentlyViewed();
}
