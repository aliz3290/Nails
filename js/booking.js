// Booking Form Handler with Stripe Integration
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    const dateInput = document.getElementById('date');
    const submitBtn = document.getElementById('submit-btn');

    // Date validation will be handled by calendar popup

    // Initialize Stripe
    // IMPORTANT: Replace 'pk_test_51...' with your actual Stripe publishable key
    // Get it from https://dashboard.stripe.com/apikeys
    const STRIPE_PUBLISHABLE_KEY = 'pk_test_51...'; // TODO: Add your Stripe publishable key here
    const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    const elements = stripe.elements();
    
    let cardElement;
    if (document.getElementById('card-element')) {
        cardElement = elements.create('card', {
            style: {
                base: {
                    color: '#ffffff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    '::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                    },
                },
                invalid: {
                    color: '#ff0000',
                },
            },
        });
        cardElement.mount('#card-element');

        // Handle real-time validation errors
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
                displayError.style.display = 'block';
            } else {
                displayError.textContent = '';
                displayError.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'PROCESSING...';

            try {
                // Create payment intent on backend
                const response = await fetch('http://localhost:3001/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: 2500, // $25.00 in cents
                        bookingData: formData
                    })
                });

                const { clientSecret, error: backendError } = await response.json();

                if (backendError) {
                    showMessage(backendError.message, 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'PAY DEPOSIT & BOOK APPOINTMENT';
                    return;
                }

                // Confirm payment with Stripe
                const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                        },
                    },
                });

                if (stripeError) {
                    showMessage(stripeError.message, 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'PAY DEPOSIT & BOOK APPOINTMENT';
                    return;
                }

                // Payment successful - save booking
                if (paymentIntent.status === 'succeeded') {
                    const bookingResponse = await fetch('http://localhost:3001/api/save-booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...formData,
                            paymentIntentId: paymentIntent.id,
                            depositPaid: true,
                            status: 'confirmed'
                        })
                    });

                    const bookingResult = await bookingResponse.json();

                    if (bookingResult.success) {
                        showMessage(
                            `Thank you, ${formData.name}! Your deposit has been paid and your appointment is confirmed for ${formData.date} at ${formData.time}.`,
                            'success'
                        );

                        // Reset form
                        bookingForm.reset();
                        cardElement.clear();
                        if (dateInput) {
                            dateInput.setAttribute('min', today);
                        }
                    } else {
                        showMessage('Booking saved but there was an issue. Please contact us.', 'error');
                    }
                }

            } catch (error) {
                console.error('Error:', error);
                showMessage('An error occurred. Please try again or contact us directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'PAY DEPOSIT & BOOK APPOINTMENT';
            }
        });
    }

    // Form validation
    function validateForm(data) {
        // Check if all required fields are filled
        if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
            showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        // Validate phone number (basic validation)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
            showMessage('Please enter a valid phone number.', 'error');
            return false;
        }

        // Validate date is not in the past
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            showMessage('Please select a future date.', 'error');
            return false;
        }

        return true;
    }

    // Show message function
    function showMessage(message, type) {
        if (bookingMessage) {
            bookingMessage.textContent = message;
            bookingMessage.className = `booking-message ${type}`;
            bookingMessage.style.display = 'block';

            // Auto-hide success messages after 8 seconds
            if (type === 'success') {
                setTimeout(() => {
                    bookingMessage.style.display = 'none';
                }, 8000);
            }

            // Scroll to message
            bookingMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});
