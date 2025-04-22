import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

// Tambah smartphone baru
export const createSmartphone = async (data) => {
  try {
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    if (!token) {
      console.warn("No authorization token found");
      return { error: "Unauthorized" };
    }

    const response = await axiosClient.post('/admin/phone', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("check response ",response)

    return response.data;
  } catch (error) {
    console.error("Error creating smartphone:", error);
    return { error: error.response?.data || "Failed to create smartphone" };
  }
};

// Update smartphone
export const updateSmartphone = async (id, data) => {
  console.log("check id ", id)
  console.log("check data ",data)
  try {
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    if (!token) {
      console.warn("No authorization token found");
      return { error: "Unauthorized" };
    }

    const response = await axiosClient.put(`/admin/phone/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating smartphone:", error);
    return { error: error.response?.data || "Failed to update smartphone" };
  }
};

// Hapus smartphone
export const deleteSmartphone = async (id) => {
  try {
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    if (!token) {
      console.warn("No authorization token found");
      return { error: "Unauthorized" };
    }

    const response = await axiosClient.delete(`/admin/phone/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting smartphone:", error);
    return { error: error.response?.data || "Failed to delete smartphone" };
  }
};


export const searchSmartphones = async (data) => {
  try {
    const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
    if (!token) {
      console.warn("No authorization token found");
      return { error: "Unauthorized" };
    }

    const response = await axiosClient.post('/admin/phone/search', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating smartphone:", error);
    return { error: error.response?.data || "Failed to create smartphone" };
  }
};