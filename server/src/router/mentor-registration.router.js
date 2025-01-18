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
            gender,
            whatsapp,
            ipAddress,
            college,
            year,
            github,
            linkedIn,
            answer1,
            answer2,
        } = req.body;
        console.log(github)
        if (!name || !college || !year || !answer1 || !answer2) {
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
                    gender,
                    isRegistered:true,
                    college,
                    year: mentorYear,
                    githubLink:github,
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
                    gender,
                    ipAddress,
                    college,
                    year: mentorYear,
                    githubLink:github,
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
