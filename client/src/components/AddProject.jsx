import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AddProject = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    projects: [
      {
        projectName: '',
        projectLink: '',
        github: '',
        projectTypes: '',
        details: '',
        projecttags: ''
      }
    ]
  };

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });

  const showSuccessToast = () => {
    toast.success('🚀 Project added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      style: {
        maxWidth: '350px',
        maxHeight:'60px',
        background: 'rgba(40, 40, 40, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: '#ffffff',
        fontSize: '14px',
        padding: '12px 16px',
      },
    });
  };

  const showErrorToast = (message) => {
    toast.error(`❌ ${message}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      style: {
        maxWidth: '350px',
        maxHeight:'60px',
        background: 'rgba(40, 40, 40, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: '#ffffff',
        fontSize: '14px',
        padding: '12px 16px',
      },
    });
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const mentorId = localStorage.getItem('mentorId');
      if (!mentorId) {
        throw new Error('Mentor ID not found. Please login again.');
      }

      const transformedProjects = data.projects.map(project => ({
        projectName: project.projectName,
        projectLink: project.projectLink,
        projectDescription: project.details,
        projectTypes: project.projectTypes,
        projectTags: project.projecttags
          ? project.projecttags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
          : [],
        GitHubLink: project.github,
        projectOwnerId: mentorId
      }));

      const response = await fetch('https://jwoc-2025.onrender.com/api/mentor/project/addProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects: transformedProjects }),
      });

      if (response.ok) {
        showSuccessToast();
        reset(defaultValues);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Project Submission failed');
      }
    } catch (error) {
      console.error('An error occurred during adding of project:', error);
      showErrorToast(error.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProjectSection = () => {
    if (fields.length < 3) {
      append({
        projectName: '',
        projectLink: '',
        github: '',
        projectTypes: '',
        details: '',
        projecttags: ''
      });
    }
  };

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

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
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

  const formFields = [
    {
      name: 'projectName',
      label: 'Project Name:',
      placeholder: 'Enter the name of your project (e.g., Weather Tracker)',
      required: true,
      errorMessage: 'Project name is required.'
    },
    {
      name: 'projectLink',
      label: 'Project Link:',
      placeholder: 'Enter the live project link (e.g., https://example.com)',
      required: false,
      errorMessage: 'Please provide a valid project link.'
    },
    {
      name: 'github',
      label: 'GitHub Link:',
      placeholder: 'Enter the GitHub repository link (e.g., https://github.com/username/repository)',
      required: true,
      errorMessage: 'GitHub link is required.'
    },
    {
      name: 'projectTypes',
      label: 'Project Type:',
      placeholder: 'Select the type of project (e.g., Frontend, Backend, AI/ML, Full Stack)',
      required: true,
      errorMessage: 'Please select a project type.'
    },
    {
      name: 'details',
      label: 'Project Details:',
      placeholder: 'Provide a brief description of the project (minimum 100 words required)',
      required: true,
      type: 'textarea',
      validate: (value) => {
        const charCount = value.trim().length;
        return charCount >= 100 || 'Project details must have at least 100 characters.';
      },
      errorMessage: 'Project details are required and must have at least 100 characters.'

    },
    {
      name: 'projecttags',
      label: 'Tags:',
      placeholder: 'Add relevant technologies (e.g., ReactJS, HTML, CSS, Node.js)',
      required: true,
      errorMessage: 'Please add relevant tags for your project.'
    }
  ];

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <div className="min-h-screen pt-20 flex mt-10 flex-col items-center relative overflow-hidden">
        <Particles
          options={{
            particles: {
              color: {
                value: "#ffffff"
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
          className="w-full max-w-3xl p-8 rounded-2xl shadow-lg bg-opacity-10 bg-white backdrop-blur-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Add New Project
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  className="space-y-4 border-b border-gray-500 pb-6"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex justify-between items-center">
                    <motion.h3
                      className="text-lg font-semibold text-white"
                      variants={fieldVariants}
                    >
                      Project {index + 1}
                    </motion.h3>
                    {fields.length > 1 && (
                      <motion.button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-400 hover:text-red-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    )}
                  </div>

                  {formFields.map((formField) => (
                    <motion.div
                      key={formField.name}
                      variants={fieldVariants}
                      className="space-y-2"
                    >
                      <label className="text-white font-medium">{formField.label}</label>
                      {formField.type === 'textarea' ? (
                        <motion.textarea
                          {...register(`projects.${index}.${formField.name}`, {
                            required: formField.required,
                            validate: formField.validate,
                          })}
                          className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder={formField.placeholder}
                          rows={4}
                          whileFocus={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                          onFocus={() => setFocusedField(`${index}-${formField.name}`)}
                          onBlur={() => setFocusedField(null)}
                        />
                      ) : (
                        <motion.input
                          type={formField.type || 'text'}
                          {...register(`projects.${index}.${formField.name}`, {
                            required: formField.required,
                            validate: formField.validate,
                          })}
                          className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder={formField.placeholder}
                          whileFocus={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                          onFocus={() => setFocusedField(`${index}-${formField.name}`)}
                          onBlur={() => setFocusedField(null)}
                        />
                      )}
                      {errors?.projects?.[index]?.[formField.name] && (
                        <span className="text-red-400 text-sm">
                          {errors?.projects?.[index]?.[formField.name]?.message || formField.errorMessage}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between">
              <motion.button
                type="button"
                onClick={addProjectSection}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Project
              </motion.button>
              <motion.button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <ToastContainer transition={Bounce} />
    </>
  );
};

export default AddProject;
