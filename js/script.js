// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 5%';
        header.style.background = 'linear-gradient(135deg, rgba(8, 77, 39, 0.95), rgba(5, 48, 24, 0.95))';
    } else {
        header.style.padding = '1rem 5%';
        header.style.background = 'linear-gradient(135deg, var(--secondary), #053018)';
    }
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
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

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const statsSection = document.querySelector('.stats');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (element.closest('.stats') && !element.classList.contains('counted')) {
                element.classList.add('counted');
                countUp();
            }
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll(); // Initial check

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

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact Form
// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Submit the form
    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        mode: 'no-cors' // This is important for Google Forms
    })
    .then(response => {
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});
// Chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Chatbot responses
const chatbotResponses = {
  "hello": "Hello! How can I assist you with your solar energy needs today?",
  "hi": "Hi there! I'm here to help you with any questions about solar energy solutions.",
  "services": "We offer rooftop solar systems, solar water heaters, solar pumping systems, consultation, maintenance, and custom solar solutions.",
  "cost": "Solar system costs vary based on your requirements. A typical residential system costs between ₹1.5-5 lakhs. For an exact quote, please fill our contact form.",
  "residential": "We provide solar solutions for homes including bungalows and apartments. Our systems can reduce your electricity bills by up to 90%.",
  "commercial": "Our commercial solar solutions help businesses reduce operational costs with customized systems.",
  "industrial": "We specialize in large-scale industrial solar installations for manufacturing facilities.",
  "maintenance": "We offer annual maintenance contracts starting at ₹5,000/year to ensure optimal performance.",
  "warranty": "All our solar panels come with 25-year performance warranty and 5-year manufacturing warranty.",
  "subsidy": "Yes, we help you avail government subsidies up to 40% for residential solar installations.",
  "contact": "Call us at +91 9379 33 11 63 or email info@lokeshenergy.com. Our office is at 123 Solar Street, Pune.",
  "thank you": "You're welcome! Is there anything else I can help you with?",
  "bye": "Goodbye! Feel free to return if you have more questions about solar energy."
};

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatbotMessages.appendChild(userMessage);
    
    // Clear input
    chatbotInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        
        // Simple keyword matching
        const lowerMessage = message.toLowerCase();
        let response = "I'm not sure how to respond to that. For specific inquiries, please contact us directly at info@lokeshenergy.com.";
        
        for (const [key, value] of Object.entries(chatbotResponses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        botMessage.textContent = response;
        chatbotMessages.appendChild(botMessage);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 500);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});