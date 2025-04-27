import axios from "axios";

/**
 * Retrieves the `access_token` from localStorage.
 */
const getAccessToken = () => {
  return localStorage.getItem('accessToken'); // Adjust the key if stored differently
};

/**
 * Fetches all mentees assigned to the logged-in mentor.
 * @returns {Promise<Array>} - Array of mentees
 */
export const fetchSelectedMentees = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/mentorships/mentees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch selected mentees."
    );
  }
};

/**
 * Removes a mentee from the mentor's list.
 * @param {string} menteeId - The ID of the mentee to remove
 * @returns {Promise<Object>} - Success message from the backend
 */
export const removeMentee = async (menteeId) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Unauthorized: No access token found.");
    }

    if (!menteeId || typeof menteeId !== "string" || menteeId.length !== 24) {
      throw new Error("Invalid mentee ID format.");
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/mentorships/unassign`,
      { menteeId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.message;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred while removing the mentee.";
    throw new Error(errorMessage);
  }
};
