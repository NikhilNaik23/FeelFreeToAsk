import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import personaRoute from "./routes/persona.route.js";
import chatRoute from "./routes/chat.route.js";

import chatSessionRoutes from "./routes/chatSession.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connect();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/persona", personaRoute);
app.use("/api/chat", chatRoute);
app.use("/api/chat-sessions", chatSessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
