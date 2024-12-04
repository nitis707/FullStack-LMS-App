import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";


dotenv.config({});
// call database connection here
connectDB;
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});