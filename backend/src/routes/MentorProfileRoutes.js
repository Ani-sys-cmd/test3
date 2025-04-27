// routes/mentorProfileRoutes.js
import express from "express";
import { createEmptyProfile } from "../controllers/mentorProfileController.js";

const router = express.Router();

// POST /mentorProfile/create
router.post("/create", createEmptyProfile);

export default router;
