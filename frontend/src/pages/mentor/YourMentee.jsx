import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchSelectedMentees, removeMentee } from "../../api/yourMenteeApi";

const YourMentee = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        setLoading(true);
        const selectedMentees = await fetchSelectedMentees();
        if (Array.isArray(selectedMentees)) {
          setMentees(selectedMentees);
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (error) {
        console.error("Error fetching selected mentees:", error);
        setError("Failed to fetch mentees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  const handleRemoveMentee = async (menteeId) => {
    try {
      const response = await removeMentee(menteeId);
      if (response) {
        setMentees((prevMentees) =>
          prevMentees.filter((mentee) => mentee._id !== menteeId)
        );
      }
    } catch (error) {
      console.error("Error removing mentee:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-600 rounded-l-[50px] h-screen overflow-y-auto">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold mb-[40px] text-gray-800">
          Your Mentees
        </h1>
        {loading ? (
          <p className="text-gray-600">Loading mentees...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : mentees.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentees.map((mentee) => (
              <div
                key={mentee._id}
                className="bg-white p-6 rounded-2xl text-center shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-lg text-gray-800 font-semibold mb-2">
                  {mentee.username}
                </h2>
                <button
                  onClick={() => handleRemoveMentee(mentee._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No mentees found.</p>
        )}
      </div>
    </div>
  );
};

export default YourMentee;