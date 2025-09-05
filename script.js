async function sendMessage() {
  const input = document.getElementById('userInput').value.trim();
  if (!input) return;

  // Use your actual Vercel deployment URL:
  const apiUrl = "https://a-l-p-a-c-a.vercel.app/api/alpacachat";

  document.getElementById('response').textContent = "Alpaca is thinking...";
  const messages = [{ role: "user", content: input }];

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (data.reply) {
      document.getElementById('response').textContent = data.reply;
    } else {
      document.getElementById('response').textContent = "Error: " + (data.error || "Unknown error");
    }
  } catch (err) {
    document.getElementById('response').textContent = "Network Error: " + err.message;
  }
}
