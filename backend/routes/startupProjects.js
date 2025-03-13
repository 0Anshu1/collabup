import express from "express";
import db from "../server/db/conn.js";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "collabup4@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  }
});

const router = express.Router();

// Get all startup projects
router.get("/", async (req, res) => {
  try {
    const projects = await db.collection("startupProjects").find().toArray();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching startup projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new startup project
router.post("/", async (req, res) => {
  try {
    const { title, description, industry, userId, requirements, teamSize, requiredSkills } = req.body;

    const project = {
      title,
      description,
      industry,
      creatorId: new ObjectId(userId),
      requirements,
      teamSize,
      requiredSkills,
      status: "open",
      applications: [],
      team: [],
      mentors: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("startupProjects").insertOne(project);
    res.status(201).json({ success: true, projectId: result.insertedId });
  } catch (error) {
    console.error("Error creating startup project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await db.collection("startupProjects").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const { title, description, industry, requirements, teamSize, requiredSkills, status } = req.body;

    const result = await db.collection("startupProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title,
          description,
          industry,
          requirements,
          teamSize,
          requiredSkills,
          status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Apply for startup project
router.post("/:id/apply", async (req, res) => {
  try {
    const { userId, skills, experience, motivation } = req.body;

    // Get project details including creator info
    const project = await db.collection("startupProjects").findOne(
      { _id: new ObjectId(req.params.id) }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get startup's email from users collection
    const startup = await db.collection("users").findOne(
      { _id: project.creatorId }
    );

    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }

    // Get applicant details
    const applicant = await db.collection("users").findOne(
      { _id: new ObjectId(userId) }
    );

    const result = await db.collection("startupProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $addToSet: {
          applications: {
            userId: new ObjectId(userId),
            skills,
            experience,
            motivation,
            status: "pending",
            appliedAt: new Date()
          }
        }
      }
    );

    // Send email notification to startup
    const mailOptions = {
      from: "collabup4@gmail.com",
      to: startup.email,
      subject: `New Application for ${project.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Application Received</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="font-size: 16px;"><strong>Project:</strong> ${project.title}</p>
            <p style="font-size: 16px;"><strong>Applicant Name:</strong> ${applicant.name}</p>
            <p style="font-size: 16px;"><strong>Applicant Email:</strong> ${applicant.email}</p>
          </div>
          <h3 style="color: #2c3e50; margin-top: 20px;">Application Details</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Skills:</strong> ${skills.join(", ")}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Motivation:</strong> ${motivation}</p>
          </div>
          <p style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            You can review and manage applications through your <a href="https://collabup.vercel.app/startup-projects" style="color: #3498db; text-decoration: none;">CollabUp dashboard</a>.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error("Error applying to project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update application status
router.put("/:id/applications/:userId", async (req, res) => {
  try {
    const { status } = req.body;
    const projectId = req.params.id;
    const applicantId = req.params.userId;

    const result = await db.collection("startupProjects").updateOne(
      { 
        _id: new ObjectId(projectId),
        "applications.userId": new ObjectId(applicantId)
      },
      {
        $set: {
          "applications.$.status": status,
          "applications.$.updatedAt": new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project or application not found" });
    }

    // If application is accepted, add to team
    if (status === "accepted") {
      const application = await db.collection("startupProjects").findOne(
        { _id: new ObjectId(projectId) },
        { projection: { applications: { $elemMatch: { userId: new ObjectId(applicantId) } } } }
      );

      if (application && application.applications[0]) {
        await db.collection("startupProjects").updateOne(
          { _id: new ObjectId(projectId) },
          {
            $addToSet: {
              team: {
                userId: new ObjectId(applicantId),
                skills: application.applications[0].skills,
                experience: application.applications[0].experience,
                joinedAt: new Date()
              }
            }
          }
        );
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add mentor to project
router.post("/:id/mentors", async (req, res) => {
  try {
    const { mentorId, expertise, commitment } = req.body;

    const result = await db.collection("startupProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $addToSet: {
          mentors: {
            mentorId: new ObjectId(mentorId),
            expertise,
            commitment,
            joinedAt: new Date()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;