import axios from "axios";
import {
  AlertTriangle,
  LogOut,
  UserCircle
} from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const [user, setUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mentorId = params.get("mentorId");

    if (mentorId) {
      localStorage.setItem("mentorId", mentorId);

      // Optionally clear the URL query params
      const newUrl = location.pathname;
      window.history.replaceState(null, '', newUrl);

      navigate("/dashboard", { replace: true });
    }

    axios
      .get("https://jwoc-2025.onrender.com/auth/user", { withCredentials: true })
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setIsProfileComplete(userData.user.isRegistered || false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/"); // Redirect to home if user data cannot be fetched
      });
  }, [location.search, navigate]);

  const logout = () => {
    localStorage.removeItem("mentorId");
    axios
      .get("https://jwoc-2025.onrender.com/auth/logout", { withCredentials: true })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error during logout:", error));
  };

  const handleCompleteProfile = () => navigate("/Mentor-registration");
  const handleAddProject = () => navigate("/add-project");

  const getOrdinalSuffix = (num) => {
    if (num % 100 >= 11 && num % 100 <= 13) return `${num}th`;
    if (num % 10 === 1) return `${num}st`;
    if (num % 10 === 2) return `${num}nd`;
    if (num % 10 === 3) return `${num}rd`;
    return `${num}th`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-600 animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg animate-fade-in">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-lg font-medium text-gray-800">
            Unable to load user data
          </p>
          <p className="text-gray-600">Please try again later</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    email,
    role,
    phone,
    whatsapp,
    gender,
    college,
    year,
    githubLink,
    linkedIn,
    RegisteredProjectId,
    acceptedProjectId,
  } = user.user;

  return (
    <div className="min-h-screen mt-9 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <UserCircle className="h-12 w-12 text-blue-500" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {name}
                </h1>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-8">
          {!isProfileComplete ? (
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <AlertTriangle className="h-12 w-12 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Complete Your Profile
              </h2>
              <button
                onClick={handleCompleteProfile}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl"
              >
                Complete Profile
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Your Dashboard</h2>
              {/* Add relevant content */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentorDashboard;
