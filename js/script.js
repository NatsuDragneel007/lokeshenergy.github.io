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
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the data to a server
    // For demo purposes, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll contact you soon.`);
    
    // Reset form
    contactForm.reset();
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
    "services": "We offer a wide range of solar services including rooftop solar systems, solar water heaters, solar pumping systems, consultation, maintenance, and custom solutions.",
    "cost": "The cost of solar systems varies based on your requirements. For a personalized quote, please fill out our contact form or call us at +91 98765 43210.",
    "residential": "We provide solar solutions for homes including bungalows and apartments. Our systems are designed to reduce your electricity bills significantly.",
    "commercial": "Our commercial solar solutions help businesses reduce operational costs with customized rooftop and ground-mounted systems.",
    "industrial": "We specialize in large-scale industrial solar installations that can power entire manufacturing facilities and reduce energy costs.",
    "maintenance": "We offer comprehensive maintenance packages for all types of solar systems to ensure optimal performance and longevity.",
    "contact": "You can reach us at +91 98765 43210 or email info@lokeshenergy.com. Our office is located at 123 Solar Street, Pune.",
    "thank you": "You're welcome! Is there anything else I can help you with regarding solar energy solutions?",
    "bye": "Goodbye! Feel free to come back if you have more questions about solar energy. Have a great day!"
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