// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple testimonial slider
const testimonials = [
    {
        image: "client1.jpg",
        text: "Amazing service! My dog loves coming here for grooming.",
        name: "Sarah Johnson",
        title: "Dog Owner"
    },
    {
        image: "client2.jpg",
        text: "The staff is incredibly professional and caring.",
        name: "Michael Smith",
        title: "Cat Owner"
    },
    {
        image: "client3.jpg",
        text: "Best pet care service in the city!",
        name: "Emily Davis",
        title: "Pet Parent"
    }
];

let currentTestimonial = 0;
const testimonialContainer = document.querySelector('.testimonial-card');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    testimonialContainer.innerHTML = `
        <div class="client-image">
            <img src="${testimonial.image}" alt="Client">
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <h4>${testimonial.name}</h4>
        <p class="client-title">${testimonial.title}</p>
    `;
}

// Change testimonial every 5 seconds
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Initialize first testimonial
updateTestimonial();

// Add this JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        function updateCounter() {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 16);
            } else {
                counter.innerText = target;
            }
        }

        // Start counter when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
            }
        });

        observer.observe(counter);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chat Widget Functionality
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('#sendMessage');
    const voiceButton = document.querySelector('.voice-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const notificationDot = document.querySelector('.notification-dot');
    
    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];
    
    // Toggle chat container
    chatButton.addEventListener('click', function() {
        console.log('Chat button clicked');
        chatContainer.style.display = 'flex';
        chatContainer.classList.add('active');
        notificationDot.style.display = 'none';
    });
    
    // Close chat container
    closeChat.addEventListener('click', function() {
        console.log('Close button clicked');
        chatContainer.style.display = 'none';
        chatContainer.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                addMessage('I am your AI assistant. How can I help you today?', 'assistant');
            }, 1000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Voice recording functionality
    voiceButton.addEventListener('click', async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                
                mediaRecorder.ondataavailable = (e) => {
                    audioChunks.push(e.data);
                };
                
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    // Here you would typically send the audio blob to your speech-to-text service
                    // For now, we'll just simulate a response
                    addMessage('Voice message received', 'assistant');
                };
                
                mediaRecorder.start();
                isRecording = true;
                voiceButton.classList.add('recording');
                
            } catch (err) {
                console.error('Error accessing microphone:', err);
                addMessage('Could not access microphone. Please check permissions.', 'assistant');
            }
        } else {
            mediaRecorder.stop();
            isRecording = false;
            voiceButton.classList.remove('recording');
        }
    });
    
    // Show notification dot for new messages
    function showNotification() {
        if (!chatContainer.classList.contains('active')) {
            notificationDot.style.display = 'block';
        }
    }
    
    // Simulate incoming message (replace with actual event listener)
    setTimeout(() => {
        addMessage('Hello! I am your AI assistant. How can I help you today?', 'assistant');
        showNotification();
    }, 2000);

    // Loading screen functionality
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
    });
}); 