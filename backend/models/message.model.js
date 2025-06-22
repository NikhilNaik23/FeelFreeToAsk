import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    persona: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persona",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
