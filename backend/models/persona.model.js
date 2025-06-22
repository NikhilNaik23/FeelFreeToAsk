import mongoose from "mongoose";

const personaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    tone: {
      type: String,
      enum: ["friendly", "formal", "funny", "sarcastic", "wise", "neutral"],
      default: "neutral",
    },
    avatar: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Persona = mongoose.model("Persona", personaSchema);
export default Persona;
