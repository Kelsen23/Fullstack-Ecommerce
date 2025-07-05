import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categotyRoutes from "./routes/categoryRoutes.js";

dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/category", categotyRoutes);

app.listen(port, () => console.log(`Server up on port: ${port}`));
