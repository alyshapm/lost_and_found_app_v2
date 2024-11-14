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

  async addItem(newItem) {
    try {
      const response = await axiosInstance.post("/items/new", newItem);
      return response.data;
    } catch (error) {
      console.error("Error adding new item", error);
      throw error;
    }
  },

  async editItem(itemId, updatedItem) {
    try {
      const response = await axiosInstance.put(
        `/items/update/${itemId}`,
        updatedItem
      );
      return response.data;
    } catch (error) {
      console.error("Error updating item", error);
      throw error;
    }
  },

  async deleteItem(itemId) {
    try {
      const response = await axiosInstance.delete(`/items/delete/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting item", error);
      throw error;
    }
  },

  async approveItem(itemId) {
    try {
      const response = await axiosInstance.put(`/items/approve/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error approving item", error);
      throw error;
    }
  },
};

export default ItemService;
