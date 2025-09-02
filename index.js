
import dotenv from "dotenv"
dotenv.config()
// frontend/script.js

const BACKEND_URL = ''; 

document.getElementById('send-button').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value;
    const responseDiv = document.getElementById('ai-response');

    if (!prompt) return;

    responseDiv.textContent = 'Thinking...';

    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }), // <-- CORRECT KEY!
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.textContent = data.message; // <-- CORRECT KEY!
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Error: Could not connect to the server.';
    }
});
