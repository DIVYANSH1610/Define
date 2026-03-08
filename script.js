// =========================
// EMAILJS CONFIGURATION
// =========================

const EMAILJS_PUBLIC_KEY = 'V7ul_30yyf4Nmz0lo';
const EMAILJS_SERVICE_ID = 'service_bw3y1kc';
const EMAILJS_TEMPLATE_ADMIN = 'template_isnhhdf'; // ✅ Admin notification (to you)
const EMAILJS_TEMPLATE_USER = 'template_q8z67u8'; // ✅ User auto-response

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// =========================
// FORM SUBMISSION HANDLER
// =========================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loader').style.display = 'inline-block';
        
        // Hide previous messages
        formMessage.style.display = 'none';
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                service: formData.get('service'),
                budget: formData.get('budget') || 'Not specified',
                message: formData.get('message')
            };
            
            // Send email to admin (you)
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ADMIN,
                data
            );
            
            // Send auto-response to user
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_USER,
                data
            );
            
            // Show success message
            showMessage('success', '✓ Message sent successfully! Check your email for confirmation.');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Email send error:', error);
            showMessage('error', '✗ Something went wrong. Please try again or email us directly at define.devincept@gmail.com');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline-block';
            submitBtn.querySelector('.btn-loader').style.display = 'none';
        }
    });
}

function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
}

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
}, { threshold: 0.1 });

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
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
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
            
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// =========================
// CONSOLE MESSAGE
// =========================

console.log('%c👋 Welcome to Define Studio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in how we built this? define.devincept@gmail.com', 'font-size: 14px; color: #6b7280;');
