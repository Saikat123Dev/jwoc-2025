const express = require("express");
const passport = require("../config/mentee-passport");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware/route
  }
  // User is not authenticated, redirect to login
  res.status(401).json({ message: "Please authenticate using Google or GitHub first." });
};

// Logger middleware
const logger = (req, res, next) => {
  console.log(`Mentee Auth Route: ${req.method} ${req.url}`);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
};

// Google Authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: null }), // Remove failureRedirect
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    res.redirect(`${process.env.CLIENT_URL}/mentee-registration`);
  }
);

// GitHub Authentication
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: null }), // Remove failureRedirect
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    res.redirect(`${process.env.CLIENT_URL}/mentee-registration`);
  }
);

// Get Current User
router.get("/mentee/user", ensureAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Logout Route
router.get("/logout", ensureAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return next(err);
    }
    res.json({
      success: true,
      message: "Logout successful",
    });
  });
});

module.exports = router;
