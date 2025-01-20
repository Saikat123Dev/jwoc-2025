const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Please authenticate using Google or GitHub first." });
    }

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

    // Check if the user is already registered as a mentor
    const alreadyMentor = await prisma.mentor.findUnique({
      where: { email: email },
    });

    if (alreadyMentor) {
      return res.status(400).json({ message: "User already registered as Mentor." });
    }

    // Register the mentee
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
        oauthAccounts: {
          create: {
            provider: req.user.provider,
            providerId: req.user.providerId,
          },
        },
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
