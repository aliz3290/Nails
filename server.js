const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...'); // Add your Stripe secret key
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Booking storage file
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// Helper function to read bookings
async function readBookings() {
    try {
        const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write bookings
async function writeBookings(bookings) {
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

// Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, bookingData } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: 'usd',
            metadata: {
                customer_name: bookingData.name,
                customer_email: bookingData.email,
                service: bookingData.service,
                date: bookingData.date,
                time: bookingData.time,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message,
            },
        });
    }
});

// Save Booking
app.post('/api/save-booking', async (req, res) => {
    try {
        const booking = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString(),
        };

        const bookings = await readBookings();
        bookings.push(booking);
        await writeBookings(bookings);

        res.json({ success: true, booking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get All Bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await readBookings();
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Bookings by Date
app.get('/api/bookings/date/:date', async (req, res) => {
    try {
        const bookings = await readBookings();
        const dateBookings = bookings.filter(b => b.date === req.params.date);
        res.json({ success: true, bookings: dateBookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete Booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const bookings = await readBookings();
        const filtered = bookings.filter(b => b.id !== req.params.id);
        await writeBookings(filtered);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to set your STRIPE_SECRET_KEY environment variable!');
});

