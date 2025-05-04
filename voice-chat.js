class VoiceChat {
    constructor() {
        this.voiceButton = document.getElementById('voiceRecordBtn');
        this.recognition = null;
        this.isRecording = false;
        
        this.initializeSpeechRecognition();
        this.initializeEventListeners();
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('userInput').value = transcript;
                this.stopRecording();
                // Automatically send message after voice input
                document.getElementById('sendMessage').click();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopRecording();
            };
        }
    }

    initializeEventListeners() {
        this.voiceButton.addEventListener('click', () => this.toggleRecording());
    }

    toggleRecording() {
        if (!this.isRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    startRecording() {
        if (this.recognition) {
            this.isRecording = true;
            this.voiceButton.classList.add('recording');
            this.recognition.start();
        }
    }

    stopRecording() {
        if (this.recognition) {
            this.isRecording = false;
            this.voiceButton.classList.remove('recording');
            this.recognition.stop();
        }
    }
}

// Initialize voice chat
document.addEventListener('DOMContentLoaded', () => {
    new VoiceChat();
}); 