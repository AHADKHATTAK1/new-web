# Electronics Store - Shopify Theme

## Overview
A modern, feature-rich Shopify theme for electronics and e-commerce stores. Built from a professional HTML template and converted to Shopify's Liquid templating system.

## Features

### 🛒 **Shopping Experience**
- AJAX cart drawer for quick cart management
- Quick add to cart from product cards
- Real-time cart count updates
- Smooth animations and transitions

### ❤️ **Wishlist System**
- Browser-based wishlist using localStorage
- Quick add/remove from product cards
- Persistent across sessions
- Toast notifications for actions

### 🎨 **Design**
- Modern, clean interface
- Responsive on all devices
- Smooth hover effects on product cards
- Image zoom on product pages
- Category sidebar navigation
- Countdown timers for deals

### 📦 **Product Display**
- Enhanced product cards with quick actions
- Product image hover effect (second image)
- Sale badges and sold-out indicators
- Star ratings support
- Vendor display

### 🏠 **Homepage Sections**
- Dynamic banner slider
- Promotional banners (customizable blocks)
- Deal of the week with countdown
- Top selling products with promo box
- Trending products with category tabs

### 📱 **Mobile Optimized**
- Responsive design
- Mobile-friendly navigation
- Touch-optimized sliders
- Drawer menus

## Installation

1. **Upload Theme**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Upload ZIP file"
   - Select `electronics-store-theme.zip`

2. **Configure Menus**
   Create these menus in Navigation:
   - `main-menu` - Main navigation links
   - `categories` - Product categories
   - `footer` - Footer links

3. **Set Up Collections**
   - Create collections for your products
   - Assign collections in theme customizer for each section

4. **Customize Theme**
   - Set your logo
   - Adjust colors and typography
   - Configure section settings

## Theme Structure

```
/layout
  theme.liquid - Main theme wrapper

/templates
  index.json - Homepage template
  product.json - Product page template
  collection.json - Collection page template
  cart.json - Cart page
  /customers - Customer account pages

/sections
  announcement-bar.liquid - Top announcement
  header.liquid - Main header
  banner-slider.liquid - Homepage hero
  promotional-banners.liquid - Promo cards
  deals-week.liquid - Deal products
  top-selling-products.liquid - Bestsellers
  trending-products.liquid - Trending items
  footer.liquid - Site footer

/snippets
  main-menu.liquid - Navigation menu
  search-box.liquid - Search modal
  mobile-menu.liquid - Mobile navigation
  category-menu.liquid - Category dropdown
  product-card.liquid - Basic product card
  product-card-enhanced.liquid - Enhanced with quick actions
  cart-drawer.liquid - Slide-out cart
  wishlist.liquid - Wishlist functionality

/config
  settings_schema.json - Theme settings
  settings_data.json - Default values

/assets
  CSS, JavaScript, and image files
```

## Customization

### Colors
Edit in Theme Settings → Colors:
- Primary color
- Secondary color
- Text color
- Heading color

### Typography
Edit in Theme Settings → Typography:
- Body font
- Heading font

### Homepage Sections
All homepage sections can be customized in the theme editor:
- Add/remove/reorder sections
- Configure settings for each section
- Add custom content blocks

## How to Use Enhanced Features

### Cart Drawer
- Automatically opens when products are added
- Click cart icon to manually open
- Click outside or X to close
- Update quantities inline
- Remove items with trash icon

### Wishlist
- Click heart icon on any product
- Items saved in browser (localStorage)
- View all wishlisted items at `/pages/wishlist`
- Persistent across sessions

### Quick Actions on Products
- **Heart Icon**: Add to wishlist
- **Eye Icon**: Quick view (coming soon)
- **Recycle Icon**: Add to compare
- **Quick Add Button**: Fast cart addition

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance
- Lazy loading images
- Deferred JavaScript
- Optimized assets
- Fast page load times

## Support

### Required Setup
1. Create navigation menus
2. Assign collections to sections
3. Add logo and favicon
4. Configure theme colors

### Optional Enhancements
- Add product reviews app
- Set up email marketing
- Configure shipping rates
- Add payment gateways

## Version
1.0.0

## Credits
Converted and enhanced from MarketPro HTML template

---

**Need help?** Check Shopify's theme documentation or contact support.
