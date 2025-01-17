import axios from "axios";
import {
  AlertTriangle,
  LogOut,
  PlusCircle,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const [authState, setAuthState] = useState({
    user: null,
    isProfileComplete: false,
    loading: true,
    error: null
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Handle mentorId from URL params first
        const params = new URLSearchParams(location.search);
        const mentorId = params.get("mentorId");
        console.log(location.search)
        if (mentorId) {
          localStorage.setItem("mentorId", mentorId);
          // After storing mentorId, fetch the full user data
          const response = await axios.get("https://jwoc-2025.onrender.com/auth/user", {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${mentorId}` // Add mentorId to auth header if your API expects it
            }
          });

          setAuthState({
            user: response.data,
            isProfileComplete: response.data.user?.isRegistered || false,
            loading: false,
            error: null
          });

          // Clean up URL after successful auth
          navigate("/dashboard", { replace: true });
        } else {
          // If no mentorId in URL, try to fetch user data with existing credentials
          const response = await axios.get("https://jwoc-2025.onrender.com/auth/user", {
            withCredentials: true
          });

          setAuthState({
            user: response.data,
            isProfileComplete: response.data.user?.isRegistered || false,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: "Failed to load user data. Please try again."
        }));

        // Only redirect to home if it's an authentication error
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [location.search, navigate]);

  const logout = async () => {
    try {
      localStorage.removeItem("mentorId");
      await axios.get("https://jwoc-2025.onrender.com/auth/logout", { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
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

  if (authState.loading) {
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

  if (authState.error || !authState.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8 bg-white rounded-xl shadow-lg animate-fade-in">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-lg font-medium text-gray-800">
            {authState.error || "Unable to load user data"}
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
    name = "User",
    email = "",
    role = "Mentor",
    phone,
    whatsapp,
    gender,
    college,
    year,
    githubLink,
    linkedIn,
    RegisteredProjectId = [],
    acceptedProjectId = [],
  } = authState.user.user || {};

  return (
    <div className="min-h-screen mt-9 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="transform transition-all duration-500 hover:scale-[1.01] bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <UserCircle className="h-12 w-12 text-blue-500 animate-pulse" />
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
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <LogOut className="h-5 w-5 transform group-hover:rotate-12 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="transform transition-all duration-500 hover:scale-[1.01] bg-white rounded-2xl shadow-xl p-8">
          {!authState.isProfileComplete ? (
            <div className="relative overflow-hidden bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-200 rounded-full opacity-50 animate-pulse" />
              <div className="relative flex items-center space-x-6">
                <AlertTriangle className="h-12 w-12 text-yellow-500 animate-bounce" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Complete Your Profile
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Please complete your profile to access all mentor features
                  </p>
                  <button
                    onClick={handleCompleteProfile}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Complete Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
                <div className="flex space-x-2">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                    {role || "Mentor"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Phone", value: phone },
                        { label: "WhatsApp", value: whatsapp },
                        { label: "College", value: college },
                        { label: "Year", value: year ? getOrdinalSuffix(year) : "N/A" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <span className="text-gray-600 font-medium">{item.label}:</span>
                          <span className="text-gray-800">{item.value || "N/A"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Professional Links</h3>
                    <div className="space-y-3">
                      {[
                        { label: "GitHub", value: githubLink, icon: "github" },
                        { label: "LinkedIn", value: linkedIn, icon: "linkedin" },
                      ].map((item) => (
                        <a
                          key={item.label}
                          href={item.value || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <span className="text-gray-600 font-medium group-hover:text-blue-600">{item.label}:</span>
                          <span className="text-blue-500 hover:underline truncate">
                            {item.value || "Not provided"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Project Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">{RegisteredProjectId.length}</p>
                        <p className="text-sm text-gray-600">Registered Projects</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">{acceptedProjectId.length}</p>
                        <p className="text-sm text-gray-600">Accepted Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleAddProject}
                  className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusCircle className="h-5 w-5 transform group-hover:rotate-90 transition-transform" />
                  <span>Add New Project</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentorDashboard;
