import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadAchievement, viewSelfAchievements, viewMenteesAchievements, downloadFile } from '../controllers/achievementController.js';
import multer from 'multer';

const router = express.Router();

// Setup storage engine for multer (optional, for temporary storage)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Route for mentee to upload achievement
router.post('/upload', authMiddleware, upload.single('file'), uploadAchievement);

// Route for mentee to view their own achievements
router.get('/self', authMiddleware, viewSelfAchievements);

// Route for mentor to view assigned mentees' achievements
router.get('/mentees', authMiddleware, viewMenteesAchievements);

// Route for downloading files from the database
router.get('/download/:fileId', authMiddleware, downloadFile);

export default router;