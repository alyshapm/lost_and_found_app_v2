import axios from "axios";

// Create an axios instance with common config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your FastAPI base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Interceptors to handle tokens or errors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
