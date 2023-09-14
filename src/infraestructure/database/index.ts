import mongoose from "mongoose";
import app from "../../config/app";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3000;

export const createServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const server = await app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

createServer();
