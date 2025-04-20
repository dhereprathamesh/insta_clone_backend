import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({ _id: userId });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editProfileByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateBody = req.body;

    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        uploadStream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      updateBody.profilePic = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateBody, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User  not found" });
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
