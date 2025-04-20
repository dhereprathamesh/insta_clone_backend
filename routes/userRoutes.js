import express from "express";
import {
  getSingleUser,
  searchUser,
  SignInController,
  signUpController,
} from "../controllers/userController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  followUser,
  getFollowers,
  getFollowing,
  unFollowUser,
} from "../controllers/followController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", upload.single("image"), signUpController);
router.post("/signin", SignInController);
router.get("/search", searchUser);
router.get("/getSingleUser", verifyToken, getSingleUser);

//follow & UnFollow Routes
router.post("/follow/:userId", verifyToken, followUser);
router.delete("/unfollow/:userId", verifyToken, unFollowUser);
// router.get("/followers/:userId", getFollowers);
// router.delete("/following/:userId", getFollowing);

export default router;
