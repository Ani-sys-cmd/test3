import React from "react";
import Sidebar from "../../components/Sidebar";
import AddAchievement from "../../components/Achievements/AddAchievement";

const Achievement = () => {
  return (
    <div className="flex min-h-screen">
     
      <Sidebar role="mentee" />
      
    
      <div className="flex-grow p-6 pl-4 flex justify-center text-gray-800 bg-[#fafafa] border-l-4 border-blue-500 rounded-l-[50px]">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font2 font-bold mb-8 text-gray-800">
            Achievements
          </h1>
        
         
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <AddAchievement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;