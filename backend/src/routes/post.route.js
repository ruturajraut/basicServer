import {Router} from 'express';
import { createPost,getAllPosts,updatePost,deletePost } from '../controllers/post.controller.js';

const router = Router();

router.post("/create", createPost);
router.get("/all", getAllPosts);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;

