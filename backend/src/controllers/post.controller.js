import { Post } from "../models/post.model.js";

// 🟩 Create Post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    // Basic validation
    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if authMiddleware attached the user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }

    // Create post with logged‑in user reference
    const post = await Post.create({
      name,
      description,
      age,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        _id: post._id,
        name: post.name,
        description: post.description,
        age: post.age,
        user: post.user,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 🟨 Get All Posts
const getAllPosts = async (req, res) => {
  try {
    // populate user info (optional fields)
    const posts = await Post.find({})
      .populate("user", "username email"); 

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error retrieving posts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 🟦 Update Post
const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const postId = req.params.id;
    // Ensure current user owns the post  (optional)
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Optional: verify ownership
    if (req.user && post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 🟥 Delete Post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Optional: verify ownership
    if (req.user && post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createPost, getAllPosts, updatePost, deletePost };