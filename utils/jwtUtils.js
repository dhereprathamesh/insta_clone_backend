import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "8h" }
  );
};
