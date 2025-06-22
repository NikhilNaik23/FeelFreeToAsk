import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const sendMessageToPersonaAgent = async ({ persona, message }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use persona info to craft the system prompt
    const prompt = `
You are ${persona.name}. ${persona.description || ""}
Respond to the user in a ${persona.tone || "neutral"} tone.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return reply || "I didn't understand that. Could you rephrase?";
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return {
      content: "I'm having trouble generating a response right now. Please try again later.",
      sender: "ai",
      isFallback: true
    };
  }
};
