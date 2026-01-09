// Lightweight fetch-based API client
// Usage: import api from "../services/api"; await api.post('/applications', data);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function buildUrl(path) {
  // If an absolute URL is provided, use it directly
  if (path.startsWith("http")) return path;
  // Join base and path safely to avoid duplicate slashes
  const base = BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
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

let authToken = localStorage.getItem("auth_token") || null;
function getAuthHeaders() {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

const api = {
  get: (path, opts = {}) =>
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
  // token helpers
  setToken(token) {
    authToken = token;
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  },
  getAuthHeaders,
  auth: {
    register: async (body) => {
      const data = await api.post("/api/auth/register", body);
      if (data.token) api.setToken(data.token);
      return data;
    },
    login: async (body) => {
      const data = await api.post("/api/auth/login", body);
      if (data.token) api.setToken(data.token);
      return data;
    },
    me: () => api.get("/api/auth/me", { headers: getAuthHeaders() }),
    logout: () => api.setToken(null),
  },
};

export default api;
