const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();


router.post("/addProject", async (req, res) => {
    try {
        const { projects } = req.body;
        const mentorId = req.body.projects[0].projectOwnerId;


        const mentor = await prisma.mentor.findUnique({
            where: { id: mentorId },
        });

        if (!mentor) {
            return res.status(400).json({ message: "Mentor couldn't be found" });
        }


        const existingProjects = await prisma.project.count({
            where: { projectOwnerId: mentorId }
        });

        if (existingProjects + projects.length > 3) {
            return res.status(400).json({
                message: "Mentor can't have more than 3 projects in total",
            });
        }

        // Validate tags array for each project
        for (const project of projects) {
            if (!Array.isArray(project.projectTags)) {
                return res.status(400).json({
                    message: "Project tags must be an array",
                });
            }
        }

        // Create new projects in a transaction
        const createdProjects = await prisma.$transaction(
            projects.map((project) =>
                prisma.project.create({
                    data: {
                        projectName: project.projectName,
                        projectLink: project.projectLink,
                        projectDescription: project.projectDescription,
                        projectTypes: project.projectTypes,
                        projectTags: project.projectTags, // Now this is already an array
                        GitHubLink: project. GitHubLink,
                        projectOwnerId: mentorId,
                    },
                })
            )
        );


        await prisma.mentor.update({
            where: { id: mentorId },
            data: {
                projectNumber: existingProjects + projects.length,
            },
        });

        res.status(201).json({
            message: "Projects uploaded successfully.",
            projects: createdProjects,
        });
    } catch (error) {
        console.error("Error uploading projects:", error);
        res.status(500).json({
            message: "An error occurred while uploading the projects.",
            error: error.message
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
    // Fetch projects where isDeleted is false
    const projects = await prisma.project.findMany({
      where: {
        isDeleted: false,
        OR: [
          { isSelected: true }, // Fetch selected projects
          // In case isSelected is not set
        ],
      },
      include: {
        projectOwner: true, // Fetch project owner details
      },
    });


    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found." });
    }

    // Fetch mentor details for each project based on projectMentors IDs
    const projectsWithMentors = await Promise.all(
      projects.map(async (project) => {
        const mentors = await prisma.mentor.findMany({
          where: { id: { in: project.projectMentors } }, // Fetch mentors using IDs
        });

        return {
          ...project,
          projectMentors: mentors, // Replace mentor IDs with actual mentor objects
        };
      })
    );

    // Respond with the filtered projects
    return res.status(200).json({
      message: "Projects retrieved successfully.",
      projects: projectsWithMentors,
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
