// Calendar View for Booking Management
let currentDate = new Date();
let bookings = [];

// Day names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    loadBookings();
    renderCalendar();
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        loadBookings();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        loadBookings();
    });
});

// Load bookings from API
async function loadBookings() {
    try {
        const response = await fetch('http://localhost:3001/api/bookings');
        const data = await response.json();
        if (data.success) {
            bookings = data.bookings;
            updateStats();
            renderTodayBookings();
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        bookings = [];
    }
}

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month/year display
    document.getElementById('current-month-year').textContent = 
        `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayBookings = bookings.filter(b => b.date === dateStr);
        
        dayElement.className = 'calendar-day';
        
        // Check if today
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Check if has bookings
        if (dayBookings.length > 0) {
            dayElement.classList.add('has-booking');
        }
        
        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Booking count
        if (dayBookings.length > 0) {
            const count = document.createElement('div');
            count.className = 'booking-count';
            count.textContent = `${dayBookings.length} booking${dayBookings.length > 1 ? 's' : ''}`;
            dayElement.appendChild(count);
            
            // Show first booking preview
            const firstBooking = dayBookings[0];
            const preview = document.createElement('div');
            preview.className = 'booking-item';
            preview.textContent = `${firstBooking.time} - ${firstBooking.name}`;
            dayElement.appendChild(preview);
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// Render today's bookings
function renderTodayBookings() {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings
        .filter(b => b.date === today)
        .sort((a, b) => a.time.localeCompare(b.time));
    
    const container = document.getElementById('today-bookings');
    container.innerHTML = '';
    
    if (todayBookings.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No appointments today.</p>';
        return;
    }
    
    todayBookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        
        card.innerHTML = `
            <div class="booking-card-header">
                <div class="booking-time">${formatTime(booking.time)}</div>
                <div class="booking-status ${booking.depositPaid ? 'paid' : 'pending'}">
                    ${booking.depositPaid ? 'Paid' : 'Pending'}
                </div>
            </div>
            <div class="booking-details">
                <p><strong>Name:</strong> ${booking.name}</p>
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                ${booking.message ? `<p><strong>Notes:</strong> ${booking.message}</p>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Update statistics
function updateStats() {
    const total = bookings.length;
    const thisMonth = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate.getMonth() === currentDate.getMonth() && 
               bookingDate.getFullYear() === currentDate.getFullYear();
    }).length;
    const pending = bookings.filter(b => !b.depositPaid).length;
    
    document.getElementById('total-bookings').textContent = total;
    document.getElementById('this-month').textContent = thisMonth;
    document.getElementById('pending').textContent = pending;
}

// Format time (09:00 -> 9:00 AM)
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

