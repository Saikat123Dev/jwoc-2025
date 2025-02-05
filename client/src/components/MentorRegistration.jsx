import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loadFull } from "tsparticles";
export default function MentorRegistration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  async function onSubmit(data) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Retrieve mentorId from localStorage
      const id = localStorage.getItem('mentorId');
      if (!id) {
        throw new Error('Mentor ID not found in localStorage');
      }

      const payload = {
        ...data,
        id,
        gender: data.gender,
        github: data.github,
        linkedin: data.linkedin,
      };

      const response = await fetch('https://jwoc-2025.onrender.com/api/mentor/registerMentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      reset();
      localStorage.setItem('isProfileComplete', true);
      console.log('Registration successful:', result);
      navigate('/dashboard')
    } catch (error) {
      setSubmitError(error.message || 'An error occurred during registration');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

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
    <div className="w-screen min-h-screen pt-20 flex mt-10 flex-col items-center relative overflow-hidden">
      <motion.div
        className="w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white backdrop-blur-lg"
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

        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500 bg-opacity-20 text-red-100 p-4 rounded-lg mb-6"
            >
              {submitError}
            </motion.div>
          )}

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-500 bg-opacity-20 text-green-100 p-4 rounded-lg mb-6"
            >
              Registration successful! Thank you for applying to be a mentor.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Name: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters long" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name should only contain letters and spaces"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Gender */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Gender: <span className="text-red-500">*</span></label>
            <motion.select
              {...register("gender", { required: "Please select your gender" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
            >
              <option value="" disabled className="text-gray-800">Select gender</option>
              <option value="Male" className="text-gray-800">Male</option>
              <option value="Female" className="text-gray-800">Female</option>
              <option value="Prefer not to say" className="text-gray-800">Prefer not to say</option>
            </motion.select>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Email: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Please enter a valid email address"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Phone: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              type="tel"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* WhatsApp */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">WhatsApp: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("whatsapp", {
                required: "WhatsApp number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit WhatsApp number"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your WhatsApp number"
              type="tel"
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
            )}
          </motion.div>

          {/* College */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">College: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("college", {
                required: "College name is required",
                minLength: { value: 3, message: "College name must be at least 3 characters long" }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your college"
            />
            {errors.college && (
              <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>
            )}
          </motion.div>

          {/* Year */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Year: <span className="text-red-500">*</span></label>
            <motion.select
              {...register("year", { required: "Please select your year" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
            >
              <option value="" disabled className="text-gray-800">Select your year</option>
              <option value="1" className="text-gray-800">1st Year</option>
              <option value="2" className="text-gray-800">2nd Year</option>
              <option value="3" className="text-gray-800">3rd Year</option>
              <option value="4" className="text-gray-800">4th Year</option>
            </motion.select>
            {errors.year && (
              <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
            )}
          </motion.div>

          {/* GitHub */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">GitHub: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("github", {
                required: "GitHub profile is required",
                pattern: {
                  value: /^https?:\/\/github\.com\/[A-Za-z0-9_-]+\/?$/,
                  message: "Please enter a valid GitHub profile URL (e.g., https://github.com/username)"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your GitHub profile URL"
            />
            {errors.github && (
              <p className="text-red-400 text-sm mt-1">{errors.github.message}</p>
            )}
          </motion.div>

          {/* LinkedIn */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">LinkedIn: <span className="text-red-500">*</span></label>
            <motion.input
              {...register("linkedin", {
                required: "LinkedIn profile is required",
                pattern: {
                  value: /^https?:\/\/(www|in)\.linkedin\.com\/.+$/,
                  message: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
                }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your LinkedIn profile URL"
            />
            {errors.linkedin && (
              <p className="text-red-400 text-sm mt-1">{errors.linkedin.message}</p>
            )}
          </motion.div>

          {/* Answer1 */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Why do you want to mentor? <span className="text-red-500">*</span></label>
            <motion.textarea
              {...register("answer1", {
                required: "Please provide your answer",
                minLength: { value: 50, message: "Please provide a detailed answer (minimum 50 characters)" }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your answer"
              rows="4"
            />
            {errors.answer1 && (
              <p className="text-red-400 text-sm mt-1">{errors.answer1.message}</p>
            )}
          </motion.div>

          {/* Answer2 */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">What is your most valuable skill? <span className="text-red-500">*</span></label>
            <motion.textarea
              {...register("answer2", {
                required: "Please provide your answer",
                minLength: { value: 50, message: "Please provide a detailed answer (minimum 50 characters)" }
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your answer"
              rows="4"
            />
            {errors.answer2 && (
              <p className="text-red-400 text-sm mt-1">{errors.answer2.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full bg-indigo-500 text-white py-3 rounded-lg font-medium transition ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-600'
            }`}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
