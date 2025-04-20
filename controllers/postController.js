import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "uploads failed", error });
        }

        const newPost = new Post({
          user: userId,
          caption,
          imageUrl: result.secure_url,
        });
        await newPost.save();
        res
          .status(200)
          .json({ message: "Post created successfully", post: newPost });
      })
      .end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find().populate("user", "name profilePic");

    res.status(200).json({ message: "Get all post successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPostByToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ user: userId });

    res.status(200).json({ message: "Get post successfully", posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ user: userId });

    res.status(200).json({ message: "Get post successfully", posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete({ _id: postId });

    res.status(200).json({ message: "Post Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId });
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unLikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId });
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Post unLiked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId });
    if (!post.bookmarks.includes(userId)) {
      post.bookmarks.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Added to bookmarked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId });
    post.bookmarks = post.bookmarks.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Remove from bookmark" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
