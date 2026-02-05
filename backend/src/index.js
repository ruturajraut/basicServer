import app from "./app.js";
import dotenv from "dotenv";
dotenv.config(
    './.env'
);

const createServer = () => {
    const PORT = process.env.PORT || 9000;
    app.on("error", (err) => {
        console.error("Server error:", err);
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

createServer();