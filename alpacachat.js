module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages must be a non-empty array" });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1", // or "gpt-4-turbo", adjust as needed
          messages,
          max_tokens: 800, // Correct parameter name
        }),
      }
    );

    const data = await response.json();

    // Handle OpenAI errors
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "OpenAI API error",
      });
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || "(empty reply)";
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
