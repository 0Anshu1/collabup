import express from "express";
import db from "../server/db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all research projects
router.get("/", async (req, res) => {
  try {
    const projects = await db.collection("researchProjects").find().toArray();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching research projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new research project
router.post("/", async (req, res) => {
  try {
    const { title, description, field, duration, facultyId, requirements, fundingAvailable } = req.body;

    const project = {
      title,
      description,
      field,
      duration,
      facultyId: new ObjectId(facultyId),
      requirements,
      fundingAvailable,
      status: "open",
      students: [],
      publications: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("researchProjects").insertOne(project);
    res.status(201).json({ success: true, projectId: result.insertedId });
  } catch (error) {
    console.error("Error creating research project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await db.collection("researchProjects").findOne({
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
    const { title, description, field, duration, requirements, fundingAvailable, status } = req.body;

    const result = await db.collection("researchProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title,
          description,
          field,
          duration,
          requirements,
          fundingAvailable,
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

// Apply for research project
router.post("/:id/apply", async (req, res) => {
  try {
    const { studentId, resume, statement } = req.body;

    const result = await db.collection("researchProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $addToSet: {
          students: {
            studentId: new ObjectId(studentId),
            resume,
            statement,
            status: "pending",
            appliedAt: new Date()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error applying to project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add publication to project
router.post("/:id/publications", async (req, res) => {
  try {
    const { title, authors, journal, year, link } = req.body;

    const result = await db.collection("researchProjects").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $addToSet: {
          publications: {
            title,
            authors,
            journal,
            year,
            link,
            addedAt: new Date()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error adding publication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;