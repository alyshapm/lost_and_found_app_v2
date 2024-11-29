import axios from "axios";
import TokenService from "../features/token/tokenService"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import AuthService from "../features/auth/authServices";



// Create an axios instance with common config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", 
  headers: { "Content-Type": "application/json" },
});

// Function to set up Axios interceptors
export const setupAxiosInstance = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //Request interceptor
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

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response, // Return the response if no error
    async (error) => {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/"); 
      }

      return Promise.reject(error); // Reject the error if it's not handled
    }
  );

  return axiosInstance; // Return the configured axios instance
};




export default axiosInstance;