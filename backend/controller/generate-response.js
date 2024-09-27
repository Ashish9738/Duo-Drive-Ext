import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the response",
    });
  }
};
