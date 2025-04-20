import express from "express";
import {
  editProfileByUserId,
  getProfile,
  getProfileByUserId,
} from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:userId", getProfileByUserId);
// router.get("/user-profile", verifyToken, getProfile);
router.put(
  "/editProfile",
  upload.single("image"),
  verifyToken,
  editProfileByUserId
);
router.get("/", verifyToken, getProfile);

export default router;
