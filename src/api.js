
// src/api.js
export async function sendMessageToServer(data) {
  const token = localStorage.getItem("token");

  const res = await fetch( `${import.meta.env.VITE_API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

