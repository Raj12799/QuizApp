tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#2563EB", // Blue-600
                "primary-hover": "#1D4ED8",
                "teal-light": "#60A5FA",
                "teal-dark": "#1E40AF",
                "background-light": "#F8FAFC",
                "background-dark": "#0F172A",
            },
            fontFamily: {
                display: ['Plus Jakarta Sans', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            }
        },
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Logic
    const navbar = document.getElementById('navbar');
    const navContainer = navbar.querySelector('.container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-[#F8FAFC]'); // Solid color
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-[#2563EB]');
            navContainer.classList.add('py-4');
            navContainer.classList.remove('py-2');
        }
    });

    // Feature Boxes Interaction Logic
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresGrid = document.getElementById('features-grid');

    // Define classes for Active State (Hovered) - BLUE THEME
    const activeCardClasses = ['bg-blue-50', 'scale-[1.02]', 'shadow-xl', 'border', 'border-blue-200'];
    const activeIconContainerClasses = ['bg-black/10'];
    const activeIconClasses = ['text-gray-900'];
    const activeTitleClasses = ['text-gray-900'];
    const activeDescClasses = ['text-gray-800', 'font-medium'];

    // Define classes for Inactive State (Default)
    const inactiveCardClasses = ['bg-gray-50', 'dark:bg-slate-700', 'hover:bg-gray-100', 'dark:hover:bg-slate-600', 'border', 'border-gray-200', 'dark:border-slate-600'];
    const inactiveIconContainerClasses = ['bg-gray-100', 'dark:bg-slate-600'];
    const inactiveIconClasses = ['text-blue-600', 'dark:text-blue-400'];
    const inactiveTitleClasses = ['text-gray-900', 'dark:text-white'];
    const inactiveDescClasses = ['text-gray-600', 'dark:text-gray-300'];

    function setCardState(card, isActive) {
        // Elements within the card
        const iconContainer = card.querySelector('.icon-container');
        const icon = card.querySelector('.material-icons-round');
        const title = card.querySelector('.card-title');
        const desc = card.querySelector('.card-desc');

        // No strict return; handle each element existence individually check

        if (isActive) {
            // REMOVE Inactive Classes & ADD Active Classes

            // Card Container
            card.classList.remove(...inactiveCardClasses);
            card.classList.add(...activeCardClasses);

            // Icon Container (if exists)
            if (iconContainer) {
                iconContainer.classList.remove(...inactiveIconContainerClasses);
                iconContainer.classList.add(...activeIconContainerClasses);
            }

            // Icon (if exists)
            if (icon) {
                icon.classList.remove(...inactiveIconClasses);
                icon.classList.add(...activeIconClasses);
            }

            // Title (if exists)
            if (title) {
                title.classList.remove(...inactiveTitleClasses);
                title.classList.add(...activeTitleClasses);
            }

            // Description (if exists)
            if (desc) {
                desc.classList.remove(...inactiveDescClasses);
                desc.classList.add(...activeDescClasses);
            }

        } else {
            // REMOVE Active Classes & ADD Inactive Classes

            // Card Container
            card.classList.remove(...activeCardClasses);
            card.classList.add(...inactiveCardClasses);

            // Icon Container (if exists)
            if (iconContainer) {
                iconContainer.classList.remove(...activeIconContainerClasses);
                iconContainer.classList.add(...inactiveIconContainerClasses);
            }

            // Icon (if exists)
            if (icon) {
                icon.classList.remove(...activeIconClasses);
                icon.classList.add(...inactiveIconClasses);
            }

            // Title (if exists)
            if (title) {
                title.classList.remove(...activeTitleClasses);
                title.classList.add(...inactiveTitleClasses);
            }

            // Description (if exists)
            if (desc) {
                desc.classList.remove(...activeDescClasses);
                desc.classList.add(...inactiveDescClasses);
            }
        }
    }

    // Event Listeners for Hover Effects
    featureCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            // When hovering a card, make IT active
            setCardState(card, true);
        });

        card.addEventListener('mouseleave', () => {
            // When leaving a card, revert IT to inactive
            setCardState(card, false);
        });
    });

    // Initialize all cards to INACTIVE state on load to be safe
    featureCards.forEach(card => setCardState(card, false));

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Project Image Carousel Logic (Infinite)
    const carouselContainers = document.querySelectorAll('.project-carousel-container');

    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const dots = container.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        const totalImages = 3; // Based on the HTML structure
        let intervalId = null;

        function updateCarousel(index) {
            track.style.transform = `translateX(-${(index * 100) / totalImages}%)`;

            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active', 'bg-primary', 'w-3');
                    dot.classList.remove('bg-white/40', 'w-1.5');
                } else {
                    dot.classList.remove('active', 'bg-primary', 'w-3');
                    dot.classList.add('bg-white/40', 'w-1.5');
                }
            });
        }

        // Start cycling on hover
        container.addEventListener('mouseenter', () => {
            // Reset interval if exists (safety)
            if (intervalId) clearInterval(intervalId);

            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarousel(currentIndex);
            }, 2000); // Change image every 2 seconds on hover
        });

        // Stop cycling and reset on mouse leave
        container.addEventListener('mouseleave', () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            // Reset to first image
            currentIndex = 0;
            updateCarousel(0);
        });

        // Initial setup
        updateCarousel(0);
    });

    // Certification Carousel Logic (Native CSS Scroll)
    // Functionality replaced by CSS scroll-snap and overflow-x-auto

    // Viewport Normalization (Desktop-like Compact Look on Tablet/Mobile)
    function normalizeMobileViewport() {
        const width = window.innerWidth;
        // Apply on mobile AND tablet (width < 1024px)
        if (width < 1024) {
            // Force a desktop-like container width simulation 
            // 768px tablet gets scaled to fit closer to desktop arrangement
            const baselineWidth = width < 768 ? 414 : 1024;
            // If tablet, we try to scale it to fit more content like desktop
            // Actually, simply scaling 'down' a larger viewport is effective.

            // Standard scaling logic:
            let scaleFactor = 1;

            if (width < 768) {
                scaleFactor = width / 414;
            } else {
                // Tablet Mode: Scale down slightly to make it look "compact"
                // Basically behave as if the screen is wider (1024px) but scaled down
                // No, wait. To make it COMPACT, we want to zoom OUT (scale < 1)?
                // Or zoom IN?
                // The user wants "Desktop mode la ata jasa dista... tasach tablet la"
                // Desktop mode (lg) usually activates at 1024px+.
                // If we are at 768px, we show the 'md' layout which we just forced to be 4-cols.
                // So the CSS change is the primary driver.
                // However, we can ensure the zoom is neutral (1).
                scaleFactor = 1;
            }

            document.body.style.zoom = scaleFactor;
        } else {
            // Reset on desktop
            document.body.style.zoom = 1;
        }
    }

    // Run on load and resize
    normalizeMobileViewport();
    window.addEventListener('resize', normalizeMobileViewport);
});
