// Hot Grill Restaurant - JavaScript Functionality

// Handle Reservation Form Submission
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const occasion = document.getElementById('occasion').value;
        const special = document.getElementById('special').value;
        
        // Validate form
        if (!name || !email || !phone || !date || !time || !guests) {
            showMessage('formMessage', 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('formMessage', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone format
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            showMessage('formMessage', 'Please enter a valid phone number.', 'error');
            return;
        }
        
        // Create reservation data
        const reservationData = {
            name,
            email,
            phone,
            date,
            time,
            guests,
            occasion,
            special,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        let reservations = JSON.parse(localStorage.getItem('hotGrillReservations')) || [];
        reservations.push(reservationData);
        localStorage.setItem('hotGrillReservations', JSON.stringify(reservations));
        
        // Show success message
        showMessage('formMessage', 'Thank you for your reservation! We will confirm your booking shortly. Check your email for details.', 'success');
        
        // Reset form
        reservationForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            document.getElementById('formMessage').style.display = 'none';
        }, 5000);
    });
}

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showMessage('contactMessage', 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('contactMessage', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Create contact message data
        const contactData = {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem('hotGrillMessages')) || [];
        messages.push(contactData);
        localStorage.setItem('hotGrillMessages', JSON.stringify(messages));
        
        // Show success message
        showMessage('contactMessage', 'Thank you for your message! We will get back to you shortly.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            document.getElementById('contactMessage').style.display = 'none';
        }, 5000);
    });
}

// Helper function to show messages
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
    }
}

// Set minimum date for reservations (today)
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        dateInput.min = minDate;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setMinDate();
    addSmoothScrolling();
});

// Smooth scrolling for navigation links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Add animation on scroll
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);
    
    const elements = document.querySelectorAll('.feature, .dish-card, .menu-item, .testimonial, .service-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-in-out';
        observer.observe(el);
    });
}

window.addEventListener('load', observeElements);

// Format phone number as user types
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            } else if (value.length <= 10) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6);
            } else {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
            }
        }
        
        e.target.value = value;
    });
});

// Add active state to navigation links
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href.includes(current) || (current === '' && href === 'index.html')) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Console message
console.log('%cWelcome to Hot Grill! 🔥', 'color: #d4441f; font-size: 20px; font-weight: bold;');
console.log('Premium Grilled Cuisine - Book your table today!');

// Utility function: Get all reservations
function getReservations() {
    return JSON.parse(localStorage.getItem('hotGrillReservations')) || [];
}

// Utility function: Get all messages
function getMessages() {
    return JSON.parse(localStorage.getItem('hotGrillMessages')) || [];
}

// Utility function: Clear all data (admin use)
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('hotGrillReservations');
        localStorage.removeItem('hotGrillMessages');
        console.log('All data cleared.');
    }
}
