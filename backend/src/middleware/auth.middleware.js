import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Extract the token (after "Bearer ")
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify and decode using your access token secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

    // 4️⃣ Find user linked with decoded ID
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5️⃣ Attach user info to the request object
    req.user = user;

    // ✅ Proceed to the next middleware or route handler
    next();

  } catch (error) {
    // 6️⃣ Handle specific JWT errors neatly
    if (error.name === "TokenExpiredError") {
      // The token was valid but has expired
      return res.status(401).json({
        message: "Token expired, please log in again",
        error: "TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      // Token signature or structure invalid
      return res.status(403).json({
        message: "Invalid token signature",
        error: "INVALID_TOKEN",
      });
    }

    // Fallback for any other error
    console.error("JWT verification unexpected error:", error.message);
    return res.status(500).json({ message: "Token verification failed" });
  }
};