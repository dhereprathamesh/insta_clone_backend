import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { connectDB } from "./config/db.js";
import Colors from "Colors";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/profile", profileRoutes);

const PORT = 8080;

app.listen(PORT, (req, res) => {
  console.log(`server is running on Port: ${PORT}`.bgCyan);
});
