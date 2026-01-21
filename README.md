# NWID Laptop Store - Shopify Theme

## Overview
A modern, feature-rich Shopify theme for high-end laptops, desktops, and tech accessories. Built for **NWID (Naveed Wajahat Building Company)**, this theme offers a premium, professional shopping experience with zero-spacing layout and optimized performance.

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
- Modern, clean interface tailored for Tech Retail
- Responsive on all devices
- Smooth hover effects on product cards
- Image zoom on product pages
- Category sidebar navigation
- Zero-spacing layout for a flush, premium look

### 📦 **Product Display**
- Enhanced product cards for Laptops and Components
- Product image hover effect (second image)
- Sale badges and "New Tech" indicators
- Star ratings support
- Vendor display (Dell, HP, Apple, etc.)

### 🏠 **Homepage Sections**
- Dynamic NWID hero banner
- Tech promotional banners
- Deal of the week with tech-focused countdowns
- Top selling laptops and gaming gear
- New Arrivals with category-specific tech tabs

### 📱 **Mobile Optimized**
- Responsive design
- Mobile-friendly navigation with tech categories
- Touch-optimized sliders
- Drawer menus

## Installation

1. **Upload Theme**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Upload ZIP file"
   - Select `NWID-LAPTOP-STORE-ULTRA-STABLE.zip`

2. **Configure Menus**
   Create these menus in Navigation:
   - `main-menu` - Main navigation links
   - `categories` - Tech product categories
   - `footer` - Footer links

3. **Set Up Collections**
   - Create collections for your products (e.g., Laptops, Components, Accessories)
   - Assign collections in theme customizer for each section

4. **Customize Theme**
   - Set the NWID logo
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
  header.liquid - Main header (NWID Branded)
  banner-slider.liquid - Homepage hero
  promotional-banners.liquid - Tech promo cards
  deals-week.liquid - Deal products
  top-selling-products.liquid - Bestsellers
  trending-products.liquid - Trending items
  footer.liquid - Site footer (NWID Branded)

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
  CSS, JavaScript, and image files (Clean & Stable)
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
- **Eye Icon**: Quick view
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
3. Add NWID logo and favicon
4. Configure theme colors

### Optional Enhancements
- Add product reviews app
- Set up email marketing
- Configure shipping rates
- Add payment gateways

## Version
1.1.0 Stable Build

## Credits
Customized and debugged for **NWID** by Antigravity AI.

---
*Developed with excellence for the NWID team.*

