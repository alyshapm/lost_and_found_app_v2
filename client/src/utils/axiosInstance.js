import axios from "axios";


// Create an axios instance with common config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your FastAPI base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const setupAxiosInstance = () => {
 // Get token from Redux store
  
  axiosInstance.interceptors.request.use(

        //   if (!token) {
    //     config.headers["Authorization"] = `Bearer ${accessToken}`;
    //   } else {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
    (config) => {

      // const token = store.getState()?.token?.value
    
      config.headers["Authorization"] = `Bearer ${token}`; // Dynamically set the token
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance; // Return the configured axios instance
};

export default axiosInstance;



