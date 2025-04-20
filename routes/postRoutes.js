import express from "express";
import {
  addToBookmark,
  createPost,
  deletePost,
  getAllPost,
  getPostByToken,
  getPostByUserId,
  likePost,
  removeFromBookmark,
  unLikePost,
} from "../controllers/postController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), verifyToken, createPost);
router.get("/getAllPost", getAllPost);
router.get("/getPostByUserId", verifyToken, getPostByToken);
router.get("/getPostByUserId/:userId", getPostByUserId);
router.delete("/deletePost/:id", deletePost);

router.post("/like/:postId", verifyToken, likePost);
router.delete("/unlike/:postId", verifyToken, unLikePost);

router.post("/bookmark/:postId", verifyToken, addToBookmark);
router.delete("/bookmark/:postId", verifyToken, removeFromBookmark);

export default router;
