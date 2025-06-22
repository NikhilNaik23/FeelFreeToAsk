import Persona from "../models/persona.model.js";
import ChatSession from "../models/chatSession.model.js";
import Message from "../models/message.model.js"

export const createPersona = async (req, res) => {
  const { name, description, tone, avatar } = req.body;

  try {
    const persona = await Persona.create({
      name,
      description,
      tone,
      avatar,
      user: req.user.userId,
    });

    res.status(201).json(persona);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid tone selected" });
    }
    res.status(500).json({ error: "Failed to create persona" });
  }
};

export const getPersonasByUser = async (req, res) => {
  try {
    const personas = await Persona.find({ user: req.user.userId });
    res.json(personas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch personas" });
  }
};

export const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).json({ error: "Persona not found" });
    res.json(persona);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch persona" });
  }
};


export const deletePersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ error: "Persona not found" });
    }

    const sessions = await ChatSession.find({ persona: req.params.id });

    const sessionIds = sessions.map((s) => s._id);
    await Message.deleteMany({ persona: req.params.id, user: { $in: sessions.map(s => s.user) } });

    await ChatSession.deleteMany({ persona: req.params.id });

    await persona.deleteOne();

    return res.status(200).json({ message: "Persona, sessions, and messages deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    return res.status(500).json({ error: "Failed to delete persona and related data" });
  }
};
