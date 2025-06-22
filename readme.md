# 🧠 FeelFreeToAsk

> Personalized AI chatbot experience powered by unique personas. Talk freely, feel heard.

---

## ✨ Overview

**FeelFreeToAsk** is a full-stack AI chat app where users create distinct **personas**—each with its own tone and personality—and chat with them in real-time. Inspired by the idea that *every question deserves a unique voice*.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Register/Login)
- 🎭 Persona Creation with Tone (friendly, formal, etc.)
- 💬 Real-time Chat with AI-powered Personas
- 💾 Chat History stored per session
- 🧠 LLM integration using **Gemini API** (Google)
- 🌈 Responsive UI (React + TailwindCSS)
- ☁️ MongoDB & Mongoose for persistence

---

## 🛠️ Tech Stack

| Frontend         | Backend             | AI / LLMs | Others               |
| ---------------- | ------------------- | --------- | -------------------- |
| React + Vite     | Node.js + Express   | Gemini    | MongoDB + Mongoose   |
| Tailwind CSS     | JWT Auth Middleware |           | dotenv, cors, axios  |
| React Router DOM |                     |           |                      |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/ksaiaditya/Feel_free_to_ask.git
cd FeelFreeToAsk
```

### 2.Setup backend

```bash
npm i
```

Create .env file:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/feelfreetoask
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

```

Start backend:

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open in browser:

```bash
http://localhost:5173
```

📄 License
MIT © NikhilNaik
