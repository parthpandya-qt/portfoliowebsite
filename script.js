/* ==========================================================================
   Modern Developer Portfolio - JavaScript Logic
   Designed for Parth Pandya
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Typed.js ---
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ['Web Developer', 'MERN Stack Developer', 'Backend Enthusiast', 'CS Student'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            
            // Toggle hamburger icon to X (morphing effect)
            const isOpen = navLinks.classList.contains('show');
            menuToggle.innerHTML = isOpen 
                ? `<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
                : `<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    menuToggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
                }
            });
        });
    }

    // --- Scrollspy & Header styling ---
    const header = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('#nav-links ul li a');

    window.addEventListener('scroll', () => {
        // Nav bar shrink on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight when 150px from top
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Visit Counter with count-up animation ---
    const visitCountEl = document.getElementById('visit-count');
    if (visitCountEl) {
        let count = localStorage.getItem('visitCount');
        
        if (!count) {
            count = 1;
        } else {
            count = parseInt(count) + 1;
        }
        
        localStorage.setItem('visitCount', count);

        // Animate counting up for premium experience
        let currentCount = 0;
        const duration = 1000; // 1 second total count duration
        const increment = Math.ceil(count / (duration / 30));
        
        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= count) {
                currentCount = count;
                clearInterval(counter);
            }
            visitCountEl.textContent = currentCount.toLocaleString();
        }, 30);
    }

    // --- Projects Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        // Reset animation
                        card.style.animation = 'none';
                        card.offsetHeight; // trigger reflow
                        card.style.animation = '';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});
