import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

export const register = async (username, fullName, phone) => {
    try {
        const response = await axiosClient.post(
            "/auth/register",
            {
                username,
                full_name: fullName,
                phone
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Error registering user:", error);

        if (error.response) {
            return { error: error.response.data.error || "Registration failed" };
        } else if (error.request) {
            return { error: "No response from server. Please check your connection." };
        } else {
            return { error: "An unexpected error occurred. Please try again later." };
        }
    }
};


/**
 * Login - Requests an OTP for authentication
 * @param {string} phoneNumber - User's phone number
 * @returns {Object} Response message or error
 */
export const login = async (phoneNumber) => {
    try {
        const response = await axiosClient.post("/auth/login", {
            phone_number: phoneNumber
        });

        return response.data; // Mengembalikan respons dari server
    } catch (error) {
        console.error("Error logging in:", error);
        return { error: error.response?.data || "Login failed" };
    }
};


/**
 * VerifyOTP - Verifies the OTP entered by the user
 * @param {string} otp - One-time password
 * @returns {Object} Response message, token, or error
 */
export const verifyOtp = async (otp) => {
    try {
        const response = await axiosClient.post("/auth/verify-otp", { otp });
        Cookies.set(import.meta.env.VITE_API_TOKEN_USR, response.data.token, { expires: 1/24 }); 
        Cookies.set(import.meta.env.VITE_API_ROLE_USR, response.data.role, { expires: 1/24 });
        Cookies.set(import.meta.env.VITE_API_NAME_USR, response.data.user_name, { expires: 1/24 });
        Cookies.set(import.meta.env.VITE_API_ID_USR, response.data.user_id, { expires: 1/24 });
        return response.data; 
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { error: error.response?.data || "OTP verification failed" };
    }
};


export const Logout = async () => {
    try {
      const token = Cookies.get(import.meta.env.VITE_API_TOKEN_USR);
  
      if (!token) {
        console.warn("No token found, redirecting to login...");
        window.location.href = "/login";
        return null;
      }
  
      const response = await axiosClient.post("/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      Cookies.remove(import.meta.env.VITE_API_NAME_USR);
      Cookies.remove(import.meta.env.VITE_API_TOKEN_USR);
      Cookies.remove(import.meta.VITE_API_ROLE_USR);
      Cookies.remove(import.meta.env.VITE_API_ID_USR);
  
      return response; 
    } catch (error) {
      console.error("Error during logout:", error);
      throw error; 
        }
  };
  