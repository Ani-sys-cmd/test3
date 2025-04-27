import axios from "axios";

/**
 * Fetches all unselected mentees available for assignment to a mentor.
 * @returns {Promise<Array>} - Array of unselected mentees
 */
export const fetchUnselectedMentees = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/mentorships/available`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data || !response.data.mentees || response.data.mentees.length === 0) {
      throw new Error("No mentees available");
    }

    return response.data.mentees;
  } catch (error) {
    console.error("Error fetching mentees:", error);
    throw new Error("Error fetching unselected mentees: " + error.message);
  }
};


/**
 * Adds a mentee to the mentor's list.
 * @param {string} mentorId - The ID of the mentor
 * @param {string} menteeId - The ID of the mentee to add
 * @returns {Promise<Object>} - Returns the success message from the backend
 */
export const addMentee = async (mentorId, menteeId) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/mentorships/assign`,
      { mentorId, menteeId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.message;
  } catch (error) {
    throw new Error("Error adding mentee: " + error.message);
  }
};
