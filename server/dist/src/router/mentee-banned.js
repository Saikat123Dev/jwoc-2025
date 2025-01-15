const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();


router.get("/getAll", async (req, res) => {
    try {

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const mentees = await prisma.mentee.findMany();
        res.status(200).json({
            message: "Successfully provided all mentees",
            mentees,
        });
    } catch (error) {
        console.error("Error fetching mentees:", error);
        res.status(500).json({
            message: "Something went wrong while retrieving mentee details",
        });
    }
});

router.patch("/banned", async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const { menteeId } = req.body;

        if (!menteeId) {
            return res.status(400).json({ message: "Mentee ID is required" });
        }
        const mentee = await prisma.mentee.findUnique({ where: { id: menteeId } });

        if (!mentee) {
            return res.status(404).json({ message: "Mentee not found" });
        }
        const updatedMentee = await prisma.mentee.update({
            where: { id: menteeId },
            data: { isBanned: !mentee.isBanned },
        });

        res.status(200).json({
            message: "Mentee details updated successfully",
            mentee: updatedMentee,
        });
    } catch (error) {
        console.error("Error updating mentee:", error);
        res.status(500).json({
            message: "Something went wrong during the update",
        });
    }
});

module.exports = router;
