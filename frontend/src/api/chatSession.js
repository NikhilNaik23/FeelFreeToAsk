export async function createChatSession(token, personaId, title) {
  const res = await fetch("/api/chat-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ personaId, title }),
  });
  return res.json();
}

export async function getSessionsByPersona(token, personaId) {
  const res = await fetch(`/api/chat-sessions/${personaId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
