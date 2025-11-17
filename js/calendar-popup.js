// Calendar Popup for Date Selection
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const calendarTrigger = document.getElementById('calendar-trigger');
    const calendarModal = document.getElementById('calendar-modal');
    const calendarClose = document.getElementById('calendar-close');
    const calendarCancel = document.getElementById('calendar-cancel');
    const calendarConfirm = document.getElementById('calendar-confirm');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const monthYearDisplay = document.getElementById('calendar-month-year');
    const calendarGrid = document.getElementById('calendar-popup-grid');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedDateElement = null;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    // Open calendar modal
    function openCalendar() {
        // If date input has a value, set current date to that
        if (dateInput.value) {
            const existingDate = new Date(dateInput.value);
            if (!isNaN(existingDate.getTime())) {
                currentDate = existingDate;
            }
        }
        selectedDate = null;
        selectedDateElement = null;
        calendarModal.style.display = 'flex';
        renderCalendar();
    }

    // Close calendar modal
    function closeCalendar() {
        calendarModal.style.display = 'none';
    }

    // Render calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        calendarGrid.innerHTML = '';

        // Add day headers
        dayNames.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-popup-day-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-popup-day disabled';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of month
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);

            dayElement.className = 'calendar-popup-day';

            // Disable past dates
            if (date < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(dayElement, date));
            }

            // Highlight today
            if (date.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }

            // Highlight if this is the selected date
            if (selectedDate && date.getTime() === selectedDate.getTime()) {
                dayElement.classList.add('selected');
                selectedDateElement = dayElement;
            }

            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        }
    }

    // Select a date
    function selectDate(element, date) {
        // Remove previous selection
        if (selectedDateElement) {
            selectedDateElement.classList.remove('selected');
        }

        // Add selection to new date
        element.classList.add('selected');
        selectedDate = date;
        selectedDateElement = element;
    }

    // Confirm date selection
    function confirmDate() {
        if (selectedDate) {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            
            dateInput.value = dateString;
            closeCalendar();
        }
    }

    // Event listeners
    if (calendarTrigger) {
        calendarTrigger.addEventListener('click', openCalendar);
    }

    if (dateInput) {
        dateInput.addEventListener('click', openCalendar);
        dateInput.addEventListener('focus', openCalendar);
    }

    if (calendarClose) {
        calendarClose.addEventListener('click', closeCalendar);
    }

    if (calendarCancel) {
        calendarCancel.addEventListener('click', closeCalendar);
    }

    if (calendarConfirm) {
        calendarConfirm.addEventListener('click', confirmDate);
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Close modal when clicking outside
    calendarModal.addEventListener('click', (e) => {
        if (e.target === calendarModal) {
            closeCalendar();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && calendarModal.style.display === 'flex') {
            closeCalendar();
        }
    });
});

