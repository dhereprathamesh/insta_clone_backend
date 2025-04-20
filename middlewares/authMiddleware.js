import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decode = jwt.decode(token.split(" ")[1], process.env.JWT_SECRET_KEY);

    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
