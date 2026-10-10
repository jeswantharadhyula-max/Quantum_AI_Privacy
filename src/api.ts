

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function runQuantumAnalysis() {
  const response = await fetch(`${API_URL}/api/run-demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      test_size: 0.25,
      random_state: 42,
      privacy_mode: false,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail || `Backend request failed: ${response.status}`
    );
  }

  return data;
}
