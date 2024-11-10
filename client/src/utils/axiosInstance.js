import axios from "axios";
import TokenService from "../features/token/tokenService"; // Adjust the import path as necessary

// Create an axios instance with common config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", 
  headers: { "Content-Type": "application/json" },
});

// Function to set up Axios interceptors
export const setupAxiosInstance = () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Get the token from the Redux store or TokenService
      const token = await TokenService.accessToken();
      
      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance; // Return the configured axios instance
};

export default axiosInstance;