import express from "express";
import isAuthenticated from "../Middlewares/isAuthencated.js";
import { createCourse, getCreatorCourses } from "../controllers/courseController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);


export default router;