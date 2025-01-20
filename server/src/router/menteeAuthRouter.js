const express = require("express");
const passport = require("../config/mentee-passport");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

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
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/mentee-registration`);
  }
);


// GitHub Authentication
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/mentee-registration`);
  }
);
// Get Current User
router.get("/user", (req, res) => {
  console.log("Session:", req.session);
  console.log("User object:", req.user);
  console.log("Cookies:", req.cookies);

  if (req.isAuthenticated() && req.user) {
    res.json({
      success: true,
      user: req.user
    });
  } else {
    // Try to get menteeId from Authorization header as fallback
    const authHeader = req.headers.authorization;
    const menteeId = authHeader?.split(' ')?.[1];

    if (menteeId) {
      prisma.mentee.findUnique({
        where: { id: menteeId },
        include: { oauthAccounts: true }
      })
        .then(user => {
          if (user) {
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
