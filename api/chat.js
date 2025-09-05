// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://<gateway-id>.gateway.ai.vercel.app/api/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.VERCEL_AI_KEY}`, // store key in Vercel env vars
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini", // keep it simple
          messages: req.body.messages || [],
          max_tokens: 256,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
