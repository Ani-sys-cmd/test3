import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ submitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText) {
      return alert("Please provide feedback.");
    }

    const formData = { text: feedbackText };

    try {
      setIsSubmitting(true);
      await submitFeedback(formData);
      setFeedbackSubmitted(true);
      setFeedbackText("");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4">
      {feedbackSubmitted && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Thank you for your feedback!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
        <div>
          <label htmlFor="feedback" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 text-gray-800 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Share your thoughts about your mentor..."
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;