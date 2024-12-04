import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config({});
connectDB(); // call database connection here
const PORT = process.env.PORT;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

// apis
app.use("/api/v1/user", userRoute);


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});