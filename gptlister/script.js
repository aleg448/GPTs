// Handle User Login
document.getElementById('login-form').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // AJAX request for user login
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Process login response, e.g., storing JWT, updating UI
    })
    .catch(error => {
        // Handle login error
    });
}

// Save OpenAI API Key
function saveOpenAIKey() {
    const apiKey = document.getElementById('openai-key').value;
    // AJAX request to send the API key to the server for storage
}

// ChatGPT Assistant Interaction
document.getElementById('send-message').addEventListener('click', () => {
    const input = document.getElementById('chat-input').value;
    // AJAX request to send chat input and update chat history
});

// Voting Functionality for GPT Models
document.querySelectorAll('.vote-up').forEach(button => {
    button.addEventListener('click', () => handleVote(button, 'up'));
});

document.querySelectorAll('.vote-down').forEach(button => {
    button.addEventListener('click', () => handleVote(button, 'down'));
});

function handleVote(button, voteType) {
    const voteCountElement = button.parentElement.querySelector('.vote-count');
    let currentCount = parseInt(voteCountElement.textContent, 10);
    currentCount = voteType === 'up' ? currentCount + 1 : currentCount - 1;
    voteCountElement.textContent = currentCount;
    // Additional logic for server communication can be added here
}

// Social Sharing for GPT Models
function shareOnTwitter(modelName) {
    const text = `Check out ${modelName} on GPT Lister!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank');
}
