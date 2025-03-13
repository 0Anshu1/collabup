import express from "express";
import db from "../server/db/conn.js";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const router = express.Router();

import rateLimit from 'express-rate-limit';

// Configure rate limiter
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many email requests, please try again later' }
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "collabup4@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Get all mentors
router.get("/mentors", async (req, res) => {
  try {
    const mentors = await db.collection("users").find({ role: "mentor" }).toArray();
    res.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Connect with mentor
router.post("/connect", emailLimiter, async (req, res) => {
  try {
    const { studentId, mentorId, timings, platform, message } = req.body;

    // Get student details
    const student = await db.collection("users").findOne(
      { _id: new ObjectId(studentId) }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get mentor details
    const mentor = await db.collection("users").findOne(
      { _id: new ObjectId(mentorId) }
    );

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Create connection record
    const connection = {
      studentId: new ObjectId(studentId),
      mentorId: new ObjectId(mentorId),
      timings,
      platform,
      message,
      status: "pending",
      createdAt: new Date()
    };

    await db.collection("mentorConnections").insertOne(connection);

    // Send email notification to mentor
    const mailOptions = {
      from: "collabup4@gmail.com",
      to: mentor.email,
      subject: `New Mentorship Connection Request from ${student.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Mentorship Connection Request</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="font-size: 16px;"><strong>Student Name:</strong> ${student.name}</p>
            <p style="font-size: 16px;"><strong>Student Email:</strong> ${student.email}</p>
          </div>
          <h3 style="color: #2c3e50; margin-top: 20px;">Connection Details</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Preferred Timings:</strong> ${timings.join(", ")}</p>
            <p><strong>Preferred Platform:</strong> ${platform}</p>
            <p><strong>Message from Student:</strong></p>
            <p style="background-color: #fff; padding: 10px; border-left: 3px solid #3498db;">${message}</p>
          </div>
          <p style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            You can review and manage connection requests through your <a href="https://collabup.vercel.app/mentorship" style="color: #3498db; text-decoration: none;">CollabUp dashboard</a>.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Store the connection even if email fails
      res.status(207).json({
        success: true,
        warning: 'Connection created but email notification failed'
      });
    }
  } catch (error) {
    console.error("Error connecting with mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update connection status
router.put("/connect/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const result = await db.collection("mentorConnections").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Connection not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating connection status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;