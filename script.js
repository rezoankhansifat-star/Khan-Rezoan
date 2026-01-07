/* ============================================
   PREMIUM FUTURISTIC PORTFOLIO SCRIPT
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all components
  initPreloader();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initTextReveal();
  initTypingEffect();
  initSkillBars();
  initStatsCounter();
  initFormValidation();
  initScrollAnimations();
  initMobileMenu();
  initHoverEffects();
  
  // Set current year in footer
  document.querySelector('.copyright').innerHTML = `&copy; ${new Date().getFullYear()} Md. Rezoan Khan. All rights reserved.`;
});

// Preloader
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  // Hide preloader after page loads
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }, 1000);
  });
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  // Move cursor with mouse
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth trailing effect
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 50);
  });
  
  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .tool-card, .interest-card, .contact-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      follower.style.width = '50px';
      follower.style.height = '50px';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      follower.style.width = '30px';
      follower.style.height = '30px';
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

// Scroll Progress Indicator
function initScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress-bar');
  
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Text Reveal Animation
function initTextReveal() {
  const revealElements = document.querySelectorAll('.text-reveal');
  
  // Function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }
  
  // Function to reveal elements
  function revealElementsOnScroll() {
    revealElements.forEach(el => {
      if (isElementInViewport(el) && !el.classList.contains('revealed')) {
        el.classList.add('revealed');
      }
    });
  }
  
  // Initial check
  revealElementsOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealElementsOnScroll);
  
  // Reveal hero elements immediately
  const heroReveals = document.querySelectorAll('.hero-section .text-reveal');
  heroReveals.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 300 * index);
  });
}

// Typing Effect
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  const texts = ['Robotics', 'Game Development', 'Computer Vision', 'Embedded Systems', 'Deep Learning'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Delete text
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Type text
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Check if text is fully typed
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing effect after a delay
  setTimeout(type, 1000);
}

// Animated Skill Bars
function initSkillBars() {
  const skillBars = document.querySelectorAll('.level-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      const rect = bar.getBoundingClientRect();
      
      // Check if element is in viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        bar.style.width = level + '%';
      }
    });
  }
  
  // Initial check
  animateSkillBars();
  
  // Check on scroll
  window.addEventListener('scroll', animateSkillBars);
}

// Animated Stats Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const rect = stat.getBoundingClientRect();
      
      // Check if element is in viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !stat.hasAttribute('data-animated')) {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 1500; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        stat.setAttribute('data-animated', 'true');
        
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 16);
      }
    });
  }
  
  // Initial check
  animateStats();
  
  // Check on scroll
  window.addEventListener('scroll', animateStats);
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real application, you would send the form data to a server here
      // For this demo, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
      
      // Reset labels
      const labels = contactForm.querySelectorAll('label');
      labels.forEach(label => {
        label.style.top = '15px';
        label.style.left = '15px';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--color-text-light)';
      });
    });
  }
}

// Scroll Animations
function initScrollAnimations() {
  // Parallax effect for hero background
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.animated-bg');
    
    if (heroBg) {
      heroBg.style.transform = `translate(0, ${scrolled * 0.05}px) scale(${1 + scrolled * 0.0001})`;
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      
      // Animate menu lines
      const menuLines = document.querySelectorAll('.menu-line');
      if (navLinks.style.display === 'flex') {
        menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuLines[1].style.opacity = '0';
        menuLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.style.display = 'none';
        
        // Reset menu lines
        const menuLines = document.querySelectorAll('.menu-line');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
      });
    });
    
    // Responsive menu on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = 'none';
        
        // Reset menu lines
        const menuLines = document.querySelectorAll('.menu-line');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
      }
    });
  }
}

// Hover Effects
function initHoverEffects() {
  // Add hover effect to cards
  const cards = document.querySelectorAll('.skill-card, .tool-card, .interest-card, .project-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // Highlight effect on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  const currentSection = window.location.hash || '#home';
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
    
    // Set active link based on current section
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

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

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Tab key highlights interactive elements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});