import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router();

// Update a User by ID
router.put("/:id", updateUser);

// Delete a User by ID
router.delete("/:id", deleteUser);

// Get a User by ID
router.get("/:id", getUser);

// Get all Users
router.get("/", getUsers);

export default router;
