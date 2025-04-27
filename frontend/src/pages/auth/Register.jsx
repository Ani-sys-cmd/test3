import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import s1 from "../../assets/images/s1.jpeg";
import s2 from "../../assets/images/s2.jpg";
import s3 from "../../assets/images/s3.jpg";
import s4 from "../../assets/images/s4.webp";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mentee",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // password confirmation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Register user
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        formData
      );
      const { success, message: msg, user } = response.data;
      setMessage(msg);

      if (success) {
        // If the user signed up as a mentor, create an empty MentorProfile
        if (formData.role === "mentor") {
          try {
            await axios.post(
              `${API_BASE_URL}/mentorProfile/create`,
              { userId: user._id }
            );
          } catch (err) {
            console.error("Failed to create mentor profile:", err);
            // Optional: show a warning but still navigate to login
          }
        }

        // Delay then redirect to login
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const images = [s1, s2, s3, s4];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[900px] border-2 bg-white border-blue-400 shadow-xl relative overflow-hidden flex flex-col md:flex-row rounded-3xl">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-blue-600">
            Welcome to <span className="text-gray-800">GuideConnect</span>
          </h1>

          <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            {message && (
              <p
                className={`mb-4 text-center ${
                  message.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Register / Sign Up</h2>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 bg-gray-50 text-gray-800 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg px-3 bg-gray-50 text-gray-800 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 py-2 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to="/login" className="font-semibold text-blue-600">Log In</Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-cover bg-center relative">
          <img
            src={images[currentIndex]}
            alt="carousel"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
