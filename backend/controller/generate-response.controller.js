import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatWithYourPeer = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (!req.session.history) {
      req.session.history = [];
    }

    req.session.history.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat();
    let result = await chat.sendMessage(prompt);

    req.session.history.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    res.json({
      message: result.response.text(),
      history: req.session.history,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to chat",
      error: error.message,
    });
  }
};
