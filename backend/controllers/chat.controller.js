// Send a message to a persona and get AI reply
import Persona from "../models/persona.model.js";
import Message from "../models/message.model.js";
import { sendMessageToPersonaAgent } from "../gemini/personaAgent.js";

export const sendMessageToPersona = async (req, res) => {
  try {
    const { message,chatSessionId } = req.body; // This is the user's message content
    const { id: personaId } = req.params;
    const userId = req.user?.userId;

    console.log("➡️ Incoming message:", message);
    console.log("🔍 Persona ID:", personaId);
    console.log("🛡️ Authenticated user:", userId);

    // Validate message input
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message input" });
    }

    // Load persona
    const persona = await Persona.findById(personaId);
    if (!persona) {
      return res.status(404).json({ error: "Persona not found" });
    }

    console.log("✅ Persona loaded:", persona.name);

    // Get AI response
    const aiReply = await sendMessageToPersonaAgent({ persona, message });
    const aiContent =
      typeof aiReply === "string" ? aiReply : aiReply?.content || "No reply";

    console.log("🧠 AI Response:", aiContent);

    // Store both user message and AI response
    if (userId) {
      // Save user message
      await Message.create({
        persona: personaId,
        user: userId,
        sender: "user",
        content: message,
        chatSession: chatSessionId,
      });

      // Save AI response
      await Message.create({
        persona: personaId,
        user: userId,
        sender: "ai",
        content: aiContent,
        chatSession: chatSessionId,
      });

      console.log("💾 Messages saved to DB");
    } else {
      console.warn("⚠️ No user found in request. Skipping message save.");
    }

    // Send response
    return res.status(200).json({
      reply: aiContent,
    });
  } catch (err) {
    console.error("🔥 Error in chatController:", {
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });

    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message || "Failed to process message",
    });
  }
};

export const getMessagesBySession = async (req, res) => {
  try {
    const { chatSessionId } = req.params;
    const userId = req.user.userId;

    const messages = await Message.find({
      chatSession: chatSessionId,
      user: userId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Error in getMessagesBySession:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
