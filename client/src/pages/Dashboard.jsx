import {
  LogOut,
  PlusCircle,
  UserCircle
} from "lucide-react";
import React, { useState } from 'react';

const MentorDashboard = () => {
  // ... keeping the same state management and functions ...

  const [authState, setAuthState] = useState({
    user: null,
    isProfileComplete: false,
    loading: true,
    error: null
  });

  // ... rest of the state management code remains the same ...

  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-cyan-300 animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-9 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="transform transition-all duration-500 hover:scale-[1.01] bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-cyan-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <UserCircle className="h-12 w-12 text-cyan-400 animate-pulse" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cyan-300">
                  Welcome back, {authState.user?.user?.name || 'User'}
                </h1>
                <p className="text-cyan-400">{authState.user?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="group flex items-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl transition-all duration-300 border border-red-500/30"
            >
              <LogOut className="h-5 w-5 transform group-hover:rotate-12 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="transform transition-all duration-500 hover:scale-[1.01] bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-500/20">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-300">Profile Overview</h2>
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg font-medium border border-cyan-500/30">
                {authState.user?.user?.role || "Mentor"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Personal Information</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Phone", value: authState.user?.user?.phone },
                      { label: "WhatsApp", value: authState.user?.user?.whatsapp },
                      { label: "Gender", value: authState.user?.user?.gender },
                      { label: "College", value: authState.user?.user?.college },
                      { label: "Year", value: authState.user?.user?.year },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-2 p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                        <span className="text-cyan-400 font-medium">{item.label}:</span>
                        <span className="text-cyan-300">{item.value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Professional Links</h3>
                  <div className="space-y-3">
                    {[
                      { label: "GitHub", value: authState.user?.user?.githubLink },
                      { label: "LinkedIn", value: authState.user?.user?.linkedIn },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.value || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200"
                      >
                        <span className="text-cyan-400 font-medium">{item.label}:</span>
                        <span className="text-cyan-300 hover:text-cyan-200">
                          {item.value || "Not provided"}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">Project Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-500/10 rounded-lg text-center border border-cyan-500/30">
                      <p className="text-2xl font-bold text-cyan-300">{authState.user?.user?.projectNumber || 0}</p>
                      <p className="text-sm text-cyan-400">Registered Projects</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-lg text-center border border-emerald-500/30">
                      <p className="text-2xl font-bold text-emerald-300">{authState.user?.user?.acceptedProjectId?.length || 0}</p>
                      <p className="text-sm text-emerald-400">Accepted Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate("/add-project")}
                className="group flex items-center space-x-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500/50"
              >
                <PlusCircle className="h-5 w-5 transform group-hover:rotate-90 transition-transform" />
                <span>Add New Project</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorDashboard;
