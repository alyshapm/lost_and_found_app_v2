import axios from "axios";
import TokenService from "../features/token/tokenService";

const baseURL = "http://localhost:5000/api/user";

const userApi = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Set up the interceptor immediately
userApi.interceptors.request.use(
  async (config) => {
    // Fetch the token asynchronously
    const token = await TokenService.accessToken();
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default userApi;
