document.addEventListener('DOMContentLoaded', () => {
    // --- Animate Hero Cards on Load ---
    const heroCards = document.querySelectorAll<HTMLElement>('#pitch .grid > div');
    heroCards.forEach((card, index) => {
        // Add the class that the observer looks for
        card.classList.add('anim-fade-in');
        // Add a staggered delay for a nice effect
        card.style.transitionDelay = `${index * 200}ms`;
    });

    // --- Stagger main sections animation ---
    const mainSectionsWithAnimation = document.querySelectorAll<HTMLElement>('section.anim-fade-in');
    mainSectionsWithAnimation.forEach((section, index) => {
        section.style.transitionDelay = `${index * 100}ms`; // A subtle delay for the waterfall effect
    });

    // --- Scroll Animation Observer ---
    const animatedElements = document.querySelectorAll('.anim-fade-in');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px' // Trigger a little before it's fully in view
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // --- Nav Link Active State Observer ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Highlight when section is in the middle of the viewport
    });

    sections.forEach(section => navObserver.observe(section));

    // --- Smooth Scroll for ALL Navigation Links ---
    const scrollButtons = document.querySelectorAll('.scroll-btn, header .nav-link');

    scrollButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('href');
            if (!targetId) return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});