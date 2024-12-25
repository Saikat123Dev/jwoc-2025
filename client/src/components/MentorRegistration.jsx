import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function MentorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [focusedField, setFocusedField] = useState(null);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  function onSubmit(data) {
    console.log("Submitting the form", data);
  }

  // Animation variants
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Name:</label>
            <motion.input
              {...register("name", { required: "Name is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
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
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <option value="Male" className="text-gray-800">Male</option>
              <option value="Female" className="text-gray-800">Female</option>
              <option value="Prefer not to say" className="text-gray-800">Prefer not to say</option>
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
                },
              })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
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
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
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
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
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
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
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
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <option value="" disabled className="text-gray-800">
                Select your year
              </option>
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
            <label className="text-white font-medium">GitHub:</label>
            <motion.input
              {...register("github", { required: "GitHub is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your GitHub username"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
              onFocus={() => setFocusedField("github")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.github && (
              <p className="text-red-400 text-sm mt-1">{errors.github.message}</p>
            )}
          </motion.div>

          {/* Answer1 */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">Why do you want to mentor?</label>
            <motion.textarea
              {...register("answer1", { required: "Answer is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your answer"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
              onFocus={() => setFocusedField("answer1")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.answer1 && (
              <p className="text-red-400 text-sm mt-1">{errors.answer1.message}</p>
            )}
          </motion.div>

          {/* Answer2 */}
          <motion.div variants={fieldVariants}>
            <label className="text-white font-medium">What is your most valuable skill?</label>
            <motion.textarea
              {...register("answer2", { required: "Answer is required" })}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your answer"
              whileFocus={{ scale: 1.01, transition: { duration: 0.2 } }}
              onFocus={() => setFocusedField("answer2")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.answer2 && (
              <p className="text-red-400 text-sm mt-1">{errors.answer2.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}