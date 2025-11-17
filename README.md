# Nails by Elyanna - Booking System

A beautiful, modern website for displaying nail art and handling appointment bookings with Stripe payment integration.

## Features

- 🎨 **Gallery Section**: Showcase your nail art creations
- 📅 **Booking System**: Easy-to-use appointment booking form with Stripe deposit payments
- 📱 **Responsive Design**: Works perfectly on all devices (80% mobile optimized)
- ✨ **Modern UI**: Beautiful neon/dark theme design
- 💳 **Stripe Integration**: Secure deposit payments
- 📊 **Calendar View**: Owner dashboard to view and manage bookings

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- Stripe account (get your API keys from https://dashboard.stripe.com/apikeys)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aliz3290/Nails.git
cd Nails
```

2. Install dependencies:
```bash
npm install
```

3. Set up Stripe:
   - Copy `.env.example` to `.env`
   - Add your Stripe secret key and publishable key to `.env`
   - Update the Stripe publishable key in `index.html` (line in booking.js)

4. Start the frontend server:
```bash
npm start
```

5. In a separate terminal, start the backend server:
```bash
npm run server
```

The website will open in your browser at `http://localhost:3000`
The backend API will run at `http://localhost:3001`

## Stripe Setup

1. Sign up for a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Add your **Secret Key** to the `.env` file as `STRIPE_SECRET_KEY`
4. Add your **Publishable Key** to `js/booking.js` (replace `pk_test_51...`)

### Test Cards

For testing, use these Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date, any CVC

## Calendar View

Access the calendar view at `http://localhost:3000/calendar.html` to see all bookings, manage appointments, and view statistics.

## Project Structure

```
Nails/
├── index.html          # Main HTML file
├── calendar.html       # Calendar view for owner
├── server.js           # Express backend server
├── css/
│   ├── style.css       # Main stylesheet
│   └── calendar.css    # Calendar styles
├── js/
│   ├── booking.js      # Booking form with Stripe
│   ├── calendar.js      # Calendar functionality
│   ├── gallery.js      # Gallery functionality
│   └── splash.js       # Splash screen
├── package.json        # Dependencies
└── README.md          # This file
```

## Adding Images to Gallery

To add nail art images to the gallery:

1. Create an `images` folder in the project root
2. Add your nail art images to the `images` folder
3. Update the `galleryItems` array in `js/gallery.js` with your image paths

## Customization

### Colors

Edit the CSS variables in `css/style.css` to change the color scheme:

```css
:root {
    --neon-pink: #ff00ff;
    --neon-purple: #b300ff;
    --neon-cyan: #00ffff;
    /* ... */
}
```

### Deposit Amount

Change the deposit amount in:
- `js/booking.js` (line with `amount: 2500`) - amount in cents
- `index.html` (deposit info text)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Express.js (Backend)
- Stripe API (Payments)
- Live Server (for development)

## License

This project is open source and available for personal use.

## Support

For questions or support, please open an issue on GitHub.
