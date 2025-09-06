import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Aseguramos que el body sea JSON
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { message } = body;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error en API:", error.message || error);
    res.status(500).json({ error: "Error en la API" });
  }
}


