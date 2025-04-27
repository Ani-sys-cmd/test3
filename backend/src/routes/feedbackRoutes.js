import express from "express";
import { createFeedback, getFeedbacksForMentor } from "../controllers/feedbackController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create feedback (only for mentees)
router.post("/", authMiddleware, (req, res) => {
  if (req.user.role !== "mentee") {
    return res.status(403).json({ message: "Access denied. Only mentees can submit feedback." });
  }
  createFeedback(req, res);
});

// Route to get feedback for the logged-in mentor
router.get("/", authMiddleware, (req, res) => {
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Access denied. Only mentors can view feedback." });
  }
  req.params.mentorId = req.user.id; // Set mentorId from the authenticated user's ID
  getFeedbacksForMentor(req, res);
});

export default router;
