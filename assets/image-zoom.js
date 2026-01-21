/**
 * Product Image Zoom/Magnifier for Horizon Theme
 * Hover to zoom product images
 */

class ImageZoom {
    constructor() {
        this.zoomLevel = 2;
        this.init();
    }

    init() {
        this.enableZoomOnImages();
    }

    enableZoomOnImages() {
        // Find all product images
        const productImages = document.querySelectorAll('.product-media img, .product__media img, [data-zoom-image]');

        productImages.forEach(img => {
            this.addZoomEffect(/** @type {HTMLImageElement} */(img));
        });
    }

    /**
     * @param {HTMLImageElement} img
     */
    addZoomEffect(img) {
        const container = img.parentElement;
        if (!container) return;

        // Create zoom lens
        const lens = document.createElement('div');
        lens.className = 'zoom-lens';
        lens.style.cssText = `
      position: absolute;
      border: 2px solid rgba(0,0,0,0.3);
      width: 100px;
      height: 100px;
      pointer-events: none;
      display: none;
      z-index: 10;
      background: rgba(255,255,255,0.3);
    `;

        // Create zoom result container
        const result = document.createElement('div');
        result.className = 'zoom-result';
        result.style.cssText = `
      position: absolute;
      border: 1px solid #d4d4d4;
      width: 300px;
      height: 300px;
      display: none;
      z-index: 100;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      top: 0;
      left: 110%;
    `;

        container.style.position = 'relative';
        container.style.overflow = 'visible';
        container.appendChild(lens);
        container.appendChild(result);

        // Calculate zoom
        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;

        result.style.backgroundImage = `url('${img.src}')`;
        result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

        // Mouse move event
        img.addEventListener('mousemove', function (e) {
            lens.style.display = 'block';
            result.style.display = 'block';

            const pos = getCursorPos(e, img);
            let x = pos.x - (lens.offsetWidth / 2);
            let y = pos.y - (lens.offsetHeight / 2);

            // Prevent lens from going outside image
            if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
            if (x < 0) x = 0;
            if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
            if (y < 0) y = 0;

            lens.style.left = x + 'px';
            lens.style.top = y + 'px';

            result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
        });

        img.addEventListener('mouseleave', function () {
            lens.style.display = 'none';
            result.style.display = 'none';
        });

        /**
         * @param {MouseEvent} e
         * @param {HTMLImageElement} img
         */
        function getCursorPos(e, img) {
            const rect = img.getBoundingClientRect();
            const x = e.pageX - rect.left - window.pageXOffset;
            const y = e.pageY - rect.top - window.pageYOffset;
            return { x: x, y: y };
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonImageZoom = new ImageZoom();
    });
}
