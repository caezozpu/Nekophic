// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        updateActiveNav(link.getAttribute('href'));
    });
});

// Smooth scroll and active nav
function updateActiveNav(target) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === target) {
            link.classList.add('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            const target = '#' + section.id;
            updateActiveNav(target);
        }
    });
});

// Intersection Observer for fade-in animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.display = 'none';
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            answer.style.display = 'block';
        }
    });
});

// Smooth scroll for CTA button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth Mouse Tracking for Cards
document.querySelectorAll('.portfolio-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) * 0.1;
        const rotateY = (centerX - x) * 0.1;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    });
});

// Smooth Testimonial Rotation with fade effect
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
if (testimonials.length > 1) {
    setInterval(() => {
        testimonials.forEach((t, idx) => {
            t.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            if (idx === currentTestimonial) {
                t.style.opacity = '1';
                t.style.transform = 'scale(1)';
            } else {
                t.style.opacity = '0.4';
                t.style.transform = 'scale(0.98)';
            }
        });
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }, 6000);
}

// Lazy loading for images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Enhanced counter animation with easing
function animateCounter(element, target, duration = 2500) {
    const startValue = 0;
    const difference = target - startValue;
    const startTime = Date.now();
    
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    
    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuad(progress);
        
        const currentValue = Math.floor(startValue + difference * easeProgress);
        
        if (element.textContent.includes('+')) {
            element.textContent = currentValue + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = currentValue + '%';
        } else if (element.textContent.includes('h')) {
            element.textContent = currentValue + 'h';
        } else {
            element.textContent = currentValue;
        }
        
        if (progress === 1) {
            clearInterval(timer);
        }
    }, 16);
}

// Trigger counter animation when scrolled into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const value = parseInt(num.textContent);
                animateCounter(num, value);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-inline').forEach(stat => {
    statsObserver.observe(stat);
});

// Scroll Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero::before');
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
});

// Button positioning for ripple effect
document.querySelectorAll('.btn-glass, .btn-service').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'visible';
    
    button.addEventListener('click', function(e) {
        const ripples = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripples.style.width = ripples.style.height = size + 'px';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        
        this.appendChild(ripples);
        
        setTimeout(() => ripples.remove(), 600);
    });
});

// Smooth scroll with ease in/out
document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    // Update scroll position indicator if needed
    document.querySelectorAll('[data-scroll]').forEach(el => {
        const offset = el.getAttribute('data-scroll') || 0;
        el.style.transform = `translateY(${scrollTop * offset}px)`;
    });
}, { passive: true });

// Console message
console.log('%cNEKOPHIC', 'font-size: 24px; font-weight: bold; color: #8b1818;');
console.log('%cUbah ide jadi karya yang mantap', 'font-size: 14px; color: #a1a1a6;');

// --- REVIEW SYSTEM ---
const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const starRating = document.getElementById('starRating');
const reviewRatingInput = document.getElementById('reviewRating');

// Get initials from name
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Format time ago
function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return 'Baru saja';
}

// Star rating interaction
if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            reviewRatingInput.value = star.dataset.value;
            stars.forEach((s, i) => {
                s.classList.toggle('active', i <= index);
            });
        });
        
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.style.color = i <= index ? '#8b1818' : 'rgba(255, 255, 255, 0.2)';
            });
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
            s.classList.toggle('active', i < reviewRatingInput.value);
            s.style.color = s.classList.contains('active') ? '#8b1818' : 'rgba(255, 255, 255, 0.2)';
        });
    });
}

// Create review card HTML
function createReviewCard(review, isNew = false) {
    const ratingStars = '★'.repeat(review.rating);
    const initials = getInitials(review.name);
    const time = timeAgo(review.timestamp);
    
    return `
        <div class="review-card ${isNew ? 'new-review' : ''}">
            <div class="review-header">
                <div class="review-user-info">
                    <div class="review-avatar">${initials}</div>
                    <div class="review-user-details">
                        <h4>${review.name}</h4>
                        <div class="review-user-role">${review.role}</div>
                    </div>
                </div>
                <span class="review-service-tag">${review.service}</span>
            </div>
            <div class="review-rating" style="color: #8b1818; font-weight: 600; letter-spacing: 1px;">${ratingStars}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-time">${time}</div>
        </div>
    `;
}

// Load reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('nekophic-reviews')) || [];
    
    if (reviewsContainer && reviews.length > 0) {
        reviewsContainer.innerHTML = reviews
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(review => createReviewCard(review))
            .join('');
    }
}

// Save review
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newReview = {
            name: document.getElementById('reviewName').value.trim(),
            service: document.getElementById('reviewService').value,
            role: document.getElementById('reviewRole').value,
            rating: parseInt(document.getElementById('reviewRating').value),
            text: document.getElementById('reviewText').value.trim(),
            timestamp: Date.now()
        };
        
        // Validation
        if (!newReview.name || !newReview.service || !newReview.role || !newReview.rating || newReview.text.length < 10) {
            alert('Lengkapi semua form dan ulasan minimal 10 karakter ya!');
            return;
        }
        
        // Get existing reviews
        let reviews = JSON.parse(localStorage.getItem('nekophic-reviews')) || [];
        reviews.push(newReview);
        
        // Save to localStorage (limit to last 50 reviews)
        if (reviews.length > 50) {
            reviews = reviews.slice(-50);
        }
        localStorage.setItem('nekophic-reviews', JSON.stringify(reviews));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = 'Terima kasih! Ulasan kamu berhasil ditampilkan.';
        reviewForm.parentElement.insertBefore(successMsg, reviewForm);
        
        // Reset form
        reviewForm.reset();
        document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
        document.getElementById('reviewRating').value = '0';
        
        // Remove success message after 3 seconds
        setTimeout(() => successMsg.remove(), 3000);
        
        // Reload reviews
        loadReviews();
        
        // Scroll to reviews
        setTimeout(() => {
            reviewsContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    });
}

// Load reviews on page load
document.addEventListener('DOMContentLoaded', loadReviews);;
