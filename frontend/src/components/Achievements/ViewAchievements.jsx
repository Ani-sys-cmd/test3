import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewSelfAchievements, viewMenteesAchievements, downloadFile } from "../../api/achievementApi";

const ViewAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (userRole === "mentee") {
          data = await viewSelfAchievements();
        } else {
          data = await viewMenteesAchievements();
        }
        setAchievements(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userRole]);

  const handleBack = () => {
    if (userRole === "mentee") {
      navigate("/mentee/achievements");
    } else {
      navigate("/");
    }
  };

  const handleDownloadFile = async (fileId) => {
    try {
      const fileBlob = await downloadFile(fileId);
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `file-${fileId}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Failed to download file");
    }
  };

  return (
    <div className="bg-white text-gray-800 shadow-lg rounded-md min-h-screen overflow-hidden flex flex-col border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          {userRole === "mentee" ? "Your Achievements" : "Mentees' Achievements"}
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {loading && <div className="text-center text-gray-600">Loading achievements...</div>}
        {error && <div className="text-center text-red-600">Error: {error}</div>}
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="p-4 border border-blue-200 rounded-xl shadow-sm bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                  Mentee Name: {achievement.mentee?.username || "Anonymous"}
                </h3>
                {achievement.fileData && (
                  <button
                    onClick={() => handleDownloadFile(achievement._id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm md:text-base"
                  >
                    Download Attached File
                  </button>
                )}
              </div>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                Achievement: {achievement.achievementText}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-blue-500">No achievements to display.</p>
        )}
      </div>

      {userRole === "mentee" && (
        <div className="p-4 border-t border-gray-200 bg-white text-center">
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAchievements;