const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const passport = require("./src/config/mentor-passport");
const authRoutes = require("./src/router/authRouter");
const menteeReg = require("./src/router/mentee-registration.router");
const menteeBanned = require("./src/router/mentee-banned");
const project   = require("./src/router/projectRouter");
const mentorReg = require("./src/router/mentor-registration.router");

const app = express();

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use( cors({
  origin:"https://jwoc-2025.vercel.app", // Replace with your frontend URL
  credentials: true,
}));

// Root route
app.get("/", (req, res) => res.send("Server is running"));

// Mount routers
app.use("/auth", authRoutes);
app.use("/api/mentee/",menteeReg)
app.use("/api/mentee",menteeBanned)
app.use("/api/mentor/project",project)
app.use("/api/mentor/",mentorReg)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
