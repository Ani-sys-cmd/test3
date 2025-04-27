import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// Fetch all unassigned mentees
export const getAvailableMentees = async (req, res) => {
  try {
    const unassignedMentees = await User.find({
      role: "mentee",
      mentorId: null, // Ensure mentorId is null (unassigned mentees)
    }).select("username email _id"); // Selecting only the necessary fields

    if (unassignedMentees.length === 0) {
      return res.status(404).json({ message: "No unassigned mentees found." });
    }

    // Respond with the list of unassigned mentees
    res.status(200).json({ mentees: unassignedMentees });
  } catch (error) {
    console.error("Error fetching unassigned mentees:", error);
    res.status(500).json({ message: "An error occurred while fetching unassigned mentees.", error: error.message });
  }
};

// Fetch all mentees assigned to a specific mentor
export const getMenteesForMentor = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract `access_token` from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Access token is missing." });
  }

  try {
    // Verify and decode the access token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use the secret key for `access_token`
    const mentorId = decodedToken.id; // Assuming the `id` field in the token is the mentor's ID

    // Find the mentor in the database
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found or invalid role." });
    }

    // Find mentees associated with this mentor
    const mentees = await User.find({
      role: "mentee",
      mentorId,
    }).select("username email _id");

    if (mentees.length === 0) {
      return res.status(404).json({ message: "No mentees found for this mentor." });
    }

    res.status(200).json(mentees);
  } catch (error) {
    console.error("Error fetching mentees for mentor:", error);
    res.status(500).json({ message: "Failed to fetch mentees.", error });
  }
};

// Assign a mentee to a mentor
export const assignMenteeToMentor = async (req, res) => {
  const { menteeId } = req.body;
  const mentorId = req.user.id;

  try {
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(400).json({ message: "Invalid mentor or mentor does not exist." });
    }

    const mentee = await User.findById(menteeId);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(400).json({ message: "Invalid mentee or mentee does not exist." });
    }
    if (mentee.mentorId) {
      return res.status(400).json({ message: "Mentee is already assigned to another mentor." });
    }

    // Update mentee and mentor
    mentee.mentorId = mentorId;
    await mentee.save();

    mentor.assignedMentees.push(menteeId);
    await mentor.save();

    res.status(200).json({ message: "Mentee successfully assigned to mentor.", mentee });
  } catch (error) {
    console.error("Error assigning mentee to mentor:", error);
    res.status(500).json({ message: "An error occurred while assigning mentee.", error });
  }
};

// Unassign a mentee from a mentor
export const unassignMenteeFromMentor = async (req, res) => {
  const { menteeId } = req.body; // Mentee ID from the client
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  try {
    // Decode the token to get mentor details
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const mentorId = decoded.id; // Extract the mentor's ID from the token payload
    const mentorRole = decoded.role; // Assume the role is included in the token payload

    if (mentorRole !== "mentor") {
      return res.status(403).json({ message: "Access denied. Only mentors can unassign mentees." });
    }

    // Ensure the mentorId is a valid ObjectId (convert string to ObjectId)
    const mentorObjectId = new mongoose.Types.ObjectId(mentorId); 

    // Find the mentor in the database
    const mentor = await User.findById(mentorObjectId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }

    // Validate menteeId before using it in an ObjectId
    if (!mongoose.Types.ObjectId.isValid(menteeId)) {
      return res.status(400).json({ message: "Invalid mentee ID format." });
    }

    // Ensure the menteeId is a valid ObjectId (convert string to ObjectId)
    const menteeObjectId = new mongoose.Types.ObjectId(menteeId);

    // Find the mentee in the database
    const mentee = await User.findById(menteeObjectId);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ message: "Mentee not found or invalid role." });
    }

    // Check if the mentee is assigned to the current mentor
    if (mentee.mentorId?.toString() !== mentorObjectId.toString()) {
      return res.status(400).json({ message: "Mentee is not assigned to this mentor." });
    }

    // Unassign the mentee
    mentee.mentorId = null;
    await mentee.save();

    // Remove mentee from mentor's assignedMentees array
    mentor.assignedMentees = mentor.assignedMentees.filter(
      (id) => id.toString() !== menteeObjectId.toString()
    );
    await mentor.save();

    res.status(200).json({ message: "Mentee successfully unassigned from mentor." });
  } catch (error) {
    console.error("Error unassigning mentee from mentor:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    res.status(500).json({ message: "An error occurred while unassigning mentee.", error });
  }
};
