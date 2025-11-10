// API Configuration
// This is public and can be committed to the repository

const config = {
  // Use empty string for development (uses proxy), full URL for production
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? "https://backend-mess-menu-nust.vercel.app" 
    : ""
};

export default config;
