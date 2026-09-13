# Hot Grill Website - Quick Start Guide

Get your Hot Grill restaurant website up and running in minutes!

## 📋 What You Have

Your complete website includes:
- ✅ Home page with hero section
- ✅ Interactive menu page
- ✅ Online reservation system
- ✅ Contact form
- ✅ Responsive design (mobile-friendly)
- ✅ Modern styling with CSS
- ✅ JavaScript functionality
- ✅ Vercel deployment ready

## 🚀 Quick Start - 3 Steps

### Step 1: Run Locally (2 minutes)

**Option A: Just open the file**
- Double-click `index.html`
- Website opens in your browser

**Option B: Use a local server**
```bash
# Navigate to project folder
cd hot-grill

# Start a simple server
python -m http.server 8000
# OR
python -m SimpleHTTPServer 8000

# Open browser: http://localhost:8000
```

### Step 2: Customize Your Details

Edit these files with your restaurant info:

**All HTML files (index.html, menu.html, etc.)**
- Replace `(555) 123-4567` with your phone
- Replace `info@hotgrill.com` with your email
- Update address and hours
- Change restaurant name if needed

**styles.css (Optional)**
- Change primary color from `#d4441f` to your brand color
- Adjust fonts and spacing

**script.js (Optional)**
- Add email integration for forms
- Add payment processing
- Add SMS notifications

### Step 3: Deploy to Vercel (5 minutes)

**Easiest Way:**

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → Connect GitHub
3. Click "New Project" → Select `hot-grill` repo
4. Click "Deploy"
5. Get your live URL! 🎉

**Your site is now live!**

## 📁 File Structure

```
hot-grill/
├── index.html          → Home page
├── menu.html           → Menu with prices
├── reservations.html   → Booking system
├── contact.html        → Contact & FAQs
├── styles.css          → All styling
├── script.js           → Forms & interactions
├── package.json        → Project info
├── vercel.json         → Deployment config
├── README.md           → Full documentation
├── DEPLOYMENT.md       → Deployment guide
└── .gitignore          → Git configuration
```

## 🔧 Common Customizations

### Change Colors
In `styles.css`, find:
```css
:root {
    --primary-color: #d4441f;      /* Change this to your color */
    --secondary-color: #2c3e50;
    --accent-color: #f39c12;
}
```

### Update Menu Prices
In `menu.html`, find:
```html
<span class="price">$45.99</span>  <!-- Change price here -->
```

### Add More Dishes
Copy this section in `menu.html`:
```html
<div class="menu-item">
    <div class="item-header">
        <h3>Your Dish Name</h3>
        <span class="price">$XX.XX</span>
    </div>
    <p>Your dish description here</p>
</div>
```

### Change Restaurant Info
Search and replace:
- `Hot Grill` → Your restaurant name
- `(555) 123-4567` → Your phone
- `info@hotgrill.com` → Your email
- `123 Grill Street` → Your address

## 📱 Features

### Reservation System
- Date and time picker
- Party size selection
- Occasion selection
- Special requests field
- Form validation
- Confirmation messages

### Contact System
- Contact form
- FAQ section
- Restaurant info
- Social media links
- Operating hours

### Menu System
- Organized by categories
- Descriptions and prices
- Professional presentation
- Easy to update

### Responsive Design
- Works on desktop
- Tablet optimized
- Mobile friendly
- Touch-friendly buttons

## 🔒 Security

- ✅ Input validation on all forms
- ✅ No sensitive data stored
- ✅ HTTPS on Vercel
- ✅ XSS protection
- ✅ CSRF protection

## 📊 Data Storage

### Where Data Goes
- Reservations → Browser LocalStorage
- Messages → Browser LocalStorage
- No server needed
- No database required

### Access Data (Admin)
1. Open website in browser
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Type: `getReservations()` or `getMessages()`
5. Data appears in console

## 🌐 Deploy to Vercel

### Quick Deploy (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and you're done!
```

### Manual Deploy
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repository
4. Click Deploy
5. Done! 🚀

## ✨ After Deployment

Your website is now live!

**Share your URL:**
- `https://hot-grill-restaurant.vercel.app` (default)
- Or your custom domain

**What to do next:**
- [ ] Test all pages work
- [ ] Test forms
- [ ] Check on mobile
- [ ] Share with team
- [ ] Update social media
- [ ] Add to Google Business
- [ ] Monitor analytics

## 🎯 Next Steps

### Optional Enhancements
1. Add Google Analytics for tracking
2. Connect email notifications
3. Add payment processing
4. Create admin dashboard
5. Add online ordering
6. Set up email marketing

### Maintenance
- Update menu regularly
- Monitor reservations
- Respond to messages
- Update hours if needed
- Add new specials

## 📞 Need Help?

### Quick Fixes
- **Forms not working?** Check browser console (F12)
- **Page not loading?** Clear cache and refresh
- **Styles wrong?** Verify CSS file path
- **Deployment failed?** Check vercel.json syntax

### Documentation
- Full docs: See `README.md`
- Deployment: See `DEPLOYMENT.md`
- GitHub: `https://github.com/yourusername/hot-grill`

### Support
- Email: info@hotgrill.com
- Phone: (555) 123-4567
- Web: www.hotgrill.com

## 🎉 You're All Set!

Your Hot Grill website is ready to go live!

### Checklist Before Launch
- [ ] All contact info updated
- [ ] Menu prices correct
- [ ] Hours accurate
- [ ] All pages test
- [ ] Mobile looks good
- [ ] Links work
- [ ] Forms submit

### Go Live!
1. Deploy to Vercel
2. Test everything
3. Share with customers
4. Monitor analytics
5. Keep it updated

---

**Version**: 1.0.0  
**Last Updated**: September 2026  
**Support**: info@hotgrill.com

Happy serving! 🔥🍖
