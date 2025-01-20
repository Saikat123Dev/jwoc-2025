const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();



router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            whatsapp,
            college,
            year,
            github,
            linkedIn,
            isFirstTime,
            answer1,
        } = req.body;

        console.log("Connecting to database...");
        const alreadyAsMentor = await prisma.mentor.findUnique({
          where: { email },
      });

      if(alreadyAsMentor){
          return res.status(400).json({ message: "User already register as Mentor" });
      }

        const savedMentee = await prisma.mentee.create({
            data: {
                type: "Mentee",
                name,
                email,
                phone,
                whatsapp,

                college,
                year,
                github,
                linkedIn,
                isFirstTime,
                answer1,
            },
        });

        console.log("Mentee registered successfully:", savedMentee);


        res.status(201).json({ message: "User registered successfully.", mentee: savedMentee });
    } catch (error) {
        console.error("Error registering mentee:", error);

        res.status(500).json({
            message: "An error occurred while registering the user.",
            error: error.message,
        });
    }
});

module.exports = router;
