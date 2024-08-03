import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Note: Use "required" instead of "require"
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: false,
    },

    username: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
