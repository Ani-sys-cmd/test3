import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const MentorEditProfile = () => {
  // Predefined skills the user can click to add
  const skills = [
    "Recursive Self-Doubt Optimization",
    "Quantum Debugging",
    "Infinite Loop Surfing",
    "Git Conflict Whispering",
    "404 Error Interpretation",
    "Syntax Charmcasting",
    "Multithreaded Napping",
    "Rubber Duck Possession",
    "Dark Mode Sorcery",
    "Stack Overflow Necromancy",
    "AI Model Flirting",
    "Legacy Code Archaeology",
    "Null Pointer Taming",
    "Coffee-to-Code Conversion",
    "Variable Name Poetry"
  ];

  const initialProfile = {
    fullName: ' ',
    title: '',
    bio: '',
    experience: '',
    expertise: []
  };

  const [formData, setFormData] = useState(initialProfile);
  const [profileImage, setProfileImage] = useState(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const containerRef = useRef(null);

  const filteredSkills = skills.filter(s => 
    s.toLowerCase().includes(expertiseInput.toLowerCase()) && 
    !formData.expertise.includes(s)
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.title) newErrors.title = 'Professional Title is required';
    if (formData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitProfile = async (updatedProfile) => {
    try {
      const response = await axios.post('http://localhost:3001/mentor/Updateprofile', updatedProfile);
      console.log(`Profile updated successfully: ${response.data}`);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedProfile = {
      ...formData,
      profileImage
    };

    console.log('Updated profile:', updatedProfile);
    alert('Profile updated successfully!');
    submitProfile(updatedProfile);
  };

  // Add a skill to expertise
  const addSkill = (skill) => {
    if (skill && !formData.expertise.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, skill]
      }));
    }
  };

  // Remove a selected skill
  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(s => s !== skill)
    }));
  };

  // Handle enter key for input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && expertiseInput.trim()) {
      e.preventDefault();
      addSkill(expertiseInput.trim());
      setExpertiseInput('');
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar role="mentor" />
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Edit Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
            {/* Profile Photo */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Add Photo</span>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="profileImage" className="hidden" />
                <label htmlFor="profileImage" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Upload Photo
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column*/}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Mentor Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Professional Title / Designation</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Experience (Years / Background)</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Short Bio</label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
                </div>

                {/* Expertise Areas / Skills with dropdown icon*/}
                <div className="mb-4 relative" ref={containerRef}>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Expertise Areas / Skills</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={expertiseInput}
                      onChange={(e) => { setExpertiseInput(e.target.value); setShowDropdown(true); }}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="Type or select a skill and hit Enter"
                      className="w-full border rounded px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDropdown(prev => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Dropdown suggestions */}
                  {showDropdown && filteredSkills.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                      {filteredSkills.map((skill, idx) => (
                        <li
                          key={idx}
                          onClick={() => { addSkill(skill); setExpertiseInput(''); setShowDropdown(false); }}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Selected skills */}
                <div className="mb-4">
                  <h3 className="text-gray-700 text-sm font-bold">Selected Expertise Areas:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} &#10005;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorEditProfile;
