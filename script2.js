
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const scrollIndicator = document.getElementById("scrollIndicator");
    scrollIndicator.style.top = 50 + scrollY * 0.5 + "px";
  });
// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Connect Locomotive Scroll to GSAP ScrollTrigger
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();



document.addEventListener('DOMContentLoaded', function() {
      const projectsContainer = document.getElementById('projectsContainer');
      const projectCards = document.querySelectorAll('.project-card');
      const navDots = document.querySelectorAll('.nav-dot');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      let currentProject = 0;
      const totalProjects = projectCards.length;
      let isAnimating = false;

      function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        const cardElement = projectCards[currentProject];
        const cardWidth = cardElement.offsetWidth;
        const gap = parseInt(window.getComputedStyle(projectsContainer).gap);
        const totalCardWidth = cardWidth + gap;
        const containerWidth = projectsContainer.parentElement.offsetWidth;
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
        const translateX = centerOffset - (currentProject * totalCardWidth);
        
        projectsContainer.style.transform = `translateX(${translateX}px)`;

        projectCards.forEach((card, index) => {
          card.classList.remove('active', 'highlight-glow');
          if (index === currentProject) {
            card.classList.add('active', 'highlight-glow');
          }
        });

        navDots.forEach((dot, index) => {
          dot.classList.remove('active');
          if (index === currentProject) {
            dot.classList.add('active');
          }
        });

        // Update navigation buttons
        prevBtn.disabled = currentProject === 0;
        nextBtn.disabled = currentProject === totalProjects - 1;

        setTimeout(() => {
          isAnimating = false;
        }, 600);
      }

      function goToProject(index) {
        if (index >= 0 && index < totalProjects && index !== currentProject) {
          currentProject = index;
          updateSlider();
        }
      }

      // Navigation arrows
      prevBtn.addEventListener('click', () => {
        goToProject(currentProject - 1);
      });

      nextBtn.addEventListener('click', () => {
        goToProject(currentProject + 1);
      });

      // Project card clicks
      projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
          goToProject(index);
        });
      });

      // Navigation dots
      navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          goToProject(index);
        });
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          goToProject(currentProject + 1);
        } else if (e.key === 'ArrowLeft') {
          goToProject(currentProject - 1);
        }
      });

      // Initialize slider
      updateSlider();

      // Handle window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateSlider();
        }, 100);
      });

      // Add entrance animation
      setTimeout(() => {
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('slide-in');
          }, index * 100);
        });
      }, 300);
    });



     const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const message = document.getElementById('message');

        // Form validation
        function validateForm() {
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const messageText = form.message.value.trim();

            if (!name || !email || !messageText) {
                showMessage('Please fill in all fields.', 'error');
                return false;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return false;
            }

            return true;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showMessage(text, type) {
            message.textContent = text;
            message.className = `message ${type} show`;
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                message.classList.remove('show');
            }, 5000);
        }

        // Handle form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                
                // Replace with your actual Formspree endpoint
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
            } finally {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Submit';
            }
        });

        // Add input animations
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });

        // Add ripple effect to submit button
        submitBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);