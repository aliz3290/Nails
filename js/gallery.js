// Gallery Handler
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');

    // Sample gallery items (replace with actual images)
    // In production, you would fetch this from an API or load from a directory
    const galleryItems = [
        // Add your nail art images here
        // Example structure:
        // { src: 'images/nail-art-1.jpg', alt: 'Beautiful nail art design 1' },
        // { src: 'images/nail-art-2.jpg', alt: 'Beautiful nail art design 2' },
    ];

    // Function to create gallery item
    function createGalleryItem(item) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        
        // Handle image load error
        img.onerror = function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'gallery-placeholder';
            placeholder.innerHTML = '<span>📸</span><p>Image not found</p>';
            galleryItem.appendChild(placeholder);
        };
        
        galleryItem.appendChild(img);
        return galleryItem;
    }

    // Function to load gallery items
    function loadGallery() {
        if (galleryItems.length === 0) {
            // If no items, keep the placeholder
            return;
        }

        // Clear existing placeholder
        galleryGrid.innerHTML = '';

        // Add gallery items
        galleryItems.forEach(item => {
            const galleryItem = createGalleryItem(item);
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Function to add image to gallery (useful for dynamic additions)
    function addImageToGallery(src, alt) {
        const item = { src, alt };
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    }

    // Initialize gallery
    loadGallery();

    // Export function for adding images dynamically
    window.addImageToGallery = addImageToGallery;
});

