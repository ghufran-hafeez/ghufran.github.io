// ==================== Theme Toggle ==================== //
const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeCheckbox.checked = true;
} else {
    document.body.classList.remove('dark-mode');
    themeCheckbox.checked = false;
}

// Listen for theme toggle
themeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// ==================== Smooth Scrolling ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Navbar Active Link ==================== //
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Form Submission ==================== //
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.disabled = true;
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// ==================== Intersection Observer for Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== Add Active State to Navigation ==================== //
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-accent);
        border-bottom: 2px solid var(--primary-accent);
        padding-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

// ==================== Parallax Effect ==================== //
window.addEventListener('scroll', function() {
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        const scrollPosition = window.scrollY;
        heroShape.style.transform = `translateY(${scrollPosition * 0.5}px) rotateZ(${scrollPosition * 0.1}deg)`;
    }
});

// ==================== Mobile Menu Toggle ==================== //
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close menu on link click (if mobile menu exists)
        navMenu.classList.remove('active');
    });
});

// ==================== Page Load Animation ==================== //
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ==================== Scroll to Top Button (Optional) ==================== //
window.addEventListener('scroll', function() {
    // You can add a scroll-to-top button here if needed
});

// ==================== Console Message ==================== //
console.log('%c👋 Welcome to Ghufran\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cProfessional Video Editor | 4 Years Experience', 'font-size: 14px; color: #6b7280;');
console.log('%cVisit: https://www.fiverr.com/s/o81lzbA', 'font-size: 12px; color: #a78bfa;');
