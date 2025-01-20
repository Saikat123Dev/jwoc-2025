import axios from 'axios';
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MenteeRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://jwoc-2025.onrender.com/auth/user", { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          toast.error("Please authenticate using Google or GitHub first.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user. Please try again.");
      }
    };

    fetchUser();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please authenticate using Google or GitHub first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("https://jwoc-2025.onrender.com/api/mentee/register", data, { withCredentials: true });
      if (response.data && response.status === 201) {
        toast.success("You are successfully registered as a mentee!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OAuth login
  const handleGoogleLogin = () => {
    window.location.href = "https://jwoc-2025.onrender.com/auth/google";
  };

  const handleGitHubLogin = () => {
    window.location.href = "https://jwoc-2025.onrender.com/auth/github";
  };

  return (
    <div className="min-h-screen pt-20 flex mt-10 flex-col items-center relative overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />

      {user ? (
        <motion.div
          className="w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white backdrop-blur-lg mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Complete Your Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-white font-medium">Name:</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="text-white font-medium">Gender:</label>
              <select
                {...register("gender")}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="Prefer not to say"
              >
                <option value="Male" className="text-black">Male</option>
                <option value="Female" className="text-black">Female</option>
                <option value="Prefer not to say" className="text-black">Prefer not to say</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-white font-medium">Email:</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-white font-medium">Phone:</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your phone number"
                type="tel"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="text-white font-medium">WhatsApp:</label>
              <input
                {...register("whatsapp", { required: "WhatsApp is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your WhatsApp number"
                type="tel"
              />
              {errors.whatsapp && (
                <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="text-white font-medium">College:</label>
              <input
                {...register("college", { required: "College is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your college"
              />
              {errors.college && (
                <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="text-white font-medium">Year:</label>
              <select
                {...register("year", { required: "Year is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue=""
              >
                <option value="" disabled className="text-black">Select your year</option>
                <option value="1" className="text-black">1st Year</option>
                <option value="2" className="text-black">2nd Year</option>
                <option value="3" className="text-black">3rd Year</option>
                <option value="4" className="text-black">4th Year</option>
              </select>
              {errors.year && (
                <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>

            {/* GitHub */}
            <div>
              <label className="text-white font-medium">GitHub:</label>
              <input
                {...register("github")}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your GitHub profile URL"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-white font-medium">LinkedIn:</label>
              <input
                {...register("linkedIn")}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your LinkedIn URL"
              />
            </div>

            {/* Answer1 */}
            <div>
              <label className="text-white font-medium">Why do you want to be a mentee?</label>
              <textarea
                {...register("answer1", { required: "This field is required" })}
                className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your answer"
                rows="4"
              />
              {errors.answer1 && (
                <p className="text-red-400 text-sm mt-1">{errors.answer1.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <div className="text-center">
          <p className="text-white mb-4">Please authenticate to register as a mentee.</p>
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Login with Google
          </button>
          <button
            onClick={handleGitHubLogin}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
