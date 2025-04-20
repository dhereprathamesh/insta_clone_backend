import User from "../models/User.js";

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUserId = req.user.id;
    if (userId === currentUserId) {
      return res.status(400).json({ message: "You can't follow yourself!" });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      userToFollow.followers.push(currentUserId);
      await currentUser.save();
      await userToFollow.save();
    }
    res.status(200).json({ message: "User followed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const userToUnFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );

    userToUnFollow.followers = userToUnFollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await userToUnFollow.save();
    res.status(200).json({ message: "User unfollowed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("followers", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("following", "name");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
