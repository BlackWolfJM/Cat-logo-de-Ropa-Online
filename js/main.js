// Main initialization

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing Clothing Store...');

    // Show skeleton loading
    showSkeleton();

    // Simulate loading delay for realistic feel
    setTimeout(() => {
        // Hide skeleton and show products
        hideSkeleton();

        // Initialize all features
        initFilters();
        initModal();
        initTabs();
        initSearch();
        initMobileMenu();
        initHeaderScroll();
        initFavorites();
        renderTestimonials();

        console.log('Application initialized successfully!');
    }, 300);
}

/**
 * Initialize favorites functionality
 */
function initFavorites() {
    updateFavoriteCount();

    const favoritesBtn = document.getElementById('favoritesBtn');
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', showFavorites);
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    initSmoothScroll();
});

// Optional: Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});
