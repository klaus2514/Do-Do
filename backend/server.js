import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js"; // New

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes); // New

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Failed to connect", err);
  }
};
