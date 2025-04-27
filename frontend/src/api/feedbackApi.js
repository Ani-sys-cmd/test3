import axios from "axios";

// API base URL (consider using environment variables for deployment)
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/feedback`;


// Retrieve token from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Decode JWT token to extract payload (mentorId in this case)
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

// Submit feedback API
export const submitFeedback = async (formData) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const response = await axios.post(
      `${BASE_URL}`,
      formData, // Pass only the form data; backend handles mentorId association
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Successfully submitted feedback
  } catch (error) {
    console.error("Error submitting feedback:", error.response?.data || error.message);
    throw {
      success: false,
      message: error.response?.data?.message || "Failed to submit feedback.",
      status: error.response?.status || 500,
    };
  }
};
 

 // Fetch feedbacks API
export const fetchFeedbacksForMentor = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    // Corrected URL to avoid appending the path twice
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.feedbacks; // Assuming the API returns feedbacks in this key
  } catch (error) {
    console.error("Error fetching feedbacks:", error.response?.data || error.message);
    throw {
      success: false,
      message: error.response?.data?.message || "Failed to fetch feedbacks.",
      status: error.response?.status || 500,
    };
  }
}; 
 
