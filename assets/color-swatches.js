/**
 * Product Color Swatches for Horizon Theme
 * Display color variants as swatches on product cards
 */

class ColorSwatches {
    constructor() {
        this.init();
    }

    init() {
        this.renderSwatches();
    }

    renderSwatches() {
        // Find all product cards
        const productCards = document.querySelectorAll('[data-product-id]');

        productCards.forEach(card => {
            const productId = card.getAttribute('data-product-id');
            if (!productId) return;

            // Check if swatches container exists
            let swatchContainer = card.querySelector('.product-swatches');
            if (swatchContainer) return; // Already rendered

            // Create swatches container
            swatchContainer = document.createElement('div');
            swatchContainer.className = 'product-swatches';
            swatchContainer.style.cssText = 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;';

            // Get product variants from data attribute or fetch
            const variantsData = card.getAttribute('data-variants');
            if (variantsData) {
                try {
                    const variants = JSON.parse(variantsData);
                    this.createSwatches(variants, swatchContainer, card);
                } catch (e) {
                    console.error('Swatches Error:', e);
                }
            }

            // Append to card content
            const cardContent = card.querySelector('.product-card__content, .card__content, .card-information');
            if (cardContent && swatchContainer.children.length > 0) {
                cardContent.appendChild(swatchContainer);
            }
        });
    }

    /**
     * @param {any[]} variants
     * @param {HTMLElement} container
     * @param {HTMLElement} card
     */
    createSwatches(variants, container, card) {
        // Group variants by color option
        const colors = new Map();

        variants.forEach(variant => {
            if (!variant.available) return;

            // Check for color in options
            const colorOption = variant.option1 || variant.option2 || variant.option3;
            if (!colorOption) return;

            const colorName = colorOption.toLowerCase();

            // Skip if not a color-like option
            if (!this.isColorOption(colorName)) return;

            if (!colors.has(colorName)) {
                colors.set(colorName, {
                    name: colorOption,
                    id: variant.id,
                    image: variant.featured_image?.src
                });
            }
        });

        // Create swatch elements
        colors.forEach((data, colorName) => {
            const swatch = this.createSwatchElement(data, card);
            container.appendChild(swatch);
        });
    }

    /**
     * @param {string} option
     */
    isColorOption(option) {
        const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'pink', 'purple',
            'orange', 'brown', 'gray', 'grey', 'beige', 'navy', 'maroon'];
        return colors.some(color => option.includes(color));
    }

    /**
     * @param {any} data
     * @param {HTMLElement} card
     */
    createSwatchElement(data, card) {
        const swatch = document.createElement('button');
        swatch.className = 'color-swatch';
        swatch.type = 'button';
        swatch.title = data.name;
        swatch.setAttribute('data-variant-id', data.id);

        const bgColor = this.getColorValue(data.name);

        swatch.style.cssText = `
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #ddd;
      background: ${bgColor};
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    `;

        // Change product image on hover
        swatch.addEventListener('mouseenter', () => {
            if (data.image) {
                const img = card.querySelector('.product-card__img, .card__media img');
                if (img) {
                    const originalSrc = img.src;
                    img.setAttribute('data-original-src', originalSrc);
                    img.src = data.image;
                }
            }
            swatch.style.transform = 'scale(1.1)';
            swatch.style.borderColor = '#000';
        });

        swatch.addEventListener('mouseleave', () => {
            const img = card.querySelector('.product-card__img, .card__media img');
            if (img) {
                const originalSrc = img.getAttribute('data-original-src');
                if (originalSrc) {
                    img.src = originalSrc;
                }
            }
            swatch.style.transform = 'scale(1)';
            swatch.style.borderColor = '#ddd';
        });

        return swatch;
    }

    /**
     * @param {string} colorName
     */
    getColorValue(colorName) {
        const colorMap = {
            'red': '#dc3545',
            'blue': '#0d6efd',
            'green': '#28a745',
            'black': '#000000',
            'white': '#ffffff',
            'yellow': '#ffc107',
            'pink': '#ff69b4',
            'purple': '#6f42c1',
            'orange': '#fd7e14',
            'brown': '#8b4513',
            'gray': '#6c757d',
            'grey': '#6c757d',
            'beige': '#f5f5dc',
            'navy': '#000080',
            'maroon': '#800000'
        };

        const lowerName = colorName.toLowerCase();
        for (const [key, value] of Object.entries(colorMap)) {
            if (lowerName.includes(key)) {
                return value;
            }
        }

        return '#cccccc'; // Default
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonSwatches = new ColorSwatches();
    });

    // Re-render on dynamic content load
    document.addEventListener('shopify:section:load', () => {
        if (window.horizonSwatches) {
            // @ts-ignore
            window.horizonSwatches.renderSwatches();
        }
    });
}
