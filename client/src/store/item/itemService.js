import axiosInstance from "../../utils/axiosInstance";
const ItemService = {
  async getItems() {
    try {
      const response = await axiosInstance.get("/items/");
      return response.data;
    } catch (error) {
      console.error("Error fetching items", error);
      throw error;
    }
  },

  async claimItem(itemId, claimPayload) {
    try {
      const response = await axiosInstance.put(
        `/items/claim/${itemId}`,
        claimPayload
      );
      return response.data;
    } catch (error) {
      console.error("Error claiming item", error);
      throw error;
    }
  },

  // Add other item-related API calls here
};

export default ItemService;
