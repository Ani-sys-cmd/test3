import React from "react";
import Sidebar from "../../components/Sidebar";
import Appointment from "../../components/Appointments/Appointment";

const MenteeAppointment = () => {
  return (
    <div className="flex min-h-screen">
      
      <Sidebar role="mentee" />
      
      
      <div className="flex-grow p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-500 rounded-l-[50px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Mentee Appointments
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <Appointment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeAppointment;