import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    credentials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Credential",
    },
    profilePic: { type: String, required: true },
    description: { type: String },
    likedPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    bookMarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
