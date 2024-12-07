const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.post("/registerMentor", async (req, res) => {
    try {
        const {
            id,
            name,
            phone,
            whatsapp,
            ipAddress,
            college,
            year,
            githubLink,
            linkedIn,
            answer1,
            answer2,
        } = req.body;
        // if (!req.isAuthenticated()) {
        //     return res.status(401).json({ message: "Unauthorized request" });
        // }
        if (!id || !name || !college || !year || !answer1 || !answer2) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        await prisma.$connect();


        const existingMentor = await prisma.mentor.findUnique({
            where: { id },
        });

        const mentorYear = year === "Others" ? 5 : year;

        if (existingMentor) {
            // If mentor exists, update their information
            const updatedMentor = await prisma.mentor.update({
                where: { id },
                data: {
                    name,
                     phone,
                    whatsapp,
                    ipAddress,
                    college,
                    year: mentorYear,
                    githubLink,
                    linkedIn,
                    answer1,
                    answer2,
                },
            });

            return res.status(200).json({
                message: "Mentor information updated successfully.",
                mentor: updatedMentor,
            });
        } else {

            const newMentor = await prisma.mentor.create({
                data: {

                    name,
                    phone,
                    whatsapp,
                    ipAddress,
                    college,
                    year: mentorYear,
                    githubLink,
                    linkedIn,
                    answer1,
                    answer2,
                },
            });

            return res.status(201).json({
                message: "Mentor registered successfully.",
                mentor: newMentor,
            });
        }
    } catch (error) {
        console.error("Error registering/updating mentor:", error);

        return res.status(500).json({
            message: "An error occurred while registering/updating the mentor.",
        });
    } finally {
        await prisma.$disconnect();
    }
});

module.exports = router;
