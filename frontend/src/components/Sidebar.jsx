import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/appLogo.svg";
import {
  FaClipboardList,
  FaTrophy,
  FaUserAlt,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUsers,
  FaHome,
  FaBars,
  FaTimes,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static w-64 bg-white h-screen transition-transform duration-300 ease-in-out z-40 flex flex-col justify-between p-4 border-r border-gray-200 shadow-lg`}
      >
        {/* Logo and Title */}
        <div>
          <div className="flex items-center mb-10 p-2">
            <img src={logo} alt="App Logo" className="w-12 h-12 mr-3" />
            <h2 className="text-2xl font-bold text-blue-600">MENTOR LINK</h2>
          </div>
          
          {/* Navigation Links */}
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link
                to={`/${role}/dashboard`}
                className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="text-xl mr-3 text-blue-500" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>

            {/* Mentee Specific Links */}
            {role === "mentee" && (
              <>
                {/* My Account
                <li>
                  <Link
                    to="/mentee/my-account"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">My Account</span>
                  </Link>
                </li> */}

                {/* My Mentor */}
                <li>
                  <Link
                    to="/mentee/my-mentor"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaChalkboardTeacher className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">My Mentor</span>
                  </Link>
                </li>

                {/* Mentor Directory
                <li>
                  <Link
                    to="/mentee/mentor-directory"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUsers className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">Mentor Directory</span>
                  </Link>
                </li> */}

                {/* Message
                <li>
                  <Link
                    to="/mentee/messages"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaEnvelope className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">Message</span>
                  </Link>
                </li> */}
              </>
            )}

            {/* Mentor Specific Links */}
            {role === "mentor" && (
              <>
                {/* My Account */}
                <li>
                  <Link
                    to="/mentor/my-account"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">My Account</span>
                  </Link>
                </li>

                {/* Select Mentee */}
                <li>
                  <Link
                    to="/mentor/selectMentee"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUsers className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">Select Mentee</span>
                  </Link>
                </li>

                {/* Your Mentee */}
                <li>
                  <Link
                    to="/mentor/yourMentee"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaChalkboardTeacher className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">Your Mentee</span>
                  </Link>
                </li>

                {/* Message
                <li>
                  <Link
                    to="/mentor/messages"
                    className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaEnvelope className="text-xl mr-3 text-blue-500" />
                    <span className="font-medium">Message</span>
                  </Link>
                </li> */}
              </>
            )}

            {/* Appointments */}
            <li>
              <Link
                to={`/${role}/appointments`}
                className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList className="text-xl mr-3 text-blue-500" />
                <span className="font-medium">Appointments</span>
              </Link>
            </li>

            {/* Achievements */}
            <li>
              <Link
                to={`/${role}/achievements`}
                className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaTrophy className="text-xl mr-3 text-blue-500" />
                <span className="font-medium">Achievements</span>
              </Link>
            </li>

            {/* Feedback */}
            <li>
              <Link
                to={`/${role}/feedback`}
                className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaUserAlt className="text-xl mr-3 text-blue-500" />
                <span className="font-medium">Feedback</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition mt-auto sticky bottom-4 shadow-md"
        >
          <FaSignOutAlt className="text-xl mr-3" />
          <span className="text-base font-medium">Logout</span>
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;