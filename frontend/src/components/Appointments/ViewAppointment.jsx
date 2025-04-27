import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments, updateAppointmentStatus } from '../../api/appointmentApi';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    getAppointments();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleBack = () => {
    if (userRole === 'mentor') {
      navigate('/mentor/appointments');
    } else if (userRole === 'mentee') {
      navigate('/mentee/appointments');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      <div className="p-6 max-w-md mx-auto border-2 border-blue-400 mt-24 bg-white rounded-xl shadow-lg">
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">Your Appointments</h2>
        <div className="mt-4 max-h-80 overflow-y-auto">
          <ul className="space-y-4">
            {appointments.map((appointment) => {
              const isReceiver = userRole === 'mentor' ? appointment.menteeId === userId : appointment.mentorId === userId;

              return (
                <li key={appointment._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <p className="text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-gray-700"><strong>Time:</strong> {appointment.time}</p>
                  <p className="text-gray-700"><strong>Reason:</strong> {appointment.reason}</p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 text-sm rounded ${
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </p>
                  {appointment.status === 'Pending' && isReceiver && (
                    <div className="flex space-x-4 mt-3">
                      <button
                        onClick={() => handleAction(appointment._id, 'Accepted')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(appointment._id, 'Rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;