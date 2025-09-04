const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// Initial ALPACA greeting
addMessage("You don’t deserve this chat, but I’m here anyway. Talk.", "alpaca");

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = userInput.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    userInput.value = '';
    addMessage('...', 'ami');
    const response = await getAIResponse(question);
    // Replace last '...' with answer
    messagesDiv.removeChild(messagesDiv.lastChild);
    addMessage(response, 'a.l.p.a.c.a.');
});
});

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    div.appendChild(bubble);
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getAIResponse(userMessage) {
    // Replace this with your actual backend URL
  //const endpoint = "https://a-l-p-a-c-ob8ujoubc-davi-s-projects-f68a6c48.vercel.app/api/index.js"
    // Call your Vercel backend instead of OpenAI directly!
    const endpoint = "https://YOUR-VERCEL-URL/alpacachat"; // <-- Replace with your actual vercrl
    //const endpoint = "https://a-l-p-a-c-a.vercel.app
    const messages = [
        { role: "system", content: "You are ALPACA, a sarcastic, blunt AI drill sergeant. Insult first, then answer concisely." },
        ...Array.from(messagesDiv.children).map(div => {
            const text = div.querySelector(".bubble").textContent;
            return div.classList.contains("user")
                ? { role: "user", content: text }
                : { role: "assistant", content: text };
        }),
        { role: "user", content: userMessage }
    ];

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messages.slice(-10) }) // keep context short
        });
        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || "…Nothing. You bore me.";
    } catch (err) {
        console.error(err);
        return "API error. Fix your mess and try again.";
    }
}
