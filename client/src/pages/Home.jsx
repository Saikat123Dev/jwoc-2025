import { Github } from "lucide-react";
import React from "react";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="mr-2 h-5 w-5"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.74 1.22 9.24 3.24l6.92-6.92C36.21 2.15 30.45 0 24 0 14.94 0 7.16 5.14 3.29 12.65l7.94 6.19C13.08 13.21 18.12 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.26 24.64c0-1.77-.16-3.48-.45-5.13H24v9.7h12.6c-.54 2.9-2.17 5.37-4.63 7.03l7.3 5.69c4.28-3.94 6.99-9.74 6.99-16.29z"
    />
    <path
      fill="#4A90E2"
      d="M24 48c6.48 0 11.93-2.15 15.9-5.83l-7.3-5.69c-2.01 1.35-4.57 2.15-8.6 2.15-6.62 0-12.22-4.4-14.24-10.34l-8.09 6.21C6.08 42.9 14.59 48 24 48z"
    />
    <path
      fill="#FBBC05"
      d="M3.71 12.65C1.9 15.69 1 19.17 1 22.8c0 3.63.9 7.11 2.71 10.15l8.09-6.21c-.93-2.79-.93-5.92 0-8.71L3.71 12.65z"
    />
  </svg>
);

const Home = () => {
  const googleLogin = () => {
    window.location.href = "https://jwoc-2025-1.onrender.com/auth/google";
  };

  const githubLogin = () => {
    window.location.href = "https://jwoc-2025-1.onrender.com/auth/github";
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="mt-7 absolute slide-out-to-top-1/4 left-1/4 w-[600px] h-[200px] bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-700 opacity-50 rounded-full blur-3xl"></div>

      </div>
        <div className="max-w-md w-full backdrop-blur-xl bg-white/10  p-8 rounded-lg shadow-md space-y-8">

        <h2 className="text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400">
            Sign in to your account to continue
          </p>

          {/* Buttons */}
          <div className="space-y-6">
            <button
              onClick={googleLogin}
              className="group w-full flex items-center justify-center py-3 px-4 border border-gray-600 rounded-md shadow-md text-sm font-medium text-gray-200 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ease-in-out"
            >
              <GoogleIcon />
              Login with Google
            </button>

            <button
              onClick={githubLogin}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-600 rounded-md shadow-md text-sm font-medium text-gray-200 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ease-in-out"
            >
              <Github className="mr-2 h-5 w-5" />
              Login with GitHub
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
