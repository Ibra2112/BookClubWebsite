// Typing animation for the title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor after typing is complete
            element.classList.add('typing-complete');
        }
    }
    
    type();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('main-title');
    const titleText = titleElement.textContent;
    
    // Start typing animation
    typeWriter(titleElement, titleText, 80);
    
    // Add fade-in effect to sections with delay
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${(index + 1) * 0.2}s`;
    });
    
    // Add hover effects to book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add subtle parallax effect on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const container = document.querySelector('.container');
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            container.style.transform = `translateY(${scrollTop * 0.02}px)`;
        } else {
            // Scrolling up
            container.style.transform = `translateY(${scrollTop * 0.02}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add click ripple effect to founder cards
    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(212, 165, 116, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    .typing-complete::after {
        animation: blink 1s infinite;
    }
`;
document.head.appendChild(style);

