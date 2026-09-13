# Hot Grill Restaurant Website

A modern, responsive website for Hot Grill featuring menu showcase, reservations, and customer engagement.

## Overview

The Hot Grill website is a full-featured digital presence designed to showcase our culinary offerings, facilitate online reservations, and build community with our customers. The site provides an intuitive browsing experience across all devices and integrates modern web technologies for optimal performance.

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Menu Display** - Interactive menu with detailed descriptions and pricing
- **Online Reservations** - Easy-to-use booking system with date/time selection
- **Photo Gallery** - Showcase of restaurant ambiance and signature dishes
- **Location & Hours** - Complete contact information and operating hours
- **Contact Form** - Direct communication channel for inquiries
- **Special Events** - Promotion of seasonal menus and special dining experiences
- **Customer Reviews** - Display of ratings and testimonials
- **Newsletter Signup** - Email subscription for updates and promotions

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage for reservations and messages
- **Hosting**: Vercel (Static Site)
- **Performance**: Optimized for fast load times

## Installation & Setup

### Prerequisites
- Git
- Text editor (VS Code, Sublime, etc.)
- Modern web browser

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/hot-grill.git
   cd hot-grill
   ```

2. **Open the Website**
   Option A: Double-click `index.html`
   
   Option B: Use a local server
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (live-server)
   npm install -g live-server
   live-server
   ```

3. **Access the Website**
   - Open `http://localhost:8000` in your browser

## Project Structure

```
hot-grill/
├── index.html           # Home page
├── menu.html            # Menu page
├── reservations.html    # Reservations page
├── contact.html         # Contact page
├── styles.css           # Global styles
├── script.js            # JavaScript functionality
├── vercel.json          # Vercel configuration
├── package.json         # Project metadata
├── README.md            # This file
└── .gitignore           # Git ignore file (optional)
```

## Features & Functionality

### Home Page (index.html)
- Hero section with call-to-action
- About the restaurant
- Featured dishes showcase
- Customer testimonials
- Quick reservation link

### Menu Page (menu.html)
- Organized menu sections:
  - Appetizers
  - Main Courses
  - Sides
  - Desserts
  - Beverages
- Item descriptions and pricing
- Professional presentation

### Reservations Page (reservations.html)
- Reservation form with fields:
  - Name, Email, Phone
  - Date and Time selection
  - Number of guests
  - Occasion type
  - Special requests
- Form validation
- Confirmation messages
- Reservation information
- Restaurant policies

### Contact Page (contact.html)
- Contact form for inquiries
- Restaurant information:
  - Address
  - Phone numbers
  - Email addresses
  - Operating hours
- Special services information
- FAQ section
- Social media links

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow the prompts and deploy
```

### Option 2: Using Git Integration

1. Push code to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/hot-grill.git
   git push -u origin main
   ```

2. Connect to Vercel
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

3. Your site will be live at `https://hot-grill-restaurant.vercel.app`

## Usage

### Making a Reservation
1. Click "Book a Table" or go to Reservations page
2. Fill in your details
3. Select date, time, and party size
4. Add any special requests
5. Submit form
6. Receive confirmation message

### Submitting a Message
1. Go to Contact page
2. Fill in your name, email, and message
3. Click "Send Message"
4. Receive confirmation

### Data Storage
- Reservations and messages are stored in browser's LocalStorage
- Admins can access data using browser developer tools
- No server-side storage required

## Customization

### Changing Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #d4441f;      /* Main brand color */
    --secondary-color: #2c3e50;    /* Dark text */
    --accent-color: #f39c12;       /* Highlights */
}
```

### Updating Restaurant Info
Update these sections in HTML files:
- Phone: `(555) 123-4567`
- Email: `info@hotgrill.com`
- Hours: Monday-Sunday times
- Address: `123 Grill Street`

### Adding Menu Items
Add new items to `menu.html`:
```html
<div class="menu-item">
    <div class="item-header">
        <h3>Item Name</h3>
        <span class="price">$XX.99</span>
    </div>
    <p>Item description here</p>
</div>
```

## Performance Optimization

- Minified CSS and JavaScript
- Optimized image loading
- Browser caching enabled
- Fast DNS resolution
- Responsive images
- Mobile-first design

## Security

- Input validation on all forms
- XSS protection
- CSRF protection
- No sensitive data stored locally
- HTTPS enforced on Vercel

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

### Manual Testing Checklist
- [ ] All links work correctly
- [ ] Forms validate properly
- [ ] Mobile responsiveness
- [ ] Image loading
- [ ] Navigation consistency
- [ ] Footer appears on all pages
- [ ] Date picker shows future dates only

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## Troubleshooting

**Issue**: Page not loading
- **Solution**: Clear browser cache and refresh

**Issue**: Form not submitting
- **Solution**: Check browser console for errors, verify all required fields filled

**Issue**: Styles not applying
- **Solution**: Verify CSS file path and clear cache

**Issue**: Deployment fails
- **Solution**: Check that all HTML files are included, verify vercel.json syntax

## License

This project is licensed under the MIT License.

## Contact & Support

- **Email**: info@hotgrill.com
- **Phone**: (555) 123-4567
- **Website**: www.hotgrill.com
- **Address**: 123 Grill Street, Downtown District

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### Version 1.0.0 (Current)
- Initial website launch
- Home, Menu, Reservations, Contact pages
- Responsive design
- Form validation
- LocalStorage for data persistence
- Vercel deployment ready

## Roadmap

- [ ] Mobile app integration
- [ ] Loyalty program system
- [ ] Online ordering system
- [ ] Live chat support
- [ ] Photo gallery enhancement
- [ ] Multi-language support
- [ ] Virtual tour feature
- [ ] Email notifications for reservations
- [ ] Admin dashboard
- [ ] Integration with reservation systems

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [HTML5 Guide](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3 Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Support

For technical support or questions:
1. Check the FAQ section on the Contact page
2. Email: info@hotgrill.com
3. Call: (555) 123-4567

---

**Last Updated**: September 2026  
**Maintainer**: Hot Grill Development Team  
**Repository**: https://github.com/yourusername/hot-grill
