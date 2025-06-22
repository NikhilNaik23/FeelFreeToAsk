import express from "express";
import {
  sendMessageToPersona,
  getMessagesBySession,
} from "../controllers/chat.controller.js";
import { protect } from "../middlewares/protect.middleware.js";

const router = express.Router();

// Send a message and get AI reply
router.post("/:id", protect, sendMessageToPersona);

// Get all messages for a chat session
router.get("/messages/session/:chatSessionId", protect, getMessagesBySession);

export default router;
