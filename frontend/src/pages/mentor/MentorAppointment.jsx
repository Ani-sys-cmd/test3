import React from "react";
import Sidebar from "../../components/Sidebar";
import Appointment from "../../components/Appointments/Appointment";

const MentorAppointment = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6 text-gray-800 bg-[#fafafa] border-l-4 border-blue-600 rounded-l-[50px] shadow-sm">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold text-gray-800">
          Mentor Appointments
        </h1>
        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-200 shadow-inner">
          <Appointment />
        </div>
      </div>
    </div>
  );
};

export default MentorAppointment;