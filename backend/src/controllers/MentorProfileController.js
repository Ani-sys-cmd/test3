// controllers/mentorProfileController.js
import MentorProfile from "../models/MentorProfile.js";

export const createEmptyProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // make sure we don’t accidentally double‐create
    let existing = await MentorProfile.findOne({ userId });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Profile already exists",
        profile: existing
      });
    }

    const profile = await MentorProfile.create({ userId });
    res.status(201).json({
      success: true,
      message: "Empty mentor profile created",
      profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Could not create mentor profile",
      error: err.message
    });
  }
};
