import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAchievement } from "../../api/achievementApi";

const AddAchievement = () => {
  const [achievementInput, setAchievementInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddAchievement = async () => {
    if (achievementInput.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      await uploadAchievement(achievementInput, file);
      setAchievementInput("");
      setFile(null);
      alert("Achievement added successfully!");
    } catch (err) {
      setError(err.message || "Failed to add achievement");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAchievements = () => {
    navigate("/mentee/view-achievements");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-[600px] p-4 md:p-6 rounded-xl border-2 border-blue-400 bg-white shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">Add Achievement</h1>
        <div className="w-full">
          <textarea
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            placeholder="Write your achievement..."
            className="w-full p-3 border bg-gray-50 border-blue-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            rows="4"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border border-blue-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleAddAchievement}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200 mb-4 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Achievement"}
          </button>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <button
            onClick={handleViewAchievements}
            className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-xl hover:bg-blue-200 transition duration-200"
          >
            View Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAchievement;