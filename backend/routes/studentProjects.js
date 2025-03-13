import express from "express";
import db from "../server/db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all student projects
router.get("/", async (req, res) => {
  try {
    const projects = await db.collection("studentProjects").find().toArray();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching student projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new student project
router.post("/", async (req, res) => {
  try {
    const { title, description, technologies, teamSize, duration, userId, requirements } = req.body;

    const project = {
      title,
      description,
      technologies,
      teamSize,
      duration,
      creatorId: new ObjectId(userId),
      requirements,
      status: "open",
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("studentProjects").insertOne(project);
    res.status(201).json({ success: true, projectId: result.insertedId });
  } catch (error) {
    console.error("Error creating student project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await db.collection("studentProjects").findOne({
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
    const { title, description, technologies, teamSize, duration, requirements, status } = req.body;

    const result = await db.collection("studentProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title,
          description,
          technologies,
          teamSize,
          duration,
          requirements,
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

// Join project as collaborator
router.post("/:id/join", async (req, res) => {
  try {
    const { userId, role } = req.body;

    const result = await db.collection("studentProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $addToSet: {
          collaborators: {
            userId: new ObjectId(userId),
            role,
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
    console.error("Error joining project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;