# Setup Instructions for Stripe Payments

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com/register
2. Sign up or log in to your Stripe account
3. Go to Developers → API keys
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)
5. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 3. Configure Stripe Keys

#### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the project root:
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

2. Install dotenv package:
```bash
npm install dotenv
```

3. Update `server.js` to load environment variables (add at the top):
```javascript
require('dotenv').config();
```

#### Option B: Direct Configuration

1. Update `server.js` line 3:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_SECRET_KEY_HERE');
```

2. Update `js/booking.js` line 12:
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

### 4. Start the Servers

**Terminal 1 - Frontend:**
```bash
npm start
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### 5. Test the Payment Flow

1. Go to http://localhost:3000
2. Click "ENTER NOW" on the splash screen
3. Scroll to the booking form
4. Fill out the form
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date (e.g., 12/25)
   - Any 3-digit CVC (e.g., 123)
   - Any ZIP code

### 6. View Calendar

Go to http://localhost:3000/calendar.html to see all bookings.

## Important Notes

- **Test Mode**: The default setup uses Stripe test mode. Switch to live mode in production.
- **Deposit Amount**: Currently set to $25 (2500 cents). Change in `js/booking.js` line 45.
- **Booking Storage**: Bookings are stored in `bookings.json` file (automatically created).

## Production Deployment

Before going live:
1. Switch to Stripe live mode keys
2. Update the API endpoints in `js/booking.js` to your production server
3. Set up proper environment variables on your hosting platform
4. Use HTTPS (required for Stripe in production)

