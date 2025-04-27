import express from "express";
import {
  getAvailableMentees,
  assignMenteeToMentor,
  unassignMenteeFromMentor,
  getMenteesForMentor,
} from "../controllers/mentorshipController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all available mentees (unassigned to any mentor)
router.get("/available", authMiddleware, getAvailableMentees);

// Fetch all mentees assigned to a specific mentor
router.get("/:mentorId", authMiddleware,  getMenteesForMentor);

// Assign a mentee to a mentor
router.post("/assign", authMiddleware, assignMenteeToMentor);

// Unassign a mentee from a mentor
router.post("/unassign", authMiddleware, unassignMenteeFromMentor);

export default router;
