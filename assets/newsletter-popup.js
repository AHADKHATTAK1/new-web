/**
 * Newsletter Popup with Exit Intent for Horizon Theme
 */

class NewsletterPopup {
    constructor() {
        this.storageKey = 'horizon_newsletter_shown';
        this.popup = null;
        this.hasShown = false;
        this.init();
    }

    init() {
        // Check if already shown in this session
        if (sessionStorage.getItem(this.storageKey)) {
            return;
        }

        this.createPopup();
        this.bindExitIntent();

        // Also show after 30 seconds if still on page
        setTimeout(() => {
            if (!this.hasShown) {
                this.show();
            }
        }, 30000);
    }

    createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'newsletter-popup-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;';

        overlay.innerHTML = `
      <div class="newsletter-popup" style="background:#fff;max-width:500px;width:90%;border-radius:12px;overflow:hidden;transform:scale(0.9);transition:transform 0.3s;position:relative;">
        <button class="newsletter-popup__close" style="position:absolute;top:15px;right:15px;background:none;border:none;font-size:28px;cursor:pointer;z-index:1;color:#666;line-height:1;padding:5px;">&times;</button>
        
        <div style="padding:40px 30px;text-align:center;">
          <div style="font-size:48px;margin-bottom:15px;">🎁</div>
          <h3 style="margin:0 0 10px;font-size:24px;font-weight:700;">Get 10% Off Your First Order!</h3>
          <p style="margin:0 0 25px;color:#666;font-size:15px;">Subscribe to our newsletter and receive exclusive deals, new arrivals, and more.</p>
          
          <form class="newsletter-popup__form" style="display:flex;gap:10px;flex-direction:column;">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              style="padding:14px;border:2px solid #eee;border-radius:6px;font-size:15px;width:100%;"
            >
            <button 
              type="submit" 
              style="padding:14px;background:#000;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;transition:background 0.3s;"
            >
              Get My Discount
            </button>
          </form>
          
          <p style="margin:15px 0 0;font-size:12px;color:#999;">No spam, unsubscribe anytime.</p>
        </div>
        
        <div class="newsletter-popup__success" style="display:none;padding:40px 30px;text-align:center;">
          <div style="font-size:64px;margin-bottom:15px;">✅</div>
          <h3 style="margin:0 0 10px;font-size:22px;">Thank You!</h3>
          <p style="margin:0;color:#666;">Check your email for your exclusive 10% discount code.</p>
        </div>
      </div>
    `;

        document.body.appendChild(overlay);
        this.popup = overlay;

        // Bind close
        const closeBtn = overlay.querySelector('.newsletter-popup__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        } overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hide();
            }
        });

        // Bind form
        const form = overlay.querySelector('.newsletter-popup__form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    bindExitIntent() {
        document.addEventListener('mouseout', (e) => {
            const mouseEvent = /** @type {MouseEvent} */ (e);
            if (mouseEvent.clientY <= 0 && !this.hasShown) {
                this.show();
            }
        });
    }

    show() {
        if (this.hasShown || !this.popup) return;

        this.popup.style.display = 'flex';
        setTimeout(() => {
            if (this.popup) {
                this.popup.style.opacity = '1';
                const popupContent = this.popup.querySelector('.newsletter-popup');
                if (popupContent) {
          /** @type {HTMLElement} */ (popupContent).style.transform = 'scale(1)';
                }
            }
        }, 10);

        this.hasShown = true;
        sessionStorage.setItem(this.storageKey, 'true');
    }

    hide() {
        if (!this.popup) return;

        this.popup.style.opacity = '0';
        const popupContent = this.popup.querySelector('.newsletter-popup');
        if (popupContent) {
      /** @type {HTMLElement} */ (popupContent).style.transform = 'scale(0.9)';
        }

        setTimeout(() => {
            if (this.popup) {
                this.popup.style.display = 'none';
            }
        }, 300);
    }

    /**
     * @param {Event} e
     */
    async handleSubmit(e) {
        e.preventDefault();

        const form = /** @type {HTMLFormElement} */ (e.target);
        const formData = new FormData(form);
        const email = formData.get('email');
        const submitBtn = /** @type {HTMLButtonElement|null} */ (form.querySelector('button[type="submit"]'));

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
        }

        try {
            // Shopify customer form submission
            await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `form_type=customer&email=${email}&contact[tags]=newsletter`
            });

            // Show success
            const formDiv = this.popup?.querySelector('.newsletter-popup__form')?.parentElement;
            const successDiv = this.popup?.querySelector('.newsletter-popup__success');

            if (formDiv && successDiv) {
        /** @type {HTMLElement} */ (formDiv).style.display = 'none';
        /** @type {HTMLElement} */ (successDiv).style.display = 'block';
            }

            setTimeout(() => this.hide(), 3000);
        } catch (error) {
            console.error('Newsletter Error:', error);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Get My Discount';
            }
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonNewsletterPopup = new NewsletterPopup();
    });
}
