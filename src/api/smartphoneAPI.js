import axiosClient from "./axiosClient";

export const getSmartphones = async () => {
  try {
    const response = await axiosClient.get("/smartphone/");
    return response.data;
  } catch (error) {
    console.error("Error fetching smartphones:", error);
    return [];
  }
};

// Fetch smartphone details by ID
export const getSmartphoneByID = async (id) => {
  try {
    const response = await axiosClient.get(`/smartphone/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching smartphone with ID ${id}:`, error);
    return null;
  }
};
