/**
 * Live Search with Autocomplete for Horizon Theme
 * Instant search results as you type
 */

class LiveSearch {
    constructor() {
        this.searchInput = null;
        this.resultsContainer = null;
        this.debounceTimer = null;
        this.minChars = 2;
        this.init();
    }

    init() {
        // Find search input
        this.searchInput = document.querySelector('input[type="search"], input[name="q"]');
        if (!this.searchInput) return;

        this.createResultsContainer();
        this.bindEvents();
    }

    createResultsContainer() {
        this.resultsContainer = document.createElement('div');
        this.resultsContainer.className = 'live-search-results';
        this.resultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-top: none;
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

        const searchForm = this.searchInput.closest('form');
        if (searchForm) {
            searchForm.style.position = 'relative';
            searchForm.appendChild(this.resultsContainer);
        }
    }

    bindEvents() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const query = /** @type {HTMLInputElement} */ (e.target).value.trim();

            clearTimeout(this.debounceTimer);

            if (query.length < this.minChars) {
                this.hideResults();
                return;
            }

            this.debounceTimer = setTimeout(() => {
                this.search(query);
            }, 300);
        });

        this.searchInput.addEventListener('focus', () => {
            const query = this.searchInput?.value.trim() || '';
            if (query.length >= this.minChars) {
                this.showResults();
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.searchInput?.contains(/** @type {Node} */(e.target)) &&
                !this.resultsContainer?.contains(/** @type {Node} */(e.target))) {
                this.hideResults();
            }
        });
    }

    async search(query) {
        if (!this.resultsContainer) return;

        this.resultsContainer.innerHTML = '<div style="padding:20px;text-align:center;">Searching...</div>';
        this.showResults();

        try {
            const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`);
            const data = await response.json();

            this.renderResults(data.resources.results.products || [], query);
        } catch (error) {
            console.error('Live Search Error:', error);
            if (this.resultsContainer) {
                this.resultsContainer.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">Search error</div>';
            }
        }
    }

    /**
     * @param {any[]} products
     * @param {string} query
     */
    renderResults(products, query) {
        if (!this.resultsContainer) return;

        if (products.length === 0) {
            this.resultsContainer.innerHTML = `
        <div style="padding:30px;text-align:center;color:#999;">
          No results found for "${query}"
        </div>
      `;
            return;
        }

        const html = products.map(product => `
      <a href="${product.url}" class="live-search-item" style="display:flex;gap:15px;padding:15px;border-bottom:1px solid #eee;text-decoration:none;color:inherit;transition:background 0.2s;">
        <img src="${product.image}" alt="${product.title}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
        <div style="flex:1;min-width:0;">
          <h4 style="margin:0 0 5px;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${product.title}</h4>
          <p style="margin:0;font-size:13px;color:#666;">$${(product.price / 100).toFixed(2)}</p>
        </div>
      </a>
    `).join('');

        this.resultsContainer.innerHTML = html + `
      <a href="/search?q=${encodeURIComponent(query)}" style="display:block;padding:15px;text-align:center;background:#f8f8f8;color:#333;text-decoration:none;font-weight:600;">
        View all results →
      </a>
    `;

        // Add hover effect
        const items = this.resultsContainer.querySelectorAll('.live-search-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', function () {
        /** @type {HTMLElement} */ (this).style.background = '#f8f8f8';
            });
            item.addEventListener('mouseleave', function () {
        /** @type {HTMLElement} */ (this).style.background = 'white';
            });
        });
    }

    showResults() {
        if (this.resultsContainer) {
            this.resultsContainer.style.display = 'block';
        }
    }

    hideResults() {
        if (this.resultsContainer) {
            this.resultsContainer.style.display = 'none';
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // @ts-ignore
        window.horizonLiveSearch = new LiveSearch();
    });
}
