import axios from 'axios';
import { motion } from "framer-motion";
import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function MenteeRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setResponseMessage("");
    setShowSuccessModal(false);

    try {
      const response = await axios.post("http://localhost:5000/api/mentee/register", data);
      console.log(response)
      if (response.data && response.status === 201) {
        setResponseMessage("Registration successful!");
        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/");
        }, 3000);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setResponseMessage(error.response?.data?.message || "An error occurred. Please try again.");
      setShowSuccessModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen pt-20 flex mt-10 flex-col items-center relative overflow-hidden">
      <Particles
        options={{
          particles: {
            color: {
              value: "#fff"
            },
            number: {
              value: 100,
              density: {
                enable: true,
                area: 800,
              },
            },
            opacity: {
              value: { min: 0.3, max: 1 }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 1, max: 3 }
            },
            move: {
              direction: "bottom-right",
              enable: true,
              speed: { min: 1, max: 5 },
              straight: true
            }
          }
        }}
        init={init}
      />

      <motion.div
        className="w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white backdrop-blur-lg mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Complete Your Profile
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Name:</label>
            <motion.input
              {...register("name", { required: "Name is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Gender */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Gender:</label>
            <motion.select
              {...register("gender")}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Prefer not to say"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <option value="Male" className="text-black">Male</option>
              <option value="Female" className="text-black">Female</option>
              <option value="Prefer not to say" className="text-black">Prefer not to say</option>
            </motion.select>
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Email:</label>
            <motion.input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email address",
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Phone:</label>
            <motion.input
              {...register("phone", { required: "Phone is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              type="number"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* WhatsApp */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">WhatsApp:</label>
            <motion.input
              {...register("whatsapp", { required: "WhatsApp is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your WhatsApp number"
              type="number"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("whatsapp")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
            )}
          </motion.div>

          {/* College */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">College:</label>
            <motion.input
              {...register("college", { required: "College is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your college"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("college")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.college && (
              <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>
            )}
          </motion.div>

          {/* Year */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Year:</label>
            <motion.select
              {...register("year", { required: "Year is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <option value="" disabled className="text-black">Select your year</option>
              <option value="1" className="text-black">1st Year</option>
              <option value="2" className="text-black">2nd Year</option>
              <option value="3" className="text-black">3rd Year</option>
              <option value="4" className="text-black">4th Year</option>
            </motion.select>
            {errors.year && (
              <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
            )}
          </motion.div>

          {/* GitHub */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">GitHub:</label>
            <motion.input
              {...register("github")}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your GitHub profile URL"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onFocus={() => setFocusedField("github")}
              onBlur={() => setFocusedField(null)}
            />
          </motion.div>

          {/* LinkedIn */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">LinkedIn:</label>
            <motion.input
              {...register("linkedIn")}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your LinkedIn URL"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>

          {/* Answer1 */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Why do you want to be a mentee?</label>
            <motion.textarea
              {...register("answer1", { required: "This field is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your answer"
              rows="4"
              whileFocus={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            />
            {errors.answer1 && (
              <p className="text-red-400 text-sm mt-1">{errors.answer1.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </motion.button>
        </form>

        {/* Error Message */}
        {responseMessage && !showSuccessModal && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 text-red-400"
          >
            {responseMessage}
          </motion.p>
        )}
      </motion.div>

      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for registering. You will be redirected shortly...
            </p>
            <motion.div
              className="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            >
              <div className="h-full bg-green-500 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}
