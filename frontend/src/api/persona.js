export async function getPersonas(token) {
  const res = await fetch("/api/persona", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deletePersona(token, id) {
  const res = await fetch(`/api/persona/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete persona");

  return res.json();
}

export async function createPersona(token, data) {
  const res = await fetch("/api/persona", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
