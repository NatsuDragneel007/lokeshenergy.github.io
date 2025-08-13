// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 5%';
                header.style.background = 'linear-gradient(135deg, rgba(8, 77, 39, 0.95), rgba(5, 48, 24, 0.95))';
            } else {
                header.style.padding = '1rem 5%';
                header.style.background = 'linear-gradient(135deg, var(--secondary), #053018)';
            }
        });
    }
    
    // Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200;
        
        const countUp = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(countUp, 10);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Trigger counter animation when stats section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // Testimonial Slider
    const testimonials = [
        {
            text: "Lokesh Energy transformed our factory with a 500KW solar system. The installation was professional, and we've seen a 70% reduction in our electricity bills. Highly recommend their expertise!",
            name: "Rajesh Sharma",
            role: "Factory Owner, Nashik",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            text: "We installed a 15KW rooftop solar system for our apartment complex. The team was efficient, and the system has been performing flawlessly for over 3 years now.",
            name: "Priya Desai",
            role: "Housing Society Secretary, Mumbai",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            text: "As a hospital administrator, I needed a reliable power backup solution. Lokesh Energy designed a hybrid solar system that has significantly reduced our operational costs.",
            name: "Dr. Anil Patel",
            role: "Hospital Director, Ahmedabad",
            img: "https://randomuser.me/api/portraits/men/67.jpg"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialCard = document.querySelector('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    
    function showTestimonial(index) {
        if (testimonialCard) {
            const testimonial = testimonials[index];
            testimonialCard.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="client-info">
                    <div class="client-img" style="background-image: url('${testimonial.img}');"></div>
                    <div class="client-details">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
            
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }
    
    if (navDots.length > 0) {
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }
    
    // Auto-rotate testimonials
    if (testimonialCard) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Show success message
                if (formMessage) {
                    formMessage.classList.add('show');
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formMessage.classList.remove('show');
                    }, 5000);
                }
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Chatbot
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.style.display = 'flex';
            if (chatbotInput) chatbotInput.focus();
        });
    }
    
    if (chatbotClose && chatbotContainer) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
        });
    }
    
    // Send message function
    function sendMessage() {
        if (!chatbotInput || !chatbotMessages) return;
        
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        chatbotMessages.appendChild(userMessage);
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing';
        typingIndicator.innerHTML = '<span class="loading"></span>Typing...';
        chatbotMessages.appendChild(typingIndicator);
        
        // Generate bot response
        setTimeout(() => {
            // Remove typing indicator
            if (chatbotMessages.contains(typingIndicator)) {
                chatbotMessages.removeChild(typingIndicator);
            }
            
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            
            // Simple response
            botMessage.textContent = "Thank you for your message! Our team will get back to you soon.";
            
            chatbotMessages.appendChild(botMessage);
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});