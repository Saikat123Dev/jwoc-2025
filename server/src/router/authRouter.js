const express = require("express");
const passport = require("../config/mentor-passport");
require("dotenv").config();

const router = express.Router();

/**
 * Google Authentication
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
      // Get the mentorId from the authenticated user
      const mentorId = req.user?.id;

      if (mentorId) {
          // Redirect to the client with mentorId as a query parameter
          res.redirect(`${process.env.CLIENT_URL}/dashboard?mentorId=${mentorId}`);
      } else {
          res.redirect("/login");
      }
  }
);


/**
 * GitHub Authentication
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Add this at the top of your file
const logger = (req, res, next) => {
  console.log(`Auth Route: ${req.method} ${req.url}`);
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
};

// Add to routes you want to debug
router.get("/github/callback",
  logger,
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const mentorId = req.user?.id;
    console.log('GitHub Callback - User:', req.user);
    console.log('GitHub Callback - MentorId:', mentorId);
    if (mentorId) {
      const redirectUrl = `${process.env.CLIENT_URL}/dashboard?mentorId=${mentorId}`;
      console.log('Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    } else {
      console.log('No mentorId found, redirecting to login');
      res.redirect("/login");
    }
  }
);

/**
 * Get Current User
 */
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
});

/**
 * Logout Route
 */
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
