import { Router } from "express";

import { userSignUp, userLogin } from "../controllers/userController.js";
import {
  uploadResults,
  getUserStats,
  getAllResults,
  getPositions,
} from "../controllers/resultsController.js";
const router = Router();

router.post("/sign-up", userSignUp);
router.post("/login", userLogin);
router.post("/upload-result", uploadResults);

router.get("/stats", getUserStats);
router.get("/leaderboard", getAllResults);
router.get("/scores", getPositions);

export default router;
