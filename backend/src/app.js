import express from "express";

const app = express();
// middleware
app.use(express.json());

//import routes
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
// use routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);



export default app;
