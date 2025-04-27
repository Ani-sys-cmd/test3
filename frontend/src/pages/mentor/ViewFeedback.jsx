import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackView from "../../components/feedback/FeedbackView";

const ViewFeedback = () => {
  return (
    <div className="flex h-screen">
      <Sidebar role="mentor" />
      <div className="flex-grow flex flex-col p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-600 rounded-l-[50px] shadow-md">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold mb-[50px] text-gray-800">
          View Feedback
        </h1>

        <div className="flex-grow bg-white rounded-xl p-4 border border-gray-200 shadow-inner">
          <FeedbackView />
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;