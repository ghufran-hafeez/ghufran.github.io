// ==================== DOM Elements ==================== //
const themeCheckbox = document.getElementById('theme-checkbox');
const htmlElement = document.documentElement;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// ==================== Theme Toggle & Persistence ==================== //
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

// ==================== Navbar Scroll Effect ==================== //
let lastScrollTop = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    
    // Add scroll shadow effect
    if (scrollTop > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

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
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ==================== Enhanced Form Submission ==================== //
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const subject = this.querySelector('input[name="subject"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Validate
        if (!name || !email || !message) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
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

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
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
            }, index * 80);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const elementsToObserve = [
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.portfolio-item'),
    ...document.querySelectorAll('.skill-card'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.info-card')
];

elementsToObserve.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ==================== Parallax Effect ==================== //
const heroShapes = document.querySelectorAll('.hero-shape, .hero-shape-secondary');

if (heroShapes.length > 0) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.4 + (index * 0.08);
            shape.style.transform = `translateY(${scrollPosition * speed}px) rotateZ(${scrollPosition * 0.02}deg)`;
        });
    }, { passive: true });
}

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

// ==================== Initialize Active Nav Link ==================== //
document.addEventListener('DOMContentLoaded', function() {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
    
    updateActiveNavLink();
});

// ==================== Smooth Scroll Helper ==================== //
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== Lazy Loading Images ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Accessibility: Keyboard Navigation ==================== //
document.addEventListener('keydown', function(event) {
    // Handle Escape key
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
    
    // Handle Tab key for better focus management
    if (event.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// ==================== Cursor Effect (Optional) ==================== //
if (window.innerWidth > 1024) {
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'radial-gradient(circle, #3b82f6, #8b5cf6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'fadeOut 0.8s ease-out forwards';
        particle.style.opacity = '0.6';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    };
    
    // Add CSS animation for particles
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateY(-20px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== Console Welcome Message ==================== //
console.log(
    '%c👋 Welcome to Ghufran\'s Professional Portfolio!',
    'font-size: 18px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 20px; border-radius: 8px; font-family: "Inter", sans-serif;'
);
console.log(
    '%c🎬 Professional Video Editor | 4+ Years Experience',
    'font-size: 14px; color: #3b82f6; font-weight: 600; font-family: "Inter", sans-serif;'
);
console.log(
    '%c✨ Specializing in: YouTube Music Videos, Wedding Films, Color Grading & Social Media Content',
    'font-size: 12px; color: #64748b; font-family: "Inter", sans-serif;'
);
console.log(
    '%c📱 Visit Fiverr: https://www.fiverr.com/s/o81lzbA',
    'font-size: 12px; color: #8b5cf6; font-weight: 600; font-family: "Inter", sans-serif;'
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

// ==================== Window Resize Handler ==================== //
const handleResize = debounce(() => {
    updateActiveNavLink();
}, 250);

window.addEventListener('resize', handleResize, { passive: true });

// ==================== Export Functions for External Use ==================== //
window.portfolio = {
    smoothScroll: smoothScrollToSection,
    toggleTheme: function() {
        themeCheckbox.click();
    },
    isScrolling: false
};

// ==================== Detect Scroll State ==================== //
window.addEventListener('scroll', () => {
    window.portfolio.isScrolling = true;
    
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        window.portfolio.isScrolling = false;
    }, 100);
}, { passive: true });