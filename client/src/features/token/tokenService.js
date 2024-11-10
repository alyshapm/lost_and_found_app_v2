import axios from 'axios'


const baseURL = "http://localhost:5000/api/user";

const refreshApi = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});
const TokenService = {
  async accessToken(){
    try {
        const response = await refreshApi.get('/refresh_token')

        return response.data.access_token
        
    } catch (error) {
      console.error("Error Refreshing Token", error);
      throw error;
    }
  },


};

export default TokenService;


