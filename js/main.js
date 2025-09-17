// K9 Cadet European Training Academy - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initNavbar();
  initAnimations();
  initTestimonialsCarousel();
  initCounterAnimation();
  initMobileMenu();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Scroll animations
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Testimonials carousel
function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  
  if (carousel) {
    const items = carousel.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    let currentIndex = 0;
    const nextBtn = document.querySelector('.carousel-next');
    const prevBtn = document.querySelector('.carousel-prev');
    
    // Hide all items except the first one
    items.forEach((item, index) => {
      if (index !== 0) {
        item.style.display = 'none';
      }
    });
    
    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].style.display = 'block';
      });
    }
    
    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        items[currentIndex].style.display = 'block';
      });
    }
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
      if (nextBtn) {
        nextBtn.click();
      } else {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].style.display = 'block';
      }
    }, 5000);
  }
}

// Counter animation for statistics
function initCounterAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  
  if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'), 10);
          
          let count = 0;
          const interval = setInterval(() => {
            count += Math.ceil(countTo / 60);
            
            if (count >= countTo) {
              target.textContent = countTo;
              clearInterval(interval);
            } else {
              target.textContent = count;
            }
          }, 30);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
      observer.observe(stat);
    });
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileToggle = document.querySelector('.navbar-mobile-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile-menu');
  const mobileClose = document.querySelector('.navbar-mobile-close');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
    
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    }
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.navbar-mobile-link a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  
  if (form) {
    form.addEventListener('submit', function(event) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMsg = field.parentNode.querySelector('.error-message');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            field.parentNode.appendChild(errorMsg);
          }
        } else {
          field.classList.remove('error');
          const errorMsg = field.parentNode.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            field.classList.add('error');
            
            let errorMsg = field.parentNode.querySelector('.error-message');
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'Please enter a valid email address';
              field.parentNode.appendChild(errorMsg);
            } else {
              errorMsg.textContent = 'Please enter a valid email address';
            }
          }
        }
      });
      
      if (!isValid) {
        event.preventDefault();
      }
    });
    
    // Remove error styling on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});