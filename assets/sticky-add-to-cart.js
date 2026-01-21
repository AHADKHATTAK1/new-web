/**
 * Sticky Add to Cart Bar for Product Pages
 * Shows sticky bar when main add to cart scrolls out of view
 */

class StickyAddToCart {
  constructor() {
    this.bar = null;
    this.productForm = null;
    this.observer = null;
    this.init();
  }

  init() {
    // Only on product pages
    if (!document.querySelector('.product-form')) return;

    this.productForm = document.querySelector('.product-form');
    this.createStickyBar();
    this.observeMainForm();
  }

  createStickyBar() {
    const product = this.getProductInfo();

    this.bar = document.createElement('div');
    this.bar.className = 'sticky-atc-bar';
    this.bar.style.cssText = `
      position: fixed;
      bottom: -100px;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      padding: 15px 20px;
      z-index: 999;
      transition: bottom 0.3s;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
    `;

    this.bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px; flex: 1; min-width: 0;">
        ${product.image ? `<img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
        <div style="flex: 1; min-width: 0;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.title}</h4>
          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #000;">${product.price}</p>
        </div>
      </div>
      <button type="button" class="sticky-atc-btn" style="background: #000; color: white; border: none; padding: 12px 30px; border-radius: 4px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s;">
        Add to Cart
      </button>
    `;

    document.body.appendChild(this.bar);

    // Bind add to cart
    const btn = this.bar.querySelector('.sticky-atc-btn');
    if (btn) {
      btn.addEventListener('click', () => this.addToCart());
      btn.addEventListener('mouseenter', function () {
        this.style.background = '#333';
        this.style.transform = 'scale(1.05)';
      });
      btn.addEventListener('mouseleave', function () {
        this.style.background = '#000';
        this.style.transform = 'scale(1)';
      });
    }
  }

  getProductInfo() {
    const titleEl = document.querySelector('.product__title, h1');
    const priceEl = document.querySelector('.price__current, .product__price');
    const imageEl = document.querySelector('.product__media img, .product-single__photo img');

    return {
      title: titleEl?.textContent?.trim() || 'Product',
      price: priceEl?.textContent?.trim() || '',
      image: imageEl?.src || ''
    };
  }

  observeMainForm() {
    if (!this.productForm) return;

    const options = {
      root: null,
      threshold: 0,
      rootMargin: '-100px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (this.bar) {
          if (entry.isIntersecting) {
            this.bar.style.bottom = '-100px';
          } else {
            this.bar.style.bottom = '0';
          }
        }
      });
    }, options);

    this.observer.observe(this.productForm);
  }

  addToCart() {
    // Trigger click on main add to cart button
    const mainBtn = document.querySelector('.product-form button[type="submit"]');
    if (mainBtn) {
      mainBtn.click();
    }
  }
}

// Initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    window.horizonStickyATC = new StickyAddToCart();
  });
}
