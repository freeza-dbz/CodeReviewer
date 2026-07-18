import axios from 'axios';

// The base URL defaults to the Vite proxy in development if not provided,
// but in production it should point to the deployed Render backend (e.g., https://your-backend.onrender.com).
// You can set VITE_API_URL in your Vercel project environment variables.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
});

export default api;
