// Lightweight fetch-based API client
// Usage: import api from "../services/api"; await api.post('/applications', data);

const BASE_URL = import.meta.env.VITE_API_URL || "";

function buildUrl(path) {
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { message: text };
    }
    const err = new Error(
      data.message || `Request failed with status ${response.status}`
    );
    err.status = response.status;
    err.data = data;
    throw err;
  }
  // try to parse json, but return text if not json
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return response.text();
}

const api = {
  get: (path, opts) =>
    fetch(buildUrl(path), { method: "GET", ...opts }).then(handleResponse),
  post: (path, body, opts = {}) =>
    fetch(buildUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
      body: JSON.stringify(body),
      ...opts,
    }).then(handleResponse),
  put: (path, body, opts = {}) =>
    fetch(buildUrl(path), {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
      body: JSON.stringify(body),
      ...opts,
    }).then(handleResponse),
  delete: (path, opts = {}) =>
    fetch(buildUrl(path), { method: "DELETE", ...opts }).then(handleResponse),
};

export default api;
