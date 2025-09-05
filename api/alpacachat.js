const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// Initial Alpaca greeting
addMessage(
  "I'm A.L.P.A.C.A. = Artificial Language Processing And Conversational Asshole. I'm not here to make friends.",
  "A.l.p.a.c.a"
);

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  userInput.value = '';
  addMessage('...', 'A.l.p.a.c.a');
  const response = await getAIResponse(question);
  // Replace last '...' with answer
  messagesDiv.removeChild(messagesDiv.lastChild);
  addMessage(response, 'A.l.p.a.c.a');
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  div.appendChild(bubble);
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getAIResponse(userMessage) {
  const endpoint = "https://a-l-p-a-c-a.vercel.app/api/alpacachat"; // ✅ Full URL

  const messages = [
    {role: "system", content: "You are Alpaca, a sarcastic, witty, but conversational assistant. Keep replies short, fun, and in character."},
    ...Array.from(messagesDiv.children).map(div => {
      const text = div.querySelector('.bubble').textContent;
      return div.classList.contains('user')
        ? {role: "user", content: text}
        : {role: "assistant", content: text};
    }),
    {role: "user", content: userMessage}
  ];

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-10) }) // last 10 messages only
    });
    const data = await res.json();
    return data.reply || data.choices?.[0]?.message?.content?.trim() || "Alpaca refuses to answer. 🦙";
  } catch (err) {
    console.error(err);
    return "Sorry, there was a problem reaching Alpaca's brain!";
  }
}
