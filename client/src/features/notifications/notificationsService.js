import axiosInstance from "../../utils/axiosInstance";

const NotificationService = {
  async fetchNotificationsByUser(userId) {
    try {
      const response = await axiosInstance.get(`/notification/read/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  async fetchAllNotifications() {
    try {
      const response = await axiosInstance.get("/notification/read-all");
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  async markNotificationAsRead(notifId) {
    try {
      const response = await axiosInstance.put(
        `/notification/change_status/${notifId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error reading notification:", error);
      throw error;
    }
  },
};

export default NotificationService;
