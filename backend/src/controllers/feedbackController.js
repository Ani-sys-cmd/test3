import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import mongoose from "mongoose";


// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Feedback text is required." });
    }

    // Ensure the user is a mentee
    if (!req.user || req.user.role !== "mentee") {
      return res.status(403).json({ message: "Access denied. Only mentees can submit feedback." });
    }

    const menteeId = req.user.id;

    // Fetch the mentor ID dynamically if it's not in the token
    let mentorId = req.user.mentorId;
    if (!mentorId) {
      const mentee = await User.findById(menteeId);
      if (!mentee || !mentee.mentorId) {
        return res.status(400).json({ message: "Mentee does not have an assigned mentor." });
      }
      mentorId = mentee.mentorId;
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor information." });
    }

    const newFeedback = new Feedback({
      mentee: menteeId,
      mentor: mentorId,
      text,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all feedback for the logged-in mentor
export const getFeedbacksForMentor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Only mentors can view feedback." });
    }

    const mentorId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor ID." });
    }

    const feedbacks = await Feedback.find({ mentor: mentorId }).populate("mentee", "username email");

    res.status(200).json({
      message: "Feedback fetched successfully.",
      feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
