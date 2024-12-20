import { useForm } from "react-hook-form";

export default function MentorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("Submitting the form", data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" shadow-xl rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Name:</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-700 font-medium">Gender:</label>
            <select
              {...register("gender")}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              defaultValue="Prefer not to say"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-700 font-medium">Phone:</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="text-gray-700 font-medium">WhatsApp:</label>
            <input
              {...register("whatsapp", { required: "WhatsApp is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your WhatsApp number"
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          {/* College */}
          <div>
            <label className="text-gray-700 font-medium">College:</label>
            <input
              {...register("college", { required: "College is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your college"
            />
            {errors.college && (
              <p className="text-red-500 text-sm mt-1">
                {errors.college.message}
              </p>
            )}
          </div>

         {/* Year */}
<div>
  <label className="text-gray-700 font-medium">Year:</label>
  <select
    {...register("year", { required: "Year is required" })}
    className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
    defaultValue=""
  >
    <option value="" disabled>
      Select your year
    </option>
    <option value="1">1st Year</option>
    <option value="2">2nd Year</option>
    <option value="3">3rd Year</option>
    <option value="4">4th Year</option>
  </select>
  {errors.year && (
    <p className="text-red-500 text-sm mt-1">
      {errors.year.message}
    </p>
  )}
</div>


          {/* GitHub */}
          <div>
            <label className="text-gray-700 font-medium">GitHub:</label>
            <input
              {...register("github", { required: "GitHub is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your GitHub username"
            />
            {errors.github && (
              <p className="text-red-500 text-sm mt-1">
                {errors.github.message}
              </p>
            )}
          </div>
             {/* Answer1 */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Why do you want to mentor?</label>
            <textarea
              {...register("answer1", { required: "Answer is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Your answer"
            />
            {errors.answer1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer1.message}
              </p>
            )}
          </div>
           {/* Answer2 */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">What is your most valuable skill</label>
            <textarea
              {...register("answer2", { required: "Answer is required" })}
              className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Your answer"
            />
            {errors.answer2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer2.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
