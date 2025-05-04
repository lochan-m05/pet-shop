class ZenTailAssistant {
    constructor() {
        this.chatButton = document.getElementById('chatButton');
        this.chatContainer = document.getElementById('chatContainer');
        this.closeChat = document.getElementById('closeChat');
        this.sendMessage = document.getElementById('sendMessage');
        this.userInput = document.getElementById('userInput');
        this.chatMessages = document.getElementById('chatMessages');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.toggleChat());
        this.sendMessage.addEventListener('click', () => this.handleUserMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
    }

    toggleChat() {
        if (this.chatContainer.style.display === 'none' || !this.chatContainer.style.display) {
            this.chatContainer.style.display = 'flex';
            this.chatButton.style.transform = 'scale(0)';
            setTimeout(() => this.chatButton.style.display = 'none', 300);
        } else {
            this.chatContainer.style.display = 'none';
            this.chatButton.style.display = 'flex';
            setTimeout(() => this.chatButton.style.transform = 'scale(1)', 10);
        }
    }

    async handleUserMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response (replace with actual AI integration)
        setTimeout(() => {
            this.removeTypingIndicator();
            this.handleAIResponse(message);
        }, 1000);
    }

    handleAIResponse(userMessage) {
        // Simple response logic (replace with actual AI integration)
        let response = "I'm here to help! How can I assist you with your pet care needs?";
        
        if (userMessage.toLowerCase().includes('appointment')) {
            response = "I can help you book an appointment. Would you like to schedule one now?";
        } else if (userMessage.toLowerCase().includes('services')) {
            response = "We offer various services including veterinary care, grooming, and boarding. Which service are you interested in?";
        }

        this.addMessage(response, 'assistant');
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.innerHTML = '<p>Typing...</p>';
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize the chat assistant
document.addEventListener('DOMContentLoaded', () => {
    new ZenTailAssistant();
}); 