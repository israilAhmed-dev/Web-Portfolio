document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all functionality
    initThemeToggle();
    initAnimations();
    initSmoothScroll();
    initFormHandling();
    initLoadingScreen();
    initMenuToggle();
    initCursorEffects();
    initScrollEffects();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        
        // Update icon
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Add transition effect
        const flash = document.createElement('div');
        flash.className = 'theme-transition-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 500);
    });
}

// Animation Initialization
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth Scroll Functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const responseElement = form.querySelector('.form-response') || document.createElement('div');
            responseElement.className = 'form-response';
            
            if (!form.contains(responseElement)) {
                form.appendChild(responseElement);
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="form-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                Sending...
            `;
            
            try {
                // Simulate form submission (replace with actual fetch)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                responseElement.textContent = 'Your message has been sent successfully!';
                responseElement.classList.add('success');
                responseElement.classList.remove('error');
                
                // Reset form
                form.reset();
            } catch (error) {
                // Show error message
                responseElement.textContent = 'There was an error sending your message. Please try again.';
                responseElement.classList.add('error');
                responseElement.classList.remove('success');
            } finally {
                // Reset button state
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// Loading Screen Animation
function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 1000);
        }, 1500);
    });
    
    // Safety net in case loading takes too long
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 1000);
        }
    }, 4000);
}

// Mobile Menu Toggle
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Custom Cursor Effects
function initCursorEffects() {
    // Only enable on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'cosmic-follower';
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        }, 100);
    });
    
    // Hover effects
    document.querySelectorAll('a, button, .btn, .project-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo img');
    
    if (!nav || !logo) return;
    
    window.addEventListener('scroll', () => {
        // Navbar effect
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            logo.style.transform = 'scale(0.9)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            logo.style.transform = 'scale(1)';
        }
    });
}