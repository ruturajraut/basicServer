import { Router } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * BASE PATH: /api/v1/posts
 */

/**
 * @route   POST /api/v1/posts/create
 * @desc    Create a new post (requires authentication)
 */
router.post("/create", authMiddleware, createPost);

/**
 * @route   GET /api/v1/posts/all
 * @desc    Retrieve all posts (public)
 */
router.get("/all", getAllPosts);

/**
 * @route   PUT /api/v1/posts/update/:id
 * @desc    Update a specific post by ID (requires authentication)
 */
router.put("/update/:id", authMiddleware, updatePost);

/**
 * @route   DELETE /api/v1/posts/delete/:id
 * @desc    Delete a specific post by ID (requires authentication)
 */
router.delete("/delete/:id", authMiddleware, deletePost);

/**
 * Optional shortcut routes you might add later:
 * router.get("/:id", getSinglePost);
 * router.get("/user/:userId", authMiddleware, getUserPosts);
 */

export default router;