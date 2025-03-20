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
