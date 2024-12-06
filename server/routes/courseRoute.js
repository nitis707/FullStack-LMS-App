import express from "express";
import isAuthenticated from "../Middlewares/isAuthencated.js";
import { createCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);


export default router;