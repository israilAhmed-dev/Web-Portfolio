// Minimal loading sequence - appears for just 300-500ms
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
        setTimeout(() => {
            document.querySelector('.loading-screen').remove();
        }, 200); // Remove after fadeout completes
    }, 300); // Show for minimum 300ms
});

// Safety net - never show for more than 1 second
setTimeout(function() {
    const loader = document.querySelector('.loading-screen');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 200);
    }
}, 1000);
         

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            }, 3000);
        }, 1500);
    });
}
