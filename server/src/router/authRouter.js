const express = require("express");
const passport = require("../config/mentor-passport");
const { Prisma, PrismaClient } = require("@prisma/client");
require("dotenv").config();
const router = express.Router();
const prisma = new PrismaClient()
// Logger middleware for debugging
const logger = (req, res, next) => {
  console.log(`Auth Route: ${req.method} ${req.url}`);
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
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const mentorId = req.user?.id;
    if (mentorId) {
      res.redirect(`${process.env.CLIENT_URL}/dashboard?mentorId=${mentorId}`);
    } else {
      res.redirect("/login");
    }
  }
);

// GitHub Authentication
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback route with logger for debugging
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
     // Log authentication status
     console.log("Auth status:", req.isAuthenticated());
     console.log("Session:", req.session);
    const mentorId = req.user?.id;
    if (mentorId) {
      const redirectUrl = new URL("/dashboard", process.env.CLIENT_URL);
      redirectUrl.searchParams.append("mentorId", mentorId);
      res.cookie("user", req.user);
      res.redirect(redirectUrl.toString());
    } else {
      res.redirect("/login");
    }
  }
);

// Get Current User
router.get("/user", (req, res) => {
  console.log("Session:", req.session);
  console.log("User object:", req.user);
  console.log("Cookies:", req.cookies);

  if (req.isAuthenticated() && req.user) {
    // Send the user data from req.user instead of cookies
    res.json({
      success: true,
      user: req.user
    });
  } else {
    // Try to get mentorId from Authorization header as fallback
    const authHeader = req.headers.authorization;
    const mentorId = authHeader?.split(' ')?.[1];

    if (mentorId) {
      // Find user by mentorId using Prisma
      prisma.mentor.findUnique({
        where: { id: mentorId },
        include: { oauthAccounts: true }
      })
        .then(user => {
          if (user) {
            console.log(user);
            res.json({
              success: true,
              user: user
            });
          } else {
            res.status(401).json({
              success: false,
              message: "User not found"
            });
          }
        })
        .catch(err => {
          console.error("Database error:", err);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        });
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
  }
});
// Logout Route
router.get("/logout", (req, res, next) => {
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
