async function sendAlpacaChat(userMessage) {
  const apiUrl = "https://your-vercel-app.vercel.app/api/alpacachat"; // Replace with your actual Vercel URL

  const messages = [
    { role: "user", content: userMessage }
  ];

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await response.json();
  if (data.reply) {
    console.log("Alpaca says:", data.reply);
    // You can display this in your HTML instead!
  } else {
    console.error("Error:", data.error);
  }
}

// Example usage:
sendAlpacaChat("Hello Alpaca!");
