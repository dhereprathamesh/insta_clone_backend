import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    caption: {
      type: String,
      default: "",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
