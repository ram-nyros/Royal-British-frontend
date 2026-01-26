const sanitize = (value) => (value ? value.trim().replace(/\/$/, "") : "");

const envUrl = sanitize(import.meta.env.VITE_API_BASE_URL);
const renderEnvUrl = sanitize(import.meta.env.VITE_RENDER_BASE_URL);
const windowInjectedUrl =
  typeof window !== "undefined" && window.__APP_API_BASE_URL
    ? sanitize(window.__APP_API_BASE_URL)
    : "";

const LOCAL_FALLBACK = "http://localhost:5000";
const PROD_FALLBACK = "https://royal-british-server.onrender.com";

const fallback = import.meta.env.DEV ? LOCAL_FALLBACK : PROD_FALLBACK;

export const API_BASE_URL =
  envUrl || renderEnvUrl || windowInjectedUrl || fallback;

if (import.meta.env.DEV) {
  console.info("[API] base url resolved to", API_BASE_URL);
}
