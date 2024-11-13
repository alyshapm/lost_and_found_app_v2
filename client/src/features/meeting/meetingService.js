import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const MeetingService = {
  async requestMeeting(payload) {
    try {
      const response = await axiosInstance.post("/meeting/request", payload);
      return response;
    } catch (error) {
      console.error("Error requesting meeting", error);
      throw error;
    }
  },

  async getMeetings() {
    try {
      const response = await axiosInstance.get("/meeting/");
      return response.data;
    } catch (error) {
      console.error("Error fetching meetings", error);
      throw error;
    }
  },

  async approveMeeting(meetingId) {
    try {
      const response = await axiosInstance.put(`/meeting/approve/${meetingId}`);
      return response.data;
    } catch (error) {
      console.error("Error approving meeting", error);
      throw error;
    }
  },

  async completeMeeting(meetingId) {
    try {
      const response = await axiosInstance.put(
        `/meeting/complete/${meetingId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error completing meeting", error);
      throw error;
    }
  },

  async rejectMeeting(meetingId) {
    try {
      const response = await axiosInstance.put(`/meeting/reject/${meetingId}`);
      return response.data;
    } catch (error) {
      console.error("Error rejecting meeting", error);
      throw error;
    }
  },
};

export default MeetingService;
