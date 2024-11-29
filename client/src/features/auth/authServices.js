
import userApi from "../../utils/userAxios";
import axios from "axios";

const AuthService = {
  async signin (userData) {
    try {
        const response = await userApi.post('/signin', userData)

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
    
        return response.data
        
    } catch (error) {
      console.error("Error Logging In", error);
      throw error;
    }
  },

  async signup(userData) {
    try {
        const response = await userApi.post('/signup', userData)
        return response.data
      
    } catch (error) {
      console.error("Error Creating an Account", error);
      throw error;
    }
  },

  async selectRole(userId, selectedRole) {
    try {
        const response = await userApi.post('/select-role', {userId, selectedRole})
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }

    
        return response.data;
    }
    catch (error) {
        console.error("Error Selecting Role", error);
        throw error;
      }
  },

  async logout(){
    try {
        const response = await axios.get('http://localhost:5000/api/user/logout')
        localStorage.removeItem('user')
        console.log("User logged out successfully");
        return response.data
    }catch (error) {
        console.error("Error Logging Out", error);
        throw error;
      }
  }

};

export default AuthService;
