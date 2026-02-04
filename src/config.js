// API Configuration
// This is public and can be committed to the repository

const PROD_API_BASE_URL = "https://backend-mess-menu-nust.vercel.app";
const LOCAL_API_BASE_URL = "http://localhost:3000";

// Auto-select backend: localhost for local dev, prod domain otherwise
const API_BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? LOCAL_API_BASE_URL
    : PROD_API_BASE_URL;

const config = {
  API_BASE_URL,
};

export default config;
