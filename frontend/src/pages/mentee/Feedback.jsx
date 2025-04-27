import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import { submitFeedback } from "../../api/feedbackApi";

const Feedback = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentee" />
      <div className="flex-grow p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-500 rounded-l-[50px]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold font2 mb-2 text-gray-800">
            Submit Feedback
          </h1>
          <p className="text-blue-600 mb-8 text-lg">
            Share your thoughts and experience with your mentor. Your feedback helps us improve the mentoring experience.
          </p>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <FeedbackForm submitFeedback={submitFeedback} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;