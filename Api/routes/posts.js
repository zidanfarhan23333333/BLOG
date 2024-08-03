import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving post", error: error.message });
  }
});

// update

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            $new: true,
          }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(200).json(error);
      }
    } else {
      res.status(401).json("you can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    if (post.username === req.body.username) {
      try {
        await Post.deleteOne({ _id: req.params.id }); // Use deleteOne method on the Post model
        return res.status(200).json("Post has been deleted");
      } catch (error) {
        console.error("Error deleting the post:", error);
        return res.status(500).json("Error deleting the post");
      }
    } else {
      return res.status(401).json("You can only delete your own posts");
    }
  } catch (error) {
    console.error("Error finding the post:", error);
    return res.status(500).json("Error finding the post");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error finding the post:", error);
    res
      .status(500)
      .json({ message: "Error finding the post", error: error.message });
  }
});

// getall
router.get("/", async (req, res) => {
  const { username, catName } = req.query;

  try {
    let posts;
    if (username && catName) {
      posts = await Post.find({ username: username, catName: catName });
    } else if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({ catName: catName });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res
      .status(500)
      .json({ message: "Error retrieving posts", error: error.message });
  }
});

export default router;
