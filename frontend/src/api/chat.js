export async function sendMessage(token, personaId, message, chatSessionId) {
  const res = await fetch(`/api/chat/${personaId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, chatSessionId }),
  });
  return res.json();
}

export async function getMessages(token, chatSessionId) {
  const res = await fetch(`/api/chat/messages/session/${chatSessionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
