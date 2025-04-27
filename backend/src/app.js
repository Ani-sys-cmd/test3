import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import mentorshipRoutes from "./routes/mentorshipRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import achievementRoutes from "./routes/achievementsRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import mentorProfileRoutes from "./routes/MentorProfileRoutes.js";

import "./utils/reminderScheduler.js"; // Background reminders

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://mentorlink-three.vercel.app', // Deployed frontend
  'http://localhost:5173',               // Local frontend for development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow no-origin (e.g., Postman)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    }
  },
  credentials: true,
}));

// Body parsing middleware (must come before mounting routes)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images/docs)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Custom file serving with headers
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

  const extname = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.txt': 'text/plain',
    // Add more MIME types if needed
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
  res.sendFile(filePath);
});

// Default route
app.get("/", (req, res) => {
  res.send("MentorMentee Platform API");
});

// Mount routes
app.use("/auth", authRoutes);
app.use("/mentorships", mentorshipRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/achievements", achievementRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/mentorProfile", mentorProfileRoutes);

export { app };
