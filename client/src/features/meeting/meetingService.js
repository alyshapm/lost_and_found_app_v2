import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const MeetingService = {
  async requestMeeting (payload) {
    try {
        const response = await axiosInstance.post('/meeting/request', payload)
        return response
        
    } catch (error) {
      console.error("Error requesting meeting", error);
      throw error;
    }
  },


};

export default MeetingService;
