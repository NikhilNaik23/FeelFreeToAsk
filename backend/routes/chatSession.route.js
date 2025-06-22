// routes/chatSession.route.js

import express from "express";
import { createChatSession, getSessionsByPersona } from "../controllers/chatSession.controller.js";
import { protect } from "../middlewares/protect.middleware.js";

const router = express.Router();

router.post("/", protect, createChatSession); // Create new session
router.get("/:personaId", protect, getSessionsByPersona); // Get sessions for persona

export default router;
