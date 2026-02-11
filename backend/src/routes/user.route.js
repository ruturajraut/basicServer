import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Public endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated endpoints
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;