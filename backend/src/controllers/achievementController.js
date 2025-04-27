import Achievement from '../models/Achievement.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

// Setup storage engine for multer (optional, for temporary storage)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Controller to upload achievement as a mentee
export const uploadAchievement = async (req, res) => {
  const { achievementText } = req.body;

  if (req.user.role !== 'mentee') {
    return res.status(403).json({ message: 'Only mentees can upload achievements' });
  }

  try {
    let fileData = null;
    let mimeType = null;

    if (req.file) {
      fileData = req.file.buffer; // Store the file buffer
      mimeType = req.file.mimetype; // Store the MIME type
    }

    const newAchievement = await Achievement.create({
      mentee: req.user.id,
      achievementText,
      fileData,
      mimeType,
    });

    res.status(201).json({ message: 'Achievement uploaded successfully', achievement: newAchievement });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload achievement', error: error.message });
  }
};

// Controller to view self achievements as a mentee
export const viewSelfAchievements = async (req, res) => {
  if (req.user.role !== 'mentee') {
    return res.status(403).json({ message: 'Only mentees can view their own achievements' });
  }

  try {
    const achievements = await Achievement.find({ mentee: req.user.id })
      .sort({ createdAt: -1 })
      .populate('mentee', 'username'); // Populate mentee's username

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch achievements', error: error.message });
  }
};

// Controller to view achievements of assigned mentees as a mentor
export const viewMenteesAchievements = async (req, res) => {
  if (req.user.role !== 'mentor') {
    return res.status(403).json({ message: 'Only mentors can view mentees achievements' });
  }

  try {
    const mentor = await User.findById(req.user.id).populate('assignedMentees');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const menteeIds = mentor.assignedMentees.map((mentee) => mentee._id);

    // Fetch achievements for assigned mentees and populate mentee's username
    const achievements = await Achievement.find({ mentee: { $in: menteeIds } })
      .sort({ createdAt: -1 })
      .populate('mentee', 'username'); // Populate mentee's username

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mentees achievements', error: error.message });
  }
};

// Controller to download file from database
export const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const achievement = await Achievement.findById(fileId);

    if (!achievement || !achievement.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Type', achievement.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${achievement._id}${path.extname(achievement.mimeType)}"`);

    res.send(achievement.fileData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to download file', error: error.message });
  }
};