// Import required modules
const nodemailer = require('nodemailer');

// Create nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your Gmail email address
    pass: 'your-app-password' // Your Gmail app password
  }
});

// Email sending function
const sendEmail = async (to, subject, text) => {
  try {
    // Configure email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to,
      subject: subject,
      text: text
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Example usage in Express route
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const result = await sendEmail(to, subject, text);

  if (result) {
    res.status(200).json({ message: 'Email sent successfully' });
  } else {
    res.status(500).json({ message: 'Failed to send email' });
  }
});
