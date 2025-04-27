import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


import s1 from "../../assets/images/s1.jpeg";

import s2 from "../../assets/images/s2.jpg";

import s3 from "../../assets/images/s3.jpg";

import s4 from "../../assets/images/s4.webp";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("mentee");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const images = [s1, s2, s3, s4];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, role: userRole };

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);

      const { accessToken, refreshToken, role } = response.data;

      if (role !== userRole) {
        setMessage(`Invalid role. You are logged in as ${role}`);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      navigate(`/${role}/dashboard`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[900px] border-2 bg-white border-blue-400 shadow-xl relative overflow-hidden flex flex-col md:flex-row rounded-3xl">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
            Welcome to <span className="text-gray-800">GuideConnect</span>
          </h1>

          <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Login</h2>

            {message && (
              <p
                className={`mb-4 text-center ${
                  message.includes("successful") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

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
                placeholder="Enter your email"
                className="w-full px-3 mb-4 bg-gray-50 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 mb-4 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-700">Role:</span>
              <div>
                <button
                  type="button"
                  onClick={() => setUserRole("mentee")}
                  className={`px-3 py-1 ${
                    userRole === "mentee"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-600 border border-gray-300"
                  } rounded-full transition-colors`}
                >
                  Mentee
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("mentor")}
                  className={`px-3 py-1 ml-2 ${
                    userRole === "mentor"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-600 border border-gray-300"
                  } rounded-full transition-colors`}
                >
                  Mentor
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Carousel Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-[400px] rounded-3xl h-[400px] overflow-hidden relative">
            <div
              className="flex w-full h-full transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;