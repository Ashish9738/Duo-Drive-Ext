import GoogleGenerativeAI from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await model.generateContent(prompt);
    console.log("Response here", response);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the response",
    });
  }
};
