# Hot Grill Restaurant Website

A modern, responsive website for Hot Grill featuring menu showcase, reservations, and customer engagement.

## Overview

The Hot Grill website is a full-featured digital presence designed to showcase our culinary offerings, facilitate online reservations, and build community with our customers. The site provides an intuitive browsing experience across all devices and integrates modern web technologies for optimal performance.

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Menu Display** - Interactive menu with detailed descriptions and pricing
- **Online Reservations** - Easy-to-use booking system with real-time availability
- **Photo Gallery** - Showcase of restaurant ambiance and signature dishes
- **Location & Hours** - Integrated map and operating hours
- **Contact Form** - Direct communication channel for inquiries
- **Special Events** - Promotion of seasonal menus and special dining experiences
- **Customer Reviews** - Display of ratings and testimonials
- **Newsletter Signup** - Email subscription for updates and promotions

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: React.js (optional - can be vanilla if preferred)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Hosting**: [Your hosting provider]
- **Payment Processing**: Stripe (for online payments if applicable)
- **Email Service**: SendGrid or Mailgun

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB instance (local or cloud-based)
- Git

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/hot-grill.git
   cd hot-grill
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_database_uri
   API_PORT=5000
   FRONTEND_URL=http://localhost:3000
   STRIPE_KEY=your_stripe_key
   EMAIL_SERVICE_KEY=your_email_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Website**
   Open `http://localhost:3000` in your browser

## Project Structure

```
hot-grill/
├── public/
│   ├── index.html
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Menu.js
│   │   ├── Reservations.js
│   │   └── Gallery.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── styles/
│   │   └── main.css
│   ├── utils/
│   │   └── api.js
│   └── App.js
├── server/
│   ├── routes/
│   │   ├── menu.js
│   │   ├── reservations.js
│   │   └── contact.js
│   ├── models/
│   │   ├── Reservation.js
│   │   └── MenuItem.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Usage

### Admin Dashboard
Access the admin panel at `/admin` (requires authentication) to:
- Update menu items and pricing
- View and manage reservations
- Respond to customer inquiries
- Update restaurant information

### Customer Features
- **Browse Menu**: View categorized dishes with descriptions
- **Make Reservations**: Select date, time, and party size
- **Contact Us**: Send messages directly to the restaurant
- **View Gallery**: Explore restaurant photos and atmosphere

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu` - Add new menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)

### Reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations/:id` - Get reservation details
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Contact
- `POST /api/contact` - Submit contact form

## Deployment

### Deploying to Production

```bash
npm run build
npm run start
```

Deploy to your hosting provider (Heroku, AWS, DigitalOcean, etc.):
```bash
git push heroku main
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Performance Optimization

- Images optimized with WebP format
- CSS and JavaScript minification
- Lazy loading for images
- Caching strategies implemented
- CDN integration for static assets

## Security

- HTTPS enforced
- Input validation on all forms
- CSRF protection enabled
- SQL injection prevention via parameterized queries
- Regular security audits recommended

## Troubleshooting

**Issue**: Database connection failing
- **Solution**: Verify MongoDB URI in `.env` file and ensure database is running

**Issue**: Images not loading
- **Solution**: Check image paths and ensure `/public/assets/images` directory exists

**Issue**: Reservation form not working
- **Solution**: Verify Stripe and email service credentials in `.env`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

- **Email**: info@hotgrill.com
- **Phone**: (555) 123-4567
- **Website**: www.hotgrill.com
- **Address**: [Your Restaurant Address]

## Changelog

### Version 1.0.0 (Initial Release)
- Launched website with core features
- Menu display system
- Reservation booking
- Contact form

### Version 1.1.0
- Added photo gallery
- Implemented newsletter signup
- Performance optimizations

## Roadmap

- [ ] Mobile app integration
- [ ] Loyalty program system
- [ ] Online ordering and delivery
- [ ] Multi-language support
- [ ] Virtual tour feature
- [ ] AI-powered recommendation engine

---

**Last Updated**: September 2026
**Maintainer**: Hot Grill Development Team
