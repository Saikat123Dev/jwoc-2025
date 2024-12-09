import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProject() {
  const [projectSections, setProjectSections] = useState([1]); // Tracks project sections
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Project Data Submitted: ", data);
  };

  const addProjectSection = () => {
    if (projectSections.length < 3) {
      setProjectSections((prev) => [...prev, prev.length + 1]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Projects
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {projectSections.map((section, index) => (
            <div key={index} className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium text-gray-700">
                Project {section}
              </h3>

              {/* Project Name */}
              <div>
                <label className="text-gray-700 font-medium">Project Name:</label>
                <input
                  {...register(`projects[${index}].projectName`, {
                    required: "Project name is required",
                  })}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter project name"
                />
                {errors.projects?.[index]?.projectName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projects[index].projectName.message}
                  </p>
                )}
              </div>

              {/* Project Link */}
              <div>
                <label className="text-gray-700 font-medium">Project Link:</label>
                <input
                  {...register(`projects[${index}].projectLink`)}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter Project link (optional)"
                />
              </div>

              {/* GitHub Link */}
              <div>
                <label className="text-gray-700 font-medium">GitHub Link:</label>
                <input
                  {...register(`projects[${index}].github`, {
                    required: "GitHub link is required",
                  })}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter GitHub link"
                />
                {errors.projects?.[index]?.github && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projects[index].github.message}
                  </p>
                )}
              </div>

              {/* Project Type */}
              <div>
                <label className="text-gray-700 font-medium">Project Type:</label>
                <input
                  {...register(`projects[${index}].projectTypes`, {
                    required: "Project type is required",
                  })}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter project type"
                />
                {errors.projects?.[index]?.projectTypes && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projects[index].projectTypes.message}
                  </p>
                )}
              </div>

              {/* Video Link */}
              <div>
                <label className="text-gray-700 font-medium">Video Link:</label>
                <input
                  {...register(`projects[${index}].videolink`)}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter video link (optional)"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="text-gray-700 font-medium">Project Description:</label>
                <textarea
                  {...register(`projects[${index}].projectDescription`, {
                    required: "Project description is required",
                  })}
                  className="mt-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Enter project description"
                ></textarea>
                {errors.projects?.[index]?.projectDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projects[index].projectDescription.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Add More Button */}
          {projectSections.length < 3 && (
            <button
              type="button"
              onClick={addProjectSection}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Add More
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition"
          >
            {projectSections.length === 1
              ? "Submit Project"
              : "Submit All Projects"}
          </button>
        </form>
      </div>
    </div>
  );
}
