// Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
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
        bookingForm.addEventListener('submit', function(e) {
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

            // Simulate form submission (replace with actual API call later)
            submitBooking(formData);
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

    // Submit booking (simulated - replace with actual API call)
    function submitBooking(data) {
        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // In a real application, you would send this data to a backend API
            console.log('Booking submitted:', data);

            // For now, we'll just show a success message
            // In production, you would:
            // 1. Send data to your backend API
            // 2. Handle the response
            // 3. Show appropriate success/error messages

            showMessage(
                `Thank you, ${data.name}! Your booking request has been submitted. We'll contact you soon to confirm your appointment.`,
                'success'
            );

            // Reset form
            bookingForm.reset();
            dateInput.setAttribute('min', today);

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Scroll to message
            bookingMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1000);
    }

    // Show message function
    function showMessage(message, type) {
        bookingMessage.textContent = message;
        bookingMessage.className = `booking-message ${type}`;
        bookingMessage.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                bookingMessage.style.display = 'none';
            }, 5000);
        }
    }
});

