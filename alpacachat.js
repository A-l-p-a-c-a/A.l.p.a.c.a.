// api/alpacachat.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",   // or "gpt-4.1-turbo" if needed
      messages: req.body.messages,
      max_completion_tokens: 800,
    });

    const reply = response.choices?.[0]?.message?.content || "(no reply)";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}
