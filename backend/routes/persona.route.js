import express from "express";
import {
  createPersona,
  getPersonasByUser,
  getPersonaById,
  deletePersonaById, // 🆕 import delete controller
} from "../controllers/persona.controller.js";
import { protect } from "../middlewares/protect.middleware.js";

const router = express.Router();

router.post("/", protect, createPersona);
router.get("/", protect, getPersonasByUser);
router.get("/:id", protect, getPersonaById);
router.delete("/:id", protect, deletePersonaById);

export default router;
