// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navLinks.classList.remove('active');
    }
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

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Header Scroll Effect
const handleScroll = throttle(() => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 5%';
        header.style.background = 'linear-gradient(135deg, rgba(8, 77, 39, 0.95), rgba(5, 48, 24, 0.95))';
    } else {
        header.style.padding = '1rem 5%';
        header.style.background = 'linear-gradient(135deg, var(--secondary), #053018)';
    }
}, 16);

window.addEventListener('scroll', handleScroll);

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

const fadeInOnScroll = throttle(() => {
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
}, 16);

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
const formMessage = document.getElementById('form-message');

// Airtable API configuration
const AIRTABLE_API_KEY = 'patwIQ8jWFx8YYKcs';
const AIRTABLE_BASE_ID = 'appW7po9myhVQs0lm';
const AIRTABLE_TABLE_NAME = 'Contacts'; // Default table name

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span>Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        fields: {
            Name: document.getElementById('name').value,
            Email: document.getElementById('email').value,
            Phone: document.getElementById('phone').value,
            Service: document.getElementById('service').value,
            Message: document.getElementById('message').value
        }
    };
    
    try {
        // Submit to Airtable
        const response = await fetch(`https://api.airtable.com/v0/${appW7po9myhVQs0lm}/${Contacts}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${patwIQ8jWFx8YYKcs}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Show success message
            formMessage.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
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
    "services": "We offer rooftop solar systems, solar water heaters, solar pumping systems, consultation, maintenance, and custom solar solutions. Which service interests you most?",
    "cost": "Solar system costs vary based on your requirements. A typical residential system costs between ₹1.5-5 lakhs. For an exact quote, please fill our contact form or call us at +91 9379 33 11 63.",
    "price": "Solar system costs vary based on your requirements. A typical residential system costs between ₹1.5-5 lakhs. For an exact quote, please fill our contact form or call us at +91 9379 33 11 63.",
    "residential": "We provide solar solutions for homes including bungalows and apartments. Our systems can reduce your electricity bills by up to 90%. Would you like to know more about residential installations?",
    "commercial": "Our commercial solar solutions help businesses reduce operational costs with customized systems. We've installed 150KW+ systems for offices and complexes.",
    "industrial": "We specialize in large-scale industrial solar installations for manufacturing facilities. Our largest installation is 500KW for a factory in Nashik.",
    "maintenance": "We offer annual maintenance contracts starting at ₹5,000/year to ensure optimal performance. This includes cleaning, inspection, and performance monitoring.",
    "warranty": "All our solar panels come with 25-year performance warranty and 5-year manufacturing warranty. We also provide 5-year installation warranty.",
    "subsidy": "Yes, we help you avail government subsidies up to 40% for residential solar installations. We handle all the paperwork for you!",
    "contact": "📞 Call us at +91 9379 33 11 63\n📧 Email: info@lokeshenergy.com\n📍 Office: 123 Solar Street, Pune\n🕒 Mon-Sat: 9AM-6PM",
    "location": "We're located at 123 Solar Street, Pune, Maharashtra. We serve clients across Maharashtra and nearby states.",
    "experience": "We have 25+ years of experience in solar energy solutions with 1500+ happy clients and 750+ KW installations completed.",
    "installation": "Our installation process typically takes 2-5 days depending on system size. We handle everything from design to commissioning and government approvals.",
    "savings": "Most of our clients see 70-90% reduction in electricity bills. The payback period is typically 4-6 years, after which you enjoy free electricity!",
    "thank you": "You're welcome! Is there anything else I can help you with regarding solar energy?",
    "thanks": "You're welcome! Is there anything else I can help you with regarding solar energy?",
    "bye": "Goodbye! Feel free to return if you have more questions about solar energy. Have a great day!",
    "goodbye": "Goodbye! Feel free to return if you have more questions about solar energy. Have a great day!"
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
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot typing';
    typingIndicator.innerHTML = '<span class="loading"></span>Typing...';
    chatbotMessages.appendChild(typingIndicator);
    
    // Generate bot response
    setTimeout(() => {
        // Remove typing indicator
        chatbotMessages.removeChild(typingIndicator);
        
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        
        // Simple keyword matching
        const lowerMessage = message.toLowerCase();
        let response = "I'm not sure how to respond to that. For specific inquiries, please contact us directly at info@lokeshenergy.com or call +91 9379 33 11 63.";
        
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
    }, 1000);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
}
)