// ===================================================
// Binary Rain Background Animation (Hero Section Only)
// ===================================================
const canvas = document.getElementById('binaryRain');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');

    // Set canvas size to match hero section
    function resizeCanvas() {
        if (heroSection) {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function drawBinaryRain() {
        // Clear canvas with semi-transparent background for trail effect
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text properties
        ctx.fillStyle = '#00a3e0'; // Cyan color matching your theme
        ctx.font = fontSize + 'px monospace';
        ctx.fontWeight = 'bold';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random binary digit (0 or 1)
            const char = Math.random() > 0.5 ? '1' : '0';
            
            // X position (column)
            const x = i * fontSize;
            
            // Y position (row)
            const y = drops[i] * fontSize;
            
            // Draw the character
            ctx.fillText(char, x, y);
            
            // Randomly reset drops to create new rain streams
            if (y > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        }
    }

    // Animation loop
    function animateBinaryRain() {
        drawBinaryRain();
        requestAnimationFrame(animateBinaryRain);
    }

    // Start animation
    animateBinaryRain();
}

// ===================================================
// Typing Animation Effect
// ===================================================
const typingText = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
const fullText = "Creative Developer & Designer";
let index = 0;
let isTyping = true;

function typeEffect() {
    if (index < fullText.length) {
        typingText.textContent += fullText[index];
        index++;
        setTimeout(typeEffect, 80); // Adjust speed (80ms between characters)
    } else {
        isTyping = false;
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeEffect);

// Optional: Reset and retype on hover
if (typingText && typingCursor) {
    typingText.parentElement.addEventListener('mouseenter', () => {
        if (!isTyping) {
            typingText.textContent = '';
            index = 0;
            isTyping = true;
            typeEffect();
        }
    });
}

// ===================================================
// Smooth Scrolling for Navigation Links
// ===================================================
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

// ===================================================
// Contact Form - FormSubmit.co Integration
// ===================================================
// FormSubmit handles form submission automatically!
// No JavaScript needed - just ensure the form has:
// - action="https://formsubmit.co/your-email@gmail.com"
// - method="POST"
// - proper name attributes on inputs
// The form will automatically send emails when submitted.

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // FormSubmit will handle the submission
        console.log('Form submitted to FormSubmit.co');
    });
}

// ===================================================
// Intersection Observer for Animations
// ===================================================
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

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe about section
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateX(-20px)';
    aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(aboutContent);
}

// ===================================================
// Update Navbar Active Link on Scroll
// ===================================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});