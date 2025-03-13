import express from "express";
import db from "../server/db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all buddy profiles
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await db.collection("buddyProfiles").find().toArray();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching buddy profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create or update buddy profile
router.post("/profile", async (req, res) => {
  try {
    const { userId, interests, skills, availability, projectPreferences } = req.body;

    const profile = {
      userId: new ObjectId(userId),
      interests,
      skills,
      availability,
      projectPreferences,
      updatedAt: new Date()
    };

    const result = await db.collection("buddyProfiles").updateOne(
      { userId: new ObjectId(userId) },
      { $set: profile },
      { upsert: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    console.error("Error updating buddy profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get matching buddies
router.get("/matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await db.collection("buddyProfiles").findOne({
      userId: new ObjectId(userId)
    });

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Find profiles with matching interests and skills
    const matches = await db.collection("buddyProfiles")
      .find({
        userId: { $ne: new ObjectId(userId) },
        $or: [
          { interests: { $in: userProfile.interests } },
          { skills: { $in: userProfile.skills } }
        ]
      })
      .toArray();

    res.json(matches);
  } catch (error) {
    console.error("Error finding matches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;