import express from "express";
import {
  getAllExperiences,
  getExperienceById,
  getMostVisited,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getAllExperiences);
router.get("/most-visited", getMostVisited);
router.get("/:id", getExperienceById);

export default router;