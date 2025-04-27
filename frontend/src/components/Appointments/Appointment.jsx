import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitAppointment } from "../../api/appointmentApi";
import axios from "axios";

const Appointment = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    mentee: "",
    mentor: "",
  });
  const [assignedMentees, setAssignedMentees] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (e) {
      return null;
    }
  };

  const userId = accessToken ? parseJwt(accessToken)?.id : null;

  useEffect(() => {
    if (userRole === "mentor" && userId) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/appointments/assigned-mentees`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          const mentees = Array.isArray(response.data) ? response.data : [];
          setAssignedMentees(mentees);
        })
        .catch((error) => {
          console.error("Error fetching mentees:", error);
          setAssignedMentees([]);
        });
    } else if (userRole === "mentee" && userId) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/appointments/mentor`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) =>
          setFormData((prev) => ({ ...prev, mentor: response.data._id }))
        )
        .catch((error) => console.error("Error fetching mentor:", error));
    }
  }, [userRole, userId, accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userRole === "mentor") {
        if (!formData.mentee) {
          setStatusMessage("Please select a mentee.");
          return;
        }
        if (formData.mentee === "all") {
          const appointments = assignedMentees.map((mentee) => ({
            ...formData,
            mentee: mentee._id,
          }));
          await Promise.all(
            appointments.map((appointment) => submitAppointment(appointment))
          );
          setStatusMessage(
            "Appointments successfully submitted for all mentees!"
          );
        } else {
          await submitAppointment(formData);
          setStatusMessage("Appointment successfully submitted!");
        }
      } else {
        await submitAppointment(formData);
        setStatusMessage("Appointment successfully submitted!");
      }
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleViewAppointments = () => {
    navigate(
      userRole === "mentor"
        ? "/mentor/view-appointments"
        : "/mentee/view-appointments"
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto translate-y-6 border-2 border-blue-400 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">
        Schedule <span className="text-blue-600">an</span> Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>
        {userRole === "mentor" && (
          <div>
            <label className="block text-gray-700">Select Mentee</label>
            <select
              name="mentee"
              value={formData.mentee}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a mentee</option>
              <option value="all">All Mentees</option>
              {assignedMentees.map((mentee) => (
                <option key={mentee._id} value={mentee._id}>
                  {mentee.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleViewAppointments}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors border border-blue-200"
          >
            View Appointments
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
      {statusMessage && (
        <p className={`mt-4 text-center ${
          statusMessage.includes("successfully") 
            ? "text-green-600" 
            : "text-red-600"
        }`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default Appointment;