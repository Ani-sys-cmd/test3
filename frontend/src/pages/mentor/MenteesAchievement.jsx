import React from "react";
import Sidebar from "../../components/Sidebar";
import ViewAchievements from "../../components/Achievements/ViewAchievements";

const MenteesAchievement = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentor" />
      <div className="flex-1 p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-600 rounded-l-[50px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Mentee Achievements</h1>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <ViewAchievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteesAchievement;