/**
 * Back to Top Button with Smooth Scroll
 * Appears when scrolling down
 */

class BackToTop {
    constructor() {
        this.button = null;
        this.scrollThreshold = 300;
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 998;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s;
      font-size: 24px;
    `;

        this.button.innerHTML = '↑';

        document.body.appendChild(this.button);

        // Hover effect
        this.button.addEventListener('mouseenter', () => {
            if (this.button) {
                this.button.style.transform = 'scale(1.1) translateY(-5px)';
                this.button.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
            }
        });

        this.button.addEventListener('mouseleave', () => {
            if (this.button) {
                this.button.style.transform = 'scale(1) translateY(0)';
                this.button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }
        });
    }

    bindEvents() {
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (!this.button) return;

            if (window.pageYOffset > this.scrollThreshold) {
                this.button.style.display = 'flex';
            } else {
                this.button.style.display = 'none';
            }
        });

        // Click to scroll top
        if (this.button) {
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonBackToTop = new BackToTop();
    });
}
