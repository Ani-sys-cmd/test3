import React from 'react';
import Sidebar from "../../components/Sidebar";
import img from "../../assets/images/profile.webp"
const MyMentor = () => {
 
  const mentor = {
    name: "Aditya Nimbolkar",
    title: "Senior Software Engineer & Tech Lead",
    bio: "10+ years experience in full-stack development and team leadership. Passionate about mentoring junior developers and career coaching in tech.",
    expertise: ["JavaScript", "React", "Node.js", "System Design", "Career Development"],
    experience: "12 years in software development",
    image: img
  };

  return (
    <div className="flex">
      {/* Sidebar - Make sure to include your Sidebar component */}
      <Sidebar role="mentee" />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Mentor</h1>
          
          {/* Mentor Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="w-full md:w-1/3">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Mentor Details */}
              <div className="w-full md:w-2/3 space-y-4">
                {/* Name and Title */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                  <p className="text-lg text-blue-600 font-medium">{mentor.title}</p>
                </div>

                {/* Experience */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Experience</h3>
                  <p className="mt-1 text-gray-700">{mentor.experience}</p>
                </div>

                {/* Expertise */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Expertise Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Bio</h3>
              <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
            </div>

            {/* Action Button
            <div className="mt-6">
              <button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                onClick={() => console.log('Message mentor clicked')}
              >
                Message Mentor
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMentor;