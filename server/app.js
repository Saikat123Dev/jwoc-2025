const express = require("express");
const session = require("express-session");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const passport = require("./src/config/mentor-passport");
const authRoutes = require("./src/router/authRouter");
const menteeReg = require("./src/router/mentee-registration.router");
const menteeBanned = require("./src/router/mentee-banned");
const project = require("./src/router/projectRouter");

const mentorReg = require("./src/router/mentor-registration.router");

const app = express();

// Middleware
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
app.use(passport.authenticate("session"));

app.use(
  cors({
    origin: "https://jwoc-2025.vercel.app",
    credentials: true,
  })
);

// Enhanced Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Improved email sending function with HTML formatting
const sendEmail = async (from, subject, text) => {
  try {
    // Create HTML version of the email
    const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
          color: #333333;
          line-height: 1.6;
        }
        .email-container {
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #0073e6;
          color: #ffffff;
          padding: 20px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          text-align: center;
        }
        .email-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .email-content {
          padding: 20px 30px;
        }
        .email-content p {
          margin: 10px 0;
          font-size: 16px;
        }
        .email-content strong {
          color: #0073e6;
        }
        .email-footer {
          background-color: #f4f4f9;
          color: #666666;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          border-top: 1px solid #e5e5e5;
        }
        .email-footer a {
          color: #0073e6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h2>Message from JWoC 2025</h2>
        </div>
        <div class="email-content">
          <p><strong>From:</strong> ${from}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="margin-top: 20px;"><strong>Message:</strong></p>
          <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="email-footer">
          <p>This email was sent via <a href="https://jwoc-2025.vercel.app" target="_blank">JWoC 2025</a> Contact Form.</p>
        </div>
      </div>
    </body>
  </html>
`;


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jwoc.official.2025@gmail.com',
      subject: subject,
      text: `From: ${from}\n\nSubject: ${subject}\n\nMessage:\n${text}`, // Plain text fallback
      html: htmlContent, // HTML version
      replyTo: from // Allows replying directly to the sender
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Enhanced email route with validation
app.post("/send-email", async (req, res) => {
  try {
    const { from, subject, text } = req.body;

    // Enhanced input validation
    if (!from || !subject || !text) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        details: {
          from: !from ? "Email address is required" : null,
          subject: !subject ? "Subject is required" : null,
          text: !text ? "Message content is required" : null,
        }
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const result = await sendEmail(from, subject, text);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Email sent successfully"
      });
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message
    });
  }
});

// Root route
app.get("/", (req, res) => res.send("Server is running"));

// Mount routers
app.use("/auth", authRoutes);
app.use("/api/mentee/", menteeReg);
app.use("/api/mentee", menteeBanned);
app.use("/api/mentor/project", project);
app.use("/api/mentor/", mentorReg);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
