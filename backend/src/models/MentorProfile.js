// models/MentorProfile.js
import mongoose from "mongoose";

const MentorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // put whatever fields you need below, all defaulting to null
  fullName:       { type: String, default: null },
  headline:       { type: String, default: null },
  bio:            { type: String, default: null },
  expertise:      { type: [String], default: null },
  yearsOfExp:     { type: Number, default: null },
  avatarUrl:      { type: String, default: null },
  location:       { type: String, default: null },
  // ...any other profile bits...
}, {
  timestamps: true
});

export default mongoose.model("MentorProfile", MentorProfileSchema);
