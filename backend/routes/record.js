import express from "express";
const router = express.Router();

// This file will contain record-related routes
// For now, we'll add a basic test route
router.get("/", (req, res) => {
  res.json({ message: "Record route is working" });
});

export default router;