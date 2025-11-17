// Splash Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');

    // Check if user has already seen the splash screen (using sessionStorage)
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
        // User has seen it in this session, skip splash
        splashScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    } else {
        // Show splash screen
        splashScreen.style.display = 'flex';
        mainContent.classList.add('hidden');
    }

    // Handle Enter button click
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            // Mark as seen
            sessionStorage.setItem('hasSeenSplash', 'true');
            
            // Fade out splash screen
            splashScreen.style.transition = 'opacity 0.5s ease-out';
            splashScreen.style.opacity = '0';
            
            // Show main content after fade
            setTimeout(function() {
                splashScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // Smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        });
    }

    // Optional: Add keyboard support (Enter key)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && splashScreen.style.display !== 'none') {
            enterBtn.click();
        }
    });
});



