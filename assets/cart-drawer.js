/**
 * Ajax Cart Drawer for Horizon Theme
 * Slide-in cart with live updates
 */

class CartDrawer {
  constructor() {
    this.drawer = null;
    this.overlay = null;
    this.init();
  }

  init() {
    this.createDrawer();
    this.bindEvents();
    this.updateCartCount();
  }

  createDrawer() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'cart-drawer-overlay';
    this.overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999;display:none;opacity:0;transition:opacity 0.3s;';

    // Create drawer
    this.drawer = document.createElement('div');
    this.drawer.className = 'cart-drawer';
    this.drawer.style.cssText = 'position:fixed;top:0;right:-400px;width:400px;max-width:90vw;height:100%;background:#fff;z-index:1000;transition:right 0.3s;box-shadow:-2px 0 10px rgba(0,0,0,0.1);display:flex;flex-direction:column;';

    this.drawer.innerHTML = `
      <div class="cart-drawer__header" style="padding:20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;font-size:18px;">Shopping Cart (<span class="cart-count">0</span>)</h3>
        <button class="cart-drawer__close" style="background:none;border:none;font-size:24px;cursor:pointer;padding:0 5px;">&times;</button>
      </div>
      <div class="cart-drawer__items" style="flex:1;overflow-y:auto;padding:20px;"></div>
      <div class="cart-drawer__footer" style="padding:20px;border-top:1px solid #eee;">
        <div class="cart-total" style="display:flex;justify-content:space-between;margin-bottom:15px;font-size:18px;font-weight:600;">
          <span>Total:</span>
          <span class="cart-total-price">$0.00</span>
        </div>
        <a href="/checkout" class="cart-drawer__checkout" style="display:block;width:100%;padding:15px;background:#000;color:#fff;text-align:center;text-decoration:none;border-radius:4px;font-weight:600;">Checkout</a>
        <a href="/cart" style="display:block;text-align:center;margin-top:10px;color:#666;">View Cart</a>
      </div>
    `;

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.drawer);
  }

  bindEvents() {
    // Close drawer
    this.overlay.addEventListener('click', () => this.close());
    this.drawer.querySelector('.cart-drawer__close').addEventListener('click', () => this.close());

    // Add to cart forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[action="/cart/add"]') || e.target.matches('form[action*="/cart/add"]')) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });

    // Cart icon clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[href="/cart"]') && !e.target.closest('.cart-drawer')) {
        const link = e.target.closest('[href="/cart"]');
        if (link && !link.classList.contains('cart-drawer__view')) {
          e.preventDefault();
          this.open();
        }
      }
    });

    // Listen for cart updates
    document.addEventListener('cart:updated', () => this.updateCart());
  }

  /**
   * @param {HTMLFormElement} form
   */
  async addToCart(form) {
    const formData = new FormData(form);
    const submitBtn = /** @type {HTMLButtonElement|null} */ (form.querySelector('button[type="submit"]'));

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Adding...';
    }

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await this.updateCart();
        this.open();

        if (submitBtn) {
          submitBtn.textContent = 'Added!';
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Add to Cart';
          }, 2000);
        }
      }
    } catch (error) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add to Cart';
      }
    }
  }

  async updateCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();

      this.updateCartCount(cart.item_count);
      this.renderCartItems(cart);
    } catch (error) {
      // Silent fail
    }
  }

  /**
   * @param {number} count
   */
  updateCartCount(count = 0) {
    document.querySelectorAll('.cart-count, [data-cart-count]').forEach(el => {
      el.textContent = count.toString();
    });
  }

  /**
   * @param {any} cart
   */
  renderCartItems(cart) {
    const itemsContainer = this.drawer.querySelector('.cart-drawer__items');
    if (!itemsContainer) return;

    if (cart.items.length === 0) {
      itemsContainer.innerHTML = '<p style="text-align:center;color:#999;padding:40px 20px;">Your cart is empty</p>';
      if (this.drawer.querySelector('.cart-total-price')) {
        this.drawer.querySelector('.cart-total-price').textContent = '$0.00';
      }
      return;
    }

    itemsContainer.innerHTML = cart.items.map((item) => `
      <div class="cart-item" style="display:flex;gap:15px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #eee;position:relative;">
        <button onclick="window.horizonCart.removeItem(${item.key})" style="position:absolute;top:0;right:0;background:#dc3545;color:white;border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:16px;line-height:1;transition:all 0.2s;" title="Remove item">×</button>
        <img src="${item.image}" alt="${item.title}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;">
        <div style="flex:1;padding-right:30px;">
          <h4 style="margin:0 0 5px;font-size:14px;">${item.title}</h4>
          ${item.variant_title ? `<p style="margin:0 0 5px;font-size:12px;color:#666;">${item.variant_title}</p>` : ''}
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:10px;">
              <button onclick="window.horizonCart.updateQuantity(${item.key}, ${item.quantity - 1})" style="width:28px;height:28px;border:1px solid #ddd;background:#fff;cursor:pointer;border-radius:4px;font-weight:700;transition:all 0.2s;">-</button>
              <span style="min-width:30px;text-align:center;font-weight:600;">${item.quantity}</span>
              <button onclick="window.horizonCart.updateQuantity(${item.key}, ${item.quantity + 1})" style="width:28px;height:28px;border:1px solid #ddd;background:#fff;cursor:pointer;border-radius:4px;font-weight:700;transition:all 0.2s;">+</button>
            </div>
            <span style="font-weight:600;">${this.formatMoney(item.line_price)}</span>
          </div>
        </div>
      </div>
    `).join('');

    const totalElement = this.drawer.querySelector('.cart-total-price');
    if (totalElement) {
      totalElement.textContent = this.formatMoney(cart.total_price);
    }
  }

  /**
   * @param {number} key
   * @param {number} quantity
   */
  async updateQuantity(key, quantity) {
    if (quantity < 0) return;

    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });

      await this.updateCart();
    } catch (error) {
      // Silent fail
    }
  }

  /**
   * Remove item completely from cart
   * @param {number} key
   */
  async removeItem(key) {
    await this.updateQuantity(key, 0);
  }

  /**
   * @param {number} cents
   */
  formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  open() {
    if (this.overlay && this.drawer) {
      this.overlay.style.display = 'block';
      setTimeout(() => {
        if (this.overlay && this.drawer) {
          this.overlay.style.opacity = '1';
          this.drawer.style.right = '0';
        }
      }, 10);
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.overlay && this.drawer) {
      this.overlay.style.opacity = '0';
      this.drawer.style.right = '-400px';
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.style.display = 'none';
        }
      }, 300);
      document.body.style.overflow = '';
    }
  }
}

// Initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    window.horizonCart = new CartDrawer();
  });
}
