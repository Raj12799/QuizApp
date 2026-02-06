tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#D4F45F", // Lime Green from screenshot
                "primary-hover": "#C2E34D",
                "teal-light": "#2A9D8F",
                "teal-dark": "#185659",
                "background-light": "#FFFFFF",
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
            navbar.classList.add('bg-[#209499]'); // Solid color
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-[#209499]');
            navContainer.classList.add('py-4');
            navContainer.classList.remove('py-2');
        }
    });

    // Feature Boxes Interaction Logic
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresGrid = document.getElementById('features-grid');

    // Define classes for Active State (Hovered) - TEAL THEME
    const activeCardClasses = ['bg-[#D4F45F]', 'scale-[1.02]', 'shadow-xl', 'border', 'border-transparent'];
    const activeIconContainerClasses = ['bg-black/10'];
    const activeIconClasses = ['text-gray-900'];
    const activeTitleClasses = ['text-gray-900'];
    const activeDescClasses = ['text-gray-800', 'font-medium'];

    // Define classes for Inactive State (Default)
    const inactiveCardClasses = ['bg-gray-50', 'dark:bg-slate-700', 'hover:bg-gray-100', 'dark:hover:bg-slate-600', 'border', 'border-gray-200', 'dark:border-slate-600'];
    const inactiveIconContainerClasses = ['bg-gray-100', 'dark:bg-slate-600'];
    const inactiveIconClasses = ['text-teal-600', 'dark:text-teal-400'];
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

    // Certification Carousel Logic (Manual Navigation)
    const certTrack = document.getElementById('cert-track');
    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');

    if (certTrack && certPrevBtn && certNextBtn) {
        let certIndex = 0;
        const totalCerts = 5;

        function getCarouselConfig() {
            const isMobile = window.innerWidth < 768;
            return {
                movePercent: isMobile ? 90 : 50,
                visibleCerts: isMobile ? 1 : 2,
                maxIndex: totalCerts - (isMobile ? 1 : 2)
            };
        }

        function updateCertCarousel() {
            const config = getCarouselConfig();

            // Move based on configured percentage
            certTrack.style.transform = `translateX(-${certIndex * config.movePercent}%)`;

            // Update buttons
            certPrevBtn.disabled = certIndex === 0;
            certNextBtn.disabled = certIndex >= config.maxIndex;

            // Visual opacity handling
            certPrevBtn.style.opacity = certIndex === 0 ? '0.3' : '1';
            certPrevBtn.style.cursor = certIndex === 0 ? 'not-allowed' : 'pointer';

            certNextBtn.style.opacity = certIndex >= config.maxIndex ? '0.3' : '1';
            certNextBtn.style.cursor = certIndex >= config.maxIndex ? 'not-allowed' : 'pointer';
        }

        certPrevBtn.addEventListener('click', () => {
            if (certIndex > 0) {
                certIndex--;
                updateCertCarousel();
            }
        });

        certNextBtn.addEventListener('click', () => {
            const config = getCarouselConfig();
            if (certIndex < config.maxIndex) {
                certIndex++;
                updateCertCarousel();
            }
        });

        // Update on resize
        window.addEventListener('resize', () => {
            // Reset index on resize to prevent out of bounds
            certIndex = 0;
            updateCertCarousel();
        });

        // Initialize
        updateCertCarousel();
    }

    // Viewport Normalization (Force 414px Look on Mobile)
    function normalizeMobileViewport() {
        const width = window.innerWidth;
        // Apply only on mobile/tablet portrait range
        if (width < 768) {
            const baselineWidth = 414; // iPhone XR Width
            const scaleFactor = width / baselineWidth;

            // Apply zoom to body to force exact layout scaling
            // This makes a 360px screen render like a 414px screen (scaled down)
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
