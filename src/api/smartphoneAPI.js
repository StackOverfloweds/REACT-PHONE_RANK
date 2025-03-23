import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

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
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);

    if (!token) {
      console.warn("No authorization token found");
      return { error: "Unauthorized" }; // Return object dengan error
    }

    const response = await axiosClient.get(`/smartphone/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching smartphone with ID ${id}:`, error);
    return null;
  }
};