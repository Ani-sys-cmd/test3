import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaBriefcase, FaHistory, FaUserTie } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar'; 

const MentorAccount = () => {
  const mentorData = {
    name: "Mr .Aditya Nimbolkar",
    title: "Senior Software Engineer",
    bio: "10+ years experience in full-stack development with specialization in React and Node.js. Passionate about mentoring new developers and building scalable applications.",
    expertise: ["React", "Node.js", "AWS", "Database Design", "REST APIs"],
    experience: "12 years in software development",
    profileImage: "https://example.com/profile.jpg"
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar remains fixed on the left */}
      <Sidebar role="mentor" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 flex items-center">
              <FaUserTie className="inline-block mr-2" />
              Mentor Profile
            </h1>
            <Link 
              to="/mentor/edit-profile" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FaEdit className="inline-block mr-2" />
              Edit Profile
            </Link>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {mentorData.profileImage ? (
                    <img 
                      src={mentorData.profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-blue-600">
                      {mentorData.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {mentorData.name}
                </h2>
                <p className="text-blue-600 mb-4 flex items-center">
                  <FaBriefcase className="inline-block mr-2" />
                  {mentorData.title}
                </p>
                <div className="text-gray-600 text-center">
                  <p className="mb-2 flex items-center justify-center">
                    <FaHistory className="inline-block mr-2" />
                    {mentorData.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Professional Bio
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {mentorData.bio}
                </p>
              </div>

              {/* Expertise Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mentorData.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p className="text-gray-600">
                      {mentorData.experience} in the tech industry with a focus on:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-2 pl-4">
                      <li>Full-stack development</li>
                      <li>Technical leadership</li>
                      <li>Mentorship programs</li>
                      <li>Agile development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAccount;
