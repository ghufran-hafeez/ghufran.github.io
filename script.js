// ==================== Theme Toggle & Persistence ==================== //
const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;

// Check for saved theme preference or system preference
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Set initial theme
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeCheckbox.checked = true;
    updateThemeIcon();
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
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}

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

// ==================== Navbar Active Link Detection ==================== //
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 300)) {
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

// ==================== Enhanced Form Submission ==================== //
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Validate
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '✓ Message Sent!';
        submitButton.disabled = true;
        submitButton.style.pointerEvents = 'none';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.pointerEvents = 'auto';
        }, 3000);
    });
}

// ==================== Intersection Observer for Scroll Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const elementsToObserve = [
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.portfolio-item'),
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.stat-card')
];

elementsToObserve.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ==================== Parallax Effect ==================== //
const heroShapes = document.querySelectorAll('.hero-shape, .hero-shape-secondary');

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    heroShapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollPosition * speed}px) rotateZ(${scrollPosition * 0.05}deg)`;
    });
});

// ==================== Navbar Scroll Effect ==================== //
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== Page Load Animation ==================== //
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroVisual.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ==================== Active Nav Link Styling ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
});

// ==================== Smooth Scroll to Section ==================== //
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== Performance: Lazy Loading Consideration ==================== //
// For future optimization with actual images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Accessibility: Focus Management ==================== //
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals if they exist
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// ==================== Console Welcome Message ==================== //
console.log(
    '%c👋 Welcome to Ghufran\'s Professional Portfolio!',
    'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 10px; border-radius: 5px;'
);
console.log(
    '%cProfessional Video Editor | 4+ Years Experience',
    'font-size: 14px; color: #3b82f6; font-weight: 600;'
);
console.log(
    '%cSpecializing in: YouTube Music Videos, Wedding Films, Color Grading, Documentary & Social Media Content',
    'font-size: 12px; color: #64748b;'
);
console.log(
    '%cVisit Fiverr Profile: https://www.fiverr.com/s/o81lzbA',
    'font-size: 12px; color: #8b5cf6; font-weight: 600;'
);

// ==================== Utility: Debounce Function ==================== //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Responsive Navigation ==================== //
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== Export Functions for External Use ==================== //
window.portfolio = {
    smoothScroll: smoothScrollToSection,
    toggleTheme: function() {
        themeCheckbox.click();
    }
};
