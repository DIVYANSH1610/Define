// =========================
// SCROLL REVEAL ANIMATIONS
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// =========================
// PARALLAX FLOATING CARDS
// =========================

const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 20;
    const y = (e.clientY / h - 0.5) * 20;

    document.querySelectorAll('.float-card').forEach((card, index) => {
        const factor = (index % 3 + 1) * 0.4;
        const currentTransform = card.style.transform.replace(/translate3d\([^)]*\)/, '');
        card.style.transform = currentTransform + ` translate3d(${x * factor}px, ${y * factor}px, 0)`;
    });
});

// =========================
// ANIMATE TASK BARS ON LOAD
// =========================

window.addEventListener('load', () => {
    document.querySelectorAll('.task-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 800);
    });
});

// =========================
// SMOOTH SCROLL FOR NAVIGATION
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================
// FORM SUBMISSION HANDLER
// =========================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = contactForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Basic validation
        if (email && email.includes('@')) {
            // Show success message
            alert(`Thanks! We'll reach out to ${email} within 24 hours.`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================

let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// =========================
// STATS COUNTER ANIMATION
// =========================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            
            statNums.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number) && number < 100) {
                    animateCounter(stat, 0, number, 1500);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const suffix = element.innerHTML.match(/<span>.*<\/span>/)?.[0] || '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.innerHTML = Math.floor(current) + suffix;
    }, 16);
}

// =========================
// CTA BUTTON INTERACTIONS
// =========================

document.querySelectorAll('.btn-cta, .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Start your project') || 
            button.textContent.includes('Get a quote')) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
