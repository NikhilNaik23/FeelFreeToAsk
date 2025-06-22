// controllers/chatSession.controller.js

import ChatSession from "../models/chatSession.model.js";

export const createChatSession = async (req, res) => {
  try {
    const { personaId, title } = req.body;
    const userId = req.user.userId;

    // Use provided title or generate one
    const sessionTitle = title || `Chat with ${personaId} - ${new Date().toLocaleString()}`;

    const newSession = await ChatSession.create({ user: userId, persona: personaId, title: sessionTitle });
    res.status(201).json(newSession);
  } catch (err) {
    console.error("❌ Error creating chat session:", err.message);
    res.status(500).json({ error: "Failed to create chat session" });
  }
};


export const getSessionsByPersona = async (req, res) => {
  try {
    const { personaId } = req.params;
    const userId = req.user.userId;

    const sessions = await ChatSession.find({ persona: personaId, user: userId }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("❌ Error fetching sessions:", err.message);
    res.status(500).json({ error: "Failed to fetch chat sessions" });
  }
};
