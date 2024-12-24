import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const AddProject = () => {
  const [projectSections, setProjectSections] = useState([1]);
  const [focusedField, setFocusedField] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data Submitted");
  };

  const addProjectSection = () => {
    if (projectSections.length < 3) {
      setProjectSections((prev) => [...prev, prev.length + 1]);
    }
  };


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
    { name: 'projectName', label: 'Project Name:', required: true },
    { name: 'projectLink', label: 'Project Link:', required: false },
    { name: 'github', label: 'GitHub Link:', required: true },
    { name: 'projectTypes', label: 'Project Type:', required: true },
    { name: 'details', label: 'Project Details:', required: false, type: 'textarea' },
    { name: 'completionDate', label: 'Completion Date:', required: false, type: 'date' }
  ];
  const init = useCallback(async (engine) => {
    await loadFull(engine);
}, []);
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

        <form onSubmit={onSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {projectSections.map((section, sectionIndex) => (
              <motion.div
                key={section}
                className="space-y-4 border-b border-gray-500 pb-6"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h3
                  className="text-lg font-semibold text-white"
                  variants={fieldVariants}
                >
                  Project {section}
                </motion.h3>

                {formFields.map((field, fieldIndex) => (
                  <motion.div
                    key={field.name}
                    variants={fieldVariants}
                    className="space-y-2"
                  >
                    <label className="text-white font-medium">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <motion.textarea
                        name={`projects[${sectionIndex}].${field.name}`}
                        className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter ${field.label.toLowerCase().replace(':', '')}`}
                        whileFocus={{
                          scale: 1.01,
                          transition: { duration: 0.2 }
                        }}
                        onFocus={() => setFocusedField(`${sectionIndex}-${field.name}`)}
                        onBlur={() => setFocusedField(null)}
                      />
                    ) : (
                      <motion.input
                        type={field.type || 'text'}
                        name={`projects[${sectionIndex}].${field.name}`}
                        className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter ${field.label.toLowerCase().replace(':', '')}`}
                        required={field.required}
                        whileFocus={{
                          scale: 1.01,
                          transition: { duration: 0.2 }
                        }}
                        onFocus={() => setFocusedField(`${sectionIndex}-${field.name}`)}
                        onBlur={() => setFocusedField(null)}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>

          {projectSections.length < 3 && (
            <motion.button
              type="button"
              onClick={addProjectSection}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Add More
            </motion.button>
          )}

          <motion.button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {projectSections.length === 1 ? "Submit Project" : "Submit All Projects"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProject;
