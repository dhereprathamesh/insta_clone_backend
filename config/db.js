import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected Successfully: ${conn.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
