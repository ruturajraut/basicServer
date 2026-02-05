import express from "express";

const app = express();
// middleware
app.use(express.json());

//import routes
import userRoutes from "./routes/user.route.js";
// use routes
app.use("/api/v1/users", userRoutes);



export default app;
