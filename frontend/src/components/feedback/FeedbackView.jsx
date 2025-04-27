import React, { useEffect, useState } from "react";
import { fetchFeedbacksForMentor } from "../../api/feedbackApi.js";

const FeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbacksForMentor();
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">Feedback Received</h2>
      </div>

      {/* Scrollable content */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-4 border border-blue-200 rounded-lg shadow-sm bg-gray-50 hover:bg-blue-50 transition"
            >
              <p className="font-semibold text-gray-800 mb-1">
                Mentee: {feedback.mentee?.username || "Anonymous"}
              </p>
              <p className="text-blue-600">
                <span className="font-semibold">Feedback:</span> {feedback.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;