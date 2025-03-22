import axiosClient from "./axiosClient";

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

        return response.data; // Mengembalikan token dan peran pengguna
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { error: error.response?.data || "OTP verification failed" };
    }
};


export const Logout = async () => {
    try {
        const response = await axiosClient.post("/auth/logout");
          
      } catch (error) {
        console.error("Error fetching smartphones:", error);
          return [];
      }
}

