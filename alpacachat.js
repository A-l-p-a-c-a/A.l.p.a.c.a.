const form = document.getElementById("chatForm");
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  appendMessage("YOU", userMsg);
  userInput.value = "";

  try {
    const res = await fetch("https://YOUR-VERCEL-URL/api/alpacachat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();
    appendMessage("ALPACA", data.reply || "(no response)");
  } catch (err) {
    appendMessage("ERROR", "API call failed: " + err.message);
  }
});
