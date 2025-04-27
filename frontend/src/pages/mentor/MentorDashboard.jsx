import React, { useState, useEffect } from 'react';
import { fetchAppointments, updateAppointmentStatus } from '../../api/appointmentApi';
import Sidebar from '../../components/Sidebar';

const MentorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        const currentDateTime = new Date();
        const upcomingAppointments = data
          .filter((appointment) => new Date(appointment.date) >= currentDateTime)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(upcomingAppointments);
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-auto">
        <Sidebar role="mentor" />
      </div>
      <div className="flex-1 p-4 md:p-8 text-gray-800 bg-[#fafafa] border-t-4 md:border-t-0 md:border-l-4 border-blue-600 md:rounded-l-[50px] overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font2 font-bold mb-4 text-gray-800">
          Good Things Come from Good Things
        </h1>
        <h1 className="text-2xl md:text-3xl font2 font-bold mb-4 text-gray-800">
          Welcome, <span className='text-blue-600 font2'>Mentor!</span>
        </h1>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h2 className="text-xl md:text-2xl font2 font-semibold mb-4 text-gray-800">
            Upcoming Appointments
          </h2>
          
          {appointments.length === 0 ? (
            <p className="text-blue-600">No upcoming appointments available.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li 
                  key={appointment._id} 
                  className="p-4 bg-white rounded-3xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p className="text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><strong>Time:</strong> {appointment.time}</p>
                    <p className="text-gray-700"><strong>Reason:</strong> {appointment.reason}</p>
                    <p className="text-gray-700">
                      <strong>Status:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-sm ${
                        appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                  
                  {appointment.status === 'Pending' && (
                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                      <button
                        onClick={() => handleAction(appointment._id, 'Accepted')}
                        className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(appointment._id, 'Rejected')}
                        className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;