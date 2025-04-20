import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils.js";
import Credential from "../models/Credentials.js";

export const signUpController = async (req, res) => {
  const { name, password, email, phone, userName } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!name || !password || !email || !phone || !userName) {
    return res.status(400).json({ error: "Please Fill your details" });
  }

  try {
    const userEmail = await User.findOne({ email: email });

    // const userPhoneNo = await User.findOne({ phone: phone });

    if (userEmail) {
      return res.status(401).json({ error: `${userEmail} already exists` });
    }

    const saltRound = 10;

    const hash_password = await bcrypt.hash(password, saltRound);

    //image

    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "uploads failed", error });
        }

        const credential = new Credential({ password: hash_password });
        await credential.save();

        const user = new User({
          name,
          email,
          phone,
          userName,
          credentials: credential._id,
          profilePic: result.secure_url,
        });
        await user.save();

        const token = generateToken(user);

        res
          .status(200)
          .json({ message: "User registered successfully", token, user });
      })
      .end(file.buffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while creating user",
    });
  }
};

export const SignInController = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "Please Fill your details" });
  }

  try {
    const newUser = await User.findOne({ email }).populate("credentials");

    if (!newUser)
      return res.status(401).json({
        status: false,
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });

    const credentails = await Credential.findOne({ _id: newUser.credentials });
    if (!credentails) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      credentails.password
    );

    if (!isPasswordValid)
      return res.status(401).json({
        status: false,
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    const token = generateToken(newUser);
    res.status(200).json({
      message: "Login Successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while creating user",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    res.status(200).json({ message: "Get All User Successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error while Getting All Users" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query } = req.query;

    const user = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Get All User Successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error while Getting All Users" });
  }
};
