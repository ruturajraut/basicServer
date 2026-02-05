import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({
    path: './.env'
});

const createServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

createServer();