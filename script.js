// Minor update for PR demonstration
document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. DYNAMIC MOBILE MENU CREATION
    // =========================================
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // Create Hamburger Button
    const menuBtn = document.createElement('div');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert before the nav (logo is first, then nav)
    headerContainer.insertBefore(menuBtn, nav);

    // Toggle Menu Function
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change icon from hamburger to 'X'
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // =========================================
    // 2. TYPING TEXT EFFECT
    // =========================================
    const roleElement = document.querySelector('.role');
    const roles = ["AIML Engineer", "Web Developer", "Data Analyst", "Python Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1) + '|';
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    typeEffect();

    // =========================================
    // 3. SMOOTH SCROLLING FOR NAV LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // 4. SCROLL REVEAL ANIMATION
    // =========================================
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-item');
    
    // Add initial reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
}); 