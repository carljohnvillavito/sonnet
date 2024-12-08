document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Function to append messages to the chat
    const appendMessage = (message, sender, avatar, isTyping = false) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('message-wrapper', sender === 'bot' ? 'bot-message' : 'user-message');

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');
        avatarDiv.textContent = avatar;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        if (isTyping) {
            messageDiv.classList.add('typing-animation');
        } else {
            messageDiv.textContent = message;

            // Add timestamp
            const timestamp = document.createElement('span');
            timestamp.classList.add('timestamp');
            timestamp.textContent = new Date().toLocaleTimeString();
            messageDiv.appendChild(timestamp);
        }

        wrapper.appendChild(avatarDiv);
        wrapper.appendChild(messageDiv);
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Function to fetch bot response from the server API
    const fetchBotResponse = async (prompt) => {
        appendMessage('', 'bot', 'B', true); // Show typing animation
        try {
            const response = await axios.get(`/api/chat?q=${encodeURIComponent(prompt)}&uid=1`);
            const typingBubbles = document.querySelectorAll('.typing-animation');
            typingBubbles.forEach(bubble => bubble.parentElement.remove()); // Remove typing animation
            appendMessage(response.data.response, 'bot', 'B');
        } catch (error) {
            console.error('Error fetching response:', error);
            const typingBubbles = document.querySelectorAll('.typing-animation');
            typingBubbles.forEach(bubble => bubble.parentElement.remove()); // Remove typing animation
            appendMessage('Sorry, something went wrong!', 'bot', 'B');
        }
    };

    // Event listener for sending a message
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, 'user', 'U');
            fetchBotResponse(message);
            userInput.value = '';
        }
    });

    // Send message on pressing Enter
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});
