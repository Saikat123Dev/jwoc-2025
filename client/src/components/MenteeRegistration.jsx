// import axios from 'axios';
// import { motion } from "framer-motion";
// import React, { useCallback, useState } from 'react';
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import { loadFull } from "tsparticles";

// export default function MenteeRegistration() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [focusedField, setFocusedField] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     console.log(data)
//     setIsSubmitting(true);
//     setResponseMessage("");
//     setShowSuccessModal(false);

//     try {
//       const response = await axios.post("https://jwoc-2025.onrender.com/api/mentee/register", data);
//       if (response.data && response.status === 201) {
//         setResponseMessage("Registration successful!");
//         setShowSuccessModal(true);


//         setTimeout(() => {
//           setShowSuccessModal(false);
//           window.location.href = 'https://www.jwoc.in';
//         }, 3000);
//       } else {
//         throw new Error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setResponseMessage(error.response?.data?.message || "An error occurred. Please try again.");
//       setShowSuccessModal(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const init = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const fieldVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <div className="w-screen min-h-screen pt-20 flex mt-10 flex-col items-center relative overflow-hidden">
//       <motion.div
//         className="w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white backdrop-blur-lg mb-20"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h2
//           className="text-3xl font-bold text-white mb-8 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Complete Your Profile
//         </motion.h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Name */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Name: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("name", {
//                 required: "Name is required",
//                 minLength: { value: 2, message: "Name must be at least 2 characters" }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your name"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.name && (
//               <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </motion.div>

//           {/* Gender */}
//            <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Gender: <span className="text-red-500">*</span></label>
//             <motion.select
//               {...register("gender", { required: "Please select your gender" })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               defaultValue=""
//             >
//               <option value="" disabled className="text-gray-800">Select gender</option>
//               <option value="Male" className="text-gray-800">Male</option>
//               <option value="Female" className="text-gray-800">Female</option>
//               <option value="Prefer not to say" className="text-gray-800">Prefer not to say</option>
//             </motion.select>
//             {errors.gender && (
//               <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>
//             )}
//           </motion.div>

//           {/* Email */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Email: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                   message: "Please enter a valid email address",
//                 }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your email"
//               type="email"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.email && (
//               <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </motion.div>

//           {/* Phone */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Phone: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("phone", {
//                 required: "Phone number is required",
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Please enter a valid 10-digit phone number"
//                 }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your phone number"
//               type="tel"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.phone && (
//               <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
//             )}
//           </motion.div>

//           {/* WhatsApp */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">WhatsApp: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("whatsapp", {
//                 required: "WhatsApp number is required",
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: "Please enter a valid 10-digit WhatsApp number"
//                 }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your WhatsApp number"
//               type="tel"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.whatsapp && (
//               <p className="text-red-400 text-sm mt-1">{errors.whatsapp.message}</p>
//             )}
//           </motion.div>

//           {/* College */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">College: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("college", {
//                 required: "College name is required",
//                 minLength: { value: 3, message: "College name must be at least 3 characters" }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your college"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.college && (
//               <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>
//             )}
//           </motion.div>

//           {/* Year */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Year: <span className="text-red-500">*</span></label>
//             <motion.select
//               {...register("year", { required: "Please select your year" })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               defaultValue=""
//             >
//               <option value="" disabled className="text-black">Select your year</option>
//               <option value="1" className="text-black">1st Year</option>
//               <option value="2" className="text-black">2nd Year</option>
//               <option value="3" className="text-black">3rd Year</option>
//               <option value="4" className="text-black">4th Year</option>
//             </motion.select>
//             {errors.year && (
//               <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
//             )}
//           </motion.div>

//           {/* GitHub */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">GitHub: <span className="text-red-500">*</span></label>
//             <motion.input
//               {...register("github", {
//                 required: "GitHub profile URL is required",
//                 pattern: {
//                   value: /^https?:\/\/github\.com\/[A-Za-z0-9_-]+\/?$/,
//                   message: "Please enter a valid GitHub profile URL"
//                 }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your GitHub profile URL (e.g., https://github.com/username)"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.github && (
//               <p className="text-red-400 text-sm mt-1">{errors.github.message}</p>
//             )}
//           </motion.div>

//           {/* LinkedIn (Optional) */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">LinkedIn:</label>
//             <motion.input
//               {...register("linkedIn", {
//                 pattern: {
//                   value: /^https?:\/\/(www|in)\.linkedin\.com\/.+$/,

//                   message: "Please enter a valid LinkedIn profile URL"
//                 }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your LinkedIn URL (optional)"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.linkedIn && (
//               <p className="text-red-400 text-sm mt-1">{errors.linkedIn.message}</p>
//             )}
//           </motion.div>

//           {/* Answer1 */}
//           <motion.div variants={fieldVariants}>
//             <label className="text-white font-medium">Why do you want to be a mentee? <span className="text-red-500">*</span></label>
//             <motion.textarea
//               {...register("answer1", {
//                 required: "Please provide your answer",
//                 minLength: { value: 50, message: "Please provide a detailed answer (minimum 50 characters)" }
//               })}
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Your answer"
//               rows="4"
//               whileFocus={{ scale: 1.01 }}
//             />
//             {errors.answer1 && (
//               <p className="text-red-400 text-sm mt-1">{errors.answer1.message}</p>
//             )}
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
//             whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Submitting...
//               </div>
//             ) : (
//               "Submit"
//             )}
//           </motion.button>
//         </form>

//         {/* Error Message */}
//         {responseMessage && !showSuccessModal && (
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mt-4 text-red-400"
//           >
//             {responseMessage}
//           </motion.p>
//         )}
//       </motion.div>

//       {/* Success Modal */}
//      {/* Success Modal */}
//      {showSuccessModal && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
//             >
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </motion.div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//               Registration Successful!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Thank you for registering. You will be redirected shortly...
//             </p>
//             <motion.div
//               className="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
//               initial={{ width: "0%" }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 3 }}
//             >
//               <div className="h-full bg-green-500 rounded-full" />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Scroll to Top Button */}
//       <motion.button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-8 right-8 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M5 10l7-7m0 0l7 7m-7-7v18"
//           />
//         </svg>
//       </motion.button>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import React from 'react';

export default function MentorRegistration() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
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
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Mentee Registration Closed
          </h2>
          <p className="text-gray-300 text-lg">
            Thank you for your interest in becoming a mentee. Registration for the current period is now closed. Please check back later for future opportunities.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
