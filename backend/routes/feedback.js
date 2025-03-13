import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configure nodemailer transporter with secure settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "collabup4@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true,
  tls: {
    rejectUnauthorized: false
  }
});

// Send feedback route
router.post("/send-feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Email options
    const mailOptions = {
      from: email,
      to: "collabup4@gmail.com",
      subject: "Feedback On CollabUp",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>Feedback from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Feedback sent successfully" });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ error: "Failed to send feedback" });
  }
});

export default router;