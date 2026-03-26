// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('header').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('whatsappFloat').style.display = 'flex';
        document.getElementById('footer').style.display = 'block';
    }, 3000);
});

// Navigation
let currentPage = 'home';

function navigateTo(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
    }

    // Update active nav links
    updateActiveNavLinks(pageName);

    // Close mobile menu if open
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Restart carousel if on home page
    if (pageName === 'home') {
        restartCarousel();
    }
}

function updateActiveNavLinks(pageName) {
    // Update desktop nav
    const desktopLinks = document.querySelectorAll('.desktop-nav a');
    desktopLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update mobile nav
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Carousel for Home Page
let currentSlide = 0;
let carouselInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new slide index
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function restartCarousel() {
    // Clear existing interval
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    // Reset to first slide
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
            indicators[index].classList.add('active');
        } else {
            slide.classList.remove('active');
            indicators[index].classList.remove('active');
        }
    });
    
    currentSlide = 0;
    
    // Start new interval
    startCarousel();
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCarousel();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});

// Initialize page based on URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        // Wait for loading screen to finish
        setTimeout(() => {
            navigateTo(hash);
        }, 3100);
    }
});

// Smooth scroll behavior for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        const hash = e.target.getAttribute('href').substring(1);
        if (document.getElementById(hash)) {
            e.preventDefault();
            navigateTo(hash);
            window.location.hash = hash;
        }
    }
});

// Add click handlers for dynamic elements
document.addEventListener('click', function(e) {
    // Handle card clicks
    if (e.target.closest('.card')) {
        const card = e.target.closest('.card');
        const onclick = card.getAttribute('onclick');
        if (onclick) {
            eval(onclick);
        }
    }

    // Handle video card clicks
    if (e.target.closest('.video-card')) {
        alert('Video playback feature - connect to your actual video player or YouTube link');
    }
});

// Prevent carousel from running on other pages
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(carouselInterval);
    } else if (currentPage === 'home') {
        startCarousel();
    }
});

// Add active page tracking
setInterval(function() {
    if (currentPage === 'home') {
        // Keep carousel running
    } else {
        // Pause carousel if not on home page
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    }
}, 1000);

// Console message
console.log('Herbamrut Naturals Website Loaded Successfully');
console.log('Doctor-designed solutions for preventive wellness and longevity');
