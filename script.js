tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#D4F45F", // Lime Green from screenshot
                "primary-hover": "#C2E34D",
                "teal-light": "#2A9D8F",
                "teal-dark": "#185659",
                "background-light": "#F3F4F6",
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
            navbar.classList.add('bg-[#0F5F64]'); // Solid color
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-[#0F5F64]');
            navContainer.classList.add('py-4');
            navContainer.classList.remove('py-2');
        }
    });

    // Feature Boxes Interaction Logic
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresGrid = document.getElementById('features-grid');

    // Define classes for Active State (Hovered) - TEAL THEME
    const activeCardClasses = ['bg-[#209499]', 'scale-[1.02]', 'shadow-xl', 'border', 'border-transparent'];
    const activeIconContainerClasses = ['bg-white/20'];
    const activeIconClasses = ['text-white'];
    const activeTitleClasses = ['text-white'];
    const activeDescClasses = ['text-white/90', 'font-medium'];

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
});
