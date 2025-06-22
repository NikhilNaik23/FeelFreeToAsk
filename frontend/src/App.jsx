import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Personas from "./pages/Personas";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration:1000,
            removeDelay: 5000,
            style: {
              borderRadius: "10px",
              background: "#1e1e38",
              color: "#cbd5ff",
              padding: "12px 16px",
              boxShadow: "0 0 12px rgba(120, 87, 255, 0.3)",
              fontFamily: "Sora, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#a78bfa",
                secondary: "#f3e8ff",
              },
              style: {
                background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
              },
            },
            error: {
              iconTheme: {
                primary: "#f43f5e",
                secondary: "#ffe4e6",
              },
              style: {
                background: "linear-gradient(90deg, #1e1e38, #3f3f5c)",
                border: "1px solid #ff4d6d",
              },
            },
          }}
        />

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/personas"
            element={
              <PrivateRoute>
                <Personas />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:personaId/*"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
