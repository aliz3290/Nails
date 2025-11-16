# Nail Art Studio Website

A beautiful, modern website for displaying nail art and handling appointment bookings.

## Features

- 🎨 **Gallery Section**: Showcase your nail art creations
- 📅 **Booking System**: Easy-to-use appointment booking form
- 📱 **Responsive Design**: Works perfectly on all devices
- ✨ **Modern UI**: Beautiful, professional design

## Getting Started

### Prerequisites

- Node.js and npm installed on your system

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

3. Start the development server:
```bash
npm start
```

The website will open in your browser at `http://localhost:3000`

## Project Structure

```
Nails/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   ├── booking.js      # Booking form functionality
│   └── gallery.js      # Gallery functionality
├── package.json        # Dependencies
└── README.md          # This file
```

## Adding Images to Gallery

To add nail art images to the gallery:

1. Create an `images` folder in the project root
2. Add your nail art images to the `images` folder
3. Update the `galleryItems` array in `js/gallery.js` with your image paths:

```javascript
const galleryItems = [
    { src: 'images/nail-art-1.jpg', alt: 'Beautiful nail art design 1' },
    { src: 'images/nail-art-2.jpg', alt: 'Beautiful nail art design 2' },
    // Add more images...
];
```

## Customization

### Colors

Edit the CSS variables in `css/style.css` to change the color scheme:

```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #f8b500;
    /* ... */
}
```

### Services

Update the services section in `index.html` to match your offerings.

### Booking Form

The booking form currently simulates submission. To connect it to a backend:

1. Update the `submitBooking` function in `js/booking.js`
2. Replace the simulated API call with your actual backend endpoint

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Live Server (for development)

## License

This project is open source and available for personal use.

## Contact

For questions or support, please open an issue on GitHub.

