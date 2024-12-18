const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();


router.post("/addProject", async (req, res) => {
    try {
        const {
            projectName,
            projectLink,
            projectDescription,
            projectTypes,
            projectTags,
            videoLink,
            mentorId,
        } = req.body;



        const mentor = await prisma.mentor.findUnique({
            where: { id: mentorId },

        });

// Check if mentor exists
        if (!mentor) {
            return res.status(400).json({ message: "Mentor couldn't be found" });
        }

// Increment projectNumber and update mentor
        await prisma.mentor.update({
            where: { id: mentorId },
            data: {
                projectNumber: mentor.projectNumber + 1, // Increment the project number
            },
        });




        // Create a new project
        const project = await prisma.project.create({
            data: {
                projectName,
                projectLink,
                projectDescription,
                projectTypes,
                projectTags,
                videoLink,
                projectOwnerId: mentorId,
            },
        });
        if (mentor.projectNumber>3) {
            return res.status(400).json({
                message: "Mentor has already registered 3 projects",
            });
        }
        res.status(201).json({
            message: "Project uploaded successfully.",
            project,
        });
    } catch (error) {
        console.error("Error uploading project:", error);
        res.status(500).json({
            message: "An error occurred while uploading the project.",
        });
    }
});


router.get("/getAll", async (req, res) => {
    try {
        // if (!req.isAuthenticated()) {
        //     return res.status(401).json({ message: "Unauthorized request" });
        // }

        const { mentorId } = req.query;

        if (mentorId) {
       console.log(mentorId)
            const mentor = await prisma.mentor.findUnique({
                where: { id: mentorId },
               // include: { registeredProjects: true },
            });

            if (!mentor) {
                return res.status(404).json({ message: "Mentor not found" });
            }
           const projects = await prisma.project.findMany({
               where:{projectOwnerId:mentorId},
               include:{isDeleted:false},
           })
            if(!projects){
                return res.status(404).json({ message: "You does not submit any project yet" });
            }
            return res.status(200).json({
                message: "Projects found successfully.",
                projects,
            });

        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({
            message: "Something went wrong while retrieving projects.",
        });
    }
});

router.get("/getAllProjects", async (req, res) => {
  try {
    // Optional: Uncomment and use this block if authentication is required
    // if (!req.isAuthenticated()) {
    //     return res.status(401).json({ message: "Unauthorized request" });
    // }

    // Fetch all projects
    const projects = await prisma.project.findMany();

    // Handle case when no projects are found
    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found." });
    }

    // Respond with the fetched projects
    return res.status(200).json({
      message: "Projects retrieved successfully.",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);

    // Return generic error response
    return res.status(500).json({
      message: "An error occurred while retrieving projects.",
      error: error.message, // Optional: Expose error message for debugging
    });
  }
});


// PATCH: Update project details or toggle selection
router.patch("/updateProject", async (req, res) => {
    try {
        const {
            projectId,
            projectName,
            projectDescription,
            projectLink,
            projectTypes,
            projectTags,
            videoLink,
            msg,
        } = req.body;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        if (msg === "UPDATE FROM ADMIN") {
            // Toggle project selection status
            const project = await prisma.project.update({
                where: { id: projectId },
                data: { isSelected: { set: true } },
            });

            return res.status(200).json({
                message: "Project selection status updated successfully.",
                project,
            });
        } else {

            const updatedProject = await prisma.project.update({
                where: { id: projectId },
                data: {
                    projectName,
                    projectDescription,
                    projectLink,
                    projectTypes,
                    projectTags,
                    videoLink,
                },
            });

            return res.status(200).json({
                message: "Project details updated successfully.",
                updatedProject,
            });
        }
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({
            message: "Something went wrong while updating the project.",
        });
    }
});

router.post("/delProjects", async (req, res) => {
    try {
        const { projectId, mentorId } = req.body;

        // Validate input
        if (!projectId || !mentorId) {
            return res
                .status(400)
                .json({ message: "Project ID and Mentor ID are required." });
        }

        // Check if the project exists and is not already deleted
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { isDeleted: true },
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        if (project.isDeleted) {
            return res
                .status(400)
                .json({ message: "Project has already been deleted." });
        }

        // Update project and decrement mentor's project count atomically
        const [updatedProject, updatedMentor] = await prisma.$transaction([
            prisma.project.update({
                where: { id: projectId },
                data: { isDeleted: true },
            }),
            prisma.mentor.update({
                where: { id: mentorId },
                data: { projectNumber: { decrement: 1 } },
            }),
        ]);

        res.status(200).json({
            message: "Project deleted successfully.",
            project: updatedProject,
            mentor: updatedMentor,
        });
    } catch (error) {
        console.error("Error deleting project:", error);


        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "Project or Mentor not found.",
            });
        }

        res.status(500).json({
            message: "An error occurred while deleting the project.",
        });
    }
});


module.exports = router;
