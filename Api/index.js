import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import categoryRoute from "./routes/category.js";

const app = express();
dotenv.config();

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

// MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/category", categoryRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start server and connect to MongoDB
app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});
