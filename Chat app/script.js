const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Simulated API endpoint
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts'; // Placeholder API

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        // Display the message in the chat
        displayMessage(messageText, 'user');
        messageInput.value = '';

        // Simulate sending the message to an API
        fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify({ message: messageText }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Simulate receiving a response from another user
            setTimeout(() => {
                displayMessage(`Reply: ${messageText}`, 'other');
            }, 1000);
        })
        .catch(error => console.error('Error:', error));
    }
}

// Function to display a message
function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for the Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});