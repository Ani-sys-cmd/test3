import mongoose from "mongoose";

// Feedback Schema
const feedbackSchema = new mongoose.Schema(
  {
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: [true, "Mentee ID is required"],
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: [true, "Mentor ID is required"],
    },
    text: {
      type: String,
      required: [true, "Feedback text is required"],
      maxlength: [1000, "Feedback text cannot exceed 1000 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Index for optimized sorting by creation date
    },
  },
  { timestamps: true }
);

// Create Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
