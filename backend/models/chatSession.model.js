// models/chatSession.model.js
import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    persona: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persona",
      required: true,
    },
  },
  { timestamps: true }
);

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);
export default ChatSession;
